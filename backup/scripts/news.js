const newsWindow = document.getElementById('news-window');
const newsContent = document.getElementById('news-content');
const closeNewsButton = document.getElementById('close-news');

const newsMessages = [
    "Market crash expected! Brace yourself!",
    "Rumors of insider trading spark panic.",
    "Unexpected surge in tech stocks!",
    "Economic instability in the crypto market.",
    "A mysterious investor is manipulating the market.",
    "Your investments seem unusually profitable... why?"
];

function showNews() {
    // Valitaan satunnainen viesti
    const randomMessage = newsMessages[Math.floor(Math.random() * newsMessages.length)];
    newsContent.innerText = randomMessage;

    // Näytetään uutisikkuna
    newsWindow.classList.remove('hidden');

    // Sulje ikkuna automaattisesti 10 sekunnin kuluttua
    setTimeout(() => {
        newsWindow.classList.add('hidden');
    }, 10000);
}

// Sulje ikkuna, kun painiketta klikataan
closeNewsButton.addEventListener('click', () => {
    newsWindow.classList.add('hidden');
});

// Näytetään uutisikkuna satunnaisesti
function startNewsUpdates() {
    setInterval(() => {
        if (Math.random() < 0.2) { // 20% todennäköisyys 10 sekunnin välein
            showNews();
        }
    }, 10000);
}

startNewsUpdates();
