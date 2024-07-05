// Función para añadir un producto al inventario
function addProduct(name, description, quantity) {
  let inventory = JSON.parse(localStorage.getItem('inventory')) || [];
  
  // Verificar si el producto ya existe en el inventario
  let existingProduct = inventory.find(product => product.name === name && product.description === description);
  
  if (existingProduct) {
    // Actualizar la cantidad del producto existente
    existingProduct.quantity = parseInt(existingProduct.quantity) + parseInt(quantity);
  } else {
    // Añadir un nuevo producto al inventario
    inventory.push({ name, description, quantity });
  }
  
  localStorage.setItem('inventory', JSON.stringify(inventory));
  
  displayInventory();
}

// Función para mostrar el inventario en la página
function displayInventory() {
  let inventory = JSON.parse(localStorage.getItem('inventory')) || [];
  let inventoryList = document.getElementById('inventory-list');
  inventoryList.innerHTML = '';

  inventory.forEach(product => {
    const item = document.createElement('div');
    item.classList.add('product-item');
    item.innerHTML = `
      <span>${product.name} - ${product.description} (${product.quantity})</span>
      <button onclick="editProduct('${product.name}', '${product.description}')">Editar</button>
    `;
    inventoryList.appendChild(item);
  });
}

// Función para editar la cantidad de un producto
function editProduct(name, description) {
  let newQuantity = prompt(`Ingrese la nueva cantidad para ${name} - ${description}`);
  
  if (newQuantity !== null) {
    let inventory = JSON.parse(localStorage.getItem('inventory')) || [];
    let productIndex = inventory.findIndex(product => product.name === name && product.description === description);
    
    if (productIndex !== -1) {
      inventory[productIndex].quantity = parseInt(newQuantity);
      localStorage.setItem('inventory', JSON.stringify(inventory));
      displayInventory();
    }
  }
}

// Event listener para el formulario de añadir producto
document.getElementById('product-form').addEventListener('submit', function(event) {
  event.preventDefault();
  let name = document.getElementById('name').value.trim();
  let description = document.getElementById('description').value.trim();
  let quantity = document.getElementById('quantity').value.trim();

  if (name && description && quantity) {
    addProduct(name, description, quantity);
    document.getElementById('product-form').reset();
  } else {
    alert('Por favor complete todos los campos.');
  }
});

// Mostrar el inventario al cargar la página
displayInventory();
