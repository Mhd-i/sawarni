<?php
      header("Content-Type: application/json");
      header("Access-Control-Allow-Origin: *");
      header("Access-Control-Allow-Methods: POST, OPTIONS");
      header("Access-Control-Allow-Headers: Content-Type, Authorization");

      if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
      exit;
      }
?>
