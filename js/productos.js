const listaProductos = document.getElementById("listaProductos");
let productoSeleccionado = null;

function crearProducto(producto) {

    return `

    <div class="col-xl-3 col-lg-4 col-md-6 col-12">

        <div class="product-card h-100">

            <div class="product-image">

                <img
src="${producto.imagen}"
class="card-img-top producto-imagen"
alt="${producto.nombre}"

style="cursor:pointer"

onclick="abrirProducto(${producto.id})"
>

            </div>

            <div class="product-body">

                <span class="product-category">

                    ${producto.categoria}

                </span>

                <h5>

                    ${producto.nombre}

                </h5>

                <p>

                    ${producto.descripcion}

                </p>

                <div class="product-footer">

                    <div class="product-price">

                        S/ ${producto.precio}

                    </div>

                    <button

class="btn btn-warning fw-bold"

onclick="abrirProducto(${producto.id})"

>

Agregar

</button>

                </div>

            </div>

        </div>

    </div>

    `;

}
const productos = [

{
id:1,
nombre:"Polo Premium Negro",
categoria:"Premium",
descripcion:"Polo algodón premium.",
precio:39.90,
imagen:"assets/products/polo1.jpg"
},

{
id:2,
nombre:"Polo Blanco",
categoria:"Premium",
descripcion:"Ideal para sublimación.",
precio:34.90,
imagen:"assets/products/polo1.jpg"
},

{
id:3,
nombre:"Polo Corporativo",
categoria:"Empresa",
descripcion:"Especial para empresas.",
precio:42.90,
imagen:"assets/products/polo1.jpg"
},

{
id:4,
nombre:"Polo Dry Fit",
categoria:"Deportivo",
descripcion:"Tela deportiva ligera.",
precio:44.90,
imagen:"assets/products/polo1.jpg"
},

{
id:5,
nombre:"Polo Oversize",
categoria:"Moda",
descripcion:"Modelo oversize moderno.",
precio:49.90,
imagen:"assets/products/polo1.jpg"
},

{
id:6,
nombre:"Polo Ejecutivo",
categoria:"Corporativo",
descripcion:"Ideal para uniformes.",
precio:41.90,
imagen:"assets/products/polo1.jpg"
}

];

listaProductos.innerHTML = "";

const LIMITE = 4;

productos.forEach((producto,index)=>{

    if(index < LIMITE){

        listaProductos.innerHTML += crearProducto(producto);

    }

});
function abrirProducto(id){

    const producto = productos.find(p => p.id === id);
    productoSeleccionado = producto;

    document.getElementById("modalImagen").src = producto.imagen;

    document.getElementById("modalTitulo").innerHTML = producto.nombre;

    document.getElementById("modalCategoria").innerHTML = producto.categoria;

    document.getElementById("modalPrecio").innerHTML = "S/ " + producto.precio;

    document.getElementById("modalDescripcion").innerHTML = producto.descripcion;
    cantidadSeleccionada = 1;

document.getElementById("cantidadProducto").value = 1;

tallaSeleccionada = "M";

document.querySelectorAll(".talla-btn").forEach(btn=>{

    btn.classList.remove("btn-warning");

    btn.classList.add("btn-outline-light");

    if(btn.dataset.talla==="M"){

        btn.classList.remove("btn-outline-light");

        btn.classList.add("btn-warning");

    }

});

    const modal = new bootstrap.Modal(
    document.getElementById("productoModal")
);

document.getElementById("btnAgregarModal").onclick = function(){

    window.agregarAlCarrito({

        id: productoSeleccionado.id,
        nombre: productoSeleccionado.nombre,
        precio: productoSeleccionado.precio,
        imagen: productoSeleccionado.imagen,
        talla: tallaSeleccionada,
        cantidad: cantidadSeleccionada

    });

    modal.hide();

};

modal.show();

}
//=========================================
// TALLAS Y CANTIDAD
//=========================================

let tallaSeleccionada = "M";

let cantidadSeleccionada = 1;

document.addEventListener("click",(e)=>{

    // Seleccionar talla

    if(e.target.classList.contains("talla-btn")){

        document.querySelectorAll(".talla-btn").forEach(btn=>{

            btn.classList.remove("btn-warning");

            btn.classList.add("btn-outline-light");

        });

        e.target.classList.remove("btn-outline-light");

        e.target.classList.add("btn-warning");

        tallaSeleccionada = e.target.dataset.talla;

    }

    // Aumentar cantidad

    if(e.target.id==="masCantidad"){

        cantidadSeleccionada++;

        document.getElementById("cantidadProducto").value=cantidadSeleccionada;

    }

    // Disminuir cantidad

    if(e.target.id==="menosCantidad"){

        if(cantidadSeleccionada>1){

            cantidadSeleccionada--;

            document.getElementById("cantidadProducto").value=cantidadSeleccionada;

        }

    }

});