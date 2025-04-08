<?php

    function verifyFieldsExist(array $obj, string ...$fields) : array {
        $missingFields = [];

        foreach($fields as $field) {
            if (!isset($obj[$field])) {
                $missingFields[] = $field;
            }
        }

        if (!empty($missingFields)) {
            return (['ok' => false, 'message' => 'missing some or all : ' . implode(', ', $missingFields), 'body' => null]);
        }
        return (['ok' => true, 'message' => 'all fields exist', 'body' => null]);
    }

    use Ratchet\ConnectionInterface;

    class MessageHandler {
        private PDO $db;

        public function __construct(PDO $db) {
            $this->db = $db;
        }


        public function create(ConnectionInterface $from, $data, $clients) {
            $body = $data['body'];

            // verify fields exist
            $res = verifyFieldsExist($body, 'senderid', 'receiverid', 'content');
            if ($res['ok'] === false) {$from->send(json_encode($res)); return;}

            $stmt = $this->db->prepare("INSERT INTO message (senderid, receiverid, content) VALUES (:senderid, :receiverid, :content);");
            $stmt->execute([
                ':senderid' => $body['senderid'],
                ':receiverid' => $body['receiverid'],
                ':content' => $body['content']
            ]);

            $responseBody = ['messageid' => $this->db->lastInsertId(),
                             'senderid' => $body['senderid'],
                             'receiverid' => $body['receiverid'],
                             'content' => $body['content']
                            ];
        
            foreach ($clients as $client) {
                // $client is the ConnectionInterface object
                $client->send(json_encode(['ok' => true, 'message' => 'message create', 'body' => $responseBody]));
            }

        }

        public function getMessagesBetween(ConnectionInterface $from, $data) {
            $body = $data['body'];

            //verify fields exist
            $res = verifyFieldsExist($body, 'userid1', 'userid2');
            if ($res['ok'] === false) {$from->send(json_encode($res)); return;}

            $stmt = $this->db->prepare("
                SELECT * FROM message 
                WHERE (senderid = :userid1 AND receiverid = :userid2)
                OR (senderid = :userid2 AND receiverid = :userid1)
            ");        

            $stmt->execute([
                'userid1' => $body['userid1'],
                'userid2' => $body['userid2']
            ]);

            $messages = $stmt->fetchAll(PDO::FETCH_ASSOC);

            $from->send(json_encode(['ok' => true, 'message' => 'success', 'body' => $messages]));
        }

    }

?>