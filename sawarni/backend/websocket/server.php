<?php
    require 'vendor/autoload.php';
    require 'router.php';
    require 'handlers/MessageHandler.php';

    use Ratchet\MessageComponentInterface;
    use Ratchet\ConnectionInterface;
    use Ratchet\Server\IoServer;
    use Ratchet\Http\HttpServer;
    use Ratchet\WebSocket\WsServer;


class MessageWebSocket implements MessageComponentInterface {
    protected $clients;
    private $db;
    private $router;

    public function __construct() {
        $this->clients = new \SplObjectStorage;
        $this->connectToDatabase();
        $this->initRouter();
    }

    private function connectToDatabase() {
        $this->db = new PDO('mysql:host=localhost;dbname=sawarnidb2', 'root', '');
        $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    private function initRouter() {
        $this->router = new Router();
        $this->router->registerHandler('message', new MessageHandler($this->db));
    }

    public function onOpen(ConnectionInterface $conn) {
        $this->clients->attach($conn);
        echo "New connection! ({$conn->resourceId})\n";
    }

    public function onMessage(ConnectionInterface $from, $msg) {
        $data = json_decode($msg, true);

        $this->router->route($from, $data, $this->clients);

        echo "Message recieved from ({$from->resourceId})\n";
        
    }

    public function onClose(ConnectionInterface $conn) {
        $this->clients->detach($conn);
        echo "Connection {$conn->resourceId} has disconnected\n";
    }

    public function onError(ConnectionInterface $conn, \Exception $e) {
        echo "An error has occurred: {$e->getMessage()}\n";
        $conn->close();
    }

}

// Run the server
$server = IoServer::factory(
    new HttpServer(
        new WsServer(
            new MessageWebSocket()
        )
    ),
    8081
);

echo "WebSocket server started on port 8081\n";
$server->run();