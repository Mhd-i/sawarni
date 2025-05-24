<?php
    include_once __DIR__ . '/../../CORSHeaders.php';
    include_once __DIR__ . '/../../Connection.php';

    require __DIR__ . '/../../vendor/autoload.php';
    require_once __DIR__ . '/../../Helpers/Helpers.php';

    $loggedInUserId = authorize()->id;

    $baseUrl = "http://localhost/sawarni/";

    $recentContacts = query($connection,
                            '
                                SELECT 
                                    ua.user_id as id,
                                    ua.user_name AS username,
                                    ua.profile_picture_path AS profilePicturePath
                                FROM 
                                    message m
                                JOIN 
                                    useraccount ua ON ua.user_id = m.receiverid
                                WHERE 
                                    m.senderid = :userId
                                GROUP BY 
                                    m.receiverid, ua.user_name, ua.profile_picture_path
                                ORDER BY
                                    m.sent_at DESC;
                            ',
                            [
                                ':userId' => $loggedInUserId
                            ]
                        );

    foreach($recentContacts as &$contact) {
        $contact['profilePicturePath'] = $baseUrl . ltrim($contact['profilePicturePath'], '/');
    }
    
    respond(true, 'recent contacts retrieved', ['recentContacts' => $recentContacts]);


?>