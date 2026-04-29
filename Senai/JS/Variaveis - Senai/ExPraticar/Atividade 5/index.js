function classificarJogador() {
  const pontos = Number(document.getElementById("pontos").value);

  if (pontos >= 200) {
    document.getElementById("resultado").textContent =
      "Classificação: Avançado";
  } else if (pontos >= 100) {
    document.getElementById("resultado").textContent =
      "Classificação: Intermediário";
  } else {
    document.getElementById("resultado").textContent =
      "Classificação: Iniciante";
  }
}