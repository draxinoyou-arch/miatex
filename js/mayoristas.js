document.getElementById("btnEnviarMayorista").addEventListener("click", function () {

    const nombre = document.getElementById("nombreMayorista").value;
    const whatsapp = document.getElementById("whatsappMayorista").value;
    const empresa = document.getElementById("empresaMayorista").value;
    const cantidad = document.getElementById("cantidadMayorista").value;
    const comentarios = document.getElementById("comentariosMayorista").value;

    const mensaje = `*NUEVA SOLICITUD MAYORISTA*

Nombre: ${nombre}

WhatsApp: ${whatsapp}

Empresa: ${empresa}

Cantidad de Polos: ${cantidad}

Comentarios:

${comentarios}`;

    window.open(
        `https://wa.me/51920543855?text=${encodeURIComponent(mensaje)}`,
        "_blank"
    );

});