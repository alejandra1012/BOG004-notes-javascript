import { auth } from "../firebase/firebase.js";
import { cerrar  } from "../firebase/promesasFb.js";
import { currentUser, crearNota, getNote, readAllNotes, borrarNotas} from "../firebase/firebaseController.js";

export default () => {
  const viewNotas = `<header>
  <main class='main-notas'>
    <div class='titulo-muro'>RECUÉRDALO<img class='signo' src="./img/signo3.webp" alt="signo"> </div>
  </header>
  <div class='cerrar'><i class='fa-solid fa-arrow-right-from-bracket' id='cerrarSesion' ></i></div>
          <div class='name-container'>Crear Nueva Nota +</div>
         </div>
        <form id='modal_notes-container' class='modal_notes-container'>
          <div id='text-container'>
          <textarea type='text' id='title-nota' placeholder='titulo'></textarea>
            <textarea type='text' id='note-description' placeholder='Crear nueva nota'></textarea>
          </div>
        
         <button disabled type='submit' id='btn-note-save' class='btn-note-save'>Save</button>  
      </form>
      <h2>NOTAS</h2>
     </div>
     <aside>  <div id='note-container' class='note-container'></div> </aside>
     </main>
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

  const userInfo = currentUser();
  let userId = '';
  if (userInfo !== null) {
   
    userId = userInfo.uid;
  }

  const modalNotes = divElement.querySelector('#modal_notes-container');
  const noteDescription = divElement.querySelector('#note-description');
  // const titleNota = divElement.querySelector('title-nota')
  const sessionUser = JSON.parse(sessionStorage.getItem('userId'));

  const putUp = () => {
    const noteForm = divElement.querySelector('#modal_notes-container');
    noteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const noteFormContent = noteForm['note-description'];
      const userEmail = sessionUser.email;
      crearNota(noteFormContent.value, userId, userEmail);
      modalNotes.reset();
    });
  };
  putUp(userInfo);

  const btnSave = divElement.querySelector('#btn-note-save');
  noteDescription.addEventListener('keyup', () => {
    // evento del textarea
    const noteContent = noteDescription.value.trim();
    // trim() metodo que no permite activar boton con espacio
    if (noteContent === '') {
      btnSave.disabled = true; // boton publicar inactivo
    } else {
      btnSave.disabled = false; // boton publicar activo
    }
  });
  // Controlador de Post (Read, Update, Delete)
  const noteController = () => {
    // background.style.display = 'flex';
    const noteContainer = divElement.querySelector('#note-container');
    const querySnapshot = getNote();

    readAllNotes((response) => {
      let notesTemplate = '';
      response.forEach((doc) => {
        const note = doc.data();
        let deleteEditSection;
        // const userIdLogin = sessionUser;
        if (userId === note.uid) {
          deleteEditSection = `
            <button class='edit-img' id='edit' data-noteid='${doc.id}'>Editar</button>
            <button class='guardar-img hidenBtn'  id='guardar'  data-noteid='${doc.id}'>Guardar</button>
            <button class='delete-img' id='delete' data-noteid='${doc.id}'>X</button>          
          `;
        } else {
          deleteEditSection = '<h2>aqui q va</h2>';
        }
        notesTemplate += `
          <div id='div-notes-container' class='div-notes-container'> 
            <div id='note-container-header' class='note-container-header'>
              <div class='name-container'>${note.email}</div>
            </div>
            <textarea type='text' class='note-content inp-pos-modal-note' readonly id='${doc.id}'>${doc.data().noteDescription}
            </textarea>  
            <div class='btns-post-container'>${deleteEditSection}</div>
            </div>
          </div>    
        `;
      });
      noteContainer.innerHTML = notesTemplate;

       // Eliminar post
       const eliminarNota = () => {
        const deleteButton = divElement.querySelectorAll('#delete');
        deleteButton.forEach((btnDelete) => {
          btnDelete.addEventListener('click', ({ target: { dataset } }) => {
            borrarNotas(dataset.noteid);
          });
        });
      };
      eliminarNota();

    });
    readAllNotes(querySnapshot);
  };
  noteController();





  return divElement;

};
