<?php
    header("Content-Type: application/json"); // Ensure JSON response
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");

    // Handle preflight request
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        exit;
    }

    include_once("connection.php");

    $user_id = $_POST['user_id'] ?? '';
    $post_id = $_POST['post_id'] ?? '';

    if (!isset($user_id) || $user_id === '') {
        echo json_encode(['ok' => false, 'message' => 'please provide the user id.', 'body' => null]);
        return;
    }
    if (!isset($post_id) || $post_id === '') {
        echo json_encode(['ok' => false, 'message' => 'please provide the post id.', 'body' => null]);
        return;
    }

    $stmt = $connection->prepare("
        SELECT posted_by
        FROM post
        WHERE id = :post_id;
    ");
        
    $stmt->execute([
        ':post_id' => $_POST['post_id']
    ]);
        
    $poster = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!($user_id === $poster['posted_by'])) {
        echo json_encode(['ok' => false, 'message' => 'you cannot delete this post.', 'body' => $poster['posted_by']]);
        return;
    }

    $stmt = $connection->prepare("
        DELETE FROM post
        WHERE id = :post_id;
    ");
        
    $stmt->execute([
        ':post_id' => $_POST['post_id']
    ]);
        
    $res = $stmt->fetch(PDO::FETCH_ASSOC);

    echo json_encode(['ok' => true, 'message' => 'success', 'body' => null]);
        
        
?>