const questions = [
    {
        question: "What does a sister tie on her brother’s wrist?",
        answers: [
            { text: "Rakhi", correct: true },
            { text: "Watch", correct: false }
        ]
    },
    {
        question: "What do brothers give to their sisters?",
        answers: [
            { text: "Gifts", correct: true },
            { text: "Chocolates", correct: false }
        ]
    },
    {
        question: "Which sweet is popular during Raksha Bandhan?",
        answers: [
            { text: "Ladoo", correct: true },
            { text: "Cake", correct: false }
        ]
    },
    {
        question: "What does Raksha Bandhan celebrate?",
        answers: [
            { text: "Sibling Love", correct: true },
            { text: "School Holidays", correct: false }
        ]
    },
    {
        question: "What is the main color of Rakhi?",
        answers: [
            { text: "Red", correct: true },
            { text: "Blue", correct: false }
        ]
    }
];

const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const resultElement = document.getElementById('result');
const restartButton = document.getElementById('restart-btn');
const bgMusic = document.getElementById('bg-music');

let shuffledQuestions, currentQuestionIndex;

// Start background music
bgMusic.play();

function startGame() {
    resultElement.classList.add('hidden');
    questionContainerElement.classList.remove('hidden');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    playSound(correct);
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        currentQuestionIndex++;
        setTimeout(setNextQuestion, 1000);
    } else {
        showResult();
    }
}

function showResult() {
    questionContainerElement.classList.add('hidden');
    resultElement.classList.remove('hidden');
    confettiAnimation();
}

function confettiAnimation() {
    const confettiImage = document.createElement('img');
    confettiImage.src = 'images/confetti.gif';
    confettiImage.style.width = '100%';
    resultElement.appendChild(confettiImage);
}

function playSound(correct) {
    const audio = new Audio(correct ? 'sounds/correct.mp3' : 'sounds/incorrect.mp3');
    audio.play();
}

restartButton.addEventListener('click', startGame);

startGame();

