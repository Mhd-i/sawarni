<?php
      header("Content-Type: application/json"); // Ensure JSON response
      header("Access-Control-Allow-Origin: *");
      header("Access-Control-Allow-Methods: POST, OPTIONS");
      header("Access-Control-Allow-Headers: Content-Type, Authorization");

      // Handle preflight request
      if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
      exit;
      }
?>
