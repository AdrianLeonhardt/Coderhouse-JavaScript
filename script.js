// Clase contenedora de Articulos
class Articulo {
    constructor(id, nombre, precio){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
    }
}

// Array de Productos
const articulos = [
    new Articulo(1, 'Pantalon de jean azul', 10000),
    new Articulo(2, 'Pantalon de jean negro', 9500),
    new Articulo(3, 'Remera Oversize', 5000),
    new Articulo(4, 'Remera de Algodon', 3000),
    new Articulo(5, 'Campera Rompeviento', 20000),
];

// Funcion para mostrar los articulos del array
function mostrarArticulos (articulos) {
    console.log("Artículos disponibles:");
    articulos.forEach(articulo => {
        console.log(`ID: ${articulo.id}, Nombre: ${articulo.nombre}, Precio: $${articulo.precio}`);
    });
}

// Funcion para comprar un articulo
function comprarArticulos (carrito, articulos, id) {
    const articulo = articulos.find(articulo => articulo.id === id);
    if (articulo) {
        carrito.push(articulo);
        console.log(`¡Ha comprado el artículo "${articulo.nombre}" por $${articulo.precio}!`);
    } else {
        console.log("El artículo especificado no está disponible.");
    }
}

// Funcion para eliminar un articulo
function eliminarArticulos (carrito, id) {
    const indice = carrito.findIndex(articulo => articulo.id === id);
    if (indice !== -1) {
        carrito.splice(indice, 1);
        console.log(`El artículo con ID ${id} ha sido eliminado del carrito.`);
    } else {
        console.log("El artículo especificado no está en el carrito.");
    }
}

// Funcion para mostrar los articulos del carrito y calcular el precio total
function mostrarCarrito (carrito) {
    if (carrito.length === 0) {
        console.log("El carrito está vacío.");
    } else {
        console.log("Artículos en el carrito:");
        carrito.forEach(articulo => {
            console.log(`ID: ${articulo.id}, Nombre: ${articulo.nombre}, Precio: $${articulo.precio}`);
        });
        const total = carrito.reduce((total, articulo) => total + articulo.precio, 0); 
        console.log(`El total de su compra es: $${total}`);
    }
}

// Funcion principal que maneja la interaccion con el usuario
function tienda () {

    let carrito = [];
    let opcion = ""; 

    mostrarArticulos(articulos);
    
    while (opcion !== "4"){

        opcion = prompt("Hola, Bienvenidos/as a la tienda de ropa\n" + 
                        "Elija una opcion del 1 al 4\n" + 
                        "¿Qué desea hacer?\n" +
                        "1) Comprar\n" +  
                        "2) Eliminar\n" + 
                        "3) Ver Carrito\n" +  
                        "4) Salir\n").toLowerCase();
                        
        switch (opcion) {
            case "1":
                let idCompra = parseInt(prompt("Comprar Articulo\n" + "Ingrese el ID del artículo que desea comprar:"));
                comprarArticulos(carrito, articulos, idCompra);
                break;
            case "2":
                let idEliminar = parseInt(prompt("Eliminar Articulo\n" + "Ingrese el ID del artículo que desea eliminar del carrito:" ));
                eliminarArticulos(carrito, idEliminar);
                break;
            case "3":
                mostrarCarrito(carrito);
                break;
            case "4":
                console.log("Gracias por su visita.");
                break;
            default:
                console.log("Opción no válida. Ingresa un numero valido");
        }
    }
}

tienda();