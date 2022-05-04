import { components } from '../view/index.js'

export const changeView = (hash) => {
  const id = hash.split('/')[1];
  const sectionMain = document.getElementById('container');
  sectionMain.innerHTML = '';
  switch (hash) {
    case '':
    case '#':
    case '#/inicioSesion': {
      return sectionMain.appendChild(components.inicioSesion());
    }
    case '#/registro':
    case '#/notas':
    {
      return sectionMain.appendChild(components[id]());
    }
    default:
      return sectionMain.appendChild(components.different());
  }
};
