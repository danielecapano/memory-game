const arrayCards = [
  "alien.png",
  "bench.png",
  "bird.png",
  "bug.png",
  "butterfly.png",
  "carriage.png",
  "cat.png",
  "crab.png",
  "dolphin.png",
  "duck.png",
  "heart.png",
  "hydrant.png",
  "lamp.png",
  "palm.png",
  "phantom.png",
  "portrait.png",
  "robot.png",
  "rocket.png",
  "ship.png",
  "spaceship.png",
  "tiktac.png",
];

let numOfCards = 6; // Default to "easy"

const generateArray = (array, num) => {
  const newArray = [];
  while (newArray.length < num) {
    const randomNum = Math.floor(Math.random() * array.length);
    const randomElement = array[randomNum];
    if (!newArray.includes(randomElement)) {
      newArray.push(randomElement);
    }
  }
  return newArray;
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const btnLevel = document.querySelectorAll(".btn-level");
const cardsContainer = document.querySelector(".cards");

const generateAndDisplayCards = (numOfCards) => {
  // Generate and shuffle cards
  const randomCards = generateArray(arrayCards, numOfCards);
  const doubleCards = [...randomCards, ...randomCards];
  const shuffledCards = shuffleArray(doubleCards);

  // Clear previous cards
  cardsContainer.innerHTML = "";

  // Create card elements
  shuffledCards.forEach((card) => {
    const box = document.createElement("div");
    box.className = "card";
    const img = document.createElement("img");
    img.src = `./images/${card}`;
    box.appendChild(img);
    cardsContainer.appendChild(box);

    // Add click event to the card
    box.addEventListener("click", () => {
      box.classList.add("open");
      const click = new Audio("./sounds/click.mp3");
      click.play();

      const cardOpen = document.querySelectorAll(".open");

      setTimeout(() => {
        if (cardOpen.length > 1) {
          if (cardOpen[0].innerHTML === cardOpen[1].innerHTML) {
            const success = new Audio("./sounds/success.mp3");
            success.play();
            cardOpen[0].classList.add("match");
            cardOpen[1].classList.add("match");
            cardOpen[0].classList.remove("open");
            cardOpen[1].classList.remove("open");

            // Update the match variable after adding the class
            const match = document.querySelectorAll(".match");

            if (match.length === shuffledCards.length) {
              setTimeout(() => {
                const win = new Audio("./sounds/win.mp3");
                win.play();
              }, 500);
            }
          } else {
            const error = new Audio("./sounds/error.mp3");
            error.play();
            cardOpen[0].classList.remove("open");
            cardOpen[1].classList.remove("open");
          }
        }
      }, 500);
    });
  });
};

// Add event listeners to buttons
btnLevel.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    btnLevel.forEach((btn) => btn.classList.remove("active"));
    e.target.classList.add("active");

    switch (e.target.id) {
      case "easy":
        numOfCards = 6;
        console.log("easy");
        break;
      case "medium":
        numOfCards = 8;
        console.log("medium");
        break;
      case "hard":
        numOfCards = 10;
        console.log("hard");
        break;
    }

    generateAndDisplayCards(numOfCards);
  });
});

// Generate cards for default level "easy" on page load
generateAndDisplayCards(numOfCards);
