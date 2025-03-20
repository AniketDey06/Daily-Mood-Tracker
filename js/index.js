function initializeMockData() {
    if (!localStorage.getItem('moodLogs')) {
        let mockData = {
            "2025-03-15": "😀",
            "2025-03-16": "😢",
            "2025-03-17": "😐",
            "2025-03-18": "🤩",
            "2025-03-19": "😡"
        };
        localStorage.setItem('moodLogs', JSON.stringify(mockData));
    }
}

// Event listener for mood selection
document.querySelectorAll('.mood').forEach(mood => {
    mood.addEventListener('click', function () {
        let selectedMood = this.dataset.mood;
        let today = new Date().toISOString().split('T')[0];
        let moods = JSON.parse(localStorage.getItem('moodLogs')) || {};

        if (moods[today]) {
            alert("You've already submitted your mood for today!");
            return;
        }

        moods[today] = selectedMood;
        localStorage.setItem('moodLogs', JSON.stringify(moods));
        document.getElementById('selected-mood').textContent = `Today's Mood: ${selectedMood}`;
        displayMoodHistory(); // Refresh table
    });
});

// FIXED FUNCTION TO PROPERLY DISPLAY DATA
function displayMoodHistory() {
    let moods = JSON.parse(localStorage.getItem('moodLogs')) || {};
    let cardleft = document.getElementById('cardleft');
    let cardright = document.getElementById('cardright');

    // ✅ FIX: Clear previous content before adding new data
    cardleft.innerHTML = ''; 
    cardright.innerHTML = '';

    Object.keys(moods).sort().reverse().forEach(date => {
        let mooddate = document.createElement('div');
        mooddate.classList.add("item");
        mooddate.textContent = `${moods[date]}`;

        let mood = document.createElement('div');
        mood.classList.add("item");
        mood.textContent = `${date}`;

        cardleft.appendChild(mooddate);
        cardright.appendChild(mood);
    });
}

// Clear history function
function clearHistory() {
    localStorage.removeItem('moodLogs');
    document.getElementById('cardleft').innerHTML = '';  // ✅ FIX: Clear correct elements
    document.getElementById('cardright').innerHTML = '';
}

initializeMockData();
displayMoodHistory();
