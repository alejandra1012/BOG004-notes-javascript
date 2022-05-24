import { auth, serverTimestamp } from '../firebase/firebase.js';
import { cerrar } from '../firebase/promesasFb.js';
import { currentUser, crearNota, getNote, readAllNotes, borrarNotas, obtenerNota, actualizarNota } from '../firebase/firebaseController.js';

export default () => {
  const viewNotas = `<header>
  <main class='main-notas'>
    <div class='titulo-blockNotas'>RECUÉRDALO<img class='signo' src="./img/signo3.webp" alt="signo"> </div>
      </header>
      <div class='cerrar'><i class='fa-solid fa-arrow-right-from-bracket' id='cerrarSesion' ></i></div>
          <div class='name-container'>Crear Nueva Nota +</div>
         </div>
        <form id='modal_notes-container' class='modal_notes-container'>
          <div id='text-container'>
          <input type="text" id='title-note' placeholder='Titulo'>
            <textarea type='text' id='note-description' placeholder='Descripción'></textarea>
            
          </div>
          <button disabled type='submit' id='btn-note-save' class='btn-note-save'>Save</button>
      </form>
      <h2>NOTAS<img class='signoN' src="./img/signo3.webp" alt="signo"></h2>
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
  const titleNote = divElement.querySelector('#title-note');
  const noteDescription = divElement.querySelector('#note-description');
  const sessionUser = JSON.parse(sessionStorage.getItem('userId'));

  const putUp = () => {
    const noteForm = divElement.querySelector('#modal_notes-container');
    noteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const titleFormContent = noteForm['title-note'];
      const noteFormContent = noteForm['note-description'];
      const userEmail = sessionUser.email;
      crearNota(titleFormContent.value, noteFormContent.value, userId, userEmail);
      modalNotes.reset();
    });
  };
  putUp(userInfo);

  const btnSave = divElement.querySelector('#btn-note-save');
  titleNote.addEventListener('keyup', () => {
    // evento del textarea
    const titleContent = titleNote.value;
    // trim() metodo que no permite activar boton con espacio
    if (titleContent === '') {
      btnSave.disabled = true; // boton publicar inactivo
    } else {
      btnSave.disabled = false; // boton publicar activo
    }
  });

  noteDescription.addEventListener('keyup', () => {
    // evento del textarea
    const noteContent = noteDescription.value;
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
        const title = doc.data();
        const note = doc.data();
        //console.log(title.noteCreatedAt);
        const fecha = title.noteCreatedAt.toDate().toString().substr(0, 25);
        // const userIdLogin = sessionUser;
        if (userId === note.uid) {
          notesTemplate += `
          <div id='div-notes-container' class='div-notes-container'>
          <div id='note-container-header' class='note-container-header'>
            <div class='name-container'>${note.email}</div>
          </div>
          <textarea type='text' class='titleList' readonly id='${doc.id}'>${title.titleNote}
          </textarea>
          <div class= 'current_date'>${fecha}</div>
          <textarea type='text' class='noteList' readonly id='${doc.id}'>${note.noteDescription}
          </textarea>
          <div class='btns-note-container'>
          <button class='btn-edit' id='edit' ><img class='edit' data-noteid='${doc.id}' src="./img/editar.png" alt="editar"></button>
          <button class='btn-guardar'  id='guardar'  data-noteid='${doc.id}'>Guardar</button>
          <button class='btn-delete' id='delete' data-noteid='${doc.id}'>X</button>
          </div>
          </div>
        </div>
          `;
        } else {
        }
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

      const editNote = () => {
        const editTitle = divElement.querySelectorAll('.titleList'.trim());
        const editNoteDescrip = divElement.querySelectorAll('.noteList'.trim());
        const editBtn = divElement.querySelectorAll('#edit');
        const guardarBtn = divElement.querySelectorAll('#guardar');
        editBtn.forEach((btnEdit, index) => {
          btnEdit.addEventListener('click', (e) => {
            const clickBtnEdit = e.target.dataset.noteid;
            obtenerNota(clickBtnEdit).then(() => {
              editNoteDescrip.forEach((textArea) => {
                if (textArea.id === clickBtnEdit) {
                  textArea.removeAttribute('readonly');
                  btnEdit.classList.add('hidenBtn');
                  guardarBtn[index].classList.remove('hidenBtn');
                }
              });
            });
            obtenerNota(clickBtnEdit).then(() => {
              editTitle.forEach((textArea) => {
                if (textArea.id === clickBtnEdit) {
                  textArea.removeAttribute('readonly');
                  btnEdit.classList.add('hidenBtn');
                  guardarBtn[index].classList.remove('hidenBtn');
                }
              });
            });
          });
        });
        guardarBtn.forEach((btnGuardar, index) => {
          btnGuardar.addEventListener('click', (e) => {
            const clickBtn = e.target.dataset.noteid;
            obtenerNota(clickBtn).then(() => {
              editNoteDescrip.forEach((textArea) => {
                if (textArea.id === clickBtn) {
                  textArea.setAttribute('readonly', true);
                  btnGuardar.classList.add('hidenBtn');
                  editBtn[index].classList.remove('hidenBtn');
                  let noteDescription = textArea.value;
                  actualizarNota(textArea.id, { noteDescription, noteCreatedAt: serverTimestamp() });
                }
              });
            });
            obtenerNota(clickBtn).then(() => {
              editTitle.forEach((textArea) => {
                if (textArea.id === clickBtn) {
                  textArea.setAttribute('readonly', true);
                  btnGuardar.classList.add('hidenBtn');
                  editBtn[index].classList.remove('hidenBtn');
                  let titleNote = textArea.value;
                  actualizarNota(textArea.id, { titleNote, noteCreatedAt: serverTimestamp() });
                }
              });
            });
          });
        });
      };
      editNote();
    });
    readAllNotes(querySnapshot);
  };
  noteController();

  return divElement;
};
