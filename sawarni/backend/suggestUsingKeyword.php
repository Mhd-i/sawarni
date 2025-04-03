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


    $keyword = $_POST['keyword'] ?? '';
    $suggestion_limit = $_POST['suggestion_limit'] ?? 5;

    $search_term = $keyword . '%';

    $stmt = $connection->prepare("
        SELECT user_id, user_name
        FROM useraccount
        WHERE user_name LIKE :search_term
        LIMIT :suggestion_limit;
    ");
    
    $stmt->bindParam(':search_term', $search_term, PDO::PARAM_STR);
    $stmt->bindParam(':suggestion_limit', $suggestion_limit, PDO::PARAM_INT);

    $stmt->execute();
    
    $suggestion = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    if (!$suggestion) {
        echo json_encode(["ok" => False, "message" => "no suggestion", "body" => null]);
    } 
    else {
        echo json_encode(["ok" => true, "message" => "success", "body" => $suggestion]);
    }
    
?>