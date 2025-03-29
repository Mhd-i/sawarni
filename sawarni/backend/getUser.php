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


    $in_user_name = $_POST['in_user_name'] ?? null;
    $in_password = $_POST['in_password'] ?? null;

    if (!isset($_POST['in_user_name']) || !isset($_POST['in_password'])) {
        echo json_encode(["ok" => false, "message" => "user's name and password must be set."]);
    }
    else {

        
        $stmt = $connection->prepare("
            SELECT user_id
            FROM useraccount
            WHERE user_name = :in_user_name AND
            password = :in_password;
        ");
        
        $stmt->execute([
            ':in_user_name' => $in_user_name,
            ':in_password' => $in_password
        ]);
        
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$user) {
            echo json_encode(["ok" => False, "message" => "user doesn't exist."]);
        } 
        else {
            $user['ok'] = True;
            $user['message'] = 'success';
            echo json_encode($user);
        }
    }
?>