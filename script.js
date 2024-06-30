/* Array para almacenar los productos (simulación de base de datos)
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
*/
document.addEventListener('DOMContentLoaded', function() {
    const productos = [
        { id: 1, nombre: 'Producto 1', descripcion: 'Descripción del producto 1', precio: 100 },
        { id: 2, nombre: 'Producto 2', descripcion: 'Descripción del producto 2', precio: 150 },
        { id: 3, nombre: 'Producto 3', descripcion: 'Descripción del producto 3', precio: 200 }
        // Añadir más productos según sea necesario
    ];

    const tablaProductos = document.getElementById('tabla-productos');
    const tbody = tablaProductos.querySelector('tbody');

    function mostrarProductos() {
        // Limpiamos el tbody antes de volver a mostrar los productos
        tbody.innerHTML = '';

        productos.forEach(producto => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${producto.id}</td>
                <td>${producto.nombre}</td>
                <td>${producto.descripcion}</td>
                <td>${producto.precio}</td>
                <td><button class="btnEliminar" data-id="${producto.id}">Eliminar</button></td>
            `;
            tbody.appendChild(tr);
        });

        // Evento para eliminar productos
        const btnEliminar = document.querySelectorAll('.btnEliminar');
        btnEliminar.forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                eliminarProducto(id);
            });
        });
    }

    function agregarProducto() {
        const nuevoId = productos.length + 1;
        const nuevoProducto = {
            id: nuevoId,
            nombre: `Producto ${nuevoId}`,
            descripcion: `Descripción del producto ${nuevoId}`,
            precio: Math.floor(Math.random() * 1000) + 1 // Precio aleatorio entre 1 y 1000
        };
        productos.push(nuevoProducto);
        mostrarProductos();
    }

    function eliminarProducto(id) {
        const indice = productos.findIndex(producto => producto.id === id);
        if (indice !== -1) {
            productos.splice(indice, 1);
            mostrarProductos();
        }
    }

    // Evento para agregar productos
    const btnAgregar = document.getElementById('btnAgregar');
    btnAgregar.addEventListener('click', agregarProducto);

    // Mostrar productos al cargar la página
    mostrarProductos();
});
