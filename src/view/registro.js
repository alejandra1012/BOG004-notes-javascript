export default () => {
    const viewRegistro = `<main class='registro'>
    <section id='container' class='container'
    <h2 class='titulo'>BIENVENID@ INGRESA AQUI</h2>
    <input type= 'email' id= 'email' placeholder='email' > 
    <input type= 'password' id= 'password' placeholder='contraseña'> 
    <input type= 'password' id='confirmPassword' placeholder='confirmar contraseña'> 
    
  
    <button class='crearCuenta' id='crearCuenta'>crear cuenta</button>
    <div id='modalMessage'>
                <div id='textModal'></div>            
            </div>
        <div id='errorMessageJoin'></div>
    
    <h4>O Registrate con</h4>
    <button class='loginGoogle' id='registerGoogle'><img class='logo' src= './imagenes/Google.png' alt=logo Google></button>
    <h3>¿ya tienes cuenta con RECUÉRDALO?</h3>
    <a href= '#/inicioSesion'><button class='registrate' id='creado'>Inicia sesión aquí</button></a>
    </section>
    </main>`;
    
    const divElement = document.createElement('div');
    divElement.classList.add('position');
    divElement.innerHTML = viewRegistro;
    return divElement;
  };