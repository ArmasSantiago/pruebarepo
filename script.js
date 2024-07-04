// Función para guardar el producto en Local Storage
function saveProduct(name, description, quantity) {
  let products = JSON.parse(localStorage.getItem('products')) || [];
  let newItemId = products.length + 1; // Generar un nuevo ID automáticamente
  let product = {
    id: newItemId,
    name: name,
    description: description,
    quantity: quantity
  };
  products.push(product);
  localStorage.setItem('products', JSON.stringify(products));
}

// Función para mostrar los productos en el inventario
function displayInventory() {
  let inventoryList = document.getElementById('inventoryList');
  inventoryList.innerHTML = '';

  let products = JSON.parse(localStorage.getItem('products')) || [];

  products.forEach(function(product) {
    let card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <h3>${product.name}</h3>
      <p><strong>ID:</strong> ${product.id}</p>
      <p><strong>Descripción:</strong> ${product.description}</p>
      <p><strong>Cantidad:</strong> ${product.quantity}</p>
      <button onclick="editProduct(${product.id})">Editar</button>
      <button onclick="deleteProduct(${product.id})">Eliminar</button>
    `;
    inventoryList.appendChild(card);
  });
}

// Función para añadir un producto al inventario
function addProduct(event) {
  event.preventDefault();
  
  let name = document.getElementById('name').value;
  let description = document.getElementById('description').value;
  let quantity = document.getElementById('quantity').value;

  saveProduct(name, description, quantity);
  displayInventory();
  clearForm();
}

// Función para limpiar el formulario después de añadir un producto
function clearForm() {
  document.getElementById('name').value = '';
  document.getElementById('description').value = '';
  document.getElementById('quantity').value = '';
}

// Función para cancelar la acción de añadir un producto (limpia el formulario)
function cancelAdd() {
  clearForm();
}

// Función para editar un producto (a implementar según necesidad)
function editProduct(id) {
  // Aquí podrías implementar la lógica para editar un producto
  // Por ejemplo, mostrando los datos del producto en el formulario y permitiendo modificarlos
}

// Función para eliminar un producto del inventario
function deleteProduct(id) {
  let products = JSON.parse(localStorage.getItem('products')) || [];
  let updatedProducts = products.filter(product => product.id !== id);
  localStorage.setItem('products', JSON.stringify(updatedProducts));
  displayInventory();
}

// Event listeners
document.getElementById('inventoryForm').addEventListener('submit', addProduct);
document.getElementById('cancelButton').addEventListener('click', cancelAdd);

// Mostrar el inventario al cargar la página
displayInventory();
