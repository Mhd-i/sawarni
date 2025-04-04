import { EquipmentDisplay } from "../../../interfaces/EquipmentDisplay";

// Sample equipment data
const equipmentData: EquipmentDisplay[] = [
  {
      id: 1,
      name: "Professional Drill Set",
      category: "power",
      specs: {
          power: "800W",
          speed: "0-3000 RPM",
          voltage: "220V",
          weight: "2.5kg"
      },
      price: "$199.99",
      image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      isNew: true
  },
  {
      id: 2,
      name: "Precision Screwdriver Kit",
      category: "hand",
      specs: {
          pieces: "32",
          material: "Chrome Vanadium",
          storage: "Case included",
          warranty: "Lifetime"
      },
      price: "$49.99",
      image: "https://images.unsplash.com/photo-1594708767771-a750b9af4e13?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      isNew: false
  },
  {
      id: 3,
      name: "Cordless Angle Grinder",
      category: "power",
      specs: {
          power: "18V",
          speed: "8500 RPM",
          battery: "Li-ion 4.0Ah",
          weight: "1.8kg"
      },
      price: "$159.99",
      image: "https://images.unsplash.com/photo-1591291621160-2f4c3d60f587?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      isNew: true
  },
  {
      id: 4,
      name: "Professional Hedge Trimmer",
      category: "garden",
      specs: {
          power: "600W",
          blade: "50cm dual-action",
          weight: "3.2kg",
          warranty: "2 years"
      },
      price: "$129.99",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      isNew: false
  },
  {
      id: 5,
      name: "Digital Laser Level",
      category: "power",
      specs: {
          range: "30m",
          accuracy: "±0.2mm/m",
          battery: "AA x 4",
          warranty: "3 years"
      },
      price: "$89.99",
      image: "https://images.unsplash.com/photo-1560717843-d6cd2b0a86c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      isNew: true
  },
  {
      id: 6,
      name: "Heavy Duty Wrench Set",
      category: "hand",
      specs: {
          pieces: "12",
          material: "Forged Steel",
          size: "8mm-24mm",
          warranty: "Lifetime"
      },
      price: "$79.99",
      image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      isNew: false
  },
  {
      id: 7,
      name: "Electric Lawn Mower",
      category: "garden",
      specs: {
          power: "1500W",
          cutting: "36cm",
          height: "20-75mm adjustable",
          weight: "12kg"
      },
      price: "$249.99",
      image: "https://images.unsplash.com/photo-1596638787647-904d822d751e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      isNew: false
  },
  {
      id: 8,
      name: "Impact Driver Kit",
      category: "power",
      specs: {
          power: "18V",
          torque: "180Nm",
          battery: "Li-ion 5.0Ah",
          charger: "Fast charger included"
      },
      price: "$179.99",
      image: "https://images.unsplash.com/photo-1590071089561-2085c1ddf7a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      isNew: true
  }
];

// DOM elements
const equipmentGrid = document.getElementById('equipment-grid') as HTMLElement;
const searchInput = document.getElementById('search-input') as HTMLInputElement;
const filterButtons = document.querySelectorAll('.filter-btn');

// Display all equipment initially
displayEquipment(equipmentData);

// Filter functionality
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filter = (button as HTMLElement).dataset["filter"] || 'all';
      let filteredEquipment = [...equipmentData];

      // Apply category filter
      if (filter !== 'all') {
          if (filter === 'new') {
              filteredEquipment = filteredEquipment.filter(item => item.isNew);
          } else {
              filteredEquipment = filteredEquipment.filter(item => item.category === filter);
          }
      }

      // Apply search filter if there's a search term
      const searchTerm = searchInput.value.toLowerCase();
      if (searchTerm) {
          filteredEquipment = filteredEquipment.filter(item => 
              item.name.toLowerCase().includes(searchTerm) ||
              Object.values(item.specs).some(val => 
                  val.toString().toLowerCase().includes(searchTerm)
              )
          );
      }

      displayEquipment(filteredEquipment);
  });
});

// Search functionality
searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.toLowerCase();
  const activeFilter = (document.querySelector('.filter-btn.active') as HTMLElement)?.dataset["filter"] || 'all';

  let filteredEquipment = [...equipmentData];

  // Apply active filter first
  if (activeFilter !== 'all') {
      if (activeFilter === 'new') {
          filteredEquipment = filteredEquipment.filter(item => item.isNew);
      } else {
          filteredEquipment = filteredEquipment.filter(item => item.category === activeFilter);
      }
  }

  // Then apply search filter
  if (searchTerm) {
      filteredEquipment = filteredEquipment.filter(item => 
          item.name.toLowerCase().includes(searchTerm) ||
          Object.values(item.specs).some(val => 
              val.toString().toLowerCase().includes(searchTerm)
          )
      );
  }

  displayEquipment(filteredEquipment);
});

// Function to display equipment
function displayEquipment(equipment: EquipmentDisplay[]) {
  if (equipment.length === 0) {
      equipmentGrid.innerHTML = `
          <div class="no-results">
              <i class="fas fa-search fa-3x" style="margin-bottom: 1rem;"></i>
              <h3>No equipment found</h3>
              <p>Try adjusting your search or filter criteria</p>
          </div>
      `;
      return;
  }

  equipmentGrid.innerHTML = equipment.map(item => `
      <div class="equipment-card" data-category="${item.category}">
          ${item.isNew ? '<span class="card-badge">NEW</span>' : ''}
          <div class="card-image">
              <img src="${item.image}" alt="${item.name}">
          </div>
          <div class="card-content">
              <h3 class="card-title">${item.name}</h3>
              <div class="card-specs">
                  ${Object.entries(item.specs).map(([key, value]) => `
                      <div class="spec-item">
                          <i class="fas fa-${getSpecIcon(key)}"></i>
                          <span>${key}: <strong>${value}</strong></span>
                      </div>
                  `).join('')}
              </div>
              <div class="card-footer">
                  <div class="price">${item.price}</div>
                  <button class="view-btn">View Details</button>
              </div>
          </div>
      </div>
  `).join('');
}

// Helper function to get icons for specs
function getSpecIcon(specKey: string): string {
  const iconMap: Record<string, string> = {
      power: 'bolt',
      speed: 'tachometer-alt',
      voltage: 'plug',
      weight: 'weight-hanging',
      pieces: 'box-open',
      material: 'gem',
      storage: 'briefcase',
      warranty: 'shield-alt',
      range: 'ruler-combined',
      accuracy: 'bullseye',
      battery: 'battery-three-quarters',
      blade: 'cut',
      cutting: 'cut',
      height: 'ruler-vertical',
      torque: 'cog',
      charger: 'charging-station',
      size: 'ruler-horizontal'
  };
  return iconMap[specKey] || 'info-circle';
}