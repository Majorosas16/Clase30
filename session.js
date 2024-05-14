const USUARIOS_KEY ="usuarios";
const USUARIOS_ACTIVO_KEY ="usuario-activo" //La key que se va a guardar todos los usuarios

const obtenerUsuarios= () => {
    const usuarios =localStorage.getItem(USUARIOS_KEY);

    if(!usuarios){
        return []
    }

    return JSON.parse(usuarios);
};

// {
//     id,
//     correo,
//     contrasena,
//     favoritos
// }

 export const registrar = (correo,contrasena,confirmarContrasena) => {
    if(contrasena !== confirmarContrasena){
        throw new Error("Las contraseñas no coinciden");
    }

    const usuarios =obtenerUsuarios();

    for(const usuario of usuarios) {
        if (usuario.correo === correo){
            throw new Error ("El correo ya se encuentra registrado");
        }
    }

    usuarios.push({
        id: new Date().getTime(),
        correo : correo,
        contrasena : contrasena,
        favoritos : [],
    });

    localStorage.setItem(USUARIOS_KEY,JSON.stringify(usuarios));
};

export const login = (correo, contrasena) => {
    const usuarios = obtenerUsuarios();

    for(const usuario of usuarios){
        if(usuario.correo === correo && usuario.contrasena === contrasena){
            localStorage.setItem(USUARIOS_ACTIVO_KEY,usuario.id);
            return usuario;
        }
    }

    throw new Error ("Usuario y/o contraseña incorrectos");
};

export const obtenerUsuarioEnSeccion = () => {
    const usuarioActivo = localStorage.getItem(USUARIOS_ACTIVO_KEY);

    if(!usuarioActivo){
        return null;
    }

    const usuarios = obtenerUsuarios();
    for (const usuario of usuarios){
        if(usuario.id === usuarioActivo){
            return usuario;
        }
    }
    return null;
};