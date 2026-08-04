import { db } from "./firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const contenedor = document.getElementById("listaProductos");
const modal = new bootstrap.Modal(
    document.getElementById("productoModal")
);

let productoSeleccionado = null;

async function cargarProductos() {

    contenedor.innerHTML = "";

    const datos = await getDocs(collection(db, "productos"));

    let contador = 0;

datos.forEach((doc) => {

    if (contador >= 4) return;

    contador++;

        const p = doc.data();

        contenedor.innerHTML += `
        <div class="col-lg-3 col-md-4 col-6 mb-4">

            <div
class="card h-100 shadow-sm producto-card"
style="cursor:pointer">

                <img
src="${p.imagen}"
class="card-img-top"
style="height:280px;object-fit:cover;">

                <div
class="card-body"
onclick="abrirProducto(
'${doc.id}',
'${p.nombre}',
'${p.descripcion}',
'${p.precio}',
'${p.imagen}'
)">

                    <h5>${p.nombre}</h5>

                    <p>${p.descripcion}</p>

                    <h4>S/ ${p.precio}</h4>

                    <button
                        class="btn btn-warning w-100 agregar-carrito"
                        data-id="${doc.id}">
                        Agregar al carrito
                    </button>

                </div>

            </div>

        </div>
        `;
    });

}

cargarProductos();
window.abrirProducto = function(
id,
nombre,
descripcion,
precio,
imagen
){

    productoSeleccionado = {

        id,
        nombre,
        descripcion,
        precio,
        imagen

    };

    document.getElementById("modalTitulo").innerHTML = nombre;

    document.getElementById("modalDescripcion").innerHTML = descripcion;

    document.getElementById("modalPrecio").innerHTML =
    "S/ " + Number(precio).toFixed(2);

    document.getElementById("modalImagen").src = imagen;

    document.getElementById("modalCategoria").innerHTML =
    "Polo Premium";

    modal.show();

}
let cantidad = 1;

const inputCantidad = document.getElementById("cantidadProducto");

document.getElementById("masCantidad").addEventListener("click", () => {

    cantidad++;

    inputCantidad.value = cantidad;

});

document.getElementById("menosCantidad").addEventListener("click", () => {

    if (cantidad > 1) {

        cantidad--;

        inputCantidad.value = cantidad;

    }

});
let tallaSeleccionada = "M";

document.querySelectorAll(".talla-btn").forEach(btn => {

    btn.addEventListener("click", () => {

        document.querySelectorAll(".talla-btn").forEach(b => {

            b.classList.remove("btn-warning");

            b.classList.add("btn-outline-light");

        });

        btn.classList.remove("btn-outline-light");

        btn.classList.add("btn-warning");

        tallaSeleccionada = btn.dataset.talla;

    });

});
document.getElementById("btnAgregarModal").addEventListener("click", () => {

    if (!productoSeleccionado) return;

    const producto = {
        id: productoSeleccionado.id,
        nombre: productoSeleccionado.nombre,
        precio: productoSeleccionado.precio,
        imagen: productoSeleccionado.imagen,
        talla: tallaSeleccionada,
        cantidad: cantidad
    };

    window.agregarAlCarrito(producto);

alert("Producto agregado al carrito");

modal.hide();

});
document.getElementById("btnWhatsappModal").addEventListener("click", () => {

    if (!productoSeleccionado) return;

    let mensaje =
`👋 Hola MIA TEX.

Quiero comprar este producto:

🛍 Producto: ${productoSeleccionado.nombre}

📏 Talla: ${tallaSeleccionada}

📦 Cantidad: ${cantidad}

💲 Precio: S/ ${Number(productoSeleccionado.precio).toFixed(2)}

Muchas gracias.`;

    window.open(
        "https://wa.me/51920543855?text=" + encodeURIComponent(mensaje),
        "_blank"
    );

});
let mostrandoTodos = false;

document.getElementById("btnVerMas").addEventListener("click", async () => {

    if (mostrandoTodos == false) {

        mostrandoTodos = true;

        contenedor.innerHTML = "";

        const datos = await getDocs(collection(db, "productos"));

        datos.forEach((doc) => {

            const p = doc.data();

            contenedor.innerHTML += `
            <div class="col-lg-3 col-md-4 col-6 mb-4">

                <div class="card h-100 shadow-sm producto-card" style="cursor:pointer">

                    <img
                    src="${p.imagen}"
                    class="card-img-top"
                    style="height:280px;object-fit:cover;">

                    <div
                    class="card-body"
                    onclick="abrirProducto(
                    '${doc.id}',
                    '${p.nombre}',
                    '${p.descripcion}',
                    '${p.precio}',
                    '${p.imagen}'
                    )">

                        <h5>${p.nombre}</h5>

                        <p>${p.descripcion}</p>

                        <h4>S/ ${p.precio}</h4>

                        <button
                        class="btn btn-warning w-100">
                        Agregar al carrito
                        </button>

                    </div>

                </div>

            </div>
            `;

        });

        document.getElementById("btnVerMas").innerHTML =
        "Ver menos productos";

    } else {

        mostrandoTodos = false;

        cargarProductos();

        document.getElementById("btnVerMas").innerHTML =
        "Ver más productos";

        document.getElementById("productos").scrollIntoView({
            behavior: "smooth"
        });

    }

});