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

    $stmt = $connection->prepare("
        INSERT INTO liked VALUES(:user_id, :post_id, NOW());
    ");
        
    $stmt->execute([
        ':user_id' => $_POST['user_id'],
        ':post_id' => $_POST['post_id']
    ]);
        
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        
?>