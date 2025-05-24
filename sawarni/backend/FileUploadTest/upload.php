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
                $stmt = $connection->prepare("INSERT INTO uploads (file_name, file_path) VALUES (:file_name, :file_path)");
                $stmt->bindParam(':file_name', $fileName);
                $stmt->bindParam(':file_path', $filePath);
                $stmt->execute();
                $response['message'] = 'File uploaded successfully.';
            } catch (PDOException $e) {
                $response['error'] = 'Database error: ' . $e->getMessage();
            }
        } else {
            $response['error'] = 'Failed to move uploaded file.';
        }

    }

    echo json_encode($response);
 
?>