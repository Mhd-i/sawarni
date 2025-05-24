<?php
    include_once __DIR__ . '/../../CORSHeaders.php';
    include_once __DIR__ . '/../../Connection.php';

    require __DIR__ . '/../../vendor/autoload.php';
    include_once __DIR__ . '/../../Helpers/Helpers.php';

    $baseUrl = 'http://localhost/sawarni/';

    $loggedInUserId = authorize()->id;

    verifyFieldsExist($_POST, 'userId');

    $userId = $_POST['userId'];

    $userProfilePicture = query($connection,
                        '
                            SELECT profile_picture_path
                            FROM useraccount
                            WHERE user_id = :userId;
                        ',
                        [
                            ':userId' => $userId
                        ]
    )[0];
        
    if (!$userProfilePicture) {
        respond(false, "user doesn't exist");
    } 

    $userProfilePicture['profile_picture_path'] = $baseUrl . ltrim($userProfilePicture['profile_picture_path'], '/');

    respond(true, 'profile picture path retrieved.', ['profilePicturePath' => $userProfilePicture['profile_picture_path']]);
?>