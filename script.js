document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('formulario');
    const tablaProductos = document.getElementById('tabla-productos');
    const tbody = tablaProductos.querySelector('tbody');
    const btnGuardar = document.getElementById('btnGuardar');
    const btnCancelar = document.getElementById('btnCancelar');
    let editando = false;
    let productoIdAEditar = '';

    // Evento para mostrar el formulario de edición
    tablaProductos.addEventListener('click', function(event) {
        if (event.target.dataset.action === 'editar') {
            const fila = event.target.closest('tr');
            const id = fila.querySelector('.id').textContent;
            const nombre = fila.querySelector('.nombre').textContent;
            const descripcion = fila.querySelector('.descripcion').textContent;
            const cantidad = parseInt(fila.querySelector('.cantidad').textContent, 10);

            document.getElementById('producto-id').value = id;
            document.getElementById('nombre').value = nombre;
            document.getElementById('descripcion').value = descripcion;
            document.getElementById('cantidad').value = cantidad;

            editando = true;
            productoIdAEditar = id;

            formulario.classList.remove('inactivo');
        }
    });

    // Evento para guardar el producto editado o nuevo
    formulario.addEventListener('submit', function(event) {
        event.preventDefault();

        const id = document.getElementById('producto-id').value;
        const nombre = document.getElementById('nombre').value;
        const descripcion = document.getElementById('descripcion').value;
        const cantidad = document.getElementById('cantidad').value;

        if (editando) {
            // Modificar el producto existente
            const filaEditar = document.querySelector(`.id[data-id="${id}"]`).closest('tr');
            filaEditar.querySelector('.nombre').textContent = nombre;
            filaEditar.querySelector('.descripcion').textContent = descripcion;
            filaEditar.querySelector('.cantidad').textContent = cantidad;

            // Limpiar formulario y variables de edición
            formulario.reset();
            editando = false;
            productoIdAEditar = '';
        } else {
            // Agregar nuevo producto
            const nuevaFila = `
                <tr>
                    <td class="id" data-id="${id}">${id}</td>
                    <td class="nombre">${nombre}</td>
                    <td class="descripcion">${descripcion}</td>
                    <td class="cantidad">${cantidad}</td>
                    <td class="acciones">
                        <button data-action="editar">Editar</button>
                        <button data-action="eliminar">Eliminar</button>
                    </td>
                </tr>
            `;
            tbody.innerHTML += nuevaFila;
        }

        formulario.classList.add('inactivo');
    });

    // Evento para cancelar la edición
    btnCancelar.addEventListener('click', function() {
        formulario.reset();
        editando = false;
        productoIdAEditar = '';
        formulario.classList.add('inactivo');
    });
});
