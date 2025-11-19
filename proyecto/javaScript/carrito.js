const carritoItems = document.querySelector('.carrito-items');
const totalCarrito = document.getElementById('total-carrito');

// Cargar carrito desde localStorage
function cargarCarrito() {
    carritoItems.innerHTML = '';
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.forEach(producto => {
        const divItem = document.createElement('div');
        divItem.classList.add('carrito-item');
        divItem.innerHTML = `
            <div class="carrito-img">
                <img src="${producto.img}" alt="${producto.nombre}">
            </div>
            <div class="carrito-info">
                <h4>${producto.nombre}</h4>
                <span class="carrito-precio">${producto.precio} ARS</span>
                <label>Cantidad:</label>
                <input type="number" value="${producto.cantidad}" min="1">
            </div>
            <button class="btn-eliminar">Eliminar</button>
        `;
        carritoItems.appendChild(divItem);

        // Eliminar producto
        divItem.querySelector('.btn-eliminar').addEventListener('click', () => {
            eliminarProducto(producto.nombre);
        });

        // Cambiar cantidad
        divItem.querySelector('input').addEventListener('change', (e) => {
            cambiarCantidad(producto.nombre, parseInt(e.target.value));
        });
    });
    actualizarTotal();
}

// Actualizar total del carrito
function actualizarTotal() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let total = 0;
    carrito.forEach(item => total += item.precio * item.cantidad);
    totalCarrito.innerText = total.toLocaleString('es-AR') + ' ARS';
}

// Eliminar producto del carrito
function eliminarProducto(nombre) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito = carrito.filter(item => item.nombre !== nombre);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    cargarCarrito();
}

// Cambiar cantidad
function cambiarCantidad(nombre, cantidad) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito = carrito.map(item => {
        if(item.nombre === nombre) item.cantidad = cantidad;
        return item;
    });
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarTotal();
}

const btnComprar = document.querySelector('.btn-comprar');

btnComprar.addEventListener('click', () => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    if(carrito.length === 0){
        alert("El carrito está vacío.");
        return;
    }

    // Guardar el carrito actual en localStorage temporalmente para usar en la página de pago
    localStorage.setItem('compraEnProceso', JSON.stringify(carrito));

    // Redirigir a la página de pago
    window.location.href = "pago.html";
});


// Inicializar
cargarCarrito();
