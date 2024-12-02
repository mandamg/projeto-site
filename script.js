document.addEventListener("DOMContentLoaded", () => {
  const passwordForm = document.getElementById("password-form");
  const loginPage = document.getElementById("login-page");
  const mainPage = document.getElementById("main-page");
  const passwordInput = document.getElementById("password");
  const participantsGrid = document.getElementById("participants-grid");
  const historyList = document.getElementById("history-list");
  const drawButton = document.getElementById("draw-btn");

  let participants = [];
  let history = [];

  // Login
  passwordForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (passwordInput.value === "BRASIL") {
      loginPage.style.display = "none";
      mainPage.style.display = "block";
    } else {
      alert("Senha incorreta!");
    }
  });

  // Add Participant
  document.getElementById("add-participant-btn").addEventListener("click", () => {
    const name = prompt("Digite o nome do participante:");
    if (name) {
      participants.push(name);
      updateParticipantsGrid();
    }
  });

  // Remove Participant
  document.getElementById("remove-participant-btn").addEventListener("click", () => {
    const name = prompt("Digite o nome do participante a remover:");
    participants = participants.filter((participant) => participant !== name);
    updateParticipantsGrid();
  });

  // Update Participants Grid
  function updateParticipantsGrid() {
    participantsGrid.innerHTML = "";
    participants.forEach((name) => {
      const div = document.createElement("div");
      div.textContent = name;
      participantsGrid.appendChild(div);
    });
  }

  // Draw Winner
  drawButton.addEventListener("click", () => {
    if (participants.length === 0) {
      alert("Nenhum participante para sortear!");
      return;
    }
    const winner = participants[Math.floor(Math.random() * participants.length)];
    setTimeout(() => {
      alert(`O vencedor é ${winner}!`);
      history.unshift(winner);
      updateHistory();
    }, 1000);
  });

  // Update History
  function updateHistory() {
    historyList.innerHTML = "";
    history.slice(0, 5).forEach((winner) => {
      const li = document.createElement("li");
      li.textContent = winner;
      historyList.appendChild(li);
    });
  }

  // Clear History
  document.getElementById("clear-history-btn").addEventListener("click", () => {
    history = [];
    updateHistory();
  });
});
