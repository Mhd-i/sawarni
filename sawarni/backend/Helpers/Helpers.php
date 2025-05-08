<?php

    use Firebase\JWT\JWT;
    use Firebase\JWT\Key;

    function verifyFieldsExist(array $obj, string ...$fields) : void {
        $missingFields = [];

        foreach($fields as $field) {
            if (!isset($obj[$field])) {
                $missingFields[] = $field;
            }
        }

        if (!empty($missingFields)) {
            respond(false, 'missing some or all : ' . implode(', ', $missingFields));
        }
    }
    
    function respond(bool $ok, string $message, $body = null, bool $exit = true) {
        echo(json_encode(['ok' => $ok, 'message' => $message, 'body' => $body]));  
        if ($exit) {
            exit;
        }
    } 

    function query(PDO $connection, string $statement, array $params, array $paramTypes = []) {
        try {
            $stmt = $connection->prepare($statement);
            

            foreach($params as $key => $value) {
                $type = $paramTypes[$key] ?? PDO::PARAM_STR;

                if ($value === null) {
                    $type = PDO::PARAM_NULL;
                }
                $stmt->bindValue($key, $value, $type);
            }
            
            $stmt->execute();

            return $stmt->fetchAll(PDO::FETCH_ASSOC);
            
        } catch (PDOException $e) {
            respond(false, "Database error: " . $e->getMessage());
        }
    }

    function queryOne(PDO $connection, string $statement, array $params, array $paramTypes = []) {
        try {
            $stmt = $connection->prepare($statement);
            

            foreach($params as $key => $value) {
                $type = $paramTypes[$key] ?? PDO::PARAM_STR;

                if ($value === null) {
                    $type = PDO::PARAM_NULL;
                }
                $stmt->bindValue($key, $value, $type);
            }
            
            $stmt->execute();

            return $stmt->fetch(PDO::FETCH_ASSOC);
            
        } catch (PDOException $e) {
            respond(false, "Database error: " . $e->getMessage());
        }
    }

    function upload(PDO $connection, $files, $uploadDirectory) {
        $uploads = [];

        foreach ($files as $file) {

            $fileName = basename($file['name']);
            $filePath = $uploadDirectory . $fileName;
            $fileExtention = (string)pathinfo($filePath, PATHINFO_EXTENSION);

            if (!move_uploaded_file($file['tmp_name'], $filePath)) {
                respond(false, 'failed to move file');
            } 

            $inDBPath = 'uploads/' . $fileName;
    
            $newUpload = query($connection,
                                '
                                    INSERT INTO upload (file_path, file_type) 
                                    VALUES(:filePath, :fileExtention);
                                ',
                                [
                                    ':filePath' => $inDBPath,
                                    ':fileExtention' => $fileExtention
                                ]
                                );
    
            $uploadId = $connection->lastInsertId();
            $uploads[] = ['uploadId' => $uploadId, 'filePath' => $filePath, 'fileExtention' => $fileExtention];
        }
        return $uploads;
    }

    function authorize() {
        $headers = getallheaders();

        verifyFieldsExist($headers, 'Authorization');
        
        $SECRET_KEY = 'bugarnin';

        $authHeader = $headers['Authorization'];
        $token = str_replace('Bearer ', '', $authHeader);

        try {
            $decoded = JWT::decode($token, new Key($SECRET_KEY, 'HS256'));
            return $decoded->data;
        } catch (Exception $e) {
            respond(false, 'Invalid token');
        }
    }

    function verifyToken(string $token) {
        $SECRET_KEY = 'bugarnin';

        try {
            $decoded = JWT::decode($token, new Key($SECRET_KEY, 'HS256'));
            return $decoded->data;
        } catch (Exception $e) {
            return null;
        }
    }

    function toint(array &$obj, string ...$fields) : void {
        if (!$fields) {
            foreach($obj as $key => $value) {
                $obj[$key] = intval($value);
            }
        }
        foreach($fields as $field) {
            $obj[$field] = intval($obj[$field]);
        }
    }

    function tofloat(array &$obj, string ...$fields) : void {
        if (!$fields) {
            foreach($obj as $key => $value) {
                $obj[$key] = floatval($value);
            }
        }
        foreach($fields as $field) {
            $obj[$field] = floatval($obj[$field]);
        }
    }

    function strarray(&$obj) : void {
        if (!empty($obj)) {
            $obj = explode(',', $obj);
        } else {
            $obj = [];
        }
    }

    function tobool(&$obj) : void {
        if ($obj == "1") {
            $obj = true;  
        } else {
            $obj = false;  
        }
    }

    

?>