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

    $stmt = $connection->prepare("
        SELECT 
            p.id,
            u.user_name, 
            u.profile_picture_path, 
            p.id as post_id,
            p.text_content, 
            p.image_url, 
            p.creation_date, 
            COUNT(l.user_id) AS likes_count,
            GROUP_CONCAT(l.user_id) AS liked_by_users
        FROM 
            post p
        JOIN 
            useraccount u ON p.posted_by = u.user_id
        LEFT JOIN 
            liked l ON p.id = l.post_id
        GROUP BY 
            p.id, u.user_name, u.profile_picture_path, p.text_content, p.image_url, p.creation_date;
    ");
    $stmt->execute();
    
    // Fetch results as associative array
    $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);

    
    
    // Check if any posts were found
    if (empty($posts)) {
        echo json_encode(["message" => "No posts found"]);
    } else {
        $baseUrl = "http://localhost/sawarni/";
    
        // Transform each post's image_url
        $transformedPosts = array_map(function($post) use ($baseUrl) {
            $post['image_url'] = $baseUrl . ltrim($post['image_url'], '/');
            $post['profile_picture_path'] = $baseUrl . ltrim($post['profile_picture_path'], '/');
            return $post;
        }, $posts);

        foreach ($transformedPosts as &$post) {
            if (isset($post['liked_by_users'])) {
                if ($post['liked_by_users'] === null || $post['liked_by_users'] === "") {
                    $post['liked_by_users'] = []; // Convert null/empty to empty array
                } elseif (is_string($post['liked_by_users'])) {
                    $post['liked_by_users'] = array_filter(
                        explode(',', $post['liked_by_users']),
                        function($val) { return $val !== ""; }
                    );
                }
                // If it's already an array, leave it as-is
            } else {
                $post['liked_by_users'] = []; // Default to empty array if key doesn't exist
            }
        }
        echo json_encode($transformedPosts);
    }







?>