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
