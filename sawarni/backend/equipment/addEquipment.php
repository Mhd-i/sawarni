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
    include_once("../connection.php");

    // Retrieve Post Info from Frontend
    $sellerId = $_POST['sellerId'];
    $name = $_POST['name'];
    $description = $_POST['description'];
    $price = $_POST['price'];

    $responseBody = [];

    // Insert a new Post
    try {
        $stmt = $connection->prepare('INSERT INTO equipment (name, sellerId, description, price) 
                                      VALUES(:name, :sellerId, :description, :price)');

        $stmt->execute([
            ':name' => $name,
            ':sellerId' => $sellerId,
            ':description' => $description,
            ':price' => $price
        ]);
        // Get the new Post id
        $equipmentId = $connection->lastInsertId();

    }
    catch (PDOException $e) {
        echo json_encode(['ok' => false, 'message' => 'failed to insert a new equipment', 'body' => null]);
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
        $uploadId = $connection->lastInsertId();

        
        // Insert data in the Association Table EquipmentAttachment
        $stmt = $connection->prepare('INSERT INTO equipmentattachment (equipmentId, uploadId)
                                      VALUES (:equipmentId, :uploadId);');

        $stmt->execute([
            ':equipmentId' => $equipmentId,
            ':uploadId' => $uploadId
        ]);

    }

    echo json_encode(['ok' => true, 'message' => 'success', 'body' => null]);
 
?>