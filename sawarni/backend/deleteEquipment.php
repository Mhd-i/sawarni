<?php
header("Content-Type: application/json"); // Ensure JSON response
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

include_once("connection.php");

$user_id = $_POST['user_id'] ?? '';
$equipment_id = $_POST['equipment_id'] ?? '';

// Validate input
if (empty($user_id)) {
    echo json_encode(['ok' => false, 'message' => 'Please provide the user id.', 'body' => null]);
    exit;
}
if (empty($equipment_id)) {
    echo json_encode(['ok' => false, 'message' => 'Please provide the equipment id.', 'body' => null]);
    exit;
}

try {
    // Begin transaction
    $connection->beginTransaction();

    // 1. First check if the equipment exists and get the owner
    $stmt = $connection->prepare("
        SELECT added_by 
        FROM equipment 
        WHERE id = :equipment_id
    ");
    $stmt->execute([':equipment_id' => $equipment_id]);
    $equipment = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$equipment) {
        echo json_encode(['ok' => false, 'message' => 'Equipment not found.', 'body' => null]);
        exit;
    }

    // 2. Verify ownership (or admin rights could be added here)
    if ($user_id !== $equipment['added_by']) {
        echo json_encode([
            'ok' => false, 
            'message' => 'You are not authorized to delete this equipment.', 
            'body' => ['required_owner' => $equipment['added_by']]
        ]);
        exit;
    }

    // 3. First delete specifications (due to foreign key constraint)
    $stmt = $connection->prepare("
        DELETE FROM specifications 
        WHERE equipment_id = :equipment_id
    ");
    $stmt->execute([':equipment_id' => $equipment_id]);

    // 4. Then delete the equipment
    $stmt = $connection->prepare("
        DELETE FROM equipment 
        WHERE id = :equipment_id
    ");
    $stmt->execute([':equipment_id' => $equipment_id]);

    // Commit transaction
    $connection->commit();

    echo json_encode([
        'ok' => true, 
        'message' => 'Equipment deleted successfully.', 
        'body' => [
            'deleted_equipment_id' => $equipment_id,
            'deleted_specifications' => $stmt->rowCount()
        ]
    ]);

} catch (PDOException $e) {
    // Rollback transaction on error
    $connection->rollBack();
    echo json_encode([
        'ok' => false, 
        'message' => 'Database error: ' . $e->getMessage(),
        'body' => null
    ]);
}
?>