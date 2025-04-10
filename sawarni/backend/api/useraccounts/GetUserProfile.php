<?php
    include_once __DIR__ . '/../../CORSHeaders.php';
    include_once __DIR__ . '/../../Connection.php';

    require __DIR__ . '/../../vendor/autoload.php';
    include_once __DIR__ . '/../../Helpers/Helpers.php';

    $baseUrl = 'http://localhost/sawarni/';

    $loggedInUserId = authorize()->id;

    $userId = $_POST['userId'] ?? $loggedInUserId;

    $userProfile = query($connection,
                        '
                            SELECT  ua.user_name, 
                                    ua.profile_picture_path,
                                    ua.join_date, 
                                    ua.location, 
                                    ua.aboutMe,
                                    upl.file_path AS resume_path
                            FROM useraccount AS ua
                            LEFT JOIN userresume AS ur ON ua.user_id = ur.userId
                            LEFT JOIN upload AS upl ON ur.uploadId = upl.upload_id
                            WHERE ua.user_id = :userId
                        ',
                        [
                            ':userId' => $userId
                        ]
    )[0];
        
    // check if user with this id
    if (!$userProfile) {
        respond(false, "user doesn't exist");
    } 

    $userProfile['profile_picture_path'] = $baseUrl . ltrim($userProfile['profile_picture_path'], '/');
    $userProfile['resume_path'] = $baseUrl . ltrim($userProfile['resume_path'], '/');

    echo json_encode(["ok" => true, 'message' => 'success', 'body' => $userProfile]);
?>