<?php

    include_once __DIR__ . '/../../CORSHeaders.php';
    include_once __DIR__ . '/../../Connection.php';
    
    require __DIR__ . '/../../vendor/autoload.php';
    require_once __DIR__ . '/../..//Helpers/Helpers.php';

    $userId = authorize()->id;

    verifyFieldsExist($_POST, 'name');
    verifyFieldsExist($_POST, 'description');
    verifyFieldsExist($_POST, 'price');

    $name = $_POST['name'];
    $description = $_POST['description'];
    $price = $_POST['price'];

    $newPost = query($connection,
                    '
                        INSERT INTO equipment (name, sellerId, description, price) 
                        VALUES(:name, :sellerId, :description, :price);
                    ',
                    [
                        ':name' => $name,
                        ':sellerId' => $userId,
                        ':description' => $description,
                        ':price' => $price,
                    ]);
    
    $equipmentId = $connection->lastInsertId();
    
    $uploads = upload($connection, $_FILES, '../../uploads/');

    

    foreach($uploads as $upload) {
        // Insert data in the Association Table PostAttachment
        query($connection,
            '
                INSERT INTO equipmentattachment (equipmentId, uploadId)
                VALUES (:equipmentId, :uploadId);
            ',
            [
                ':equipmentId' => $equipmentId,
                ':uploadId' => $upload['uploadId'],
            ]);
    }

    respond(true, 'success');

?>