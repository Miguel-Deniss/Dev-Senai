const produto = 50;
const taxaEntrega = 10;
const desconto = 20;
const valorDesconto = 200;

function calcular() {
  let nome = document.getElementById("nome").value;
  let quantidade = Number(document.getElementById("quantidade").value);

  let valorProdutos = quantidade * produto;
  let descontoAplicado = 0;
  let total = 0;

  if (valorProdutos > valorDesconto) {
    descontoAplicado = desconto;
  }

  total = valorProdutos + taxaEntrega - descontoAplicado;

  document.getElementById("resNome").innerHTML = "Nome do cliente: " + nome;
  document.getElementById("resProdutos").innerHTML = "Valor dos produtos: R$ " + valorProdutos;
  document.getElementById("resTaxa").innerHTML = "Taxa de entrega: R$ " + taxaEntrega;
  document.getElementById("resDesconto").innerHTML = "Desconto aplicado: R$ " + descontoAplicado;
  document.getElementById("resTotal").innerHTML = "Total da compra: R$ " + total;
}