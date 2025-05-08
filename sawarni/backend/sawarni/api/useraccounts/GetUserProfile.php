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
                            SELECT  ua.user_name as username, 
                                    ua.user_id as userId,
                                    ua.profile_picture_path as profilePicturePath,
                                    ua.join_date as joinDate, 
                                    ua.location as location, 
                                    ua.aboutMe as aboutMe,
                                    upl.file_path as resumePath
                            FROM useraccount AS ua
                            LEFT JOIN userresume AS ur ON ua.user_id = ur.userId
                            LEFT JOIN upload AS upl ON ur.uploadId = upl.upload_id
                            WHERE ua.user_id = :userId
                        ',
                        [
                            ':userId' => $userId
                        ]
    )[0];
        
    if (!$userProfile) {
        respond(false, "user doesn't exist");
    } 

    $userProfile['profilePicturePath'] = $baseUrl . ltrim($userProfile['profilePicturePath'], '/');
    $userProfile['resumePath'] = $baseUrl . ltrim($userProfile['resumePath'], '/');

    echo json_encode(["ok" => true, 'message' => 'success', 'body' => $userProfile]);
?>