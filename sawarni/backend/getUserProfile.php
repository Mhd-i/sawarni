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

    $baseUrl = 'http://localhost/sawarni/';

    // check if user_id is provided
    $user_id = $_POST['user_id'];
    if (!isset($user_id)) {
        echo json_encode(['ok' => false, 'message' => 'user_id must be set.', 'body' => null]);
        return;
    }

    // try to get user details with this id
    $stmt = $connection->prepare("
        SELECT  ua.user_name, 
                ua.profile_picture_path,
                ua.join_date, 
                ua.location, 
                ua.aboutMe,
                upl.file_path AS resume_path
        FROM useraccount AS ua
        LEFT JOIN userresume AS ur ON ua.user_id = ur.userId
        LEFT JOIN upload AS upl ON ur.uploadId = upl.upload_id
        WHERE ua.user_id = :user_id
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

    $userDetails['profile_picture_path'] = $baseUrl . $userDetails['profile_picture_path'];
    $userDetails['resume_path'] = $baseUrl . $userDetails['resume_path'];
    echo json_encode(["ok" => true, 'message' => 'success', 'body' => $userDetails]);
?>