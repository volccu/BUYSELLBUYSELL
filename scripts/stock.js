let money = 100;
let stockPrice = 5;
let shares = 0;

// Hiiren tapahtumankäsittelyt ja osto/myyntitoiminnot modulaarisena funktioina
function handleBuy(event) {
    if (money >= stockPrice) {
        money -= stockPrice;
        shares++;
        buyPoints.push({ index: stockPrices.length - 1, time: Date.now() });
        updateStats();
        drawChart();
    }
}

function handleSell(event) {
    if (shares > 0) {
        money += stockPrice;
        shares--;
        sellPoints.push({ index: stockPrices.length - 1, time: Date.now() });
        updateStats();
        drawChart();
    }
}

function setupEventListeners() {
    canvas.addEventListener('mousedown', (event) => {
        event.preventDefault(); // Estä context menu
        if (event.button === 0) handleBuy(event); // Vasen hiiren klikkaus ostaa
        else if (event.button === 2) handleSell(event); // Oikea hiiren klikkaus myy
    });

    canvas.addEventListener('contextmenu', (event) => {
        event.preventDefault(); // Estä oikean hiiren valikko
    });
}

function animateMoneyChange(amount) {
    const moneyElement = document.getElementById('money');

    // Pomppausanimaatio
    moneyElement.classList.add('bounce');
    setTimeout(() => moneyElement.classList.remove('bounce'), 300);

    // Värinvaihto vihreäksi tai punaiseksi
    if (amount > 0) {
        moneyElement.classList.add('highlight-green');
    } else {
        moneyElement.classList.add('highlight-red');
    }

    // Poista värinvaihto hetken kuluttua
    setTimeout(() => {
        moneyElement.classList.remove('highlight-green');
        moneyElement.classList.remove('highlight-red');
    }, 500);
}

function buyStock() {
    if (money >= stockPrice) {
        money -= stockPrice;
        shares++;
        buyPoints.push({ index: stockPrices.length - 1, time: Date.now() });
        updateStats();
        drawChart();
        animateMoneyChange(-stockPrice); // Animaatio ostolle
    }
}

function sellStock() {
    if (shares > 0) {
        money += stockPrice;
        shares--;
        sellPoints.push({ index: stockPrices.length - 1, time: Date.now() });
        updateStats();
        drawChart();
        animateMoneyChange(stockPrice); // Animaatio myynnille
    }
}

function updateStats() {
    document.getElementById('money').innerText = money.toFixed(2);
    document.getElementById('shares').innerText = shares;
    document.getElementById('stockPrice').innerText = stockPrice.toFixed(2);
}


// Kutsutaan tapahtumankäsittelijöiden alustusta
setupEventListeners();


function updateStats() {
    document.getElementById('money').innerText = money.toFixed(2);
    document.getElementById('shares').innerText = shares;
    document.getElementById('stockPrice').innerText = stockPrice.toFixed(2);
}

canvas.addEventListener('mousedown', (event) => {
    if (event.button === 0) {
        buyStock();
    } else if (event.button === 2) {
        sellStock();
    }
});

canvas.addEventListener('contextmenu', (event) => {
    event.preventDefault();
});
