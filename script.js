// Autenticação
document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const password = document.getElementById('password').value;
    if (password === 'admin123') {
        document.getElementById('login-page').style.display = 'none';
        document.getElementById('main-page').style.display = 'block';
    } else if (password === 'participant123') {
        document.getElementById('login-page').style.display = 'none';
        document.getElementById('main-page').style.display = 'block';
        document.getElementById('add-participant').style.display = 'none';
        document.getElementById('remove-participant').style.display = 'none';
        document.getElementById('clear-history').style.display = 'none';
    } else {
        alert('Senha incorreta!');
    }
});

// Lista de participantes
let participants = [];
let winnersHistory = [];

// Adicionar participante
document.getElementById('add-participant').addEventListener('click', () => {
    const name = prompt('Nome do participante:');
    if (name) {
        participants.push(name);
        updateGrid();
    }
});

// Atualizar grade de participantes
function updateGrid() {
    const grid = document.getElementById('participants-grid');
    grid.innerHTML = '';
    participants.forEach((name) => {
        const div = document.createElement('div');
        div.textContent = name;
        grid.appendChild(div);
    });
}

// Sortear
document.getElementById('draw').addEventListener('click', () => {
    const eligibleParticipants = participants.filter(
        (name) => !winnersHistory.slice(0, 2).includes(name)
    );
    if (eligibleParticipants.length === 0) {
        alert('Nenhum participante elegível!');
        return;
    }
    const winner = eligibleParticipants[Math.floor(Math.random() * eligibleParticipants.length)];
    winnersHistory.unshift(winner);
    alert(`O vencedor é: ${winner}`);
    updateHistory();
});

// Atualizar histórico
function updateHistory() {
    const list = document.getElementById('winners-list');
    list.innerHTML = '';
    winnersHistory.slice(0, 5).forEach((name) => {
        const li = document.createElement('li');
        li.textContent = name;
        list.appendChild(li);
    });
}

// Limpar histórico
document.getElementById('clear-history').addEventListener('click', () => {
    winnersHistory = [];
    updateHistory();
});
