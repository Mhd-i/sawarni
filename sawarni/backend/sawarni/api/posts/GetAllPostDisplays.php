<?php

    include_once __DIR__ . '/../../CORSHeaders.php';
    include_once __DIR__ . '/../../Connection.php';

    require __DIR__ . '/../../vendor/autoload.php';
    include_once __DIR__ . '/../../Helpers/Helpers.php';

    $loggedInUserId = authorize()->id;

    $baseUrl = "http://localhost/sawarni/";

    $posts = query($connection,
                    '
                        SELECT 
                            p.id as id,
                            u.user_name as username, 
                            u.profile_picture_path AS profilePicturePath, 
                            p.text_content AS textContent, 
                            p.creation_date AS creationDate, 
                            COUNT(l.user_id) AS likeCount,
                            GROUP_CONCAT(l.user_id) AS likedByUsers,
                            IF(FIND_IN_SET(:loggedInUserId, GROUP_CONCAT(l.user_id)) > 0, 1, 0) AS likedByThisUser
                        FROM 
                            post p
                        JOIN 
                            useraccount u ON p.posted_by = u.user_id
                        LEFT JOIN 
                            liked l ON p.id = l.post_id
                        GROUP BY 
                            p.id, u.user_name, u.profile_picture_path, p.text_content, p.image_url, p.creation_date;
                    ',
                    [
                        ':loggedInUserId' => $loggedInUserId  
                    ]
                    );
    
    if (empty($posts)) {
        respond(false, 'no posts found');
    }

    foreach($posts as &$post) {
        $post['profilePicturePath'] = $baseUrl . ltrim($post['profilePicturePath'], '/');
        $post['likedByUsers'] = (array)$post['likedByUsers'];
        toint($post['likedByUsers']);
        toint($post, 'id', 'likeCount');
        tobool($post['likedByThisUser']);

        $attachments = query($connection,
                        '
                            SELECT  u.file_path as filePath, u.file_type as fileType
                            FROM upload AS u, post AS p, postattachment as pa
                            WHERE u.upload_id = pa.upload_id AND
                                p.id = pa.post_id AND
                                p.id = :postId;
                        ',
                        [
                            ':postId' => $post['id']
                        ]
                        );
        
        foreach($attachments as &$attachment) {
            $attachment['filePath'] = $baseUrl . ltrim($attachment['filePath'], '/');
        }

        $post['attachments'] = $attachments;
    
    }

    respond(true, 'posts retrieved', $posts);

?>