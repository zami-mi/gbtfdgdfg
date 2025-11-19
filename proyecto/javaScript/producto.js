// Selección de elementos
const btnAgregar = document.querySelectorAll('.btn-agregar');
const filtroCategoria = document.getElementById('categoria');
const buscador = document.getElementById('Buscar');
const productos = document.querySelectorAll('.productos');

// Función para guardar producto en localStorage
function agregarAlCarritoLS(nombre, precio, img) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const itemExistente = carrito.find(item => item.nombre === nombre);
    if(itemExistente){
        itemExistente.cantidad += 1;
    } else {
        carrito.push({nombre, precio, img, cantidad: 1});
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Agregar al carrito
btnAgregar.forEach(boton => {
    boton.addEventListener('click', () => {
        const producto = boton.closest('.productos');
        const nombre = producto.querySelector('h4').innerText;
        const precio = parseInt(producto.querySelector('.precio').innerText.replace(/\D/g, ''));
        const img = producto.querySelector('img').src;
        agregarAlCarritoLS(nombre, precio, img);
        alert(`${nombre} agregado al carrito`);
    });
});

// -------------------- FILTRO POR CATEGORÍA --------------------
filtroCategoria.addEventListener('change', () => {
    const cat = filtroCategoria.value;
    productos.forEach(producto => {
        if(cat === 'Tlc' || producto.dataset.cat === cat){
            producto.style.display = 'block';
        } else {
            producto.style.display = 'none';
        }
    });
});

// -------------------- BUSCADOR EN TIEMPO REAL --------------------
buscador.addEventListener('input', () => {
    const valor = buscador.value.toLowerCase();
    productos.forEach(producto => {
        const nombre = producto.querySelector('h4').innerText.toLowerCase();
        producto.style.display = nombre.includes(valor) ? 'block' : 'none';
    });
});
// Seleccionar todos los select de color
const selectsColor = document.querySelectorAll('.color');

selectsColor.forEach(select => {
    select.addEventListener('change', () => {
        const producto = select.closest('.productos'); // artículo del producto
        const img = producto.querySelector('.img-producto img'); // imagen que se cambia
        const opcionSeleccionada = select.selectedOptions[0]; // opción elegida
        const rutaImagen = opcionSeleccionada.dataset.img; // ruta de la imagen

        if(rutaImagen) img.src = rutaImagen; // cambiar la imagen
    });
});


