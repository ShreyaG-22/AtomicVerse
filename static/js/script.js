// Global variables
let elements = [];
let currentQuiz = {
    level: '',
    questions: [],
    currentQuestionIndex: 0,
    userAnswers: [],
    startTime: null,
    timer: null,
    timeTaken: 0
};

// Quiz questions data
const quizQuestions = {
    beginner: [
        {
            question: "What is the chemical symbol for Gold?",
            options: ["Go", "Gd", "Au", "Ag"],
            correctAnswer: 2
        },
        {
            question: "How many elements are in the first period of the periodic table?",
            options: ["2", "8", "18", "32"],
            correctAnswer: 0
        },
        {
            question: "Which element has the atomic number 1?",
            options: ["Helium", "Oxygen", "Hydrogen", "Lithium"],
            correctAnswer: 2
        },
        {
            question: "What is the lightest noble gas?",
            options: ["Neon", "Helium", "Argon", "Krypton"],
            correctAnswer: 1
        },
        {
            question: "Which of these is a halogen?",
            options: ["Sodium", "Chlorine", "Calcium", "Iron"],
            correctAnswer: 1
        },
        {
            question: "What is the chemical symbol for Iron?",
            options: ["Ir", "Fe", "In", "Fr"],
            correctAnswer: 1
        },
        {
            question: "Which element is liquid at room temperature?",
            options: ["Bromine", "Chlorine", "Iodine", "Fluorine"],
            correctAnswer: 0
        },
        {
            question: "What is the main component of the air we breathe?",
            options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
            correctAnswer: 2
        },
        {
            question: "Which element is used in light bulbs?",
            options: ["Neon", "Argon", "Krypton", "Xenon"],
            correctAnswer: 1
        },
        {
            question: "What is the chemical symbol for Silver?",
            options: ["Si", "Sv", "Ag", "Au"],
            correctAnswer: 2
        }
    ],
    intermediate: [
        {
            question: "Which element has the highest electronegativity?",
            options: ["Oxygen", "Fluorine", "Chlorine", "Nitrogen"],
            correctAnswer: 1
        },
        {
            question: "What is the atomic number of Carbon?",
            options: ["6", "12", "14", "16"],
            correctAnswer: 0
        },
        {
            question: "Which group of elements are known as alkaline earth metals?",
            options: ["Group 1", "Group 2", "Group 17", "Group 18"],
            correctAnswer: 1
        },
        {
            question: "What is the electronic configuration of Neon?",
            options: ["1s² 2s² 2p⁶", "1s² 2s² 2p⁴", "1s² 2s² 2p²", "1s² 2s² 2p⁵"],
            correctAnswer: 0
        },
        {
            question: "Which element is a semiconductor?",
            options: ["Copper", "Silicon", "Sodium", "Aluminum"],
            correctAnswer: 1
        },
        {
            question: "What is the state of Mercury at room temperature?",
            options: ["Solid", "Liquid", "Gas", "Plasma"],
            correctAnswer: 1
        },
        {
            question: "Which element has the highest melting point?",
            options: ["Tungsten", "Carbon", "Osmium", "Rhenium"],
            correctAnswer: 1
        },
        {
            question: "What is the most abundant element in the Earth's crust?",
            options: ["Oxygen", "Silicon", "Aluminum", "Iron"],
            correctAnswer: 0
        },
        {
            question: "Which of these is a transition metal?",
            options: ["Calcium", "Potassium", "Copper", "Magnesium"],
            correctAnswer: 2
        },
        {
            question: "What is the atomic mass of Sodium approximately?",
            options: ["11", "23", "35", "39"],
            correctAnswer: 1
        }
    ],
    advanced: [
        {
            question: "Which element has the highest ionization energy?",
            options: ["Helium", "Hydrogen", "Fluorine", "Neon"],
            correctAnswer: 0
        },
        {
            question: "What is the electronic configuration of Chromium?",
            options: ["[Ar] 4s² 3d⁴", "[Ar] 4s¹ 3d⁵", "[Ar] 4s² 3d⁵", "[Ar] 4s¹ 3d⁴"],
            correctAnswer: 1
        },
        {
            question: "Which element has the largest atomic radius?",
            options: ["Francium", "Cesium", "Rubidium", "Potassium"],
            correctAnswer: 0
        },
        {
            question: "What is the oxidation state of Oxygen in OF₂?",
            options: ["-2", "-1", "+1", "+2"],
            correctAnswer: 3
        },
        {
            question: "Which element is diamagnetic?",
            options: ["Oxygen", "Sodium", "Nitrogen", "Neon"],
            correctAnswer: 3
        },
        {
            question: "What is the hybridization of Carbon in CO₂?",
            options: ["sp", "sp²", "sp³", "sp³d"],
            correctAnswer: 0
        },
        {
            question: "Which lanthanide has the highest melting point?",
            options: ["Lutetium", "Cerium", "Gadolinium", "Dysprosium"],
            correctAnswer: 0
        },
        {
            question: "What is the most electronegative element?",
            options: ["Fluorine", "Oxygen", "Chlorine", "Nitrogen"],
            correctAnswer: 0
        },
        {
            question: "Which element has the highest electron affinity?",
            options: ["Chlorine", "Fluorine", "Oxygen", "Bromine"],
            correctAnswer: 0
        },
        {
            question: "What is the coordination number in a face-centered cubic structure?",
            options: ["6", "8", "12", "14"],
            correctAnswer: 2
        }
    ]
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('AtomicVerse initialized');
    
    // Initialize page-specific functionality
    if (document.querySelector('.periodic-table')) {
        initializePeriodicTable();
    }
    
    if (document.getElementById('mnemonic-form')) {
        initializeMnemonicsPage();
    }
    
    if (document.querySelector('.quiz-levels')) {
        initializeQuizzesPage();
    }
    
    if (document.getElementById('auth-forms')) {
        initializeProfilePage();
    }
    
    // Initialize modal close functionality
    initializeModal();
});

