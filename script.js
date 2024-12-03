const correctCount = document.querySelector('.correct-count');
const wrongCount = document.querySelector('.wrong-count');
const wordMistakes = document.querySelector('.word-mistakes');
const wordContainer = document.querySelector('.word');
const timer = document.querySelector('#timer');

let counter = 0;
let invalidCharacter = 0;
let correctWords = 0;
let invalidWords = 0;
let timeLeft = 0;
let timerId;

function generateWord() {
    const words = ["cat", "instagram", "elegance", "javascript", "girl", "luck", "youtube", "amour", "cinema", "love", "sunlight"];

    const index = Math.floor(Math.random() * words.length);

    return words[index];
};

function spanWord(word) {
    wordContainer.innerHTML = word.split("").map((letter) => `<span>${letter}</span>`).join("");
};

let wordNow = generateWord();
spanWord(wordNow);
startTimer();

document.addEventListener('keydown', (event) => {
    const spans = document.querySelectorAll(".word span");

    if (event.key.toLowerCase() !== wordNow[counter]) {
        spans[counter].classList.add('w');

        invalidCharacter++
        wordMistakes.textContent = invalidCharacter;
    } else {
        spans[counter].classList.remove('w');
        spans[counter].classList.add('c');
        counter++;
    }

    if (counter === spans.length) {
        updateCounters();
        nextWord();
    }
});

function showMessage(text) {
    alert(text);
    reset();
};

function reset() {
    counter = 0;
    invalidCharacter = 0;
    wordMistakes.textContent = '0';
    correctWords = -1;
    correctCount.textContent = '0';
    invalidWords = 0;
    wrongCount.textContent = '0';
    wordContainer.innerHTML = "";
    wordNow = generateWord();
    spanWord(wordNow);
    clearInterval(timerId);
    createStringTime();
    timeLeft = 0;
    timer.textContent = '00:00';
    updateCounters();
    startTimer();
}

function createStringTime() {
    const minutes = Math.floor(timeLeft / 60);
    const message = `${addingZero(minutes)}:${addingZero(timeLeft)}`;

    timer.textContent = message;
};

function addingZero(num) {
    if (num < 10) {
        return `0${num}`;
    } else {
        return num;
    }
};

function startTimer() {
    timerId = setInterval(() => {
        createStringTime();

        if (timeLeft >= 59) {
            clearInterval(timerId);
        }

        timeLeft++;
    }, 1000);
};

function updateCounters() {
    if (invalidCharacter) {
        invalidWords++;
        wrongCount.textContent = invalidWords;

    } else {
        correctWords++;
        correctCount.textContent = correctWords;
    }
};

function nextWord() {
    setTimeout(() => {
        wordContainer.innerHTML = "";
        wordNow = generateWord();
        spanWord(wordNow);
        counter = 0;
        invalidCharacter = 0;
        wordMistakes.textContent = invalidCharacter;

        cheakGameOver();
    }, 0);
};

function cheakGameOver() {
    if (correctCount.textContent === '5') {
        showMessage(`Победа! Ваше время ${timer.textContent}`);
    } else if (wrongCount.textContent === '5') {
        showMessage(`Увы! Ваше время ${timer.textContent}`);
    }
};