<?php
    include_once __DIR__ . '/../../CORSHeaders.php';
    include_once __DIR__ . '/../../Connection.php';

    require __DIR__ . '/../../vendor/autoload.php';
    require_once __DIR__ . '/../../Helpers/Helpers.php';

    $userId = authorize(getallheaders())->id;

    verifyFieldsExist($_POST, 'postId');

    $postId = $_POST['postId'];

    $res = query($connection,
                '
                    INSERT INTO liked 
                    VALUES(:userId, :postId, NOW());
                ',
                [
                    ':userId' => $userId,
                    ':postId' => $postId
                ]);

    respond(true, 'like added');
        
?>