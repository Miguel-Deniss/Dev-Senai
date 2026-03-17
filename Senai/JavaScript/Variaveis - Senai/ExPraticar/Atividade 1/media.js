const MEDIA_MINIMA = 7;

function calcularMedia() {
  const nota1 = Number(document.getElementById("nota1").value);
  const nota2 = Number(document.getElementById("nota2").value);

  const media = (nota1 + nota2) / 2;

  document.getElementById("resultadoMedia").textContent =
    "Média do aluno: " + media.toFixed(1);

  if (media >= MEDIA_MINIMA) {
    document.getElementById("resultadoSituacao").textContent =
      "Situação: Aprovado";
  } else {
    document.getElementById("resultadoSituacao").textContent =
      "Situação: Reprovado";
  }
}