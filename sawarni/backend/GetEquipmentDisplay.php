<?php
header("Content-Type: application/json"); // Ensure JSON response
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

// Database connection
include_once("connection.php");

// Get filter and search parameters from request
$filter = $_GET['filter'] ?? 'all';
$search = $_GET['search'] ?? '';

// Build SQL query
$sql = "
    SELECT 
        e.id,
        e.name,
        e.category,
        e.price,
        e.image_url,
        e.is_new,
        e.created_at,
        GROUP_CONCAT(CONCAT(s.spec_key, ':', s.spec_value) SEPARATOR '|') AS specifications
    FROM 
        equipment e
    LEFT JOIN 
        specifications s ON e.id = s.equipment_id
";

$params = [];
$whereClauses = [];

// Apply filters
if ($filter !== 'all') {
    if ($filter === 'new') {
        $whereClauses[] = "e.is_new = 1";
    } else {
        $whereClauses[] = "e.category = :category";
        $params[':category'] = $filter;
    }
}

// Apply search
if (!empty($search)) {
    $whereClauses[] = "(e.name LIKE :search OR EXISTS (
        SELECT 1 FROM specifications s 
        WHERE s.equipment_id = e.id AND s.spec_value LIKE :search
    ))";
    $params[':search'] = "%$search%";
}

// Add WHERE clause if needed
if (!empty($whereClauses)) {
    $sql .= " WHERE " . implode(" AND ", $whereClauses);
}

// Complete the query with GROUP BY
$sql .= " GROUP BY e.id, e.name, e.category, e.price, e.image_url, e.is_new, e.created_at";

// Prepare and execute query
$stmt = $connection->prepare($sql);
$stmt->execute($params);

// Fetch results as associative array
$equipment = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Check if any equipment was found
if (empty($equipment)) {
    echo json_encode(['ok' => false, 'message' => 'No equipment found', 'body' => null]);
    exit;
}

$baseUrl = "http://localhost/sawarni/";

// Transform each equipment's data
$transformedEquipment = array_map(function($item) use ($baseUrl) {
    // Process specifications
    $specsArray = [];
    if (!empty($item['specifications'])) {
        $specPairs = explode('|', $item['specifications']);
        foreach ($specPairs as $pair) {
            if (strpos($pair, ':') !== false) {
                list($key, $value) = explode(':', $pair, 2);
                $specsArray[$key] = $value;
            }
        }
    }
    
    // Format the response
    return [
        'id' => $item['id'],
        'name' => $item['name'],
        'category' => $item['category'],
        'price' => (float)$item['price'],
        'image_url' => $baseUrl . ltrim($item['image_url'], '/'),
        'is_new' => (bool)$item['is_new'],
        'created_at' => $item['created_at'],
        'specs' => $specsArray
    ];
}, $equipment);

echo json_encode([
    'ok' => true,
    'message' => 'success',
    'body' => $transformedEquipment,
    'meta' => [
        'count' => count($transformedEquipment),
        'filters' => [
            'applied' => $filter,
            'search' => $search
        ]
    ]
]);
?>