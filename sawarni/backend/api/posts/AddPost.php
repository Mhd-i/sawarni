<?php

    include_once __DIR__ . '/../../CORSHeaders.php';
    include_once __DIR__ . '/../../Connection.php';
    
    require __DIR__ . '/../../vendor/autoload.php';
    require_once __DIR__ . '/../..//Helpers/Helpers.php';

    $userId = authorize()->id;

    verifyFieldsExist($_POST, 'textContent');

    $textContent = $_POST['textContent'];

    $newPost = query($connection,
                    '
                        INSERT INTO post (posted_by, text_content, creation_date) 
                        VALUES(:postedBy, :textContent, CURDATE())
                    ',
                    [
                        ':postedBy' => $userId,
                        ':textContent' => $textContent
                    ]);
    
    $postId = $connection->lastInsertId();
    
    $uploads = upload($connection, $_FILES, '../../uploads/');

    

    foreach($uploads as $upload) {
        // Insert data in the Association Table PostAttachment
        query($connection,
            '
                INSERT INTO postattachment (post_id, upload_id)
                VALUES (:postId, :uploadId);
            ',
            [
                ':uploadId' => $upload['uploadId'],
                ':postId' => $postId
            ]);
    }

    respond(true, 'success');

?>