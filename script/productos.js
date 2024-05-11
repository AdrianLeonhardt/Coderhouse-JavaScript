// Constantes del DOM
const contenedorProductos = document.querySelector("#container-productos");
const botonesMenu = document.querySelectorAll('.boton-menu');
const numerito = document.querySelector("#numerito-carrito");
const tituloPrincial = document.querySelector("#titulo-principal");

// Clase Producto
class Producto {
    constructor(id, titulo, descripcion, precio, imagen, categoria) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.precio = precio;
        this.imagen = imagen;
        this.categoria = categoria;
    }
}

// Array de Productos
const productos = [
    new Producto("Pantalones1", "Pantalon", "pantalon de jean azul", 1000, "../assets/images/pantalones/01.jpg", { nombre: "Pantalones", id: "pantalones" }),
    new Producto("Pantalones2", "Pantalon", "pantalon de jean negro", 2000, "../assets/images/pantalones/02.jpg", { nombre: "Pantalones", id: "pantalones" }),
    new Producto("Remeras1", "Remera", "remera de algodón blanca", 1500, "../assets/images/remeras/01.jpg", { nombre: "Remeras", id: "remeras" }),
    new Producto("Remeras2", "Remera", "remera de algodón combinada", 1800, "../assets/images/remeras/02.jpg", { nombre: "Remeras", id: "remeras" }),
    new Producto("Camperas1", "Campera", "campera de cuero marrón", 3000, "../assets/images/camperas/01.jpg", { nombre: "Camperas", id: "camperas" }),
    new Producto("Camperas2", "Campera", "campera de cuero negra", 3500, "../assets/images/camperas/02.jpg", { nombre: "Camperas", id: "camperas" })
];

// Función principal para inicializar
function inicializar() {
    cargarProductos();
    agregarEventos();
}

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

if (productosEnCarritoLS) {
    productosSeleccionados = productosEnCarritoLS;
    actualizarNumerito()
} else {
    productosSeleccionados = [];
}

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

// Llamada inicial para cargar productos y agregar eventos
inicializar();
