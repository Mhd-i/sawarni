<?php

    include_once __DIR__ . '/../../CORSHeaders.php';
    include_once __DIR__ . '/../../Connection.php';

    require __DIR__ . '/../../vendor/autoload.php';
    include_once __DIR__ . '/../../Helpers/Helpers.php';

    $loggedInUserId = authorize()->id;

    $sellerId = $_POST['sellerId'] ?? $loggedInUserId;

    $baseUrl = "http://localhost/sawarni/";

    $equipments = query($connection,
                    '
                        SELECT 
                            e.id as id,
                            e.name as name,
                            e.sellerId as sellerId,
                            u.user_name as sellerUserName,
                            e.description as description,
                            e.price as price
                        FROM 
                            equipment e, useraccount u
                        WHERE 
                            e.sellerId = u.user_id AND
                            e.sellerId = :sellerId;
                    ',
                    [
                        ':sellerId' => $sellerId
                    ]
                    );
    
    if (empty($equipments)) {
        respond(false, 'no equipment found');
    }

    foreach($equipments as &$equipment) {
        toint($equipment, 'id', 'sellerId');
        tofloat($equipment, 'price');

        $attachments = query($connection,
                        '
                            SELECT  u.file_path as filePath, u.file_type as fileType
                            FROM upload AS u, equipment AS e, equipmentattachment as ea
                            WHERE u.upload_id = ea.uploadId AND
                                e.id = ea.equipmentId AND
                                e.id = :equipmentId;
                        ',
                        [
                            ':equipmentId' => $equipment['id']
                        ]
                        );
        
        foreach($attachments as &$attachment) {
            $attachment['filePath'] = $baseUrl . ltrim($attachment['filePath'], '/');
        }

        $equipment['attachments'] = $attachments;
    
    }

    respond(true, 'equipments retrieved', $equipments);

?>