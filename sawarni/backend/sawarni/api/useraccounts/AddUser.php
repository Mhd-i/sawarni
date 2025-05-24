<?php
    include_once __DIR__ . '/../../CORSHeaders.php';
    include_once __DIR__ . '/../../Connection.php';
    
    require __DIR__ . '/../../vendor/autoload.php';
    require_once __DIR__ . '/../..//Helpers/Helpers.php';

    verifyFieldsExist($_POST, 'username', 'password', 'location', 'aboutMe');
    verifyFieldsExist($_FILES, 'profilePicture');

    $username = $_POST['username'];
    $password = $_POST['password'];
    $location = $_POST['location'];
    $aboutMe = $_POST['aboutMe'];
    $profilePicture = $_FILES['profilePicture'];

    $uploadDirectory = 'uploads/';

    $fileName = basename($_FILES['profilePicture']['name']);
    $filePath = $uploadDirectory . $fileName;

    if (!move_uploaded_file($_FILES['profilePicture']['tmp_name'], '../../' . $filePath)) {
        respond(false, 'failed to move file');
    } 

    $newUser = query($connection,
                        '
                            INSERT INTO useraccount (user_name, password, join_date, profile_picture_path, location, aboutMe)
                            VALUES (:username, :password, CURDATE(), :profile_picture_path, :location, :aboutMe);
                        ',
                        [
                            ':username' => $username,
                            ':password' => $password,
                            ':profile_picture_path' => $filePath,
                            ':location' => $location,
                            ':aboutMe' => $aboutMe
                        ]
    );

    respond(true, 'success adding a new user');

?>