document.addEventListener('DOMContentLoaded', function() {
    let productos = [];

    // Verificar si hay productos almacenados en localStorage
    if (localStorage.getItem('productos')) {
        productos = JSON.parse(localStorage.getItem('productos'));
    }

    const formulario = document.getElementById('formulario');
    const tablaProductos = document.getElementById('tabla-productos');
    const tbody = tablaProductos.querySelector('tbody');
    const btnGuardar = document.getElementById('btnGuardar');
    const btnCancelar = document.getElementById('btnCancelar');

    formulario.addEventListener('submit', function(event) {
        event.preventDefault();

        const id = parseInt(document.getElementById('producto-id').value);
        const nombre = document.getElementById('nombre').value.trim();
        const descripcion = document.getElementById('descripcion').value.trim();
        const cantidad = parseInt(document.getElementById('cantidad').value);

        if (nombre === '' || descripcion === '' || isNaN(cantidad) || cantidad <= 0) {
            alert('Por favor completa todos los campos correctamente.');
            return;
        }

        if (id === '') {
            // Crear nuevo producto
            const nuevoId = productos.length > 0 ? productos[productos.length - 1].id + 1 : 1;
            const nuevoProducto = {
                id: nuevoId,
                nombre: nombre,
                descripcion: descripcion,
                cantidad: cantidad
            };
            productos.push(nuevoProducto);
        } else {
            // Editar producto existente
            const indice = productos.findIndex(p => p.id === id);
            if (indice !== -1) {
                productos[indice].nombre = nombre;
                productos[indice].descripcion = descripcion;
                productos[indice].cantidad = cantidad;
            }
            // Limpiar el campo de ID después de editar
            document.getElementById('producto-id').value = '';
        }

        guardarProductosEnLocalStorage();
        mostrarProductos();
        formulario.reset();
    });

    btnCancelar.addEventListener('click', function() {
        formulario.reset();
        document.getElementById('producto-id').value = '';
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
                <td>
                    <button class="btnEditar" data-id="${producto.id}">Editar</button>
                    <button class="btnEliminar" data-id="${producto.id}">Eliminar</button>
                </td>
            `;
            tbody.appendChild(tr);

            // Agregar evento para editar producto
            tr.querySelector('.btnEditar').addEventListener('click', function() {
                editarProducto(producto.id);
            });

            // Agregar evento para eliminar producto
            tr.querySelector('.btnEliminar').addEventListener('click', function() {
                eliminarProducto(producto.id);
            });
        });
    }

    function editarProducto(id) {
        const producto = productos.find(p => p.id === id);
        if (producto) {
            document.getElementById('producto-id').value = producto.id;
            document.getElementById('nombre').value = producto.nombre;
            document.getElementById('descripcion').value = producto.descripcion;
            document.getElementById('cantidad').value = producto.cantidad;
        }
    }

    function eliminarProducto(id) {
        const indice = productos.findIndex(p => p.id === id);
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
