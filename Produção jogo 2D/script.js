const player = document.getElementById("player");
const jogo = document.getElementById("jogo");
const pontosEl = document.getElementById("pontos");
const vidasEl = document.getElementById("vidas");
const nivelEl = document.getElementById("nivel");

let pontos = 0;
let vidas = 3;
let playerX = 365;
let jogoRodando = false;

let velocidade = 5;
let intervaloSpawn = 1500;

// ✋ MÃO
player.innerHTML = `<img src="https://cdn-icons-png.flaticon.com/512/1077/1077063.png">`;

// 🎵 música
const musica = new Audio("https://cdn.pixabay.com/audio/2022/03/15/audio_115b9bce01.mp3");
musica.loop = true;
musica.volume = 0.3;

// 🔊 som coleta
const somColeta = new Audio("https://cdn.pixabay.com/audio/2022/03/15/audio_44f1c3b1b3.mp3");

// 🧠 base
const base = [
  { nome: "gato", img: "https://cdn-icons-png.flaticon.com/512/616/616408.png" },
  { nome: "cachorro", img: "https://cdn-icons-png.flaticon.com/512/616/616430.png" },
  { nome: "casa", img: "https://cdn-icons-png.flaticon.com/512/69/69524.png" },
  { nome: "banana", img: "https://cdn-icons-png.flaticon.com/512/590/590685.png" },
  { nome: "livro", img: "https://cdn-icons-png.flaticon.com/512/29/29302.png" },
  { nome: "carro", img: "https://cdn-icons-png.flaticon.com/512/743/743922.png" },
  { nome: "flor", img: "https://cdn-icons-png.flaticon.com/512/4147/4147970.png" },
  { nome: "sol", img: "https://cdn-icons-png.flaticon.com/512/869/869869.png" },
  { nome: "bola", img: "https://cdn-icons-png.flaticon.com/512/861/861512.png" },
  { nome: "lapis", img: "https://cdn-icons-png.flaticon.com/512/2721/2721297.png" }
];

// 🎮 iniciar
function iniciarJogo(nivelEscolhido) {
  document.getElementById("menu").style.display = "none";
  document.getElementById("gameUI").style.display = "block";
  jogoRodando = true;

  musica.play();

  if (nivelEscolhido === 1) {
    velocidade = 4;
    intervaloSpawn = 1500;
  } else if (nivelEscolhido === 2) {
    velocidade = 7;
    intervaloSpawn = 1000;
  } else {
    velocidade = 10;
    intervaloSpawn = 700;
  }

  nivelEl.innerText = nivelEscolhido;

  setInterval(criarPalavra, intervaloSpawn);
}

// 🎮 movimento
document.addEventListener("keydown", (e) => {
  if (!jogoRodando) return;

  if (e.key === "ArrowLeft" && playerX > 0) playerX -= 20;
  if (e.key === "ArrowRight" && playerX < 730) playerX += 20;

  player.style.left = playerX + "px";
});

// 🧠 criar palavra
function criarPalavra() {
  const palavra = document.createElement("div");
  palavra.classList.add("palavra");

  const item = base[Math.floor(Math.random() * base.length)];
  const erro = Math.random() > 0.5;

  let imagem;

  if (erro) {
    let outro;
    do {
      outro = base[Math.floor(Math.random() * base.length)];
    } while (outro.nome === item.nome);

    imagem = outro.img;
    palavra.dataset.tipo = "errada";
  } else {
    imagem = item.img;
    palavra.dataset.tipo = "correta";
  }

  palavra.innerHTML = `<img src="${imagem}">${item.nome}`;
  palavra.style.left = Math.random() * 720 + "px";
  jogo.appendChild(palavra);

  let top = 0;

  const cair = setInterval(() => {
    if (!jogoRodando) return;

    top += velocidade;
    palavra.style.top = top + "px";

    if (
      top > 300 &&
      palavra.offsetLeft < playerX + 70 &&
      palavra.offsetLeft + 80 > playerX
    ) {
      somColeta.currentTime = 0;
      somColeta.play();

      palavra.classList.add("coletado");

      setTimeout(() => {
        if (palavra.dataset.tipo === "correta") {
          pontos += 10;
        } else {
          pontos -= 5;
          vidas--;
        }

        pontosEl.innerText = pontos;
        vidasEl.innerText = vidas;

        palavra.remove();
      }, 300);

      clearInterval(cair);
    }

    if (top > 400) {
      palavra.remove();
      clearInterval(cair);
    }

    if (vidas <= 0) {
      mostrarTelaFinal("😢 Game Over!");
    }

    if (pontos >= 200) {
      mostrarTelaFinal("🎉 Parabéns! Você venceu!");
    }

  }, 50);
}

// 🏆 tela final
function mostrarTelaFinal(texto) {
  jogoRodando = false;
  musica.pause();

  document.getElementById("gameUI").style.display = "none";
  document.getElementById("telaFinal").style.display = "flex";

  document.getElementById("mensagemFinal").innerText = texto;
}

// 🔁 reiniciar
function reiniciarJogo() {
  location.reload();
}