// Modal initialization
function initializeModal() {
    const modal = document.getElementById('element-modal');
    if (modal) {
        const closeBtn = modal.querySelector('.close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        }
        
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
}

// ==================== PERIODIC TABLE FUNCTIONS ====================

function initializePeriodicTable() {
    console.log('Initializing periodic table...');
    
    // Load elements from JSON file
    if (typeof elementsData !== 'undefined') {
        elements = elementsData.elements;
        console.log(`Loaded ${elements.length} elements from JSON`);
        createPeriodicTable();
    } else {
        console.error('Elements data not found. Make sure elements.json is loaded.');
        // Create a basic fallback table
        createBasicPeriodicTable();
    }
    
    // Add event listeners
    document.getElementById('search-btn').addEventListener('click', handleSearch);
    document.getElementById('clear-search').addEventListener('click', clearSearch);
    document.getElementById('search-input').addEventListener('keyup', function(event) {
        if (event.key === 'Enter') handleSearch();
    });
    
    const categoryCheckboxes = document.querySelectorAll('.category-filters input[type="checkbox"]');
    categoryCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', handleCategoryFilter);
    });
    
    document.getElementById('state-filter').addEventListener('change', handleStateFilter);
    document.getElementById('reset-filters').addEventListener('click', resetFilters);
}

