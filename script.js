// Inicialização
document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const password = document.getElementById('password').value;

    if (password === 'admin123') {
        document.getElementById('login-page').style.display = 'none';
        document.getElementById('main-page').style.display = 'block';
    } else if (password === 'participant123') {
        document.getElementById('login-page').style.display = 'none';
        document.getElementById('main-page').style.display = 'block';
        document.querySelector('.button-container').style.display = 'none';
    } else {
        alert('Senha incorreta!');
    }
});

// Adicionando participantes
const participantsContainer = document.getElementById('participants-container');
const participants = [];

document.getElementById('add-participant').addEventListener('click', () => {
    const name = prompt('Digite o nome do participante:');
    if (name) {
        participants.push(name);
        updateParticipants();
    }
});

// Atualizar participantes
function updateParticipants() {
    participantsContainer.innerHTML = '';
    participants.forEach(name => {
        const div = document.createElement('div');
        div.className = 'participant';
        div.textContent = name;
        participantsContainer.appendChild(div);
    });
}

// Modal para exibir ganhador
const modal = document.getElementById('winner-modal');
const modalClose = document.querySelector('.modal-content .close');
const winnerName = document.getElementById('winner-name');

modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
});

document.getElementById('start-draw').addEventListener('click', () => {
    if (participants.length === 0) {
        alert('Nenhum participante disponível!');
        return;
    }

    // Sorteio
    const winner = participants[Math.floor(Math.random() * participants.length)];
    winnerName.textContent = winner;

    // Exibe o modal
    modal.style.display = 'flex';
});
