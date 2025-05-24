<?php

    use Ratchet\ConnectionInterface;

    class Router {
        public $handlers;

        public function __construct() {
            $this->handlers = [];
        }

        public function registerHandler(string $name, object $handler) {
            $this->handlers[$name] = $handler;
        }

        public function route(ConnectionInterface $from, $data, $clients) {

            // make sure that the message is in the correct format ( has a type and a action )
            if (!isset($data['type'], $data['action'])) {
                $from->send(json_encode(['ok' => false, 'message' => 'invalid message format', 'body' => null]));
                return;
            }

            // Check if the handler exists for the given type
            if (!isset($this->handlers[$data['type']])) {
                $from->send(json_encode([
                    'ok' => false,
                    'message' => 'no handler registered for type: ' . $data['type'],
                    'body' => null
                ]));
                return;
            }

            $handler = $this->handlers[$data['type']];

            // Check if the method (action) exists on the handler
            if (!method_exists($handler, $data['action'])) {
                $from->send(json_encode([
                    'ok' => false,
                    'message' => 'invalid action: ' . $data['action'],
                    'body' => null
                ]));
                return;
            }

            // Call the action
            $handler->{$data['action']}($from, $data, $clients);
        }
    }

?>