function createPeriodicTable() {
    const container = document.getElementById('periodic-table');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Create grid structure: 11 rows (including header) × 19 columns (including labels)
    
    // Add group labels (top row)
    for (let col = 0; col <= 18; col++) {
        const cell = document.createElement('div');
        if (col === 0) {
            // Empty corner cell
            cell.className = 'empty-cell';
        } else {
            cell.className = 'group-label';
            cell.textContent = col;
            cell.style.gridColumn = col + 1;
            cell.style.gridRow = 1;
        }
        container.appendChild(cell);
    }
    
    // Add period labels and elements
    for (let row = 1; row <= 7; row++) {
        // Add period label
        const periodLabel = document.createElement('div');
        periodLabel.className = 'period-label';
        periodLabel.textContent = row;
        periodLabel.style.gridColumn = 1;
        periodLabel.style.gridRow = row + 1;
        container.appendChild(periodLabel);
        
        // Add elements for this period
        for (let col = 1; col <= 18; col++) {
            const element = elements.find(el => el.period === row && el.group === col);
            
            if (element) {
                createElementCell(element, container, col + 1, row + 1);
            } else {
                // Create empty cell for spacing
                const emptyCell = document.createElement('div');
                emptyCell.className = 'empty-cell';
                emptyCell.style.gridColumn = col + 1;
                emptyCell.style.gridRow = row + 1;
                container.appendChild(emptyCell);
            }
        }
    }
    
    // Add lanthanides and actinides
    addSpecialElements(container);
}

function createElementCell(element, container, gridColumn, gridRow) {
    const elementDiv = document.createElement('div');
    elementDiv.className = `element ${element.category}`;
    elementDiv.style.gridColumn = gridColumn;
    elementDiv.style.gridRow = gridRow;
    elementDiv.dataset.number = element.number;
    elementDiv.title = `${element.name} (${element.symbol}) - ${formatCategory(element.category)}`;
    
    elementDiv.innerHTML = `
        <span class="element-number">${element.number}</span>
        <span class="element-symbol">${element.symbol}</span>
        <span class="element-name">${element.name}</span>
    `;
    
    elementDiv.addEventListener('click', () => showElementDetails(element));
    container.appendChild(elementDiv);
}

function addSpecialElements(container) {
    // Lanthanides (row 9)
    const lanthanides = elements.filter(el => el.category === 'lanthanide');
    const lanthanideLabel = document.createElement('div');
    lanthanideLabel.className = 'period-label';
    lanthanideLabel.textContent = '*';
    lanthanideLabel.title = 'Lanthanides';
    lanthanideLabel.style.gridColumn = 1;
    lanthanideLabel.style.gridRow = 9;
    container.appendChild(lanthanideLabel);
    
    lanthanides.forEach((element, index) => {
        createElementCell(element, container, index + 4, 9);
    });
    
    // Actinides (row 10)
    const actinides = elements.filter(el => el.category === 'actinide');
    const actinideLabel = document.createElement('div');
    actinideLabel.className = 'period-label';
    actinideLabel.textContent = '**';
    actinideLabel.title = 'Actinides';
    actinideLabel.style.gridColumn = 1;
    actinideLabel.style.gridRow = 10;
    container.appendChild(actinideLabel);
    
    actinides.forEach((element, index) => {
        createElementCell(element, container, index + 4, 10);
    });
}

