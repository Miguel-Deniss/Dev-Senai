const MAXIMO_USUARIOS = 100;

function verificarUsuarios() {
  const usuariosOnline = Number(document.getElementById("usuarios").value);

  if (usuariosOnline <= MAXIMO_USUARIOS) {
    document.getElementById("resultado").textContent =
      "Sistema normal. Usuários online dentro do limite.";
  } else {
    document.getElementById("resultado").textContent =
      "Limite ultrapassado. Muitos usuários online.";
  }
}