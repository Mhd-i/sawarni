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
                DELETE FROM subscriptions WHERE course_id = :courseId AND user_id = :loggedInUserId;
            ',
            [
                ':courseId' => $courseId,
                ':loggedInUserId' => $loggedInUserId
            ]
            );

    respond(true, 'success removing subscription');


?>