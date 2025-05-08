<?php
    require("connexion.php");
    header("Content-type: application/json");

    $resultat = ["message" => "", "data" => null];

    // Récupère le body: string
    $body = file_get_contents("php://input");

    // Convertir json en tableau associatif
    $donnees = json_decode($body, true);

    // Step 1 : Créer la requête
    $reqsql = 'INSERT INTO product (title, price, date) VALUES (:t, :p, :d)';
        
    // Step 2 : Préparer la requête
    $rp = $connexion->prepare($reqsql);
        
    // Step 3 : Liaison des données
    $rp->bindParam(":t", $donnees['title']);
    $rp->bindParam(":p", $donnees['price']);
    $rp->bindParam(":q", $donnees['qte']);

    // Step 4
    $resultat["message"] = $rp->execute();
    echo json_encode($resultat);
?>