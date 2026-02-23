let players = [];

const createButton = document.getElementById("createPlayers");
const container = document.getElementById("playersContainer");

createButton.addEventListener("click", () => {
    const count = document.getElementById("playerCount").value;
    container.innerHTML = "";
    players = [];

    for (let i = 0; i < count; i++) {
        createPlayerCard(i);
    }
});

function createPlayerCard(index) {

    const player = {
        name: "",
        score: 0
    };

    players.push(player);

    const card = document.createElement("div");
    card.classList.add("player-card");

    card.innerHTML = `
        <input type="text" placeholder="Nombre jugador">
        <br>
        <input type="number" placeholder="Puntos de la ronda">
        <button>Sumar</button>
        <h3>Total: 0</h3>
    `;

    const nameInput = card.querySelector("input[type='text']");
    const scoreInput = card.querySelector("input[type='number']");
    const button = card.querySelector("button");
    const totalDisplay = card.querySelector("h3");

    nameInput.addEventListener("input", () => {
        player.name = nameInput.value;
    });

    button.addEventListener("click", () => {
        const points = Number(scoreInput.value);
        player.score += points;

        totalDisplay.textContent = `Total: ${player.score}`;
        scoreInput.value = "";

        if (player.score >= 10000) {
            alert(`🎉 ${player.name} ganó la partida!`);
        }
    });

    container.appendChild(card);
}