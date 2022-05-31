import { auth, provider } from '../firebase/firebase.js';
import { loginGoogleM } from '../firebase/promesasFb.js';

export default () => {
  const viewInicioSesion = 
  `<header>
    <div><img class='nota' src="./img/notejpg.jpg" alt="nota"></div>
  </header>
  <main class='inicio'>
  <h1 class= 'nombreLabNotes' >RECUÉRDALO<img class='signo' src="./img/signo3.webp" alt="signo"></h1>
  <h2 class='titulo'>BIENVENID@ A TU APP DE NOTAS</h2>
  <section id='container' class='container'
  <strong>No pierdas ni olvides donde anotas tus datos importantes, llego para tí ¡RECUERDALO! la app para que notes siempre tus notas.<img class='signo2' src="./img/signo3.webp" alt="signo"></strong>
  <div id='modalMessage'>
              <div id='textModal'></div>            
   </div>
  </section>
  <div class=botonGoogle ><button class='loginGoogle' id='loginGoogle'><img class='logo' src= './img/Google.png' alt=logo Google><h4>Iniciar sesión con Google</h4></button>
  </div>
  <h3>¡Recuérdalo! para que notes siempre tus notas<img class='emogi' src="./img/emogi2.png" alt="emogi"></h3>
  
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
