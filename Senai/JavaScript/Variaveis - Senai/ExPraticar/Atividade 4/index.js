const VALOR_FRETE_GRATIS = 150;

function verificarFrete() {
  const valorCompra = Number(document.getElementById("valorCompra").value);

  if (valorCompra > VALOR_FRETE_GRATIS) {
    document.getElementById("resultado").textContent =
      "Você ganhou frete grátis!";
  } else {
    document.getElementById("resultado").textContent =
      "Sua compra não atingiu o valor para frete grátis.";
  }
}