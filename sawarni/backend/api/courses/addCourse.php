<?php

    include_once __DIR__ . '/../../CORSHeaders.php';
    include_once __DIR__ . '/../../Connection.php';

    require __DIR__ . '/../../vendor/autoload.php';
    require_once __DIR__ . '/../..//Helpers/Helpers.php';

    $loggedInUserId = authorize()->id;

    verifyFieldsExist($_POST, 'title', 'description', 'price');

    $title = $_POST['title'];
    $description = $_POST['description'];
    $price = $_POST['price'];

    $thumbnail = $_FILES['thumbnail'];

    $thumbnailUploadId = upload($connection, [$thumbnail], '../../uploads/')[0]['uploadId'];

    $newCourse = query($connection,
        '
            INSERT INTO courses(title, description, thumbnail_upload_id, price, creator_id)
            VALUES (:title, :description, :thumbnailUploadId, :price, :loggedInUserId);
        ',
        [
            ':title' => $title,
            ':description' => $description,
            ':thumbnailUploadId' => $thumbnailUploadId,
            ':price' => $price,
            ':loggedInUserId' => $loggedInUserId
        ]
    );

    $courseId = $connection->lastInsertId();

    unset($_FILES['thumbnail']);

    $uploads = upload($connection, $_FILES, '../../uploads/');

    foreach($uploads as $upload) {
        // Insert data in the Association Table PostAttachment
        query($connection,
            '
                INSERT INTO courseattachment (course_id, upload_id)
                VALUES (:courseId, :uploadId);
            ',
            [
                ':uploadId' => $upload['uploadId'],
                ':courseId' => $courseId
            ]);
    }

    respond(true, 'success');

?>