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
                        SELECT 
                            m.id,
                            m.senderid as senderId,
                            m.receiverid as receiverId,
                            m.content,
                            m.sent_at as sentAt,
                            sender.user_name as senderUserName,
                            sender.profile_picture_path as senderProfilePicture
                        FROM 
                            message m
                        JOIN 
                            useraccount sender ON m.senderid = sender.user_id
                        WHERE 
                            (m.senderid = :userId1 AND m.receiverid = :userId2)
                            OR 
                            (m.senderid = :userId2 AND m.receiverid = :userId1)
                        ORDER BY 
                            m.sent_at ASC;
                    ',
                    [
                        'userId1' => $loggedInUserId,
                        'userId2' => $otherUserId
                    ]);

    $baseUrl = "http://localhost/sawarni/";
    foreach($messages as &$message) {
        $message['senderProfilePicture'] = $baseUrl . ltrim($message['senderProfilePicture'], '/');
        toint($message, 'id', 'senderId', 'receiverId');
    }

    respond(true, 'messages retrieved', ['messages' => $messages]);


?>