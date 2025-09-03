const startBtn = document.getElementById("start-btn");
const submitBtn = document.getElementById("submit-btn");
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const endScreen = document.getElementById("end-screen");
const questionElement = document.getElementById("question");
const questionImage = document.getElementById("question-image");
const answerButtons = document.getElementById("answer-buttons");
const scoreElement = document.getElementById("score");
const finalScoreElement = document.getElementById("final-score");
const playerNameInput = document.getElementById("player-name");
const correctSound = document.getElementById("correct-sound");
const wrongSound = document.getElementById("wrong-sound");

let currentQuestionIndex = 0;
let score = 0;

let questions = [
  {
    question:
      "Qual é o alien que o Ben usa para se transformar em um ser inteligente e minúsculo?",
    image:
      "https://i.pinimg.com/736x/58/fd/ba/58fdba7f52c05956f718208dfe2b697f.jpg",
    answers: [
      { text: "Massa Cinzenta", correct: true },
      { text: "XLR8", correct: false },
      { text: "Fogo-Fátuo", correct: false },
      { text: "Diamante", correct: false },
    ],
  },
  {
    question:
      "Qual alien do Ben é super rápido e consegue correr a velocidades incríveis?",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr6JkBq70twLrgBfKh90P4yVGgLyZ4iQMgaQ&s",
    answers: [
      { text: "XLR8", correct: true },
      { text: "Chama", correct: false },
      { text: "Eco Eco", correct: false },
      { text: "Insectóide", correct: false },
    ],
  },
  {
    question:
      "Qual alien do Ben tem quatro braços super fortes para combates físicos?",
    image:
      "https://preview.redd.it/my-redesign-of-four-arms-in-ben-10-ultimate-alien-v0-7cxww0eudjib1.png?auto=webp&s=2ca38202022dec854efc72393e28de021ebde4e1",
    answers: [
      { text: "Quatro Braços", correct: true },
      { text: "Chama", correct: false },
      { text: "Eco Eco", correct: false },
      { text: "XLR8", correct: false },
    ],
  },
  {
    question:
      "Qual alien do Ben consegue criar gelo e congelar objetos ou inimigos?",
    image:
      "https://pm1.aminoapps.com/6767/c6c72b33255fc46f56854f0020a4ba48863ce44dv2_hq.jpg",
    answers: [
      { text: "Friagem", correct: true },
      { text: "Diamante", correct: false },
      { text: "Chama", correct: false },
      { text: "Insectóide", correct: false },
    ],
  },
  {
    question: "Qual alien do Ben tem capacidade de atravessar paredes?",
    image:
      "https://pm1.aminoapps.com/7819/b7b5251ae4706185fa46d374ec0f8613ae25c5dar1-1788-1754v2_hq.jpg",
    answers: [
      { text: "Fastmático", correct: true },
      { text: "XLR8", correct: false },
      { text: "Eco Eco", correct: false },
      { text: "Quatro Braços", correct: false },
    ],
  },
  {
    question: "Qual alien do Ben tem habilidades de fogo e pode lançar chamas?",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZK-TljDP-jGbgXfFHjR8F_lofUElT7BkXKg&s",
    answers: [
      { text: "Chama", correct: true },
      { text: "XLR8", correct: false },
      { text: "Diamante", correct: false },
      { text: "Eco Eco", correct: false },
    ],
  },
  {
    question: "Qual alien do Ben consegue emitir ondas sonoras poderosas?",
    image:
      "https://w7.pngwing.com/pngs/42/682/png-transparent-ben-10-character-echo-alien-alien-album-hand-sports-equipment-thumbnail.png",
    answers: [
      { text: "Eco Eco", correct: true },
      { text: "Fogo-Fátuo", correct: false },
      { text: "Quatro Braços", correct: false },
      { text: "XLR8", correct: false },
    ],
  },
  {
    question:
      "Qual alien do Ben é feito de cristal e possui grande resistência física?",
    image:
      "https://m.media-amazon.com/images/S/pv-target-images/1bf145b53328d85083984e91a5d2f8ddd4400c394c70a257f5a50ecbaec5458c.jpg",
    answers: [
      { text: "Diamante", correct: true },
      { text: "XLR8", correct: false },
      { text: "Chama", correct: false },
      { text: "Eco Eco", correct: false },
    ],
  },
  {
    question:
      "Qual alien do Ben é pequeno, verde e possui tentáculos para agarrar objetos?",
    image:
      "https://pm1.aminoapps.com/6578/8fadc0dda2ecd0d2b6d0bc7b521dd0b78efb85ef_hq.jpg",
    answers: [
      { text: "Insectóide", correct: true },
      { text: "Quatro Braços", correct: false },
      { text: "Fogo-Fátuo", correct: false },
      { text: "XLR8", correct: false },
    ],
  },
];

startBtn.addEventListener("click", startGame);
submitBtn.addEventListener("click", submitScoreAndRestart);

function startGame() {
  startScreen.classList.remove("active");
  quizScreen.classList.add("active");
  currentQuestionIndex = 0;
  score = 0;
  scoreElement.innerText = score;
  showQuestion();
}

function showQuestion() {
  resetState();
  if (currentQuestionIndex >= questions.length) {
    endGame();
    return;
  }
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;
  questionImage.src = currentQuestion.image;
  questionImage.alt = currentQuestion.question;

  const shuffledAnswers = currentQuestion.answers.sort(
    () => Math.random() - 0.5
  );

  shuffledAnswers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) button.dataset.correct = answer.correct;
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  answerButtons.innerHTML = "";
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === "true";

  if (correct) {
    score += 10;
    correctSound.currentTime = 0;
    correctSound.play();
  } else {
    wrongSound.currentTime = 0;
    wrongSound.play();
  }

  scoreElement.innerText = score;
  currentQuestionIndex++;
  setTimeout(showQuestion, 800);
}

function endGame() {
  quizScreen.classList.remove("active");
  endScreen.classList.add("active");
  finalScoreElement.innerText = score;

  if (score === questions.length * 10) {
    document.getElementById("end-message").innerText = "Você venceu!";
  } else {
    document.getElementById("end-message").innerText = "Fim de jogo!";
  }
}

function submitScoreAndRestart() {
  const name = playerNameInput.value || "Jogador";
  const ranking = JSON.parse(localStorage.getItem("ranking")) || [];
  ranking.push({ name, score });
  localStorage.setItem("ranking", JSON.stringify(ranking));

  playerNameInput.value = "";

  endScreen.classList.remove("active");
  startScreen.classList.add("active");
}
