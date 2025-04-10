<?php

    include_once 'CORSHeaders.php';
    include_once 'Connection.php';

    require 'vendor/autoload.php';
    require_once __DIR__ . '/Helpers/Helpers.php';

    use Firebase\JWT\JWT;
    use Firebase\JWT\Key;


    const SECRET_KEY = "bugarnin";

    verifyFieldsExist($_POST, 'username', 'password');

    $username = $_POST['username'];
    $password = $_POST['password'];

    $user = queryOne($connection, "
                    SELECT user_id, user_name, password
                    FROM useraccount
                    WHERE user_name = :username
                    LIMIT 1;
                    ",
                    [':username' => $username]);
    
    if (!$user) {
        respond(false, 'user not found');
    }

    if ($password !== $user['password']) {
        respond(false, 'incorrect password');
    }

    $body = [
        "iss" => "localhost",
        "aud" => "localhost",
        "iat" => time(),
        "exp" => time() + (60 * 60),
        "data" => [
            "id" => $user['user_id'],
            "username" => $user['user_name']
        ]
    ];

    $jwt = JWT::encode($body, SECRET_KEY, 'HS256');
    respond(true, 'login successful', ['token' => $jwt]);

?>