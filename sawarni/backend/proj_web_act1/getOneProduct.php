<?php

    require_once("connexion.php");

    // 1
    $response = [
        "message" => null,
        "data" => null
    ];
    // 2
    if (isset($_GET['id'])) {

        $id = $_GET['id'];

        $id = filter_var($id, FILTER_VALIDATE_INT);
        if ($id === false) {
            $response["message"] = "l id entier valide.";
            echo json_encode($response);
            exit;
        }
    }
     
    else {
        $response["message"] = "L'ID du produit est requis.";
    }

    $reqsql = "SELECT * FROM product WHERE id = :id";
    $rp = $connexion->prepare($reqsql);

    $rp->bindParam(":id", $id);
    
    $rp->execute();

    $res = $rp->fetch(PDO::FETCH_ASSOC);

    if ($res) {
        $response["data"] = $res;
    } 
    else {
        $response["message"] = "Produit non trouvé.";
        echo json_encode($response);
        exit;
    }

    echo json_encode($response);
   
?>