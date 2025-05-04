<?php

    include_once __DIR__ . '/../../CORSHeaders.php';
    include_once __DIR__ . '/../../Connection.php';

    require __DIR__ . '/../../vendor/autoload.php';
    include_once __DIR__ . '/../../Helpers/Helpers.php';

    $loggedInUserId = authorize()->id;

    $userId = $_POST['userId'] ?? $loggedInUserId;

    $subscriptions = query($connection,
                            '
                                SELECT 
                                    s.course_id as courseId,
                                    c.title as title,
                                    c.creator_id as creatorId
                                FROM subscriptions AS s
                                JOIN courses AS c ON c.id = s.course_id
                                WHERE 
                                        s.user_id = :userId
                            ',
                            [
                                ':userId' => $userId
                            ]
                            );
    respond(true, 'success retrieving user subscriptions.', ['subscriptions' => $subscriptions]);
