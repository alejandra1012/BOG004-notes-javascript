export default () => {
    const viewInicioSecion =
    `<main class='registro'>
  <section id='container' class='container'
  <h2 class='titulo'>BIENVENID@ INGRESA AQUI</h2>
  <input type= 'email' id= 'email' placeholder='email' > 
  <input type= 'password' id= 'password' placeholder='contraseña'>
  <div id='modalMessage'>
              <div id='textModal'></div>            
   </div>
   <div class='errorMessagelogin'></div>
  
  <button class='login' id='login'>Iniciar sesión</button>
  <h4>O Ingresa con</h4>
  <button class='loginGoogle' id='loginGoogle'><img class='logo' src= './imagenes/Google.png' alt=logo Google></button>
  <h3>¿Aún no tienes cuenta con RECUÉRDALO?</h3>
  <a href= '#/registro'><button class='registrate' id='registrate'>Regístrate aqui</button></a>
  </section>
  </main>
 `;
 const divElement = document.createElement('div');
 divElement.classList.add('position');
 divElement.innerHTML = viewInicioSecion;
 return divElement;
};

