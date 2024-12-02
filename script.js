document.addEventListener("DOMContentLoaded", () => {
  const passwordForm = document.getElementById("password-form");
  const loginPage = document.getElementById("login-page");
  const mainPage = document.getElementById("main-page");
  const passwordInput = document.getElementById("password");
  const clearHistoryButton = document.getElementById("clear-history-btn");
  const drawButton = document.getElementById("draw-btn");
  const historyList = document.getElementById("history-list");

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

  // Função para atualizar as bolhas de participantes
  function updateParticipantsBubbles() {
    const participantsBubbles = document.getElementById("participants-bubbles");
    participantsBubbles.innerHTML = ""; // Limpa as bolhas existentes
    participants.forEach((participant) => {
      const bubble = document.createElement("div");
      bubble.classList.add("participant-bubble");
      bubble.textContent = participant.name;
      participantsBubbles.appendChild(bubble);
    });
  }

  // Adicionar Participante
  document.getElementById("add-participant-btn").addEventListener("click", () => {
    const name = prompt("Digite o nome do participante:");
    if (name) {
      participants.push({ name, lastWin: null });
      updateParticipantsBubbles();
    }
  });

  // Remover Participante
  document.getElementById("remove-participant-btn").addEventListener("click", () => {
    const name = prompt("Digite o nome do participante a remover:");
    participants = participants.filter((participant) => participant.name !== name);
    updateParticipantsBubbles();
  });

  // Sorteio
  drawButton.addEventListener("click", () => {
    const today = new Date();
    const eligible = participants.filter((participant) => {
      return (
        !participant.lastWin ||
        (today - new Date(participant.lastWin)) / (1000 * 60 * 60 * 24) > 2
      );
    });

    if (eligible.length === 0) {
      alert("Nenhum participante elegível!");
      return;
    }

    const winner = eligible[Math.floor(Math.random() * eligible.length)];
    winner.lastWin = today.toISOString();
    history.unshift(winner.name);

    updateParticipantsBubbles();
    updateHistory();
    setTimeout(() => alert(`O vencedor é ${winner.name}!`), 1000);
  });

  // Atualizar Histórico
  function updateHistory() {
    historyList.innerHTML = "";
    history.slice(0, 5).forEach((winner) => {
      const li = document.createElement("li");
      li.textContent = winner;
      historyList.appendChild(li);
    });
  }

  // Limpar Histórico com Senha
  clearHistoryButton.addEventListener("click", () => {
    const pass = prompt("Digite a senha para limpar o histórico:");
    if (pass === "BRASIL") {
      history = [];
      updateHistory();
      alert("Histórico limpo com sucesso!");
    } else {
      alert("Senha incorreta!");
    }
  });
});
