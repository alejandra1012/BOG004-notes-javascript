import { auth, provider } from '../firebase/firebase.js';
import { loginGoogleM } from '../firebase/promesasFb.js';

export default () => {
  const viewInicioSesion = `<main class='registro'>
  <section id='container' class='container'
  <h2 class='titulo'>BIENVENID@ INGRESA AQUI</h2>
  <input type= 'email' id= 'email' placeholder='email' > 
  <input type= 'password' id= 'password' placeholder='contraseña'>
  <div id='modalMessage'>
              <div id='textModal'></div>            
   </div>
   
  <button class='login' id='login'>Iniciar sesión</button>
  
  <button class='loginGoogle' id='loginGoogle'><img class='logo' src= './img/Google.png' alt=logo Google><h4>Iniciar sesión con Google</h4></button>
  <h3>¿Aún no tienes cuenta con RECUÉRDALO?</h3>
  <a href= '#/registro'><button class='registrate' id='registrate'>Regístrate aqui</button></a>
  </section>
  </main>
 `;
  const divElement = document.createElement('div');
  divElement.classList.add('position');
  divElement.innerHTML = viewInicioSesion;


  const bottonloginGoogle = divElement.querySelector('#loginGoogle');
  bottonloginGoogle.addEventListener('click', () => {
    loginGoogleM(auth,provider)

  });
  return divElement;
};
