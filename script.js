//Tienda de venta de ropa online, vende diferentes tipos de ropa, jeans, pantalones, remeras. 
//El cliente pone cantidad, tipo de ropa, y esto genera el costo a pagar.

//Declarando variables 
const jean = 5000;
const pantalon = 4000;
const remeras = 2000;

//Creando funcion para multiplicar
function multiplicar (numero1, numero2){
    const resultado = numero1 * numero2;
    return resultado
}

//Algoritmo con Ciclo que funcionara mientras el usuario no presione el "0"
let continuarComprando = true; //Variable de control

while (continuarComprando) {

    const tipoDeRopa = prompt(
        "Ingrese qué tipo de ropa desea comprar:\n" +
        "- 1 para Jean (Precio Unitario: $" + jean + ")\n" +
        "- 2 para Pantalón (Precio Unitario: $" + pantalon + ")\n" +
        "- 3 para Remera (Precio Unitario: $" + remeras + ")\n" +
        "Para finalizar presione 0"
    );

// Algoritmo Condicional para elegir el tipo de ropa
    switch (tipoDeRopa) {
        case "1":
            cantidad = Number(prompt("Ingrese la cantidad de jeans a comprar"));
            const TotalJean = multiplicar(jean, cantidad);
            alert("Elegiste un Jean.\n" +
            "El total a pagar es: $" + TotalJean);
            break;
        case "2":
            cantidad = Number(prompt("Ingrese la cantidad de pantalones a comprar"));
            const TotalPantalon = multiplicar(pantalon, cantidad);
            alert("Elegiste un Pantalón.\n" + 
            "El total a pagar es: $" + TotalPantalon);
            break;
        case "3":
            cantidad = Number(prompt("Ingrese la cantidad de remeras a comprar"));
            const TotalRemeras = multiplicar(remeras, cantidad);
            alert("Elegiste una Remera.\n" +
            "El total a pagar es: $" + TotalRemeras);
            break;
        case "0":
            continuarComprando = false; //Cambio de valor para terminar el ciclo
            alert("Gracias por comprar");
            break;
        default:
            alert("Opción inválida"); //Al presionar cualquier tecla, excepto el 0, mostrara un msj de error
            break;
    }
}




