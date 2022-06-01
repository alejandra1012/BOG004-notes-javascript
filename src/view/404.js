export default () => {
    const viewDifferent = `
    <div class= 'errorView'>
      <h1>404</h1>
      <h1>Página no encontrada</h1>
      <p>El archivo específico no se encontró en este sitio web. 
      <p>Por favor compruebe la url
      </div>
      `;
    const divElement = document.createElement('div');
    divElement.setAttribute('id', 'message');
    divElement.innerHTML = viewDifferent;
    return divElement;
  };
