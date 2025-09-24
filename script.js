// Elementos
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const endScreen = document.getElementById("end-screen");
const startBtn = document.getElementById("start-btn");
const questionElement = document.getElementById("question");
const questionImage = document.getElementById("question-image");
const answerButtons = document.getElementById("answer-buttons");
const scoreElement = document.getElementById("score");
const finalScoreElement = document.getElementById("final-score");
const playerNameInput = document.getElementById("player-name");
const submitBtn = document.getElementById("submit-btn");
const correctSound = document.getElementById("correct-sound");
const wrongSound = document.getElementById("wrong-sound");
const timerElement = document.getElementById("time");
const lifeElement = document.getElementById("life-count");

let currentQuestionIndex = 0;
let score = 0;
let level = 1;
let questions = [];
let timer;
let timeLeft = 60;
let lives = 2;

const questionsLevel1 = [
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
    imageStyle: {
      width: "400px",
      border: "2px solid black",
      borderRadius: "10px",
    }, // Estilo da imagem
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
    imageStyle: {
      width: "400px",
      border: "2px solid black",
      borderRadius: "10px",
    },
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
    imageStyle: {
      width: "400px",
      border: "2px solid black",
      borderRadius: "10px",
    },
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
    imageStyle: {
      width: "400px",
      border: "2px solid black",
      borderRadius: "10px",
    },
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
    imageStyle: {
      width: "400px",
      border: "2px solid black",
      borderRadius: "10px",
    },
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
    imageStyle: {
      width: "400px",
      border: "2px solid black",
      borderRadius: "10px",
    },
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
    imageStyle: {
      width: "400px",
      border: "2px solid black",
      borderRadius: "10px",
    },
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
    imageStyle: {
      width: "400px",
      border: "2px solid black",
      borderRadius: "10px",
    },
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
    imageStyle: {
      width: "400px",
      border: "2px solid black",
      borderRadius: "10px",
    },
  },
];

const questionsLevel2 = [
  {
    question: "Qual é o nome do novo parceiro de Ben em Omniverse?",
    image:
      "https://preview.redd.it/zer8wexwe4m91.jpg?auto=webp&s=3ab1d64ddd4c6ee74ff3420b6384d80d618bdf5f",
    answers: [
      { text: "Kevin Levin", correct: false },
      { text: "Rook Blonko", correct: true },
      { text: "Max Tennyson", correct: false },
    ],
    imageStyle: {
      width: "400px",
      border: "2px solid black",
      borderRadius: "10px",
    },
  },
  {
    question: "Quantos anos Ben tem no início de Omniverse?",
    image:
      "https://beam-images.warnermediacdn.com/BEAM_LWM_DELIVERABLES/6bac1cc5-2946-45f5-bf4c-cbe6d4d5d029/b7fae791-6ebe-11ef-a510-023929f9f003?host=wbd-images.prod-vod.h264.io&partner=beamcom",
    answers: [
      { text: "13", correct: false },
      { text: "16", correct: true },
      { text: "11", correct: false },
    ],
    imageStyle: {
      width: "400px",
      border: "2px solid black",
      borderRadius: "10px",
    },
  },
  {
    question: "Quem é o vilão principal nas primeiras temporadas?",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVmtMGveGqv3BxiBEQ8nUdQMTyTQ9N17ni8w&s",
    answers: [
      { text: "Vilgax", correct: true },
      { text: "Khyber", correct: false },
      { text: "Albedo", correct: false },
    ],
    imageStyle: {
      width: "400px",
      border: "2px solid black",
      borderRadius: "10px",
    },
  },
  {
    question: "Qual é o nome da cidade natal de Ben?",
    image:
      "https://pm1.aminoapps.com/6348/fcbe8e6c9b8936237cdac9d3f837088e22bcc5ec_hq.jpg",
    answers: [
      { text: "Bellwood", correct: true },
      { text: "Gotham", correct: false },
      { text: "Elmore", correct: false },
    ],
    imageStyle: {
      width: "400px",
      border: "2px solid black",
      borderRadius: "10px",
    },
  },
  {
    question: "Qual alien de Ben é feito de blocos que se reorganizam?",
    image:
      "https://preview.redd.it/bloxx-is-by-far-the-most-creative-alien-the-franchise-has-v0-doapgnos5ksc1.png?auto=webp&s=8358fe792eb3e3618396a4ef749d213233e8d7ec",
    answers: [
      { text: "Gravattack", correct: false },
      { text: "Bloxx", correct: true },
      { text: "Feedback", correct: false },
    ],
    imageStyle: {
      width: "400px",
      border: "2px solid black",
      borderRadius: "10px",
    },
  },
  {
    question: "Quem criou o Omnitrix?",
    image:
      "https://i.pinimg.com/originals/1d/05/5a/1d055ab4f388beaa8c1f8aa9c2e82411.png",
    answers: [
      { text: "Azmuth", correct: true },
      { text: "Paradox", correct: false },
      { text: "Max Tennyson", correct: false },
    ],
    imageStyle: {
      width: "400px",
      border: "2px solid black",
      borderRadius: "10px",
    },
  },
  {
    question: "O que diferencia o visual do Ben adolescente?",
    image:
      "https://i.pinimg.com/originals/aa/53/b1/aa53b111104d2a348332b9d7f8f4a01f.jpg",
    answers: [
      { text: "Ele usa terno preto", correct: false },
      { text: "Cabelo espetado e jaqueta preta e verde", correct: true },
      { text: "Usa um boné vermelho", correct: false },
    ],
    imageStyle: {
      width: "400px",
      border: "2px solid black",
      borderRadius: "10px",
    },
  },
  {
    question: "Quem é o encanador que orienta Ben e Rook?",
    image:
      "https://preview.redd.it/remembering-magister-patelliday-debuts-in-ultimate-alien-is-v0-ifnejyy100we1.png?width=1000&format=png&auto=webp&s=e043dadcf8c791e4b539a56d20ebe4fd1aae476c",
    answers: [
      { text: "Azmuth", correct: false },
      { text: "Magister Patelliday", correct: true },
      { text: "Cooper", correct: false },
    ],
    imageStyle: {
      width: "400px",
      border: "2px solid black",
      borderRadius: "10px",
    },
  },
  {
    question: "Qual organização inimiga aparece com frequência?",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7Hk77IAn9y3rBvzR8waS6ns15M4TJJCEeNw&s",
    answers: [
      { text: "Os Incursianos", correct: true },
      { text: "Galvans", correct: false },
      { text: "Plumbers", correct: false },
    ],
    imageStyle: {
      width: "400px",
      border: "2px solid black",
      borderRadius: "10px",
    },
  },
  {
    question: "Quem é Malware e qual sua relação com o Omnitrix?",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcKYF8NC4IX9e7igS1AkGiPNYTrh-QRikPNC0qwnGz7yT26VFslGa2v17OtwyyRM_ycSM&usqp=CAU",
    answers: [
      { text: "Um herói alienígena do futuro", correct: false },
      {
        text: "Um Mechamorpho corrompido que quer absorver o Omnitrix",
        correct: true,
      },
      { text: "Um humano que ajudou a criar o Omnitrix", correct: false },
    ],
    imageStyle: {
      width: "400px",
      border: "2px solid black",
      borderRadius: "10px",
    },
  },
];
// Função para criar e exibir o toast
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerText = message;
  document.body.appendChild(toast);

  // Força o reflow para aplicar a animação
  setTimeout(() => {
    toast.classList.add("show");
  }, 100);

  // Remover depois de 3s
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}

