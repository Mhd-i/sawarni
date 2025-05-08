<?php
    
    include_once __DIR__ . '/../../CORSHeaders.php';
    include_once __DIR__ . '/../../Connection.php';

    require __DIR__ . '/../../vendor/autoload.php';
    require_once __DIR__ . '/../../Helpers/Helpers.php';

    $userId = authorize()->id;

    verifyFieldsExist($_POST, 'postId');

    $postId = $_POST['postId'];

    $originalPosterUserId = query($connection,
                                '
                                    SELECT posted_by
                                    FROM post
                                    WHERE id = :postId;
                                ',
                                [
                                    ':postId' => $postId
                                ]
                            )[0]['posted_by'];
                            
    if (!($userId === $originalPosterUserId)) {
        respond(false, 'you can not delete this post');
    }

    $res = query($connection,
                '
                    DELETE FROM post
                    WHERE id = :postId;
                ',
                [
                    ':postId' => $postId
                ]);

    respond(true, 'post deleted')
            
?>