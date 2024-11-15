const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
let currentDayIndex = 0;

function updateDay() {
    currentDayIndex = (currentDayIndex + 1) % days.length;
    document.getElementById('currentDay').innerText = days[currentDayIndex];
}

setInterval(updateDay, 60000); // Yksi päivä = 1 minuutti
