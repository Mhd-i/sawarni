<?php

    switch ($_SERVER["REQUEST_METHOD"])
    {
        case 'GET' :
            if (isset($_GET['id']) && $_GET['id'] != null)
                require_once("getOneProduct.php");
            else
                require_once("getAllProducts.php");
            break;
        
        case 'POST' :
            require_once("addProduct.php");
    }

?>