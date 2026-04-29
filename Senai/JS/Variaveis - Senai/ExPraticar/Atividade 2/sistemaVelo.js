const VELOCIDADE = 10;
let posicao = 0;

function mover() {
    posicao += VELOCIDADE;
    document.getElementById("posicao").textContent = "Posição: " + posicao;
}