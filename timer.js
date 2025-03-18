
// Function to initialize or retrieve the countdown end date
function getCountdownEndDate() {
    // Check if we already have a saved end date
    const savedEndDate = localStorage.getItem('countdownEndDate');
    
    if (savedEndDate) {
        return new Date(parseInt(savedEndDate));
    } else {
        // First time visitor - set end date to 45 days from now
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + 45);
        
        // Save the end date to localStorage
        localStorage.setItem('countdownEndDate', endDate.getTime().toString());
        
        return endDate;
    }
}

// Calculate time remaining until target date
function getTimeRemaining() {
    const now = new Date();
    const endDate = getCountdownEndDate();
    const timeLeft = endDate - now;
    
    // Calculate time units
    const days = Math.max(0, Math.floor(timeLeft / (1000 * 60 * 60 * 24)));
    const hours = Math.max(0, Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const minutes = Math.max(0, Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)));
    const seconds = Math.max(0, Math.floor((timeLeft % (1000 * 60)) / 1000));
    
    // Check if countdown has expired
    const isExpired = timeLeft <= 0;
    
    return {
        total: timeLeft,
        days: String(days).padStart(2, '0'),
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0'),
        isExpired
    };
}

// For debugging/testing - allows resetting the countdown
function resetCountdown() {
    localStorage.removeItem('countdownEndDate');
    return getCountdownEndDate();
}

// Initialize countdown display on the page
function initCountdown() {
    console.log("Timer script is running");

    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    function updateCountdown() {
        // Get remaining time
        const timeRemaining = getTimeRemaining();
        
        console.log("Updating countdown...");
        console.log("Time values:", timeRemaining);

        try {
            document.getElementById('days').textContent = timeRemaining.days;
            document.getElementById('hours').textContent = timeRemaining.hours;
            document.getElementById('minutes').textContent = timeRemaining.minutes;
            document.getElementById('seconds').textContent = timeRemaining.seconds;
            
            // Optional: Handle expired countdown
            if (timeRemaining.isExpired) {
                console.log("Countdown has expired");
                // You could show a different message or take action when countdown ends
            }
        } catch (error) {
            console.error("Error updating elements:", error);
        }
    }

    // Update countdown every second
    setInterval(updateCountdown, 1000);
    
    // Initial call
    updateCountdown();
}

// Execute countdown when page loads
document.addEventListener('DOMContentLoaded', initCountdown);
