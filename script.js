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
        wordContainer.innerHTML = "";
        wordNow = generateWord();
        spanWord(wordNow);
        counter = 0;

        if (invalidCharacter) {
            invalidWords++;
            wrongCount.textContent = invalidWords;

            correctWords++;
            correctCount.textContent = correctWords;
        } else {
            correctWords++;
            correctCount.textContent = correctWords;
        }

        if (correctCount.textContent === '5') {
            showMessage(`Победа! Ваше время ${timer.textContent}`);
        } else if (wrongCount.textContent === '5') {
            showMessage(`Увы! Ваше время ${timer.textContent}`);
        }
    }
});

function showMessage(text) {
    alert(text);
    reset();
};

function reset() {
    counter = 0;
    wordMistakes.textContent = '0';
    correctCount.textContent = '0';
    wrongCount.textContent = '0';
    wordContainer.innerHTML = "";
    wordNow = generateWord();
    spanWord(wordNow);
    clearInterval(timerId);
    timer.textContent = '00:00';
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