// Function to initialize mock data in LocalStorage (for demonstration purposes)
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
        let selectedMood = this.dataset.mood; // Get selected mood from data attribute
        let today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
        let moods = JSON.parse(localStorage.getItem('moodLogs')) || {}; // Retrieve stored moods or initialize an empty object

        // Check if today's mood is already logged
        if (moods[today]) {
            alert("You've already submitted your mood for today!");
            return;
        }

        // Store the selected mood with today's date
        moods[today] = selectedMood;
        localStorage.setItem('moodLogs', JSON.stringify(moods));
        
        // Update the UI to reflect the selected mood
        document.getElementById('selected-mood').textContent = `Today's Mood: ${selectedMood}`;
        
        // Refresh the mood history table
        displayMoodHistory();
    });
});

// Function to display mood history in the table
function displayMoodHistory() {
    let moods = JSON.parse(localStorage.getItem('moodLogs')) || {}; // Retrieve stored moods
    let cardleft = document.getElementById('cardleft'); // Left column for dates
    let cardright = document.getElementById('cardright'); // Right column for moods

    // Clear previous content before updating
    cardleft.innerHTML = ''; 
    cardright.innerHTML = '';

    // Loop through sorted mood records and create elements dynamically
    Object.keys(moods).sort().reverse().forEach(date => {
        let mooddate = document.createElement('div');
        mooddate.classList.add("item");
        mooddate.textContent = `${date}`; // Display date

        let mood = document.createElement('div');
        mood.classList.add("item");
        mood.textContent = `${moods[date]}`; // Display mood emoji

        cardleft.appendChild(mooddate);
        cardright.appendChild(mood);
    });
}

// Function to clear mood history from LocalStorage and UI
function clearHistory() {
    localStorage.removeItem('moodLogs'); // Remove stored mood data
    document.getElementById('cardleft').innerHTML = ''; // Clear left column
    document.getElementById('cardright').innerHTML = ''; // Clear right column
}

// Initialize mock data and display mood history when the page loads
initializeMockData();
displayMoodHistory();