function createBasicPeriodicTable() {
    const container = document.getElementById('periodic-table');
    if (!container) return;
    
    container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px;">
            <h3 style="color: var(--secondary); margin-bottom: 15px;">Periodic Table</h3>
            <p style="color: var(--text-light); margin-bottom: 20px;">Loading element data...</p>
            <div style="background: var(--pastel-blue); padding: 20px; border-radius: var(--border-radius);">
                <p style="margin-bottom: 10px;">If elements don't load, please check:</p>
                <ul style="text-align: left; display: inline-block;">
                    <li>elements.json file exists in static/data/</li>
                    <li>JSON file is properly formatted</li>
                    <li>Browser console for errors</li>
                </ul>
            </div>
        </div>
    `;
}

function showElementDetails(element) {
    const modal = document.getElementById('element-modal');
    const detailsContainer = document.getElementById('element-details');
    
    if (!modal || !detailsContainer) return;
    
    detailsContainer.innerHTML = `
        <h3>
            <span class="element-symbol" style="background: inherit; padding: 8px 15px; border-radius: 8px; border: 2px solid currentColor;">
                ${element.symbol}
            </span>
            ${element.name}
        </h3>
        <div class="element-detail"><span>Atomic Number:</span><span>${element.number}</span></div>
        <div class="element-detail"><span>Atomic Weight:</span><span>${element.atomicWeight}</span></div>
        <div class="element-detail"><span>Category:</span><span>${formatCategory(element.category)}</span></div>
        <div class="element-detail"><span>State at Room Temperature:</span><span>${formatState(element.state)}</span></div>
        <div class="element-detail"><span>Melting Point:</span><span>${element.meltingPoint}°C</span></div>
        <div class="element-detail"><span>Boiling Point:</span><span>${element.boilingPoint}°C</span></div>
        <div class="element-detail"><span>Electronic Configuration:</span><span>${element.electronicConfig}</span></div>
        <div class="element-detail"><span>Discovered By:</span><span>${element.discoveredBy}</span></div>
        <div class="element-detail"><span>Group:</span><span>${element.group}</span></div>
        <div class="element-detail"><span>Period:</span><span>${element.period}</span></div>
    `;
    
    modal.style.display = 'block';
}

function handleSearch() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase().trim();
    
    if (!searchTerm) {
        clearSearch();
        return;
    }
    
    const matchingElements = elements.filter(element => 
        element.name.toLowerCase().includes(searchTerm) ||
        element.symbol.toLowerCase().includes(searchTerm) ||
        element.number.toString().includes(searchTerm)
    );
    
    // Remove previous highlights
    document.querySelectorAll('.element').forEach(el => {
        el.classList.remove('highlighted');
    });
    
    // Highlight matching elements
    matchingElements.forEach(element => {
        const elementDiv = document.querySelector(`.element[data-number="${element.number}"]`);
        if (elementDiv) {
            elementDiv.classList.add('highlighted');
            // Scroll to the first matching element
            if (matchingElements[0] === element) {
                elementDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
    
    if (matchingElements.length === 0) {
        alert('No elements found matching your search.');
    }
}

function clearSearch() {
    document.getElementById('search-input').value = '';
    document.querySelectorAll('.element').forEach(el => {
        el.classList.remove('highlighted');
    });
}

function handleCategoryFilter() {
    applyFilters();
}

function handleStateFilter() {
    applyFilters();
}

function applyFilters() {
    const selectedCategories = Array.from(document.querySelectorAll('.category-filters input[type="checkbox"]:checked'))
        .map(checkbox => checkbox.value);
    
    const stateFilter = document.getElementById('state-filter').value;
    
    document.querySelectorAll('.element').forEach(el => {
        const elementNumber = parseInt(el.dataset.number);
        const element = elements.find(e => e.number === elementNumber);
        
        if (!element) return;
        
        const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(element.category);
        const stateMatch = stateFilter === 'all' || element.state === stateFilter;
        
        if (categoryMatch && stateMatch) {
            el.style.display = 'flex';
            el.style.opacity = '1';
        } else {
            el.style.display = 'flex';
            el.style.opacity = '0.3';
        }
    });
}

function resetFilters() {
    // Uncheck all category checkboxes
    document.querySelectorAll('.category-filters input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });
    
    // Reset state filter
    document.getElementById('state-filter').value = 'all';
    
    // Clear search
    clearSearch();
    
    // Reset all elements to full visibility
    document.querySelectorAll('.element').forEach(el => {
        el.style.display = 'flex';
        el.style.opacity = '1';
        el.classList.remove('highlighted');
    });
}

// ==================== MNEMONICS PAGE FUNCTIONS ====================

function initializeMnemonicsPage() {
    console.log('Initializing mnemonics page...');
    
    // Like button functionality
    document.querySelectorAll('.like-btn').forEach(button => {
        button.addEventListener('click', function() {
            const mnemonicId = this.dataset.mnemonicId;
            handleLikeMnemonic(mnemonicId, this);
        });
    });

    // Form submission feedback
    const mnemonicForm = document.getElementById('mnemonic-form');
    if (mnemonicForm) {
        mnemonicForm.addEventListener('submit', function(e) {
            const title = document.getElementById('mnemonic-title').value;
            const content = document.getElementById('mnemonic-content').value;
            
            if (title && content) {
                // Show loading state
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = 'Adding...';
                submitBtn.disabled = true;
                
                // Re-enable after 2 seconds in case of error
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }
        });
    }
}

function handleLikeMnemonic(mnemonicId, button) {
    // Check if it's a default mnemonic (not in database)
    if (mnemonicId.startsWith('default')) {
        if (!isAuthenticated) {
            alert('Please log in to like mnemonics.');
            return;
        }
        
        // Handle like for default mnemonics (client-side only)
        const likeCount = button.querySelector('span');
        let currentLikes = parseInt(likeCount.textContent);
        
        if (button.classList.contains('liked')) {
            currentLikes--;
            button.classList.remove('liked');
        } else {
            currentLikes++;
            button.classList.add('liked');
        }
        
        likeCount.textContent = currentLikes;
        return;
    }
    
    // Handle like for database mnemonics
    if (!isAuthenticated) {
        alert('Please log in to like mnemonics.');
        return;
    }
    
    fetch(`/like-mnemonic/${mnemonicId}/`, {
        method: 'POST',
        headers: {
            'X-CSRFToken': csrfToken,
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        if (data.success !== false) {
            const likeCount = button.querySelector('span');
            likeCount.textContent = data.like_count;
            
            if (data.liked) {
                button.classList.add('liked');
            } else {
                button.classList.remove('liked');
            }
        }
    })
    .catch(error => {
        console.error('Error liking mnemonic:', error);
        alert('Error liking mnemonic. Please try again.');
    });
}

// ==================== QUIZZES PAGE FUNCTIONS ====================

function initializeQuizzesPage() {
    console.log('Initializing quizzes page...');
    
    document.querySelectorAll('.start-quiz').forEach(button => {
        button.addEventListener('click', function() {
            const level = this.closest('.level-card').dataset.level;
            startQuiz(level);
        });
    });
    
    document.getElementById('prev-btn').addEventListener('click', showPreviousQuestion);
    document.getElementById('next-btn').addEventListener('click', showNextQuestion);
    document.getElementById('submit-btn').addEventListener('click', submitQuiz);
    
    document.getElementById('retry-quiz').addEventListener('click', retryQuiz);
    document.getElementById('back-to-levels').addEventListener('click', showQuizLevels);
}

function startQuiz(level) {
    document.querySelector('.quiz-levels').classList.add('hidden');
    document.getElementById('quiz-container').classList.remove('hidden');
    
    currentQuiz.level = level;
    currentQuiz.questions = [...quizQuestions[level]];
    currentQuiz.currentQuestionIndex = 0;
    currentQuiz.userAnswers = new Array(currentQuiz.questions.length).fill(null);
    currentQuiz.startTime = new Date();
    currentQuiz.timeTaken = 0;
    
    // Update quiz title
    document.getElementById('quiz-title').textContent = `${level.charAt(0).toUpperCase() + level.slice(1)} Level Quiz`;
    
    shuffleArray(currentQuiz.questions);
    startTimer(3 * 60); // 3 minutes
    displayQuestion();
}

function startTimer(duration) {
    const timerElement = document.getElementById('timer');
    let timeLeft = duration;
    
    clearInterval(currentQuiz.timer);
    
    currentQuiz.timer = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        currentQuiz.timeTaken = duration - timeLeft;
        
        // Update progress bar
        updateProgressBar();
        
        if (timeLeft <= 0) {
            clearInterval(currentQuiz.timer);
            submitQuiz();
        }
        
        timeLeft--;
    }, 1000);
}

function updateProgressBar() {
    const progressFill = document.getElementById('progress-fill');
    if (progressFill) {
        const progress = ((currentQuiz.currentQuestionIndex + 1) / currentQuiz.questions.length) * 100;
        progressFill.style.width = `${progress}%`;
    }
}

function displayQuestion() {
    const question = currentQuiz.questions[currentQuiz.currentQuestionIndex];
    const questionCounter = document.getElementById('question-counter');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    
    if (!questionCounter || !questionText || !optionsContainer) return;
    
    // Update question counter
    questionCounter.textContent = `Question ${currentQuiz.currentQuestionIndex + 1}/${currentQuiz.questions.length}`;
    
    // Update question text
    questionText.textContent = question.question;
    
    // Clear and update options
    optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        if (currentQuiz.userAnswers[currentQuiz.currentQuestionIndex] === index) {
            optionElement.classList.add('selected');
        }
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(optionElement);
    });
    
    // Update navigation buttons
    document.getElementById('prev-btn').disabled = currentQuiz.currentQuestionIndex === 0;
    document.getElementById('next-btn').classList.toggle('hidden', currentQuiz.currentQuestionIndex === currentQuiz.questions.length - 1);
    document.getElementById('submit-btn').classList.toggle('hidden', currentQuiz.currentQuestionIndex !== currentQuiz.questions.length - 1);
    
    // Update progress bar
    updateProgressBar();
}

function selectOption(optionIndex) {
    currentQuiz.userAnswers[currentQuiz.currentQuestionIndex] = optionIndex;
    
    const options = document.querySelectorAll('.option');
    options.forEach((option, index) => {
        if (index === optionIndex) {
            option.classList.add('selected');
        } else {
            option.classList.remove('selected');
        }
    });
}

function showPreviousQuestion() {
    if (currentQuiz.currentQuestionIndex > 0) {
        currentQuiz.currentQuestionIndex--;
        displayQuestion();
    }
}

function showNextQuestion() {
    if (currentQuiz.currentQuestionIndex < currentQuiz.questions.length - 1) {
        currentQuiz.currentQuestionIndex++;
        displayQuestion();
    }
}

function submitQuiz() {
    clearInterval(currentQuiz.timer);
    
    let score = 0;
    currentQuiz.questions.forEach((question, index) => {
        if (currentQuiz.userAnswers[index] === question.correctAnswer) {
            score++;
        }
    });
    
    // Save score to database if user is authenticated
    if (isAuthenticated) {
        fetch(submitQuizUrl, {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrfToken,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                level: currentQuiz.level,
                score: score,
                total_questions: currentQuiz.questions.length,
                time_taken: currentQuiz.timeTaken
            })
        })
        .then(response => response.json())
        .then(data => {
            if (!data.success) {
                console.error('Failed to save quiz score');
            }
        })
        .catch(error => {
            console.error('Error saving quiz score:', error);
        });
    }
    
    showQuizResults(score);
}

function showQuizResults(score) {
    document.getElementById('quiz-container').classList.add('hidden');
    document.getElementById('results-container').classList.remove('hidden');
    
    document.getElementById('score-value').textContent = score;
    
    // Update time taken
    const minutes = Math.floor(currentQuiz.timeTaken / 60);
    const seconds = currentQuiz.timeTaken % 60;
    document.getElementById('time-taken').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    // Update difficulty
    document.getElementById('quiz-difficulty').textContent = currentQuiz.level.charAt(0).toUpperCase() + currentQuiz.level.slice(1);
    
    const performanceMessage = document.getElementById('performance-message');
    const percentage = (score / currentQuiz.questions.length) * 100;
    
    if (percentage >= 90) {
        performanceMessage.textContent = '🎉 Excellent! You have mastered this level.';
        performanceMessage.style.color = 'var(--success)';
    } else if (percentage >= 70) {
        performanceMessage.textContent = '👍 Good job! You have a solid understanding.';
        performanceMessage.style.color = 'var(--success)';
    } else if (percentage >= 50) {
        performanceMessage.textContent = '💪 Not bad! Keep practicing to improve.';
        performanceMessage.style.color = 'var(--warning)';
    } else {
        performanceMessage.textContent = '📚 Keep studying! You\'ll do better next time.';
        performanceMessage.style.color = 'var(--danger)';
    }
}

function retryQuiz() {
    startQuiz(currentQuiz.level);
    document.getElementById('results-container').classList.add('hidden');
}

function showQuizLevels() {
    document.getElementById('results-container').classList.add('hidden');
    document.querySelector('.quiz-levels').classList.remove('hidden');
}

// ==================== PROFILE PAGE FUNCTIONS ====================

function initializeProfilePage() {
    console.log('Initializing profile page...');
    
    document.querySelectorAll('.tab-btn').forEach(button => {
        button.addEventListener('click', function() {
            const tab = this.dataset.tab;
            switchAuthTab(tab);
        });
    });
    
    // Password confirmation validation
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            const password = document.getElementById('signup-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            if (password !== confirmPassword) {
                e.preventDefault();
                alert('Passwords do not match! Please check your password confirmation.');
                return false;
            }
            
            if (password.length < 6) {
                e.preventDefault();
                alert('Password should be at least 6 characters long.');
                return false;
            }
        });
    }
}

function switchAuthTab(tab) {
    // Update active tab button
    document.querySelectorAll('.tab-btn').forEach(button => {
        button.classList.toggle('active', button.dataset.tab === tab);
    });
    
    // Show corresponding form
    document.querySelectorAll('.auth-form').forEach(form => {
        form.classList.toggle('active', form.id === `${tab}-form`);
    });
}

// ==================== UTILITY FUNCTIONS ====================

function formatCategory(category) {
    const categoryMap = {
        'alkali-metal': 'Alkali Metal',
        'alkaline-earth': 'Alkaline Earth Metal',
        'transition': 'Transition Metal',
        'basic-metal': 'Basic Metal',
        'semiconductor': 'Semiconductor',
        'non-metal': 'Non-metal',
        'halogen': 'Halogen',
        'noble-gas': 'Noble Gas',
        'lanthanide': 'Lanthanide',
        'actinide': 'Actinide'
    };
    
    return categoryMap[category] || category;
}

function formatState(state) {
    const stateMap = {
        'solid': 'Solid',
        'liquid': 'Liquid',
        'gas': 'Gas'
    };
    
    return stateMap[state] || state;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Add CSS for liked state and other dynamic styles
const style = document.createElement('style');
style.textContent = `
    .like-btn.liked {
        color: #e74c3c;
        background: rgba(231, 76, 60, 0.1);
    }
    
    .current-user {
        font-weight: bold;
        color: var(--secondary);
        background: rgba(33, 158, 188, 0.1);
    }
    
    .alert {
        padding: 15px 20px;
        margin: 10px 0;
        border-radius: var(--border-radius);
        border: 1px solid transparent;
        box-shadow: var(--shadow);
    }
    
    .alert-success {
        color: #155724;
        background-color: #d4edda;
        border-color: #c3e6cb;
    }
    
    .alert-error {
        color: #721c24;
        background-color: #f8d7da;
        border-color: #f5c6cb;
    }
    
    .alert-info {
        color: #0c5460;
        background-color: #d1ecf1;
        border-color: #bee5eb;
    }
    
    .messages {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000;
        max-width: 400px;
    }
    
    /* Animation for element highlighting */
    @keyframes pulse {
        0% { box-shadow: 0 0 15px var(--accent); }
        50% { box-shadow: 0 0 20px var(--accent); }
        100% { box-shadow: 0 0 15px var(--accent); }
    }
    
    .element.highlighted {
        border: 3px solid var(--accent);
        box-shadow: 0 0 15px var(--accent);
        z-index: 5;
        animation: pulse 2s infinite;
    }
`;
document.head.appendChild(style);

// Error handling for missing elements
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

// Export functions for global access (if needed)
window.AtomicVerse = {
    initializePeriodicTable,
    handleSearch,
    clearSearch,
    startQuiz,
    switchAuthTab,
    formatCategory,
    formatState
};