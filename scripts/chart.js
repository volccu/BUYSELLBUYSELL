const canvas = document.getElementById('chart');
const ctx = canvas.getContext('2d');
let stockPrices = [5];
let maxPrice = 10;
let trend = 0.02;
let buyPoints = [];
let sellPoints = [];
const lineLifetime = 5000;
const pointsPerDay = 120; // Yksi päivä sisältää 120 datapistettä (1 min)

function drawChart() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const scaleFactor = canvas.height / maxPrice;

    // Piirretään vain viimeiset 'pointsPerDay' pistettä
    const startIdx = Math.max(0, stockPrices.length - pointsPerDay);
    for (let i = startIdx + 1; i < stockPrices.length; i++) {
        const prevPrice = stockPrices[i - 1];
        const currentPrice = stockPrices[i];
        const x1 = (i - startIdx - 1) * (canvas.width / pointsPerDay);
        const y1 = canvas.height - prevPrice * scaleFactor;
        const x2 = (i - startIdx) * (canvas.width / pointsPerDay);
        const y2 = canvas.height - currentPrice * scaleFactor;

        ctx.strokeStyle = currentPrice > prevPrice ? 'green' : 'red';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

    drawMarkers(startIdx);
}

function drawMarkers(startIdx) {
    const currentTime = Date.now();
    buyPoints.forEach(point => {
        if (currentTime - point.time < lineLifetime && point.index >= 0) {
            drawVerticalLine(point.index, 'green');
        }
    });

    sellPoints.forEach(point => {
        if (currentTime - point.time < lineLifetime && point.index >= 0) {
            drawVerticalLine(point.index, 'red');
        }
    });
}


function drawVerticalLine(index, color) {
    const x = index * (canvas.width / pointsPerDay);
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
}

function updateStockPrice() {
    const lastPrice = stockPrices[stockPrices.length - 1];
    let change = (Math.random() - 0.5) * 1.5 + trend;
    const newPrice = Math.max(1, lastPrice + change);
    stockPrices.push(newPrice);

    if (newPrice > maxPrice) maxPrice = newPrice;

    // Poistetaan vanhimmat pisteet, kun lista ylittää yhden päivän
    if (stockPrices.length > pointsPerDay) {
        stockPrices.shift();

        // Päivitetään osto- ja myyntipisteiden indeksit
        buyPoints = buyPoints.map(point => ({
            ...point,
            index: point.index - 1
        })).filter(point => point.index >= 0);

        sellPoints = sellPoints.map(point => ({
            ...point,
            index: point.index - 1
        })).filter(point => point.index >= 0);
    }

    drawChart();
    document.getElementById('stockPrice').innerText = newPrice.toFixed(2);
    stockPrice = newPrice;
}


// Päivitetään osakekurssi puolen sekunnin välein
setInterval(updateStockPrice, 100);
drawChart();
