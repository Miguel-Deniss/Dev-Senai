// pega os elementos do html
const jogo = document.getElementById("jogo");
const jogador = document.getElementById("jogador");
const pontosTexto = document.getElementById("pontos");
const vidasTexto = document.getElementById("vidas");
const nivelTexto = document.getElementById("nivel");
const mensagem = document.getElementById("mensagem");

// variáveis do jogo
let pontos = 0;
let vidas = 3;
let nivel = 1;
let jogoAtivo = true;

// posição do jogador
let jogadorX = 20;
let jogadorY = 220;
let velocidade = 20;

// palavras por nível
const fases = {
  1: {
    corretas: ["A", "E", "I", "O", "U"],
    erradas: ["1", "7", "%", "#", "@"]
  },
  2: {
    corretas: ["BA", "CA", "LA", "BO", "TO"],
    erradas: ["9X", "!!", "3@", "&&", "??"]
  },
  3: {
    corretas: ["CASA", "BOLA", "GATO", "FLOR", "LIVRO"],
    erradas: ["XZPT", "BRTU", "PLQW", "ZZKK", "TRXP"]
  }
};

// array que guarda as palavras criadas
let palavrasNaTela = [];

// atualiza a posição do jogador
function atualizarJogador() {
  jogador.style.left = jogadorX + "px";
  jogador.style.top = jogadorY + "px";
}

// atualiza o painel
function atualizarPainel() {
  pontosTexto.textContent = pontos;
  vidasTexto.textContent = vidas;
  nivelTexto.textContent = nivel;
}

// cria uma palavra
function criarPalavra(texto, tipo) {
  const div = document.createElement("div");
  div.classList.add("palavra");

  if (tipo === "correta") {
    div.classList.add("correta");
  } else {
    div.classList.add("errada");
  }

  div.textContent = texto;

  const x = Math.floor(Math.random() * 750) + 100;
  const y = Math.floor(Math.random() * 430);

  div.style.left = x + "px";
  div.style.top = y + "px";

  jogo.appendChild(div);

  palavrasNaTela.push({
    elemento: div,
    texto: texto,
    tipo: tipo
  });
}

// cria palavras da fase
function criarFase() {
  limparPalavras();

  const dados = fases[nivel];

  for (let i = 0; i < 3; i++) {
    const correta = dados.corretas[Math.floor(Math.random() * dados.corretas.length)];
    criarPalavra(correta, "correta");
  }

  for (let i = 0; i < 3; i++) {
    const errada = dados.erradas[Math.floor(Math.random() * dados.erradas.length)];
    criarPalavra(errada, "errada");
  }
}

// remove palavras antigas
function limparPalavras() {
  for (let i = 0; i < palavrasNaTela.length; i++) {
    palavrasNaTela[i].elemento.remove();
  }

  palavrasNaTela = [];
}

// verifica colisão
function verificarColisao() {
  const jogadorRect = jogador.getBoundingClientRect();

  for (let i = palavrasNaTela.length - 1; i >= 0; i--) {
    const palavraAtual = palavrasNaTela[i];
    const palavraRect = palavraAtual.elemento.getBoundingClientRect();

    if (
      jogadorRect.left < palavraRect.right &&
      jogadorRect.right > palavraRect.left &&
      jogadorRect.top < palavraRect.bottom &&
      jogadorRect.bottom > palavraRect.top
    ) {
      if (palavraAtual.tipo === "correta") {
        pontos += 10;
      } else {
        pontos -= 5;
        vidas--;
      }

      palavraAtual.elemento.remove();
      palavrasNaTela.splice(i, 1);

      atualizarPainel();
      verificarFimDeJogo();
      verificarNivel();

      if (jogoAtivo && palavrasNaTela.length === 0) {
        criarFase();
      }
    }
  }
}

// verifica vitória ou derrota
function verificarFimDeJogo() {
  if (vidas <= 0) {
    mensagem.textContent = "Game Over!";
    jogoAtivo = false;
  }

  if (pontos >= 100) {
    mensagem.textContent = "Parabéns! Você venceu!";
    jogoAtivo = false;
  }
}

// sobe de nível
function verificarNivel() {
  if (pontos >= 30 && nivel === 1) {
    nivel = 2;
    mensagem.textContent = "Você passou para o nível 2!";
    atualizarPainel();
    criarFase();
  } else if (pontos >= 60 && nivel === 2) {
    nivel = 3;
    mensagem.textContent = "Você passou para o nível 3!";
    atualizarPainel();
    criarFase();
  }
}

// movimento com teclado
document.addEventListener("keydown", function(event) {
  if (jogoAtivo === false) {
    return;
  }

  if (event.key === "ArrowLeft") {
    jogadorX -= velocidade;
  } else if (event.key === "ArrowRight") {
    jogadorX += velocidade;
  } else if (event.key === "ArrowUp") {
    jogadorY -= velocidade;
  } else if (event.key === "ArrowDown") {
    jogadorY += velocidade;
  }

  if (jogadorX < 0) {
    jogadorX = 0;
  }

  if (jogadorX > 850) {
    jogadorX = 850;
  }

  if (jogadorY < 0) {
    jogadorY = 0;
  }

  if (jogadorY > 450) {
    jogadorY = 450;
  }

  atualizarJogador();
  verificarColisao();
});

// inicia o jogo
atualizarJogador();
atualizarPainel();
criarFase();