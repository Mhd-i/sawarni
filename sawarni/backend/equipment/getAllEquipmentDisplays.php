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

    $stmt = $connection->prepare("
        SELECT 
            e.id,
            e.name,
            e.description,
            e.price,
            e.sellerid,
            u.user_name as sellerusername
        From equipment as e
        JOIN 
            useraccount u ON e.sellerid  = u.user_id;
        
        

    ");
    $stmt->execute();
    
    // Fetch results as associative array
    $equipments = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Check if any posts were found
    if (empty($equipments)) {
        echo json_encode(['ok' => false, 'message' => 'No equipments found', 'body' => null]);
        return;
    }

    $baseUrl = "http://localhost/sawarni/";
    foreach ( $equipments as &$equipment ) {

        $stmt = $connection->prepare("
            SELECT 
                u.file_path,
                u.file_type
            FROM upload as u, equipmentattachment as ea
            WHERE ea.uploadid = u.uploadid
                AND ea.equipmentid = :equipmentid;
        ");
        
        $stmt->execute([
            ':equipmentid' => $equipment['id']   
        ]);

        $equipmentAttachments = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach( $equipmentAttachments as &$equipmentAttachment ) {
            $equipmentAttachment['file_path'] = $baseUrl . $equipmentAttachment['file_path'];
        }

        $equipment['attachments'] = $equipmentAttachments;
    }

    echo json_encode(['ok' => true, 'message' => 'success', 'body' => $equipments]);







?>