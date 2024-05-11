// Variables globales
let productosEnCarrito = JSON.parse(localStorage.getItem("productosSeleccionados")) || [];
const carritoVacio = document.querySelector("#carrito-vacio");
const carritoAcciones = document.querySelector("#carrito-acciones");
const contenedorProductos = document.querySelector("#container-carrito-productos");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
const carritoBotonVaciar = document.querySelector("#carrito-boton-vaciar");
const carritoBotonComprar = document.querySelector("#carrito-boton-comprar");

// Funciones

// Función para calcular y mostrar el total del carrito
function mostrarTotalCarrito(productosEnCarrito) {
    const total = productosEnCarrito.reduce((acumulador, producto) => acumulador + (producto.precio * producto.cantidad), 0);
    document.getElementById("total-carrito").textContent = `$${total}`;
}

// Función para actualizar el estado del carrito en la interfaz de usuario
function actualizarCarrito(productosEnCarrito) {
    if (productosEnCarrito && productosEnCarrito.length > 0) {
        // Mostrar elementos relacionados con el carrito
        carritoVacio.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
        contenedorProductos.classList.remove("disabled");
        carritoAcciones.classList.remove("disabled");

        contenedorProductos.innerHTML = ""; // Limpiar el contenido del contenedor de productos antes de agregar nuevos

        productosEnCarrito.forEach(producto => {
            // Crear elementos HTML para cada producto en el carrito
            const crearDiv = document.createElement("div");
            crearDiv.classList.add("container-carrito-productos");

            crearDiv.innerHTML = `
                <img class="carrito-imagen" src="${producto.imagen}" alt="">
                <h3 class="carrito-titulo">${producto.titulo}</h3>
                <div class="carrito-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <button class="carrito-agregar" id="${producto.id}"><i class="bi bi-plus-circle"></i>Agregar</button>
                <button class="carrito-eliminar" id="${producto.id}"><i class="bi bi-trash3"></i>Eliminar</button>
                <div class="carrito-precio">
                    <small>Precio Unitario</small>
                    <p>$${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$${producto.precio * producto.cantidad}</p>
                </div>
            `;

            contenedorProductos.append(crearDiv); // Usamos metodo append para añadir elemento HTML
        });
    } else {
        // Mostrar mensaje de carrito vacío si no hay productos
        carritoVacio.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");
        contenedorProductos.classList.add("disabled");
        carritoAcciones.classList.add("disabled");
    }
    mostrarTotalCarrito(productosEnCarrito); // Mostrar el total del carrito
}

// Event listeners

// Comprar carrito
carritoBotonComprar.addEventListener("click", () => {
    contenedorCarritoComprado.classList.remove("disabled");
    carritoBotonVaciar.classList.add("disabled");
    carritoBotonComprar.classList.add("disabled");
    contenedorProductos.classList.add("disabled");

    productosEnCarrito = []; // Vaciar el carrito
    localStorage.setItem("productosSeleccionados", JSON.stringify(productosEnCarrito)); // Guardar carrito vacío en localStorage

    if (productosEnCarrito.length === 0) {
        carritoVacio.classList.add("disabled");
    }
});

// Vaciar carrito
carritoBotonVaciar.addEventListener("click", () => {
    productosEnCarrito = []; // Vaciar el carrito
    actualizarCarrito(productosEnCarrito); // Actualizar el DOM
    localStorage.setItem("productosSeleccionados", JSON.stringify(productosEnCarrito)); // Guardar cambios en localStorage
});

// Agregar producto
contenedorProductos.addEventListener("click", event => {
    if (event.target.classList.contains("carrito-agregar")) {
        const productId = event.target.id;
        const productoEnCarrito = productosEnCarrito.find(producto => producto.id === productId);
        if (productoEnCarrito) {
            productoEnCarrito.cantidad++;
        }
        actualizarCarrito(productosEnCarrito);
        localStorage.setItem("productosSeleccionados", JSON.stringify(productosEnCarrito));
    }
});

// Eliminar producto
contenedorProductos.addEventListener("click", event => {
    if (event.target.classList.contains("carrito-eliminar")) {
        const productId = event.target.id;
        const productoEnCarritoIndex = productosEnCarrito.findIndex(producto => producto.id === productId);
        if (productoEnCarritoIndex !== -1) {
            productosEnCarrito[productoEnCarritoIndex].cantidad--;
            if (productosEnCarrito[productoEnCarritoIndex].cantidad === 0) {
                productosEnCarrito.splice(productoEnCarritoIndex, 1);
            }
        }
        actualizarCarrito(productosEnCarrito);
        localStorage.setItem("productosSeleccionados", JSON.stringify(productosEnCarrito));
    }
});

// Llamada inicial para cargar el carrito
actualizarCarrito(productosEnCarrito);
