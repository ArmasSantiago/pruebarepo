document.addEventListener('DOMContentLoaded', function() {
    let productos = [];

    // Verificar si hay productos almacenados en localStorage
    if (localStorage.getItem('productos')) {
        productos = JSON.parse(localStorage.getItem('productos'));
    }

    const formulario = document.getElementById('formulario');
    const tablaProductos = document.getElementById('tabla-productos');
    const tbody = tablaProductos.querySelector('tbody');

    formulario.addEventListener('submit', function(event) {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value.trim();
        const descripcion = document.getElementById('descripcion').value.trim();
        const cantidad = parseInt(document.getElementById('cantidad').value);

        if (nombre === '' || descripcion === '' || isNaN(cantidad) || cantidad <= 0) {
            alert('Por favor completa todos los campos correctamente.');
            return;
        }

        const nuevoId = productos.length > 0 ? productos[productos.length - 1].id + 1 : 1;
        const nuevoProducto = {
            id: nuevoId,
            nombre: nombre,
            descripcion: descripcion,
            cantidad: cantidad
        };
        productos.push(nuevoProducto);
        guardarProductosEnLocalStorage();
        mostrarProductos();
        formulario.reset();
    });

    function mostrarProductos() {
        tbody.innerHTML = '';

        productos.forEach(producto => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${producto.id}</td>
                <td>${producto.nombre}</td>
                <td>${producto.descripcion}</td>
                <td>${producto.cantidad}</td>
                <td><button class="btnEliminar" data-id="${producto.id}">Eliminar</button></td>
            `;
            tbody.appendChild(tr);
        });

        const btnEliminar = document.querySelectorAll('.btnEliminar');
        btnEliminar.forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                eliminarProducto(id);
            });
        });
    }

    function eliminarProducto(id) {
        const indice = productos.findIndex(producto => producto.id === id);
        if (indice !== -1) {
            productos.splice(indice, 1);
            guardarProductosEnLocalStorage();
            mostrarProductos();
        }
    }

    function guardarProductosEnLocalStorage() {
        localStorage.setItem('productos', JSON.stringify(productos));
    }

    // Mostrar productos al cargar la página
    mostrarProductos();
});
