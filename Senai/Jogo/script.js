// Alterei o jogo para ficar mais completo
// Adicionei vidas, cronômetro, obstáculos que se movem, sons e mensagens na tela (Som nao funcionou)
// Também coloquei sistema de níveis, vida extra a cada 5 pontos e reinício do jogo

//Os elementos do HTML
let jogador = document.getElementById("jogador");
let moeda = document.getElementById("moeda");

// obstáculos do jogo
let obstaculo1 = document.getElementById("obstaculo1");
let obstaculo2 = document.getElementById("obstaculo2");
let obstaculo3 = document.getElementById("obstaculo3");
let obstaculo4 = document.getElementById("obstaculo4");
let obstaculo5 = document.getElementById("obstaculo5");

// partes da tela que mostram informações
let painel = document.getElementById("pontuacao");
let painelVida = document.getElementById("valorVida");
let painelTempo = document.getElementById("tempo");
let mensagemColisao = document.getElementById("mensagemColisao");
let mensagemCentral = document.getElementById("mensagemCentral");

// sons do jogo
let somMoeda = document.getElementById("somMoeda");
let somDano = document.getElementById("somDano");

// ============================
// VARIÁVEIS PRINCIPAIS
// ============================

// começa com 0 pontos
let pontuacao = 0;

// começa com 5 vidas
let vida = 5;

// controla as vidas extras
let vidasGanhos = 0;
let proximaMetaVida = 5;

// tempo do jogo
let tempo = 45;
let intervaloTempo;

// posição inicial do jogador
let posX = 280;
let posY = 180;

// velocidade do jogador
let velocidade = 20;

// evita perder várias vidas ao mesmo tempo
let podePerderVida = true;

// controla se o jogo está rodando
let jogoAtivo = true;

// nível do jogo
let nivel = 1;

// Posicao e velocidade dos obstaculos
let posObs1X = 100;
let posObs1Y = 80;
let velObs1 = 3;

let posObs2X = 400;
let posObs2Y = 200;
let velObs2 = 2;

let posObs3X = 500;
let posObs3Y = 120;
let velObs3 = -4;

let posObs4X = 180;
let posObs4Y = 320;
let velObs4 = 3;

let posObs5X = 400;
let posObs5Y = 350;
let velObs5 = -2;


// mensagem grande na tela
function mostrarMensagemCentral(texto) {
  // coloca o texto
  mensagemCentral.textContent = texto;

  // mostra a caixa
  mensagemCentral.style.display = "block";
}

// nova posicao da moeda
function novaMoeda() {
  // sorteia uma posição aleatória
  let x = Math.random() * 560;
  let y = Math.random() * 460;

  // coloca a moeda na tela
  moeda.style.left = x + "px";
  moeda.style.top = y + "px";
}

// colocar os obstaculos na tela
function posicionarObstaculos() {
  obstaculo1.style.left = posObs1X + "px";
  obstaculo1.style.top = posObs1Y + "px";

  obstaculo2.style.left = posObs2X + "px";
  obstaculo2.style.top = posObs2Y + "px";

  obstaculo3.style.left = posObs3X + "px";
  obstaculo3.style.top = posObs3Y + "px";

  obstaculo4.style.left = posObs4X + "px";
  obstaculo4.style.top = posObs4Y + "px";

  obstaculo5.style.left = posObs5X + "px";
  obstaculo5.style.top = posObs5Y + "px";
}


// Niveis
function verificarNivel() {
  // nível 3
  if (pontuacao >= 10) {
    nivel = 3;

    velObs1 = velObs1 > 0 ? 5 : -5;
    velObs2 = velObs2 > 0 ? 4 : -4;
    velObs3 = velObs3 > 0 ? 6 : -6;
    velObs4 = velObs4 > 0 ? 5 : -5;
    velObs5 = velObs5 > 0 ? 4 : -4;
  }

  // nível 2
  else if (pontuacao >= 5) {
    nivel = 2;

    velObs1 = velObs1 > 0 ? 4 : -4;
    velObs2 = velObs2 > 0 ? 3 : -3;
    velObs3 = velObs3 > 0 ? 5 : -5;
    velObs4 = velObs4 > 0 ? 4 : -4;
    velObs5 = velObs5 > 0 ? 3 : -3;
  }

  // nível 1
  else {
    nivel = 1;

    velObs1 = velObs1 > 0 ? 3 : -3;
    velObs2 = velObs2 > 0 ? 2 : -2;
    velObs3 = velObs3 > 0 ? 4 : -4;
    velObs4 = velObs4 > 0 ? 3 : -3;
    velObs5 = velObs5 > 0 ? 2 : -2;
  }
}


