document.getElementById("btnEnviarPersonalizado").addEventListener("click", function () {

    const nombre = document.getElementById("nombrePersonalizado").value;
    const whatsapp = document.getElementById("whatsappPersonalizado").value;
    const empresa = document.getElementById("empresaPersonalizado").value;
    const tipo = document.getElementById("tipoPersonalizado").value;
    const color = document.getElementById("colorPersonalizado").value;
    const talla = document.getElementById("tallaPersonalizado").value;
    const cantidad = document.getElementById("cantidadPersonalizado").value;
    const estampado = document.getElementById("estampadoPersonalizado").value;
    const comentarios = document.getElementById("comentariosPersonalizado").value;

    const mensaje = `*NUEVA SOLICITUD DE POLO PERSONALIZADO*

Nombre: ${nombre}

WhatsApp: ${whatsapp}

Empresa: ${empresa}

Tipo: ${tipo}

Color: ${color}

Talla: ${talla}

Cantidad: ${cantidad}

Estampado: ${estampado}

Comentarios:

${comentarios}

Adjuntaré el logo en el siguiente mensaje.`;

    window.open(
        `https://wa.me/51920543855?text=${encodeURIComponent(mensaje)}`,
        "_blank"
    );

});