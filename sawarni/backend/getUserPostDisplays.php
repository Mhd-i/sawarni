<?php
    header("Content-Type: application/json"); // Ensure JSON response
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");

    // Handle preflight request
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        exit;
    }

    // Database connection and file upload logic here
    include_once("connection.php");

    $user_id = $_POST['user_id'];

    $baseUrl = "http://localhost/sawarni/";

    $stmt = $connection->prepare("
        SELECT 
            p.id,
            u.user_name, 
            u.profile_picture_path, 
            p.id as post_id,
            p.text_content, 
            p.creation_date, 
            COUNT(l.user_id) AS likes_count,
            GROUP_CONCAT(l.user_id) AS liked_by_users
        FROM 
            post p
        JOIN 
            useraccount u ON p.posted_by = u.user_id
        LEFT JOIN 
            liked l ON p.id = l.post_id
        WHERE u.user_id = :user_id
        GROUP BY 
            p.id, u.user_name, u.profile_picture_path, p.text_content, p.image_url, p.creation_date;

    ");

    $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);

    $stmt->execute();
    
    // Fetch results as associative array
    $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Check if any posts were found
    if (empty($posts)) {
        echo json_encode(['ok' => false, 'message' => 'No posts found', 'body' => null]);
        return;
    }

    foreach($posts as &$post) {

        $post['profile_picture_path'] = $baseUrl . ltrim($post['profile_picture_path'], '/');

        $post_id = $post['id'];

        $stmt = $connection->prepare('
            SELECT  u.file_path,
                    u.file_type
            FROM upload AS u, post AS p, postattachment as pa
            WHERE u.upload_id = pa.upload_id AND
                p.id = pa.post_id AND
                p.id = :post_id;
        ');

        $stmt->execute([
            ':post_id' => $post_id
        ]);

        $attachments = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Transform each post's image_url
        $transformedAttachments = array_map(function($attachment) use ($baseUrl) {
            $attachment['file_path'] = $baseUrl . ltrim($attachment['file_path'], '/');
            return $attachment;
        }, $attachments);

        $post['attachments'] = $transformedAttachments;
    
    }

    

    echo json_encode(['ok' => true, 'message' => 'success', 'body' => $posts]);







?>