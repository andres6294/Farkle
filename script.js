let players = [];

const createButton = document.getElementById("createPlayers");
const container = document.getElementById("playersContainer");
const resetButton = document.getElementById("resetGame");
const setupDiv = document.getElementById("setup");
const gameDiv = document.getElementById("game");
const winnerModal = document.getElementById("winnerModal");
const winnerText = document.getElementById("winnerText");
const closeModal = document.getElementById("closeModal");

resetButton.addEventListener("click", () => {
    if (!confirm("¿Seguro que quieres reiniciar los puntajes?")) return;

    players.forEach((player, index) => {
        player.score = 0;
        player.history = [];

        // actualizar el total visual en pantalla
        const card = container.children[index];
        const totalDisplay = card.querySelector("h3");
        totalDisplay.textContent = "Total: 0";
    });
});

createButton.addEventListener("click", () => {
    const count = document.getElementById("playerCount").value;

    if (!count || count <= 0) return;

    container.innerHTML = "";
    players = [];

    for (let i = 0; i < count; i++) {
        createPlayerCard(i);
    }

    // 🔥 cambiar vista
    setupDiv.style.display = "none";
    gameDiv.style.display = "block";
});

function createPlayerCard(index) {

    const player = {
        name: "",
        score: 0,
        history: []
    };

    players.push(player);

    const card = document.createElement("div");
    card.classList.add("player-card");

    card.innerHTML = `
        <input type="text" placeholder="Nombre jugador">
        <input type="number" placeholder="Puntos de la ronda">
        <button class="add">Sumar</button>
        <button class="undo">Deshacer</button>
        <h3>Total: 0</h3>
    `;

    const nameInput = card.querySelector("input[type='text']");
    const scoreInput = card.querySelector("input[type='number']");
    const addButton = card.querySelector(".add");
    const undoButton = card.querySelector(".undo");
    const totalDisplay = card.querySelector("h3"); // 👈 FALTABA ESTO

    nameInput.addEventListener("input", () => {
        player.name = nameInput.value;
    });

    addButton.addEventListener("click", () => {
        const points = Number(scoreInput.value);

        if (
    isNaN(points) ||
    points <= 0 ||
    points % 50 !== 0
) {
    alert("Solo se permiten múltiplos de 50 (50, 100, 150...)");
    return;
}

        player.score += points;
        player.history.push(points);

        totalDisplay.textContent = `Total: ${player.score}`;
        scoreInput.value = "";

        if (player.score >= 10000) {
            winnerText.textContent = `🎉 ${player.name || "Jugador"} ganó la partida!`;
winnerModal.style.display = "flex";
        }
    });

    undoButton.addEventListener("click", () => {
        if (player.history.length === 0) return;

        const lastPoints = player.history.pop();
        player.score -= lastPoints;

        totalDisplay.textContent = `Total: ${player.score}`;
    });

    container.appendChild(card);
}

closeModal.addEventListener("click", () => {
    winnerModal.style.display = "none";
});
