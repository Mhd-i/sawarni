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

    $response = [];

    foreach ($_FILES as $file) {

        $uploadDir = 'uploads/';
        $fileName = basename($file['name']);
        $filePath = $uploadDir . $fileName;

        if (move_uploaded_file($file['tmp_name'], $filePath)) {

            try {
                $stmt = $connection->prepare("INSERT INTO post (posted_by, text_content, image_url, creation_date) 
                                              VALUES (:posted_by, :text_content, :image_url, CURDATE());");
                
                $stmt->bindParam(':posted_by', $_POST['posted_by']);
                $stmt->bindParam(':text_content', $_POST['text_content']);
                $stmt->bindParam(':image_url', $filePath);

                $stmt->execute();
                $response['message'] = 'File uploaded successfully.';

            } 
            catch (PDOException $e) {
                $response['error'] = 'Database error: ' . $e->getMessage();
            }
        } 
        else {
            $response['error'] = 'Failed to move uploaded file.';
        }

    }

    echo json_encode($response);
 
?>