// movimento dos obstacuos
function moverObstaculos() {
  // se o jogo acabou, para aqui
  if (jogoAtivo == false) {
    return;
  }

  // obstáculo 1 anda na horizontal
  posObs1X = posObs1X + velObs1;

  if (posObs1X >= 565 || posObs1X <= 0) {
    velObs1 = velObs1 * -1;
  }

  obstaculo1.style.left = posObs1X + "px";

  // obstáculo 2 anda na vertical
  posObs2Y = posObs2Y + velObs2;

  if (posObs2Y >= 465 || posObs2Y <= 0) {
    velObs2 = velObs2 * -1;
  }

  obstaculo2.style.top = posObs2Y + "px";

  // obstáculo 3 anda na horizontal
  posObs3X = posObs3X + velObs3;

  if (posObs3X >= 565 || posObs3X <= 0) {
    velObs3 = velObs3 * -1;
  }

  obstaculo3.style.left = posObs3X + "px";

  // obstáculo 4 anda na horizontal
  posObs4X = posObs4X + velObs4;

  if (posObs4X >= 565 || posObs4X <= 0) {
    velObs4 = velObs4 * -1;
  }

  obstaculo4.style.left = posObs4X + "px";

  // obstáculo 5 anda na vertical
  posObs5Y = posObs5Y + velObs5;

  if (posObs5Y >= 465 || posObs5Y <= 0) {
    velObs5 = velObs5 * -1;
  }

  obstaculo5.style.top = posObs5Y + "px";

  // verifica colisão enquanto eles andam
  verificarColisaoObstaculos();
}


// cronometro
function iniciarTempo() {
  // limpa um cronômetro antigo
  clearInterval(intervaloTempo);

  // cria o cronômetro
  intervaloTempo = setInterval(function () {
    // se o jogo acabou, não faz nada
    if (jogoAtivo == false) {
      return;
    }

    // diminui 1 segundo
    tempo = tempo - 1;

    // mostra na tela
    painelTempo.textContent = tempo;

    // se o tempo acabar
    if (tempo <= 0) {
      clearInterval(intervaloTempo);
      jogoAtivo = false;

      mostrarMensagemCentral("⏰ TEMPO ESGOTADO!");

      setTimeout(function () {
        reiniciarJogo();
      }, 2000);
    }
  }, 1000);
}

// ============================
// INÍCIO DO JOGO
// ============================

novaMoeda();
posicionarObstaculos();
iniciarTempo();

// faz os obstáculos mexerem sozinhos
setInterval(moverObstaculos, 20);

// movimento do jogador
document.addEventListener("keydown", function (event) {
  // se o jogo acabou, não move
  if (jogoAtivo == false) {
    return;
  }

  let tecla = event.key;

  // direita
  if (tecla == "ArrowRight") {
    posX = posX + velocidade;
  }

  // esquerda
  if (tecla == "ArrowLeft") {
    posX = posX - velocidade;
  }

  // cima
  if (tecla == "ArrowUp") {
    posY = posY - velocidade;
  }

  // baixo
  if (tecla == "ArrowDown") {
    posY = posY + velocidade;
  }

  // limite da esquerda
  if (posX < 0) {
    posX = 0;
  }

  // limite da direita
  if (posX > 560) {
    posX = 560;
  }

  // limite de cima
  if (posY < 0) {
    posY = 0;
  }

  // limite de baixo
  if (posY > 460) {
    posY = 460;
  }

  // atualiza posição do jogador
  jogador.style.left = posX + "px";
  jogador.style.top = posY + "px";

  // verifica se pegou moeda ou bateu em obstáculo
  verificarColisaoMoeda();
  verificarColisaoObstaculos();
});


