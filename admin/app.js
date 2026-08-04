import { db } from "../js/firebase.js";

import {
collection,
addDoc,
getDocs,
doc,
updateDoc,
deleteDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
const CLOUD_NAME = "fhkugeoo";
const UPLOAD_PRESET = "miatex";

const nombre = document.getElementById("nombre");
const precio = document.getElementById("precio");
const descripcion = document.getElementById("descripcion");
const imagen = document.getElementById("imagen");

const btnGuardar = document.getElementById("btnGuardar");
const lista = document.getElementById("listaProductos");
let editando = false;
let idEditar = "";
async function subirImagenCloudinary(file){

    const datos = new FormData();

    datos.append("file", file);
    datos.append("upload_preset", UPLOAD_PRESET);

    const respuesta = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
            method: "POST",
            body: datos
        }
    );

    const resultado = await respuesta.json();

    return resultado.secure_url;

}

async function cargarProductos(){

    lista.innerHTML="";

    const datos=await getDocs(collection(db,"productos"));

    datos.forEach(doc=>{

        const p = doc.data();
const id = doc.id;

        lista.innerHTML += `
<div class="card shadow border-0 rounded-4 p-3 mb-3">

${p.imagen ? `
<img
src="${p.imagen}"
class="img-fluid rounded mb-3"
style="height:220px;width:220px;object-fit:cover;">
` : ""}

<h5>${p.nombre}</h5>

<p><strong>S/ ${p.precio}</strong></p>

<p>${p.descripcion}</p>

<div class="d-flex gap-2">

<button
class="btn btn-warning"
onclick="editarProducto('${doc.id}','${p.nombre}','${p.precio}','${p.descripcion}')">

Editar

</button>

<button
class="btn btn-danger"
onclick="eliminarProducto('${doc.id}')">

Eliminar

</button>

</div>

</div>
`;

    });

}

cargarProductos();
window.editarProducto = function(id, nom, pre, des){

    nombre.value = nom;
    precio.value = pre;
    descripcion.value = des;

    editando = true;
    idEditar = id;

    btnGuardar.innerHTML = "Actualizar Producto";

}

window.eliminarProducto = async function(id){

    if(!confirm("¿Eliminar este producto?")) return;

    await deleteDoc(doc(db,"productos",id));

    cargarProductos();

}

btnGuardar.addEventListener("click", async ()=>{

    if(
        nombre.value=="" ||
        precio.value=="" ||
        descripcion.value==""
    ){
        alert("Complete todos los campos");
        return;
    }

    if(editando){

        await updateDoc(doc(db,"productos",idEditar),{

            nombre:nombre.value,
            precio:Number(precio.value),
            descripcion:descripcion.value

        });

        editando=false;
        idEditar="";
        btnGuardar.innerHTML="Guardar Producto";

    }else{

        let urlImagen = "";

if (imagen.files.length > 0) {

    urlImagen = await subirImagenCloudinary(imagen.files[0]);

}

await addDoc(collection(db,"productos"),{

    nombre: nombre.value,
    precio: Number(precio.value),
    descripcion: descripcion.value,
    imagen: urlImagen

});

    }

    nombre.value="";
    precio.value="";
    descripcion.value="";
    imagen.value="";

    cargarProductos();

});
import { auth } from "../js/firebase.js";

import {
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const btnCerrar = document.getElementById("btnCerrar");

btnCerrar.addEventListener("click", async () => {

    await signOut(auth);

    window.location.href = "index.html";

});
