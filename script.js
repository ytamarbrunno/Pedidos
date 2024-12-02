// Dados de preços dos produtos e recheios
const produtos = {
    "sandwich": [
        { name: "Queijo coalho", price: 5.00 },
        { name: "Queijo de manteiga", price: 3.00 },
        { name: "Mortadela Bolonha", price: 5.00 },
        { name: "Misto Quente (Pão Francês)", price: 5.50 },
        { name: "Misto Quente (Pão Caixa ou Forma)", price: 6.00 },
        { name: "Pão com manteiga", price: 3.50 },
        { name: "Pão com requeijão", price: 4.00 },
        { name: "Pão com ovo", price: 4.00 },
        { name: "Pão com ovo na chapa", price: 4.50 },
    ],
    "tapioca": [
        { name: "Carne de Sol", price: 10.00 },
        { name: "Queijo Quadro", price: 10.00 },
        { name: "Bacon", price: 10.00 },
        { name: "Frango", price: 10.00 },
        { name: "Calabresa", price: 10.00 },
    ],
    "cuscuz": [
        { name: "Carne de Sol", price: 10.00 },
        { name: "Queijo Quadro", price: 10.00 },
        { name: "Bacon", price: 10.00 },
        { name: "Frango", price: 10.00 },
        { name: "Calabresa", price: 10.00 },
    ],
    "omelete": [
        { name: "Carne de Sol", price: 10.00 },
        { name: "Queijo Quadro", price: 10.00 },
        { name: "Bacon", price: 10.00 },
        { name: "Frango", price: 10.00 },
        { name: "Calabresa", price: 10.00 },
    ]
};

let pratoEscolhido = '';
let recheiosSelecionados = [];

function showOptions(prato) {
    pratoEscolhido = prato;
    recheiosSelecionados = [];
    const container = document.getElementById("options-container");
    container.innerHTML = `<h3>Escolha os ingredientes para ${prato.charAt(0).toUpperCase() + prato.slice(1)}</h3>`;
    let optionsHTML = '<div class="recheio-list">';
    
    // Mostrar as opções de recheio conforme o prato escolhido
    produtos[prato].forEach((item, index) => {
        optionsHTML += `<label class="recheio-item">
            <input type="checkbox" id="recheio-${index}" onclick="updatePrice()">
            ${item.name} - R$ ${item.price.toFixed(2)}
        </label>`;
    });

    optionsHTML += '</div>';
    container.innerHTML += optionsHTML;
}

function updatePrice() {
    const selectedRecheios = document.querySelectorAll('input[type="checkbox"]:checked');
    recheiosSelecionados = [];
    selectedRecheios.forEach((checkbox, index) => {
        if (checkbox.checked) {
            recheiosSelecionados.push(produtos[pratoEscolhido][index]);
        }
    });

    let price = 0;
    // Calculando o preço com base na quantidade de recheios
    if (recheiosSelecionados.length === 1) {
        price = 10;
    } else if (recheiosSelecionados.length === 2) {
        price = 12;
    } else if (recheiosSelecionados.length > 2) {
        price = 15;
    }

    // Mostrar o total atualizado
    document.getElementById("total-price").textContent = `Total: R$ ${price.toFixed(2)}`;
}

function printReceipt() {
    const receiptWindow = window.open("", "Recibo", "width=300,height=400");
    const receiptContent = `
        <h3>Recibo de Pedido</h3>
        <p>Prato: ${pratoEscolhido}</p>
        <p>Recheios: ${recheiosSelecionados.map(item => item.name).join(', ')}</p>
        <h3>Total: R$ ${document.getElementById("total-price").textContent.replace("Total: R$", "").trim()}</h3>
    `;
    receiptWindow.document.write(receiptContent);
    receiptWindow.print();
    receiptWindow.close();
      }
