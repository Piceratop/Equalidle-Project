// fetch("filename.txt")
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error("Failed to read file");
//     }
//     return response.text();
//   })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

localStorage.removeItem("difficulty");
const gameNavs = document.querySelectorAll(".game-nav");

gameNavs.forEach((gameNav) => {
  gameNav.addEventListener("click", () => {
    localStorage.setItem("difficulty", gameNav.id);
    window.location.href = "game.html";
  });
});
