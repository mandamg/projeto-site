document.addEventListener("DOMContentLoaded", () => {
  const passwordForm = document.getElementById("password-form");
  const loginPage = document.getElementById("login-page");
  const mainPage = document.getElementById("main-page");
  const participantsBubbles = document.getElementById("participants-bubbles");
  const historyList = document.getElementById("history-list");
  const clearHistoryButton = document.getElementById("clear-history-btn");
  const drawButton = document.getElementById("draw-btn");

  let participants = [];
  let history = [];

  // Login
  passwordForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const passwordInput = document.getElementById("password");
    if (passwordInput.value === "BRASIL") {
      loginPage.style.display = "none";
      mainPage.style.display = "block";
    } else {
      alert("Senha incorreta!");
    }
  });

  // Atualiza as bolhas dos participantes
  function updateParticipantsBubbles() {
    participantsBubbles.innerHTML = ""; // Limpa as bolhas existentes
    participants.forEach((participant) => {
      const bubble = document.createElement("div");
      bubble.classList.add("participant-bubble");
      bubble.textContent = participant.name;
      participantsBubbles.appendChild(bubble);
    });
  }

  // Atualiza o histórico de vencedores
  function updateHistory() {
    historyList.innerHTML = ""; // Limpa o histórico existente
    history.slice(0, 5).forEach((winner) => {
      const li = document.createElement("li");
      li.textContent = winner;
      historyList.appendChild(li);
    });

    // Garante visibilidade do histórico
    if (history.length === 0) {
      historyList.innerHTML = "<li>Sem histórico de vencedores ainda.</li>";
    }
  }

  // Adiciona participante
  document.getElementById("add-participant-btn").addEventListener("click", () => {
    const name = prompt("Digite o nome do participante:");
    if (name) {
      participants.push({ name, lastWin: null });
      updateParticipantsBubbles();
    }
  });

  // Remove participante
  document.getElementById("remove-participant-btn").addEventListener("click", () => {
    const name = prompt("Digite o nome do participante a remover:");
    participants = participants.filter((participant) => participant.name !== name);
    updateParticipantsBubbles();
  });

  // Sorteia vencedor
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
    history.unshift(winner.name); // Adiciona ao histórico
    updateParticipantsBubbles();

    // Delay de 2 segundos para mostrar o vencedor no histórico
    setTimeout(() => {
      updateHistory();
      setTimeout(() => alert(`O vencedor é ${winner.name}!`), 500);
    }, 2000);
  });

  // Limpa histórico
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

  // Inicializa com mensagens padrão no histórico
  updateHistory();
});
