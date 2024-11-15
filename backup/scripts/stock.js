let money = 100;
let stockPrice = 5;
let shares = 0;

function buyStock() {
    if (money >= stockPrice) {
        money -= stockPrice;
        shares++;
        buyPoints.push({ index: stockPrices.length - 1, time: Date.now() });
        updateStats();
        drawChart();
    }
}

function sellStock() {
    if (shares > 0) {
        money += stockPrice;
        shares--;
        sellPoints.push({ index: stockPrices.length - 1, time: Date.now() });
        updateStats();
        drawChart();
    }
}

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
