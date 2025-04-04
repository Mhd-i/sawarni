<?php
// Database configuration
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'equipment_display');

// Connect to database
try {
    $pdo = new PDO("mysql:host=".DB_HOST.";dbname=".DB_NAME, DB_USER, DB_PASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}

// Get filter and search parameters
$filter = $_GET['filter'] ?? 'all';
$search = $_GET['search'] ?? '';

// Build SQL query
$sql = "SELECT e.* FROM equipment e";
$params = [];

// Apply filters
if ($filter !== 'all') {
    if ($filter === 'new') {
        $sql .= " WHERE e.is_new = 1";
    } else {
        $sql .= " WHERE e.category = :category";
        $params[':category'] = $filter;
    }
}

// Apply search
if (!empty($search)) {
    $sql .= strpos($sql, 'WHERE') === false ? " WHERE " : " AND ";
    $sql .= "(e.name LIKE :search OR EXISTS (
        SELECT 1 FROM specifications s 
        WHERE s.equipment_id = e.id AND s.spec_value LIKE :search
    ))";
    $params[':search'] = "%$search%";
}

// Execute query
$stmt = $pdo->prepare($sql);
$stmt->execute($params);
$equipment = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Get specifications for each equipment
foreach ($equipment as &$item) {
    $stmt = $pdo->prepare("SELECT spec_key, spec_value FROM specifications WHERE equipment_id = ?");
    $stmt->execute([$item['id']]);
    $item['specs'] = $stmt->fetchAll(PDO::FETCH_KEY_PAIR);
}
unset($item); // Break the reference

// Helper function to get icon for spec
function getSpecIcon($specKey) {
    $iconMap = [
        'power' => 'bolt',
        'speed' => 'tachometer-alt',
        'voltage' => 'plug',
        'weight' => 'weight-hanging',
        'pieces' => 'box-open',
        'material' => 'gem',
        'storage' => 'briefcase',
        'warranty' => 'shield-alt',
        'range' => 'ruler-combined',
        'accuracy' => 'bullseye',
        'battery' => 'battery-three-quarters',
        'blade' => 'cut',
        'cutting' => 'cut',
        'height' => 'ruler-vertical',
        'torque' => 'cog',
        'charger' => 'charging-station',
        'size' => 'ruler-horizontal'
    ];
    return $iconMap[$specKey] ?? 'info-circle';
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Premium Equipment Display</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <div class="container">
            <h1>Premium Equipment Collection</h1>
            <p class="subtitle">High-quality tools for professionals and enthusiasts</p>
        </div>
    </header>

    <main class="container">
        <form method="GET" action="" class="controls">
            <div class="search-box">
                <i class="fas fa-search"></i>
                <input type="text" name="search" id="search-input" placeholder="Search equipment..." 
                       value="<?= htmlspecialchars($search) ?>">
            </div>
            <div class="filter-buttons">
                <button type="submit" name="filter" value="all" 
                        class="filter-btn <?= $filter === 'all' ? 'active' : '' ?>">All</button>
                <button type="submit" name="filter" value="power" 
                        class="filter-btn <?= $filter === 'power' ? 'active' : '' ?>">Power Tools</button>
                <button type="submit" name="filter" value="hand" 
                        class="filter-btn <?= $filter === 'hand' ? 'active' : '' ?>">Hand Tools</button>
                <button type="submit" name="filter" value="garden" 
                        class="filter-btn <?= $filter === 'garden' ? 'active' : '' ?>">Garden</button>
                <button type="submit" name="filter" value="new" 
                        class="filter-btn <?= $filter === 'new' ? 'active' : '' ?>">New Arrivals</button>
            </div>
        </form>

        <div class="equipment-grid">
            <?php if (empty($equipment)): ?>
                <div class="no-results">
                    <i class="fas fa-search fa-3x" style="margin-bottom: 1rem;"></i>
                    <h3>No equipment found</h3>
                    <p>Try adjusting your search or filter criteria</p>
                </div>
            <?php else: ?>
                <?php foreach ($equipment as $item): ?>
                    <div class="equipment-card" data-category="<?= htmlspecialchars($item['category']) ?>">
                        <?php if ($item['is_new']): ?>
                            <span class="card-badge">NEW</span>
                        <?php endif; ?>
                        <div class="card-image">
                            <img src="<?= htmlspecialchars($item['image_url']) ?>" alt="<?= htmlspecialchars($item['name']) ?>">
                        </div>
                        <div class="card-content">
                            <h3 class="card-title"><?= htmlspecialchars($item['name']) ?></h3>
                            <div class="card-specs">
                                <?php foreach ($item['specs'] as $key => $value): ?>
                                    <div class="spec-item">
                                        <i class="fas fa-<?= getSpecIcon($key) ?>"></i>
                                        <span><?= htmlspecialchars($key) ?>: <strong><?= htmlspecialchars($value) ?></strong></span>
                                    </div>
                                <?php endforeach; ?>
                            </div>
                            <div class="card-footer">
                                <div class="price">$<?= number_format($item['price'], 2) ?></div>
                                <button class="view-btn">View Details</button>
                            </div>
                        </div>
                    </div>
                <?php endforeach; ?>
            <?php endif; ?>
        </div>
    </main>

    <footer>
        <div class="container">
            <p>&copy; <?= date('Y') ?> Premium Equipment Display. All rights reserved.</p>
        </div>
    </footer>
</body>
</html>