// colisao com a moeda
function verificarColisaoMoeda() {
  let jLeft = jogador.offsetLeft;
  let jTop = jogador.offsetTop;

  let mLeft = moeda.offsetLeft;
  let mTop = moeda.offsetTop;

  // se encostou na moeda
  if (
    jLeft < mLeft + 30 &&
    jLeft + 40 > mLeft &&
    jTop < mTop + 30 &&
    jTop + 40 > mTop
  ) {
    // ganha 1 ponto
    pontuacao = pontuacao + 1;
    painel.textContent = pontuacao;

    // toca som da moeda
    //NAO FUNCIONOU
    if (somMoeda) {
      somMoeda.currentTime = 0;
      somMoeda.play().catch(function (erro) {
        console.log("Erro no som da moeda:", erro);
      });
    }

    // ganha vida a cada 5 pontos
    // Um pouco de dificuldade, estava aumentando a vida sempre
    if (pontuacao >= proximaMetaVida && vidasGanhos < 2) {
      vida = vida + 1;
      painelVida.textContent = vida;

      vidasGanhos = vidasGanhos + 1;
      proximaMetaVida = proximaMetaVida + 5;

      mensagemColisao.textContent = "Você ganhou +1 vida!";

      setTimeout(function () {
        mensagemColisao.textContent = "";
      }, 1000);
    }

    // verifica o nível
    verificarNivel();

    // cria nova moeda
    novaMoeda();

    // verifica se venceu
    verificarVitoria();
  }
}

 
// colisao com os obstaculos
function verificarColisaoObstaculos() {
  verificarColisaoComUmObstaculo(obstaculo1);
  verificarColisaoComUmObstaculo(obstaculo2);
  verificarColisaoComUmObstaculo(obstaculo3);
  verificarColisaoComUmObstaculo(obstaculo4);
  verificarColisaoComUmObstaculo(obstaculo5);
}

function verificarColisaoComUmObstaculo(obstaculo) {
  let jLeft = jogador.offsetLeft;
  let jTop = jogador.offsetTop;

  let oLeft = obstaculo.offsetLeft;
  let oTop = obstaculo.offsetTop;

  // se bateu no obstáculo
  if (
    jLeft < oLeft + 35 &&
    jLeft + 40 > oLeft &&
    jTop < oTop + 35 &&
    jTop + 40 > oTop
  ) {
    // evita perder muitas vidas de uma vez
    if (podePerderVida == true && jogoAtivo == true) {
      mensagemColisao.textContent = "Você colidiu com um obstáculo!";

      // toca som de dano
      if (somDano) {
        somDano.currentTime = 0;
        somDano.play().catch(function (erro) {
          console.log("Erro no som do dano:", erro);
        });
      }

      // perde 1 vida
      vida = vida - 1;
      painelVida.textContent = vida;
      podePerderVida = false;

      // depois de 1 segundo pode perder vida de novo
      setTimeout(function () {
        podePerderVida = true;
      }, 1000);

      // limpa a mensagem pequena
      setTimeout(function () {
        mensagemColisao.textContent = "";
      }, 1000);

      // verifica se perdeu
      verificarGameOver();
    }
  }
}

// ============================
// VITÓRIA
// ============================

function verificarVitoria() {
  // vence com 10 pontos
  if (pontuacao >= 10) {
    jogoAtivo = false;
    clearInterval(intervaloTempo);

    mostrarMensagemCentral("🏆 VOCÊ VENCEU!");

    setTimeout(function () {
      reiniciarJogo();
    }, 3000);
  }
}

// ============================
// GAME OVER
// ============================

function verificarGameOver() {
  // perde se a vida acabar
  if (vida <= 0) {
    jogoAtivo = false;
    clearInterval(intervaloTempo);

    mostrarMensagemCentral("💀 GAME OVER!");

    setTimeout(function () {
      reiniciarJogo();
    }, 2000);
  }
}

// ============================
// REINICIAR O JOGO
// ============================

function reiniciarJogo() {
  // volta os valores para o começo
  pontuacao = 0;
  vida = 5;
  vidasGanhos = 0;
  proximaMetaVida = 5;
  tempo = 45;
  nivel = 1;
  jogoAtivo = true;

  // atualiza na tela
  painel.textContent = pontuacao;
  painelVida.textContent = vida;
  painelTempo.textContent = tempo;
  mensagemColisao.textContent = "";
  mensagemCentral.style.display = "none";

  // volta o jogador para o começo
  posX = 280;
  posY = 180;

  jogador.style.left = posX + "px";
  jogador.style.top = posY + "px";

  // volta os obstáculos para a posição inicial
  posObs1X = 100;
  posObs1Y = 80;
  velObs1 = 3;

  posObs2X = 400;
  posObs2Y = 200;
  velObs2 = 2;

  posObs3X = 500;
  posObs3Y = 120;
  velObs3 = -4;

  posObs4X = 180;
  posObs4Y = 320;
  velObs4 = 3;

  posObs5X = 400;
  posObs5Y = 350;
  velObs5 = -2;

  // cria tudo de novo
  novaMoeda();
  posicionarObstaculos();
  iniciarTempo();
}