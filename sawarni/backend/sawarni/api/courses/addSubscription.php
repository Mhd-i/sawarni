<?php

    include_once __DIR__ . '/../../CORSHeaders.php';
    include_once __DIR__ . '/../../Connection.php';

    require __DIR__ . '/../../vendor/autoload.php';
    include_once __DIR__ . '/../../Helpers/Helpers.php';

    $loggedInUserId = authorize()->id;

    verifyFieldsExist($_POST, 'courseId');

    $courseId = $_POST['courseId'];

    query($connection,
                '
                    INSERT INTO subscriptions (course_id, user_id)
                    VALUES (:courseId, :loggedInUserId);
                ',
                [
                    ':courseId' => $courseId,
                    ':loggedInUserId' => $loggedInUserId
                ]
                );

    respond(true, 'added subscription successfully');

?>