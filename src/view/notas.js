import { auth } from "../firebase/firebase.js";
import { cerrar  } from "../firebase/promesasFb.js";

export default () => {
  const viewNotas = `<header>
    <div class='titulo-muro'>NOTAS</div>
  </header>
  <div class='cerrar'><i class='fa-solid fa-arrow-right-from-bracket' id='cerrarSesion' ></i></div>
          <div class='name-container'>NOTAS</div>
         </div>
        <form id='modal_post-container' class='modal_post-container'>
          <div id='text-container'>
            <textarea type='text' id='post-description' placeholder='Cuéntanos tu historia'></textarea>
          </div>
        
         <button disabled type='submit' id='btn-post-save' class='btn-post-inactive'>Save</button>  
      </form>
     </div>
     <aside>  <div id='post-container' class='post-container'></div> </aside>
  
  <footer id='create-post'>           
  </footer>
  `;

  const divElement = document.createElement('div');
  divElement.classList.add('position');
  divElement.innerHTML = viewNotas;

  const btnCerrarSesion = divElement.querySelector('#cerrarSesion');
  btnCerrarSesion.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('cerrarSecion');
    cerrar(auth);

  });

  return divElement;
};
