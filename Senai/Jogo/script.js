function verificarColisaoComUmObstaculo(obstaculo) {
  let jLeft = jogador.offsetLeft;
  let jTop = jogador.offsetTop;

  let oLeft = obstaculo.offsetLeft;
  let oTop = obstaculo.offsetTop;

  if (
    jLeft < oLeft + 35 &&
    jLeft + 40 > oLeft &&
    jTop < oTop + 35 &&
    jTop + 40 > oTop
  ) {
    if (podePerderVida == true) {
      alert("Você colidiu com um obstáculo!");

      vida = vida - 1;
      painelVida.textContent = vida;

      podePerderVida = false;

      setTimeout(function () {
        podePerderVida = true;
      }, 1000);

      verificarGameOver();
    }
  }
}