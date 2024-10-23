const numberTable = document.getElementById('number-table');
const selectedNumbers = [];
const numbersDisplay = document.getElementById('numbers');
const autoSelectButton = document.getElementById('auto-select');
const generateNumbersButton = document.getElementById('generate-numbers');
const clearSelectionButton = document.getElementById('clear-selection');
const lotteryResultsDisplay = document.getElementById('lottery-results');
const modal = document.getElementById('modal');
const closeButton = document.querySelector('.close-button');
const newGameButton = document.getElementById('new-game');
const winningNumbersDisplay = document.getElementById('winning-numbers');
const matchesCountDisplay = document.getElementById('matches-count');
const statsButton = document.getElementById('stats-button'); // Statistics button
const statsDisplay = document.getElementById('stats-display'); // Statistics display
let buttons = [];

// Initialize match statistics
let matchStats = JSON.parse(localStorage.getItem('matchStats')) || Array(7).fill(0);

// Generate number buttons in a table (7 numbers per row)
let row;
for (let i = 1; i <= 49; i++) {
    if ((i - 1) % 7 === 0) {
        row = document.createElement('tr');
        numberTable.appendChild(row);
    }
    const cell = document.createElement('td');
    const button = document.createElement('button');
    button.textContent = i;
    button.classList.add('number-button');
    button.addEventListener('click', () => handleNumberClick(i, button));
    cell.appendChild(button);
    row.appendChild(cell);
    buttons.push(button);
}

// Handle number click
function handleNumberClick(number, button) {
    const index = selectedNumbers.indexOf(number);
    if (index === -1) {
        if (selectedNumbers.length < 6) {
            selectedNumbers.push(number);
            button.classList.add('selected');
        } else {
            alert('You can only select up to 6 numbers.');
        }
    } else {
        selectedNumbers.splice(index, 1);
        button.classList.remove('selected');
    }
    updateDisplay();
}

// Update selected numbers
function updateDisplay() {
    numbersDisplay.textContent = selectedNumbers.sort((a, b) => a - b).join(', ');
}

// Automatically choose 6 random numbers
autoSelectButton.addEventListener('click', () => {
    selectedNumbers.length = 0;
    buttons.forEach(button => button.classList.remove('selected'));
    
    while (selectedNumbers.length < 6) {
        const randomNum = Math.floor(Math.random() * 49) + 1;
        if (!selectedNumbers.includes(randomNum)) {
            selectedNumbers.push(randomNum);
            buttons[randomNum - 1].classList.add('selected');
        }
    }
    updateDisplay();
});

// Generate 6 random lottery numbers and check for matches
generateNumbersButton.addEventListener('click', () => {
    if (selectedNumbers.length !== 6) {
        alert('Please select 6 numbers first.');
        return;
    }

    const lotteryNumbers = [];
    while (lotteryNumbers.length < 6) {
        const randomNum = Math.floor(Math.random() * 49) + 1;
        if (!lotteryNumbers.includes(randomNum)) {
            lotteryNumbers.push(randomNum);
        }
    }

    const sortedLotteryNumbers = lotteryNumbers.sort((a, b) => a - b);
    const matches = selectedNumbers.filter(num => sortedLotteryNumbers.includes(num));
    const matchesCount = matches.length;

    // Update match statistics
    matchStats[matchesCount]++;
    localStorage.setItem('matchStats', JSON.stringify(matchStats)); // Save to local storage

    lotteryResultsDisplay.innerHTML = `
        Winning Numbers: <strong>${highlightNumbers(sortedLotteryNumbers, selectedNumbers)}</strong><br>
        Your Selected Numbers: <strong>${highlightNumbers(selectedNumbers, sortedLotteryNumbers)}</strong><br>
        Matches: <strong>${matchesCount}</strong>`;

    winningNumbersDisplay.innerHTML = `Winning Numbers: ${highlightNumbers(sortedLotteryNumbers, selectedNumbers)}`;
    matchesCountDisplay.innerHTML = `Matches: ${matchesCount}`;

    modal.style.display = 'block'; // Show the modal
});

// Highlight numbers based on matches
function highlightNumbers(numbers, selected) {
    return numbers.map(num => {
        return selected.includes(num) ? `<span class="match">${num}</span>` : `<span class="no-match">${num}</span>`;
    }).join(', ');
}

// Clear selected numbers and reset the display
clearSelectionButton.addEventListener('click', () => {
    selectedNumbers.length = 0;
    buttons.forEach(button => button.classList.remove('selected'));
    numbersDisplay.textContent = '';
    winningNumbersDisplay.innerHTML = '';
    matchesCountDisplay.innerHTML = '';
});

// Close the modal when the close button is clicked
closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close the modal when clicking outside of the modal content
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// New game button functionality
newGameButton.addEventListener('click', () => {
    selectedNumbers.length = 0;
    buttons.forEach(button => button.classList.remove('selected'));
    numbersDisplay.textContent = '';
    winningNumbersDisplay.innerHTML = '';
    matchesCountDisplay.innerHTML = '';
    modal.style.display = 'none';
});

// Show statistics when the statistics button is clicked
statsButton.addEventListener('click', () => {
    const totalGames = matchStats.reduce((acc, count) => acc + count, 0); // Total games played
    let statsHtml = '<h2>Statistics</h2>'; // Add a heading for better structure
    
    // Display total games played
    statsHtml += `
        <div class="stats-item">
            Total Games Played: <span>${totalGames}</span>
        </div>
    `;

    for (let i = 0; i < matchStats.length; i++) {
        const count = matchStats[i];
        const percentage = totalGames > 0 ? ((count / totalGames) * 100).toFixed(2) : 0; // Calculate percentage
        statsHtml += `
            <div class="stats-item">
                Matches ${i}: <span>${count}</span> 
                <span class="percentage">(${percentage}%)</span>
            </div>`;
    }

    statsDisplay.innerHTML = statsHtml;
    statsDisplay.style.display = 'block'; // Show the statistics display
});




// Hide statistics when clicking outside of the statistics display
window.addEventListener('click', (event) => {
    if (event.target !== statsButton && event.target !== statsDisplay) {
        statsDisplay.style.display = 'none'; // Hide statistics display
    }
});
