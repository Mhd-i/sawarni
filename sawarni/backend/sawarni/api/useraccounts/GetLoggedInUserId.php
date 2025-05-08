<?php

    include_once __DIR__ . '/../../CORSHeaders.php';
    include_once __DIR__ . '/../../Connection.php';

    require __DIR__ . '/../../vendor/autoload.php';
    include_once __DIR__ . '/../../Helpers/Helpers.php';

    $loggedInUserId = authorize()->id;

    if (!$loggedInUserId) {
        respond(false, "couldn't get logged in user id");
    }
    else {
        respond(true, 'logged in user id retrieved', ['id' => $loggedInUserId]);
    }

?>