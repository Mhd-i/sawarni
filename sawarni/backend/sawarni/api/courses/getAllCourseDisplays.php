<?php

    include_once __DIR__ . '/../../CORSHeaders.php';
    include_once __DIR__ . '/../../Connection.php';

    require __DIR__ . '/../../vendor/autoload.php';
    include_once __DIR__ . '/../../Helpers/Helpers.php';

    $loggedInUserId = authorize()->id;

    $baseUrl = "http://localhost/sawarni/";

    $courses = query($connection,
                    '
                        SELECT 
                            c.id as id,
                            c.title as title,
                            c.description as description,
                            up.file_path as thumbnailPath,
                            c.price as price,
                            c.creator_id as creatorId,
                            u.user_name as creatorUsername,
                            COUNT(s.user_id) AS subscriberCount,
                            GROUP_CONCAT(s.user_id) AS subscribers,
                            IF(FIND_IN_SET(:loggedInUserId, GROUP_CONCAT(s.user_id)) > 0, 1, 0) AS subscribedByThisUser
                        FROM 
                            courses c
                        JOIN 
                            useraccount u ON c.creator_id = u.user_id
                        JOIN
                            upload up ON up.upload_id = c.thumbnail_upload_id
                        LEFT JOIN 
                            subscriptions s ON c.id = s.course_id
                        GROUP BY 
                            c.id
                    ',
                    [
                        ':loggedInUserId' => $loggedInUserId  
                    ]
                    );
    
    if (empty($courses)) {
        respond(false, 'no courses found');
    }

    foreach($courses as &$course) {
        $course['thumbnailPath'] = $baseUrl . ltrim($course['thumbnailPath'], '/');
        $course['subscribers'] = (array)$course['subscribers'];
        toint($course['subscribers']);
        toint($course, 'id', 'subscriberCount', 'creatorId');
        tobool($course['subscribedByThisUser']);
        tofloat($course, 'price');
    }

    respond(true, 'courses retrieved', $courses);
?>