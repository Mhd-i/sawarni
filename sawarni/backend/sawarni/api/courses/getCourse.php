<?php

    include_once __DIR__ . '/../../CORSHeaders.php';
    include_once __DIR__ . '/../../Connection.php';

    require __DIR__ . '/../../vendor/autoload.php';
    include_once __DIR__ . '/../../Helpers/Helpers.php';

    $loggedInUserId = authorize()->id;

    verifyFieldsExist($_POST, 'courseId');

    $courseId = $_POST['courseId'];

    $baseUrl = "http://localhost/sawarni/";

    $course = queryOne($connection,
                    '
                        SELECT
                            c.id,
                            c.title,
                            c.description
                        FROM courses AS c
                        WHERE c.id = :courseId;
                    ',
                    [
                        ':courseId' => $courseId
                    ]
                    );

    $attachments = query($connection,
                        '
                            SELECT  u.file_path as filePath, u.file_type as fileType
                            FROM upload AS u, courses AS c, courseattachment as ca
                            WHERE u.upload_id = ca.upload_id AND
                                c.id = ca.course_id AND
                                c.id = :courseId;
                        ',
                        [
                            ':courseId' => $courseId
                        ]
                        );
        
    foreach($attachments as &$attachment) {
        $attachment['filePath'] = $baseUrl . ltrim($attachment['filePath'], '/');
    }

    $course['attachments'] = $attachments;

    respond(true, 'success retrieving course.', ['course' => $course]);


?>