<?php

    /*
    function selectOne(PDO $connection, string $fields, string $table, array $conditions = []) {
        // Build the base query
        $query = "SELECT $fields FROM $table";
        
        // Add WHERE clause if conditions exist
        $whereClauses = [];
        $params = [];
        
        foreach ($conditions as $column => $value) {
            $whereClauses[] = "$column = :$column";
            $params[":$column"] = $value;
        }
        
        if (!empty($whereClauses)) {
            $query .= " WHERE " . implode(' AND ', $whereClauses);
        }

        $query .= ' LIMIT 1;';

        
        try {
            // Prepare the statement
            $stmt = $connection->prepare($query);
            
            // Execute with parameters
            $stmt->execute($params);
            
            
            // Fetch all results
            return $stmt->fetch(PDO::FETCH_ASSOC);
            
        } catch (PDOException $e) {
            // Handle errors appropriately (in production, you might want to log this)
            error_log("Database error: " . $e->getMessage());
            return false;
        }


    }
    
    function selectMany(PDO $connection, string $fields, string $table, array $conditions = []) {
        // Build the base query
        $query = "SELECT $fields FROM $table";
        
        // Add WHERE clause if conditions exist
        $whereClauses = [];
        $params = [];
        
        foreach ($conditions as $column => $value) {
            $whereClauses[] = "$column = :$column";
            $params[":$column"] = $value;
        }
        
        if (!empty($whereClauses)) {
            $query .= " WHERE " . implode(' AND ', $whereClauses);
        }

        
        try {
            // Prepare the statement
            $stmt = $connection->prepare($query);
            
            // Execute with parameters
            $stmt->execute($params);
            
            
            // Fetch all results
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
            
        } catch (PDOException $e) {
            // Handle errors appropriately (in production, you might want to log this)
            error_log("Database error: " . $e->getMessage());
            return false;
        }


    }
    */

    function query(PDO $connection, string $statement, array $params) {
        try {
            // Prepare the statement
            $stmt = $connection->prepare($statement);
            
            // Execute with parameters
            $stmt->execute($params);
            
            // Fetch One result
            return $stmt->fetch(PDO::FETCH_ASSOC);
            
        } catch (PDOException $e) {
            error_log("Database error: " . $e->getMessage());
            return false;
        }
    }



?>