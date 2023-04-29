const difficultyValue = document.getElementById("difficulty-value");
const difficultySlider = document.getElementById("difficulty-slider");

difficultyValue.innerHTML = `Number of Characters: ${
  localStorage.getItem("difficulty") ?? 5
}`;
localStorage.removeItem("difficulty");
difficultySlider.addEventListener("input", () => {
  difficultyValue.innerHTML = `Number of Characters: ${difficultySlider.value}`;
});

const play = document.getElementById("play");

play.addEventListener("click", () => {
  localStorage.setItem("difficulty", difficultySlider.value);
  window.location.href = "game.html";
});
