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

    $user_id = $_POST["user_id"];

    $newUserProfile = [ "user_id" => $user_id,
                        "user_name" => $_POST["user_name"] ?? null,
                        "location" => $_POST["location"] ?? null,
                        "profile_picture_path" => $_POST["profile_picture_path"] ?? null
                    ];

    $stmt = $connection->prepare("
        SELECT user_name, profile_picture_path, join_date, location 
        FROM useraccount
        WHERE user_id = :user_id;
    ");
        
    $stmt->execute([
        ":user_id" => $user_id
    ]);

    $oldUserProfile = $stmt->fetch(PDO::FETCH_ASSOC);

    $editedUserProfile = override($oldUserProfile, $newUserProfile);

    function override(array $arr, array $with) {
        $res = array_merge($with);
        foreach ($arr as $key => $value) {
            if (!isset($with[$key]) || $with[$key] === null) {
                $res[$key] = $value;
            }
        }
        return $res;
    }


    $stmt = $connection->prepare("
        UPDATE useraccount
        SET user_name = :user_name,
            location = :location,
            profile_picture_path = :profile_picture_path
        WHERE user_id = :user_id;
    ");

    $stmt->execute([
        ":user_id" => $user_id,
        ":user_name" => $editedUserProfile["user_name"],
        ":location" => $editedUserProfile["location"],
        ":profile_picture_path" => $editedUserProfile["profile_picture_path"]
    ]);

    echo json_encode(["ok" => true, "message" => "success", "body" => $editedUserProfile]);
 
?>