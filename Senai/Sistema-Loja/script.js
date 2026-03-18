const home = document.getElementById("home");
const menu = document.getElementById("menu");
const sobre = document.getElementById("sobre");
const contato = document.getElementById("contato");
const carrinho = document.getElementById("carrinho");
const pagamento = document.getElementById("pagamento");

const secoes = [home, menu, sobre, contato, carrinho, pagamento];

let itensCarrinho = [];

// valor fixo da entrega
const taxaEntrega = 8;

function mostrarSecao(secao) {
    secoes.forEach(item => {
        item.style.display = "none";
    });

    secao.style.display = "block";
}

document.getElementById("btn-home").addEventListener("click", function (event) {
    event.preventDefault();
    mostrarSecao(home);
});

document.getElementById("btn-menu").addEventListener("click", function (event) {
    event.preventDefault();
    mostrarSecao(menu);
});

document.getElementById("btn-sobre").addEventListener("click", function (event) {
    event.preventDefault();
    mostrarSecao(sobre);
});

document.getElementById("btn-contato").addEventListener("click", function (event) {
    event.preventDefault();
    mostrarSecao(contato);
});

document.getElementById("btn-carrinho").addEventListener("click", function (event) {
    event.preventDefault();
    mostrarSecao(carrinho);
});

// botão para ir para a tela de pagamento
document.getElementById("btn-pagamento").addEventListener("click", function () {
    atualizarPagamento();
    mostrarSecao(pagamento);
});

function adicionarCarrinho(nome, preco) {
    itensCarrinho.push({ nome, preco });

    atualizarCarrinho();
    mostrarSecao(carrinho);
}

function removerItem(indice) {
    itensCarrinho.splice(indice, 1);
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const listaCarrinho = document.getElementById("lista-carrinho");
    const subtotalTexto = document.getElementById("subtotal");
    const taxaEntregaTexto = document.getElementById("taxa-entrega");
    const totalTexto = document.getElementById("total");

    listaCarrinho.innerHTML = "";

    // soma o valor dos produtos
    let subtotal = 0;

    itensCarrinho.forEach((item, indice) => {
        subtotal += item.preco;

        const li = document.createElement("li");

        const texto = document.createElement("span");
        texto.textContent = `${item.nome} - R$ ${item.preco.toFixed(2).replace(".", ",")}`;

        const botaoRemover = document.createElement("button");
        botaoRemover.textContent = "Remover";
        botaoRemover.onclick = function () {
            removerItem(indice);
        };

        li.appendChild(texto);
        li.appendChild(botaoRemover);

        li.style.display = "flex";
        li.style.justifyContent = "space-between";
        li.style.alignItems = "center";
        li.style.gap = "10px";

        listaCarrinho.appendChild(li);
    });

    let entregaFinal = 0;
    if (itensCarrinho.length > 0) {
        entregaFinal = taxaEntrega;
    }

    const totalFinal = subtotal + entregaFinal;

    subtotalTexto.textContent = `Subtotal: R$ ${subtotal.toFixed(2).replace(".", ",")}`;
    taxaEntregaTexto.textContent = `Taxa de entrega: R$ ${entregaFinal.toFixed(2).replace(".", ",")}`;
    totalTexto.textContent = `Total: R$ ${totalFinal.toFixed(2).replace(".", ",")}`;
}

function atualizarPagamento() {
    const resumoPagamento = document.getElementById("resumo-pagamento");

    let subtotal = 0;

    itensCarrinho.forEach(item => {
        subtotal += item.preco;
    });

    let entregaFinal = 0;
    if (itensCarrinho.length > 0) {
        entregaFinal = taxaEntrega;
    }

    const totalFinal = subtotal + entregaFinal;

    if (itensCarrinho.length === 0) {
        resumoPagamento.textContent = "Seu carrinho está vazio.";
    } else {
        resumoPagamento.innerHTML = `
            Produtos: R$ ${subtotal.toFixed(2).replace(".", ",")} <br>
            Taxa de entrega: R$ ${entregaFinal.toFixed(2).replace(".", ",")} <br>
            Total final: R$ ${totalFinal.toFixed(2).replace(".", ",")}
        `;
    }
}