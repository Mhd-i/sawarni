<?php

    require_once("connexion.php");

    $response = [
        "message" => null,
        "data" => null
    ];

    $reqsql = "SELECT * FROM product";
    $rp = $connexion->prepare($reqsql);

    $rp->execute();

    $res = $rp->fetchAll(PDO::FETCH_ASSOC);

    if ($res) {
        $response["data"] = $res;
    } 
    else {
        $response["message"] = "erreur.";
        echo json_encode($response);
        exit;
    }

    echo json_encode($response);

?>