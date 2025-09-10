function startGame(level) {
  // Salva nível escolhido
  localStorage.setItem("quizLevel", level);
  // Redireciona para quiz.html
  window.location.href = "quiz.html";
}
