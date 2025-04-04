<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

include_once("connection.php");

$response = [];
$baseUrl = "http://localhost/sawarni/"; // Adjust to your base URL

try {
    // Validate required fields
    if (empty($_POST['added_by']) {
        throw new Exception('User ID (added_by) is required');
    }
    if (empty($_POST['name'])) {
        throw new Exception('Equipment name is required');
    }
    if (empty($_POST['category'])) {
        throw new Exception('Category is required');
    }
    if (empty($_POST['price'])) {
        throw new Exception('Price is required');
    }

    // Process file upload if exists
    $imageUrl = null;
    if (!empty($_FILES['image'])) {
        $file = $_FILES['image'];
        
        // Validate file
        $allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!in_array($file['type'], $allowedTypes)) {
            throw new Exception('Only JPG, PNG, and GIF images are allowed');
        }
        
        // Create uploads directory if not exists
        $uploadDir = 'uploads/equipment/';
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }
        
        // Generate unique filename
        $fileExt = pathinfo($file['name'], PATHINFO_EXTENSION);
        $fileName = uniqid('equip_') . '.' . $fileExt;
        $filePath = $uploadDir . $fileName;
        
        if (!move_uploaded_file($file['tmp_name'], $filePath)) {
            throw new Exception('Failed to upload equipment image');
        }
        
        $imageUrl = $baseUrl . $filePath;
    }

    // Begin transaction
    $connection->beginTransaction();

    // Insert equipment
    $stmt = $connection->prepare("
        INSERT INTO equipment 
        (name, category, price, image_url, added_by, is_new, created_at) 
        VALUES 
        (:name, :category, :price, :image_url, :added_by, 1, NOW())
    ");
    
    $stmt->execute([
        ':name' => $_POST['name'],
        ':category' => $_POST['category'],
        ':price' => $_POST['price'],
        ':image_url' => $imageUrl,
        ':added_by' => $_POST['added_by']
    ]);
    
    $equipmentId = $connection->lastInsertId();

    // Insert specifications if provided
    if (!empty($_POST['specs'])) && is_array($_POST['specs'])) {
        $specStmt = $connection->prepare("
            INSERT INTO specifications 
            (equipment_id, spec_key, spec_value) 
            VALUES 
            (:equipment_id, :spec_key, :spec_value)
        ");
        
        foreach ($_POST['specs'] as $spec) {
            if (!empty($spec['key']) && !empty($spec['value'])) {
                $specStmt->execute([
                    ':equipment_id' => $equipmentId,
                    ':spec_key' => $spec['key'],
                    ':spec_value' => $spec['value']
                ]);
            }
        }
    }

    // Commit transaction
    $connection->commit();

    // Return success response
    $response = [
        'ok' => true,
        'message' => 'Equipment added successfully',
        'body' => [
            'equipment_id' => $equipmentId,
            'image_url' => $imageUrl
        ]
    ];

} catch (Exception $e) {
    // Rollback on error
    if ($connection->inTransaction()) {
        $connection->rollBack();
    }
    
    // Clean up uploaded file if transaction failed
    if (isset($filePath) && file_exists($filePath)) {
        unlink($filePath);
    }
    
    $response = [
        'ok' => false,
        'message' => $e->getMessage(),
        'body' => null
    ];
}

echo json_encode($response);
?>