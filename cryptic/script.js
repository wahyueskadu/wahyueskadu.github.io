// --- DATA ---
const puzzleData = {
    clue: "Some cheap arrogant bird (6)",
    answer: "PARROT",
    length: 6,
    breakdown: {
        definition: "bird",
        indicator: "Some (Hidden Word Container)",
        fodder: "cheaP ARROganT"
    }
};

// --- ELEMENTS ---
const clueTextEl = document.getElementById('clue-text');
const inputContainerEl = document.getElementById('input-container');
const checkBtn = document.getElementById('check-btn');
const breakdownContainer = document.getElementById('breakdown-container');
const themeSwitcher = document.getElementById('theme-switcher');

// --- INITIALIZATION ---
function initGame() {
    clueTextEl.textContent = `${puzzleData.clue}`;
    generateBoxes(puzzleData.length);
    populateBreakdown();
}

function populateBreakdown() {
    document.getElementById('bd-def').textContent = puzzleData.breakdown.definition;
    document.getElementById('bd-ind').textContent = puzzleData.breakdown.indicator;
    document.getElementById('bd-fod').textContent = puzzleData.breakdown.fodder;
}

function generateBoxes(num) {
    inputContainerEl.innerHTML = '';
    for (let i = 0; i < num; i++) {
        const input = document.createElement('input');
        input.type = 'text';
        input.maxLength = 1;
        input.className = 'char-box';
        input.dataset.index = i;
        
        // Auto-focus next box behavior
        input.addEventListener('keyup', (e) => {
             if (e.key.length === 1 && e.key.match(/[a-z]/i)) {
                 input.value = e.key.toUpperCase();
                 const next = input.nextElementSibling;
                 if (next) next.focus();
             } else if (e.key === 'Backspace') {
                 const prev = input.previousElementSibling;
                 if (prev) prev.focus();
             }
        });
        
        inputContainerEl.appendChild(input);
    }
    // Focus first box
    inputContainerEl.children[0].focus();
}

// --- LOGIC ---
function checkAnswer() {
    const inputs = document.querySelectorAll('.char-box');
    let userAnswer = '';
    inputs.forEach(input => userAnswer += input.value);

    if (userAnswer === puzzleData.answer) {
        // Success state
        inputs.forEach(input => input.classList.add('correct'));
        checkBtn.textContent = "Correct!";
        checkBtn.disabled = true;
        // Reveal the breakdown data
        breakdownContainer.classList.remove('hidden');
    } else {
        // Failure state
        inputs.forEach(input => {
            input.classList.add('shake');
            setTimeout(() => input.classList.remove('shake'), 500);
        });
    }
}

checkBtn.addEventListener('click', checkAnswer);

// Theme Switcher Logic (For demo purposes)
themeSwitcher.addEventListener('change', (e) => {
    document.getElementById('theme-stylesheet').href = e.target.value;
});

initGame();