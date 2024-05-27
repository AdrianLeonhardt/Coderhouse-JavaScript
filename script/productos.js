// Constantes del DOM
const contenedorProductos = document.querySelector("#container-productos");
const botonesMenu = document.querySelectorAll('.boton-menu');
const numerito = document.querySelector("#numerito-carrito");
const tituloPrincial = document.querySelector("#titulo-principal");

// Variable para llamar al array de productos.json
let producto = [];

fetch("./script/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        inicializar();
    });

// Función para cargar productos en el contenedor
function cargarProductos() {
    limpiarContenedorProductos();
    productos.forEach(producto => {
        const productoHTML = generarProductoHTML(producto);
        contenedorProductos.innerHTML += productoHTML;
    });
}

// Función para generar el HTML de un producto en el contenedor
function generarProductoHTML(producto) {
    return `
        <div class="productos" data-categoria="${producto.categoria.id}">
            <div class="wrapper-productos">
                <img class="producto-imagen" src="${producto.imagen}" alt="">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <p class="producto-descripcion">${producto.descripcion}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        </div>
    `;
}

// Función para limpiar el contenedor de productos
function limpiarContenedorProductos() {
    contenedorProductos.innerHTML = '';
}

// Función para agregar eventos
function agregarEventos() {
    botonesMenu.forEach(boton => {
        boton.addEventListener('click', () => {
            const categoria = boton.id;
            filtrarProductos(categoria);
        });
    });

    const botonesAgregar = document.querySelectorAll('.producto-agregar');
    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', () => {
            const productoId = boton.id;
            agregarAlCarrito(productoId);

        // Toastify al agregar un producto
         Toastify({
            text: "Producto agregado al carrito",
            duration: 1000,
            gravity: "top",
            position: "right",
            style: {
                background: "linear-gradient(to right, #005485, #000000)",
                borderRadius: "0.5rem",
            },
            offset: {
                x: '2rem',
                y: '2rem'
            },
        }).showToast();

        });
    });
}

// Función para filtrar y mostrar productos según la categoría seleccionada
function filtrarProductos(categoria) {
    contenedorProductos.querySelectorAll('.productos').forEach(producto => {
        if (categoria === 'all' || producto.dataset.categoria === categoria) {
            producto.style.display = 'block';
        } else {
            producto.style.display = 'none';
        }
    });
}

// Funciones relacionadas con el carrito

let productosSeleccionados;

const productosEnCarritoLS = JSON.parse(localStorage.getItem("productosSeleccionados"));

productosSeleccionados = productosEnCarritoLS ? productosEnCarritoLS : [];
productosEnCarritoLS && actualizarNumerito();

function agregarAlCarrito(productoId) {
    const productoExistente = productosSeleccionados.find(producto => producto.id === productoId);

    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        const productoSeleccionado = productos.find(producto => producto.id === productoId);

        if (productoSeleccionado) {
            productoSeleccionado.cantidad = 1;
            productosSeleccionados.push(productoSeleccionado);
        }
    }
    localStorage.setItem('productosSeleccionados', JSON.stringify(productosSeleccionados));
    actualizarNumerito();
}

function actualizarNumerito() {
    const numerito = productosSeleccionados.reduce((acumulador, producto) => acumulador + producto.cantidad, 0);
    const numeritoCarrito = document.querySelector('.boton-carrito .numerito');
    if (numeritoCarrito) {
        numeritoCarrito.textContent = numerito.toString();
    }
}

// Funcion inicializadora para cargar productos y agregar eventos
function inicializar() {
    cargarProductos();
    agregarEventos();
}