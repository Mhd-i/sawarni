<?php
    include_once __DIR__ . '/../../CORSHeaders.php';
    include_once __DIR__ . '/../../Connection.php';

    require __DIR__ . '/../../vendor/autoload.php';
    include_once __DIR__ . '/../../Helpers/Helpers.php';

    $keyword = $_POST['keyword'] ?? '';
    $suggestionLimit = $_POST['suggestionLimit'] ?? 5;

    $searchTerm = $keyword . '%';

    $suggestions = query($connection,
                        '
                             SELECT user_id, user_name
                            FROM useraccount
                            WHERE user_name LIKE :searchTerm
                            LIMIT :suggestionLimit;
                        ',
                        [
                            ':searchTerm' => $searchTerm,
                            ':suggestionLimit' => $suggestionLimit
                        ],
                        [
                            ':suggestionLimit' => PDO::PARAM_INT
                        ]
                    );

    if (!$suggestions) {
        respond(false, 'no suggestion');
    } 

    respond(true, 'suggestions retrieved', $suggestions)
    
    
?>