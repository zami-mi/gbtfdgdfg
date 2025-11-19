// Cargar carrito desde localStorage
const resumenItems = document.getElementById('resumen-items');
const totalPago = document.getElementById('total-pago');
const compra = JSON.parse(localStorage.getItem('compraEnProceso')) || [];

// Mostrar resumen de compra
let total = 0;
compra.forEach(item => {
    const div = document.createElement('div');
    div.innerHTML = `${item.nombre} - ${item.cantidad} x ${item.precio.toLocaleString('es-AR')} ARS`;
    resumenItems.appendChild(div);
    total += item.precio * item.cantidad;
});
totalPago.innerText = total.toLocaleString('es-AR') + ' ARS';

// Manejar formulario de pago
const formPago = document.getElementById('formPago');
formPago.addEventListener('submit', (e) => {
    e.preventDefault(); // evitar recargar página

    alert("¡Pago realizado con éxito!\nTu pedido será enviado pronto.");

    // Vaciar carrito
    localStorage.removeItem('carrito');
    localStorage.removeItem('compraEnProceso');

    // Redirigir al inicio
    window.location.href = "../index.html";
});
