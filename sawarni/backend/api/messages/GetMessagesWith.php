<?php

    include_once __DIR__ . '/../../CORSHeaders.php';
    include_once __DIR__ . '/../../Connection.php';

    require __DIR__ . '/../../vendor/autoload.php';
    require_once __DIR__ . '/../../Helpers/Helpers.php';

    $loggedInUserId = authorize()->id;

    verifyFieldsExist($_POST, 'otherUserId');

    $otherUserId = $_POST['otherUserId'];

    $messages = query($connection,
                    '
                        SELECT *
                        FROM message
                        WHERE senderid = :userId1 AND receiverid = :userId2
                        OR senderid = :userId2 AND receiverid = :userId1;
                    ',
                    [
                        'userId1' => $loggedInUserId,
                        'userId2' => $otherUserId
                    ]);
    
    respond(true, 'messages retrieved', ['messages' => $messages]);


?>