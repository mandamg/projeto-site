let participants = [];
let winners = [];

function checkPassword() {
    const password = document.getElementById("password").value;
    if (password === "admin" || password === "participant") {
        document.getElementById("login-screen").classList.add("hidden");
        document.getElementById("main-content").classList.remove("hidden");
    } else {
        alert("Senha incorreta!");
    }
}

function addParticipant() {
    const name = document.getElementById("new-participant").value.trim();
    if (name && !participants.includes(name)) {
        participants.push(name);
        updateGrid();
        document.getElementById("new-participant").value = "";
    }
}

function removeParticipant() {
    const name = document.getElementById("new-participant").value.trim();
    if (name && participants.includes(name)) {
        participants = participants.filter(p => p !== name);
        updateGrid();
        document.getElementById("new-participant").value = "";
    }
}

function updateGrid() {
    const grid = document.getElementById("participant-grid");
    grid.innerHTML = "";
    participants.forEach((name, index) => {
        const div = document.createElement("div");
        div.textContent = name;
        grid.appendChild(div);
    });
}

function runDraw() {
    const eligibleParticipants = participants.filter(
        name => !winners.slice(-2).includes(name)
    );
    if (eligibleParticipants.length === 0) {
        alert("Nenhum participante elegível.");
        return;
    }
    const winner = eligibleParticipants[Math.floor(Math.random() * eligibleParticipants.length)];
    setTimeout(() => {
        alert(`O vencedor é: ${winner}`);
        winners.push(winner);
        updateWinnersList();
    }, 1000);
}

function updateWinnersList() {
    const list = document.getElementById("winners-list");
    list.innerHTML = "";
    winners.slice(-5).forEach(winner => {
        const li = document.createElement("li");
        li.textContent = winner;
        list.appendChild(li);
    });
}

function showMoreWinners() {
    alert("Vencedores anteriores: " + winners.join(", "));
}

function clearHistory() {
    winners = [];
    updateWinnersList();
}
