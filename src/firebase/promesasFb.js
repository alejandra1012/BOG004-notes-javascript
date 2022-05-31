import { cerrarSesion, loginGoogle } from "./firebaseController.js";

export function loginGoogleM(auth, provider) {
    return loginGoogle(auth, provider)
      .then((response) => {
        sessionStorage.setItem('userId', JSON.stringify(response.user));
        window.location.hash = '#/notas';
      });
  }

export function cerrar (auth) {
  return cerrarSesion(auth)
    .then(() => {
      sessionStorage.setItem('userId', 'logOut');
      window.location.hash = '#/inicioSesion';
    });
}
