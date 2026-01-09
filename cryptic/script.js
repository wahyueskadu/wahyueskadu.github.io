// --- DATA ---
const puzzleData = {
    clue: "Some cheap arrogant bird (6)",
    answer: "PARROTer",
    length: 9,
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
 const gridEl = document.getElementById('input-container');

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
    renderKeyboard();
   function renderKeyboard() {
            const layout = [
                "QWERTYUIOP",
                "ASDFGHJKL",
                "ZXCVBNM"
            ];
            const kbContainer = document.getElementById('keyboard');

            layout.forEach(rowStr => {
                const rowDiv = document.createElement('div');
                rowDiv.className = 'kb-row';
                
                rowStr.split('').forEach(char => {
                    const btn = document.createElement('div');
                    btn.className = 'kb-key';
                    btn.textContent = char;
                    btn.addEventListener('click', () => handleInput(char));
                    rowDiv.appendChild(btn);
                });

                // Add Backspace to last row
                if (rowStr.startsWith('Z')) {
                    const backBtn = document.createElement('div');
                    backBtn.className = 'kb-key wide';
                    backBtn.innerHTML = '⌫';
                    backBtn.addEventListener('click', handleBackspace);
                    rowDiv.appendChild(backBtn);
                }

                kbContainer.appendChild(rowDiv);
            });
        }

               // Wire up Check button
        document.getElementById('check-btn').addEventListener('click', checkAnswer);

        // Optional: Support physical keyboard too
        document.addEventListener('keydown', (e) => {
            if(e.key.match(/^[a-zA-Z]$/)) handleInput(e.key.toUpperCase());
            if(e.key === 'Backspace') handleBackspace();
            if(e.key === 'ArrowLeft') setFocus(currentFocusIndex - 1);
            if(e.key === 'ArrowRight') setFocus(currentFocusIndex + 1);
        });
  // --- CORE LOGIC ---
        function setFocus(index) {
            if (index < 0 || index >= data.length) return;
            currentFocusIndex = index;
            
            // Visual Update
            document.querySelectorAll('.char-box').forEach(b => b.classList.remove('active'));
            const currentBox = gridEl.children[index];
            currentBox.classList.add('active');
        }

        function handleInput(char) {
            const currentBox = gridEl.children[currentFocusIndex];
            currentBox.textContent = char;
            
            // Move to next
            if (currentFocusIndex < data.length - 1) {
                setFocus(currentFocusIndex + 1);
            }
        }

        function handleBackspace() {
            const currentBox = gridEl.children[currentFocusIndex];
            
            if (currentBox.textContent === '') {
                // If empty, move back and delete
                if (currentFocusIndex > 0) {
                    setFocus(currentFocusIndex - 1);
                    gridEl.children[currentFocusIndex].textContent = '';
                }
            } else {
                // Just delete current
                currentBox.textContent = '';
            }
        }