<?php
    include_once __DIR__ . '/../../CORSHeaders.php';
    include_once __DIR__ . '/../../Connection.php';

    require __DIR__ . '/../../vendor/autoload.php';
    include_once __DIR__ . '/../../Helpers/Helpers.php';

    $userId = authorize()->id;

    verifyFieldsExist($_POST, 'postId');
    $postId = $_POST['postId'];

    query($connection,
            '
                DELETE FROM liked
                WHERE user_id = :userId AND
                    post_id = :postId;
            ',
            [
                ':postId' => $postId,
                ':userId' => $userId
            ]);

    respond(true, 'like removed');
        
?>