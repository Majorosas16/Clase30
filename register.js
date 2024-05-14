import {registrar} from "./session.js";

const render = () =>{
const registro = document.querySelector("#registro");

registro.addEventListener("submit", (e) =>{
    e.preventDefault(); //Que no refresque
    const correo= e.target.correo.value;
    const contrasena= e.target.contrasena.value;
    const confirmarContrasena =e.target.confirmarContrasena.value;

    try {
        registrar(correo,contrasena,confirmarContrasena);
        alert("Usuario registrado exitosamente");
        window.location.href="./index.html";
        target= "_blank";

    } catch (error) {
        alert(error.message);
    }
})
}
document.addEventListener("DOMContentLoaded", render);