localStorage.removeItem("difficulty");
const gameNavs = document.querySelectorAll(".game-nav");

gameNavs.forEach((gameNav) => {
  gameNav.addEventListener("click", () => {
    localStorage.setItem("difficulty", gameNav.id);
    window.location.href = "game.html";
  });
});