// Perguntas do nível 3
const questionsLevel3 = [
  {
    question: "Quantos anos Ben tem em Força Alienígena?",
    image:
      "https://i.redd.it/remember-when-10-year-old-ben-met-up-with-16-year-old-v0-n5e8hr0almub1.png?width=360&format=png&auto=webp&s=8867b5381a32267d665c3713d59c7792e438c943",
    answers: [
      { text: "10", correct: true },
      { text: "15", correct: false },
      { text: "17", correct: false },
    ],
  },
  {
    question: "Qual é o nome do novo Omnitrix usado por Ben?",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnfZQISxUAEMQNVkeBYf-zjyDQ8Dm9CtCDvg&s",
    answers: [
      { text: "Ultimatrix", correct: true },
      { text: "Omnitrix original", correct: false },
      { text: "Omnitrix recalibrado", correct: false },
    ],
  },
  {
    question: "Qual vilão ameaça a Terra no início da série?",
    image: "https://i.redd.it/9he9keezgrs31.png",
    answers: [
      { text: "Vilgax", correct: true },
      { text: "Highbreed", correct: false },
      { text: "Aggregor", correct: false },
    ],
  },
  {
    question: "Quem se junta a Ben e Gwen nas missões?",
    image: "https://www.thehawkdown.com/s/Kevin-Stone.PNG",
    answers: [
      { text: "Kevin Levin", correct: true },
      { text: "Max Tennyson", correct: false },
      { text: "Rook Blonko", correct: false },
    ],
  },
  {
    question:
      "Qual alienígena é feito de energia pura e foi difícil de controlar?",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGRN7e_BhJX8bVQ0G1F7HNs2COZHwMiAdZGg&s",
    answers: [
      { text: "Friagem", correct: false },
      { text: "Eco Eco", correct: false },
      { text: "Megawhatts", correct: true },
    ],
  },
  {
    question: "Gwen descobre que tem poderes vindos de qual origem?",
    image: "https://pbs.twimg.com/media/EzdJ1hoXEAoF-Zx.jpg",
    answers: [
      { text: "Magia negra", correct: false },
      { text: "Energia Anodita", correct: true },
      { text: "Tecnologia alienígena", correct: false },
    ],
  },
  {
    question:
      "Qual é o nome da organização que luta contra ameaças alienígenas?",
    image:
      "https://preview.redd.it/the-plumbers-are-an-all-around-useless-organization-v0-zvlce70chmic1.png?width=1024&format=png&auto=webp&s=7d6e086d42066819a401b1fe8eb0436b08593fa5",
    answers: [
      { text: "Tennyson Corps", correct: false },
      { text: "Encanadores (Plumbers)", correct: true },
      { text: "DNAliens", correct: false },
    ],
  },
  {
    question: "Quem é o criador do Omnitrix?",
    image: "https://i.redd.it/c0swxudruj5b1.jpg",
    answers: [
      { text: "Max Tennyson", correct: false },
      { text: "Azmuth", correct: true },
      { text: "Kevin", correct: false },
    ],
  },
  {
    question:
      "Qual desses NÃO é um alienígena do Omnitrix em Força Alienígena?",
    image:
      "https://i.pinimg.com/736x/90/05/04/9005042228efe0d170b97a9472767024.jpg",
    answers: [
      { text: "Friagem", correct: false },
      { text: "Massa Cinzenta", correct: true },
      { text: "Arraia-à-Jato", correct: false },
    ],
  },
  {
    question: "Qual personagem era inimigo e depois virou aliado de Ben?",
    image:
      "https://preview.redd.it/if-kevin-levin-crossed-paths-with-his-11-year-old-self-and-v0-2fsy4qrbk3jb1.jpg?width=1080&crop=smart&auto=webp&s=11a0b2491003c7c98c42937b3adaae89aad93e94",
    answers: [
      { text: "Aggregor", correct: false },
      { text: "Albedo", correct: false },
      { text: "Kevin Levin", correct: true },
    ],
  },
];
// Função toast
function showToast(message, color = "#333") {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerText = message;
  toast.style.backgroundColor = color;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add("show"), 100);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}

