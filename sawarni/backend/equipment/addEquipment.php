<?php

header("Content-Type: application/json"); // Ensure JSON response
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

// Database connection and file upload logic
include_once("connection.php");

$response = [];

foreach ($_FILES as $file) {

    $uploadDir = 'uploads/';
    $fileName = basename($file['name']);
    $filePath = $uploadDir . $fileName;

    if (move_uploaded_file($file['tmp_name'], $filePath)) {

        try {
            $stmt = $connection->prepare("
                INSERT INTO equipment (name, description, image_url, added_date) 
                VALUES (:name, :description, :image_url, CURDATE());");

            $stmt->bindParam(':name', $_POST['name']);
            $stmt->bindParam(':description', $_POST['description']);
            $stmt->bindParam(':image_url', $filePath);

            $stmt->execute();

        } catch (PDOException $e) {
            echo json_encode(['ok' => false, 'message' => 'database error', 'body' => $e->getMessage()]);
            return;
        }

    } else {
        echo json_encode(['ok' => false, 'message' => 'failed to move file', 'body' => null]);
        return;
    }

}

echo json_encode(['ok' => true, 'message' => 'equipment added successfully', 'body' => null]);

?>
