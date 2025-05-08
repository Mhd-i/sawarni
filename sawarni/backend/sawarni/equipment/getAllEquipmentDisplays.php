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

    $baseUrl = "http://localhost/sawarni/";

    $stmt = $connection->prepare("
        SELECT  e.id,
                e.name,
                e.sellerId,
                u.user_name AS sellerUserName,
                e.description,
                e.price
        FROM equipment AS e, useraccount as u
        WHERE e.sellerId = u.user_id;
    ");
    $stmt->execute();
    
    // Fetch results as associative array
    $equipments = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Check if any posts were found
    if (empty($equipments)) {
        echo json_encode(['ok' => false, 'message' => 'No equipment found', 'body' => null]);
        return;
    }

    foreach($equipments as &$equipment) {


        $stmt = $connection->prepare('
            SELECT  u.file_path,
                    u.file_type
            FROM upload AS u, equipment AS e, equipmentattachment as ea
            WHERE u.upload_id = ea.uploadId AND
                e.id = ea.equipmentId AND
                e.id = :equipmentId;
        ');

        $stmt->execute([
            ':equipmentId' => $equipment['id']
        ]);

        $attachments = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Transform each post's image_url
        $transformedAttachments = array_map(function($attachment) use ($baseUrl) {
            $attachment['file_path'] = $baseUrl . ltrim($attachment['file_path'], '/');
            return $attachment;
        }, $attachments);

        $equipment['image_urls'] = $transformedAttachments;
    
    }

    

    echo json_encode(['ok' => true, 'message' => 'success', 'body' => $equipments]);







?>