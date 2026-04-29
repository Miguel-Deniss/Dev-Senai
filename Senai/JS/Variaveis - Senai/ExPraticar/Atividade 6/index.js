const IDADE_MINIMA = 18;

function verificarCadastro() {
  const idade = Number(document.getElementById("idade").value);

  if (idade >= IDADE_MINIMA) {
    document.getElementById("resultado").textContent =
      "Cadastro permitido.";
  } else {
    document.getElementById("resultado").textContent =
      "Cadastro não permitido. Idade mínima: 18 anos.";
  }
}