// Eventos
startBtn.addEventListener("click", () => {
  level = 1;
  score = 0;
  lives = 2;
  startGame();
});

submitBtn.addEventListener("click", submitScoreAndRestart);

// Funções principais
function startGame() {
  startScreen.classList.remove("active");
  quizScreen.classList.add("active");
  currentQuestionIndex = 0;
  scoreElement.innerText = score;
  timeLeft = 60;
  lives = 2;
  lifeElement.innerText = lives;

  if (level === 1) questions = [...questionsLevel1];
  else if (level === 2) questions = [...questionsLevel2];
  else questions = [...questionsLevel3];

  showQuestion();
  startTimer();
}

function startTimer() {
  timerElement.innerText = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    timerElement.innerText = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      loseLife();
    }
  }, 1000);
}

function showQuestion() {
  resetState();
  if (currentQuestionIndex >= questions.length) {
    nextLevel();
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
  clearInterval(timer);
  timeLeft = 60;
}

function selectAnswer(e) {
  clearInterval(timer);
  let correct = e.target.dataset.correct === "true";
  if (correct) {
    score += 10;
    correctSound.play();
    showToast("✅ Resposta correta!", "#4CAF50");
  } else {
    wrongSound.play();
    showToast("❌ Resposta errada!", "#f44336");
    loseLife();
    return;
  }
  scoreElement.innerText = score;
  currentQuestionIndex++;
  setTimeout(() => {
    showQuestion();
    startTimer();
  }, 800);
}

function loseLife() {
  lives--;
  lifeElement.innerText = lives;
  if (lives <= 0) {
    showToast("💀 Você perdeu todas as vidas!", "#f44336");
    endGame();
  } else {
    currentQuestionIndex++;
    showQuestion();
    startTimer();
  }
}

function nextLevel() {
  if (level < 3) {
    level++;
    lives = 2;
    lifeElement.innerText = lives;
    currentQuestionIndex = 0;
    if (level === 2) questions = [...questionsLevel2];
    else questions = [...questionsLevel3];
    showToast(`🎉 Parabéns! Avançando para o nível ${level}`, "#2196F3");
    showQuestion();
    startTimer();
  } else {
    endGame();
  }
}

function endGame() {
  quizScreen.classList.remove("active");
  endScreen.classList.add("active");
  finalScoreElement.innerText = score;
  document.getElementById("end-message").innerText =
    score > 0 ? "Fim do jogo! Você chegou até o fim!" : "Fim de jogo!";
}

function submitScoreAndRestart() {
  const name = playerNameInput.value.trim();
  if (name === "") {
    showToast("⚠️ Digite seu nome para enviar a pontuação!", "#ff9800");
    return;
  }
  const ranking = JSON.parse(localStorage.getItem("rankingTotal")) || [];
  ranking.push({ name, score });
  localStorage.setItem("rankingTotal", JSON.stringify(ranking));
  playerNameInput.value = "";
  endScreen.classList.remove("active");
  startScreen.classList.add("active");
  showToast("🏆 Pontuação enviada com sucesso!", "#4CAF50");
}
