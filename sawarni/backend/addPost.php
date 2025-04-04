<?php

    header("Content-Type: application/json"); // Ensure JSON response
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");

    // Handle preflight request
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        exit;
    }

    // Database connection and file upload logic here
    include_once("connection.php");

    // Retrieve Post Info from Frontend
    $posted_by = $_POST['posted_by'];
    $text_content = $_POST['text_content'];

    $responseBody = [];

    // Insert a new Post
    try {
        $stmt = $connection->prepare('INSERT INTO post (posted_by, text_content, creation_date) 
                                      VALUES(:posted_by, :text_content, CURDATE())');

        $stmt->execute([
            ':posted_by' => $posted_by,
            ':text_content' => $text_content
        ]);
        // Get the new Post id
        $post_id = $connection->lastInsertId();

    }
    catch (PDOException $e) {
        echo json_encode(['ok' => false, 'message' => 'failed to insert a new post', 'body' => null]);
        return;
    }
    

    // Loop Through all selected files
    foreach ($_FILES as $file) {

        // Get the correct File path and type
        $uploadDir = 'uploads/';
        $fileName = basename($file['name']);
        $filePath = $uploadDir . $fileName;
        $fileExtention = (string)pathinfo($filePath, PATHINFO_EXTENSION);

        if (!move_uploaded_file($file['tmp_name'], $filePath)) {
            echo json_encode(['ok' => false, 'message' => 'failed to move file', 'body' => null]);
            return;
        } 

        // Insert each file in the Upload table
        $stmt = $connection->prepare('INSERT INTO upload (file_path, file_type) 
                                      VALUES(:filePath, :fileExtention);');

        $stmt->execute([
            ':filePath' => $filePath,
            ':fileExtention' => $fileExtention
        ]);

        // Get the Upload Id
        $upload_id = $connection->lastInsertId();

        
        // Insert data in the Association Table PostAttachment
        $stmt = $connection->prepare('INSERT INTO postattachment (post_id, upload_id)
                                      VALUES (:post_id, :upload_id);');

        $stmt->execute([
            ':post_id' => $post_id,
            ':upload_id' => $upload_id
        ]);

    }

    echo json_encode(['ok' => true, 'message' => 'success', 'body' => null]);
 
?>