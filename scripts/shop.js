let insiderTradingUnlocked = false;
let marketManipulationActive = false;
let manipulationTimeout;

function buyInsiderTrading() {
    if (money >= 1) {
        money -= 1;
        insiderTradingUnlocked = true;
        updateStats();
        alert("Insider Trading unlocked!");
    } else {
        alert("Not enough money!");
    }
}

let bots = [];
const botCost = 50;
const trendLength = 5;
const buyThreshold = -0.1; // Herkempi osto
const sellThreshold = 0.1; // Herkempi myynti

function buyTradingBot() {
    if (money >= botCost) {
        money -= botCost;
        const newBot = { type: 'trading', active: true };
        bots.push(newBot);
        updateStats();
        alert("Trading Bot purchased!");
    } else {
        alert("Not enough money to buy a bot!");
    }
}

function calculateTrend() {
    if (stockPrices.length < trendLength) return 0;

    let sum = 0;
    for (let i = stockPrices.length - trendLength; i < stockPrices.length - 1; i++) {
        sum += (stockPrices[i + 1] - stockPrices[i]);
    }
    return sum / trendLength;
}

function runBots() {
    const trend = calculateTrend();
    console.log(`Current trend: ${trend.toFixed(2)}`);

    bots.forEach(bot => {
        if (bot.active) {
            // Jos trendi on negatiivinen, botti ostaa
            if (trend < buyThreshold && money >= stockPrice) {
                console.log("Bot ostaa osakkeita...");
                buyStock();
                updateStats();
                drawChart();
            }

            // Jos trendi on positiivinen, botti myy
            if (trend > sellThreshold && shares > 0) {
                console.log("Bot myy osakkeita...");
                sellStock();
                updateStats();
                drawChart();
            }
        }
    });
}

// Trading Botit toimivat automaattisesti 1 sekunnin välein
setInterval(runBots, 100);


function buyMarketManipulation() {
    if (money >= 1) {
        money -= 1;
        activateMarketManipulation();
        updateStats();
        alert("Market Manipulation activated for 15 seconds!");
    } else {
        alert("Not enough money!");
    }
}

function activateMarketManipulation() {
    marketManipulationActive = true;
    if (manipulationTimeout) clearTimeout(manipulationTimeout);
    manipulationTimeout = setTimeout(() => {
        marketManipulationActive = false;
    }, 15000);
}
