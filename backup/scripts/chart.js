const canvas = document.getElementById('chart');
const ctx = canvas.getContext('2d');
let stockPrices = [5];
let maxPrice = 10;
let trend = 0.02;
let buyPoints = [];
let sellPoints = [];
const lineLifetime = 5000; // Viivojen näkyvyysaika millisekunteina (5 sekuntia)
const fadeSpeed = 0.01; // Fading-efektin nopeus

// Piirtää käyrän ja viivat
function drawChart() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const scaleFactor = canvas.height / maxPrice;

    // Piirretään käyrä dynaamisilla väreillä
    for (let i = 1; i < stockPrices.length; i++) {
        const prevPrice = stockPrices[i - 1];
        const currentPrice = stockPrices[i];
        const x1 = (i - 1) * (canvas.width / stockPrices.length);
        const y1 = canvas.height - prevPrice * scaleFactor;
        const x2 = i * (canvas.width / stockPrices.length);
        const y2 = canvas.height - currentPrice * scaleFactor;

        // Määritetään käyrän väri hinnan muutoksen perusteella
        ctx.strokeStyle = currentPrice > prevPrice ? 'green' : 'red';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

    // Piirretään osto- ja myyntiviivat
    drawMarkers(buyPoints, 'green');
    drawMarkers(sellPoints, 'red');
}

function drawMarkers(points, color) {
    const currentTime = Date.now();
    points.forEach(point => {
        const timeElapsed = currentTime - point.time;
        if (timeElapsed < lineLifetime) {
            // Lasketaan opacity fading-efektiä varten
            const opacity = 1 - (timeElapsed / lineLifetime);
            drawVerticalLine(point.index, color, opacity);
        }
    });

    // Poistetaan vanhat viivat, jotka ovat haihtuneet kokonaan
    points = points.filter(point => Date.now() - point.time < lineLifetime);
}

// Piirtää pystysuoran viivan osto-/myyntikohtaan
function drawVerticalLine(index, color, opacity) {
    const x = index * (canvas.width / stockPrices.length);
    ctx.strokeStyle = color;
    ctx.globalAlpha = opacity; // Asetetaan opacity fading-efektiä varten
    ctx.lineWidth = 1; // Ohut viiva
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
    ctx.globalAlpha = 1; // Resetoi opacity
}

// Päivittää osakkeen hintaa
function updateStockPrice() {
    const lastPrice = stockPrices[stockPrices.length - 1];
    let change = (Math.random() - 0.5) * 1.5;
    change += trend;

    if (Math.random() < 0.1) change += (Math.random() - 0.5) * 10;
    if (Math.random() < 0.01) change += (Math.random() > 0.5 ? 15 : -15);

    const newPrice = Math.max(1, lastPrice + change);
    stockPrices.push(newPrice);

    if (newPrice > maxPrice) maxPrice = newPrice;
    if (stockPrices.length > canvas.width / 4) stockPrices.shift();

    drawChart();
    document.getElementById('stockPrice').innerText = newPrice.toFixed(2);
    stockPrice = newPrice;
}

setInterval(updateStockPrice, 500);
