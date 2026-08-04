//=========================================
// CARRITO
//=========================================

let carrito = [];
const carritoGuardado = localStorage.getItem("carrito");

if(carritoGuardado){

    carrito = JSON.parse(carritoGuardado);

}

function agregarAlCarrito(producto){

    carrito.push(producto);

    actualizarCarrito();

}

function actualizarCarrito(){

    const lista = document.getElementById("listaCarrito");
    const total = document.getElementById("totalCarrito");
    const contador = document.getElementById("contadorCarrito");

    lista.innerHTML = "";

    let suma = 0;

    carrito.forEach((producto,index)=>{

        suma += producto.precio * producto.cantidad;

        lista.innerHTML += `

        <div class="border-bottom border-secondary pb-3 mb-3">

            <img
            src="${producto.imagen}"
            class="img-fluid rounded mb-2"
            style="height:70px;object-fit:cover;">

            <h6 class="fw-bold">

                ${producto.nombre}

            </h6>

            <small>

                Talla:
                ${producto.talla}

            </small>

            <br>

            <div class="d-flex align-items-center mt-2">

    <button
    class="btn btn-sm btn-outline-warning"
    onclick="disminuirCantidad(${index})">
    -
    </button>

    <span class="mx-2 fw-bold">
        ${producto.cantidad}
    </span>

    <button
    class="btn btn-sm btn-warning"
    onclick="aumentarCantidad(${index})">
    +
    </button>

</div>

            <br>

            <strong>

                S/ ${(producto.precio*producto.cantidad).toFixed(2)}

            </strong>

            <button

            class="btn btn-sm btn-danger mt-2"

            onclick="eliminarProducto(${index})">

            Eliminar

            </button>

        </div>

        `;

    });

    total.innerHTML = "S/" + suma.toFixed(2);

    contador.innerHTML = carrito.length;
    localStorage.setItem(

    "carrito",

    JSON.stringify(carrito)

);

}


function eliminarProducto(index){

    carrito.splice(index,1);

    actualizarCarrito();

}
document.getElementById("btnWhatsapp").onclick = ()=>{

    if(carrito.length===0){

        alert("El carrito está vacío.");

        return;

    }

    let total = 0;

    let mensaje = "👋 Hola MIA TEX.%0A%0A";
    mensaje += "🛒 *Quiero realizar el siguiente pedido:*%0A%0A";

    carrito.forEach((p,i)=>{

       let subtotal = Number(p.precio) * p.cantidad;
        total += subtotal;

        mensaje += `*${i+1}. ${p.nombre}*%0A`;
        mensaje += `📏 Talla: ${p.talla}%0A`;
        mensaje += `📦 Cantidad: ${p.cantidad}%0A`;
        mensaje += `💵 Precio: S/${Number(p.precio).toFixed(2)}%0A`;
        mensaje += `💰 Subtotal: S/${subtotal.toFixed(2)}%0A%0A`;

    });

    mensaje += "━━━━━━━━━━━━━━%0A";
    mensaje += `💲 *TOTAL:* S/${total.toFixed(2)}%0A%0A`;
    mensaje += "Quedo atento a la cotización. Gracias.";

    window.open(
        "https://wa.me/51920543855?text="+mensaje,
        "_blank"
    );
    carrito = [];

localStorage.removeItem("carrito");

actualizarCarrito();

const panel = document.getElementById("carritoLateral");

if(panel){

    panel.classList.remove("show");
    panel.classList.remove("activo");

}

}
actualizarCarrito();
function aumentarCantidad(index){

    carrito[index].cantidad++;

    actualizarCarrito();

}

function disminuirCantidad(index){

    if(carrito[index].cantidad > 1){

        carrito[index].cantidad--;

    }else{

        eliminarProducto(index);

        return;

    }

    actualizarCarrito();

}
window.agregarAlCarrito = agregarAlCarrito;
window.actualizarCarrito = actualizarCarrito;