const precoDoProduto = 30;
const taxaDeEntrega = 5;

  function calcular(){
let quantidadeInput = document.getElementById("Quantidade").value
let totalProdutos = quantidadeInput * precoDoProduto
let totalEntrega = totalProdutos + taxaDeEntrega

document.getElementById("resulado").innerHTML = 
"Valor total do pedido é: R$ " + totalPedido
  }
