// Array para almacenar los productos (simulación de base de datos)
let productos = [];

// Función para agregar un producto
function agregarProducto(event) {
    event.preventDefault(); // Evita el envío del formulario por defecto

    // Obtener los valores del formulario
    let nombre = document.getElementById('nombre').value;
    let descripcion= document.getElementById('descripcion').value;
    let cantidad = parseInt(document.getElementById('cantidad').value);

    // Validar que los campos no estén vacíos
    if (nombre.trim() === '' || descripcion.trim () === '' || isNaN(cantidad)) {
        alert('Por favor completa todos los campos correctamente.');
        return;
    }

    // Crear objeto de producto
    let producto = {
        nombre: nombre,
        descripcion: descripcion,
        cantidad: cantidad
    };

    // Agregar producto al array
    productos.push(producto);

    // Limpiar el formulario
    document.getElementById('productForm').reset();

    // Actualizar la lista de productos
    mostrarProductos();
}

// Función para mostrar los productos en la lista
function mostrarProductos() {
    let lista = document.getElementById('productosList');
    lista.innerHTML = '';

    productos.forEach((producto, index) => {
        let listItem = document.createElement('li');
        listItem.innerHTML = `<strong>${producto.nombre}</strong> - Descripcion: ${producto.descripcion} - Cantidad: ${producto.cantidad}`;
        lista.appendChild(listItem);
    });
}

// Event listener para el formulario
document.getElementById('productForm').addEventListener('submit', agregarProducto);

// Mostrar productos al cargar la página (simulación de cargar productos existentes)
mostrarProductos();
