<?php

    include_once __DIR__ . '/../../CORSHeaders.php';
    include_once __DIR__ . '/../../Connection.php';
    
    require __DIR__ . '/../../vendor/autoload.php';
    require_once __DIR__ . '/../..//Helpers/Helpers.php';

    $userId = authorize()->id;

    verifyFieldsExist($_POST, 'postId', 'textContent');

    $postId = $_POST['postId'];
    $textContent = $_POST['textContent'];

    $post = queryOne($connection,
            '
                SELECT * FROM post WHERE id = :postId;
            ',
            [':postId' => $postId]
        );

    if ($post['posted_by'] != $userId) {
        respond(false, 'this user cannot edit this post');
    }

    query($connection,
                    '
                        UPDATE post SET text_content = :textContent WHERE id = :postId;
                    ',
                    [
                        ':postId' => $postId,
                        ':textContent' => $textContent
                    ]);
    
    $uploads = upload($connection, $_FILES, '../../uploads/');

    query($connection, 
        '
            DELETE FROM postattachment WHERE post_id = :postId ;
        ',
        [':postId' => $postId]
    );

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