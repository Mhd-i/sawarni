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

    // check if user_id is provided
    $user_id = $_POST['user_id'];
    if (!isset($user_id)) {
        echo json_encode(['ok' => false, 'message' => 'user_id must be set.', 'body' => null]);
        return;
    }

    // try to get user details with this id
    $stmt = $connection->prepare("
        SELECT user_name, profile_picture_path, join_date, location 
        FROM useraccount
        WHERE user_id = :user_id;
    ");
        
    $stmt->execute([
        ':user_id' => $user_id
    ]);
        
    $userDetails = $stmt->fetch(PDO::FETCH_ASSOC);
        
    // check if user with this id
    if (!$userDetails) {
        echo json_encode(["ok" => False, "message" => "user doesn't exist.", 'body' => null]);
        return;
    } 
    $userDetails['profile_picture_path'] = 'http://localhost/sawarni/' . $userDetails['profile_picture_path'];
    echo json_encode(["ok" => true, 'message' => 'success', 'body' => $userDetails]);
?>