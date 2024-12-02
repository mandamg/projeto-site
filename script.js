// Variáveis globais
let participantes = [];
let historico = JSON.parse(localStorage.getItem('historico')) || [];

// Carregar participantes no HTML
function carregarParticipantes() {
    const lista = document.getElementById('participantesList');
    lista.innerHTML = ''; // Limpa a lista antes de adicionar os itens

    participantes.forEach(participante => {
        const li = document.createElement('li');
        li.textContent = participante;
        lista.appendChild(li);
    });
}

// Adicionar participante
document.getElementById('adicionarBtn').addEventListener('click', function() {
    const nome = document.getElementById('nomeParticipante').value.trim();
    if (nome) {
        participantes.push(nome);
        localStorage.setItem('participantes', JSON.stringify(participantes));
        carregarParticipantes();
        document.getElementById('nomeParticipante').value = ''; // Limpa o campo
        fecharModal();
    } else {
        alert('Por favor, insira um nome.');
    }
});

// Abrir o modal de adicionar participante
document.getElementById('adicionarParticipanteBtn').addEventListener('click', function() {
    document.getElementById('myModal').style.display = 'block';
});

// Fechar o modal
document.querySelector('.close').addEventListener('click', fecharModal);
function fecharModal() {
    document.getElementById('myModal').style.display = 'none';
}

// Função para sortear o ganhador
function sortear() {
    const dataAtual = new Date();
    
    // Filtra os ganhadores recentes (últimos 2 dias)
    const ganhadoresRecentes = historico.filter(ganhador => {
        const dataGanhou = new Date(ganhador.data);
        const diffDias = (dataAtual - dataGanhou) / (1000 * 3600 * 24);
        return diffDias <= 2;
    });

    // Filtra os participantes que podem participar
    const candidatos = participantes.filter(nome => !ganhadoresRecentes.some(ganhador => ganhador.nome === nome));

    if (candidatos.length > 0) {
        // Sorteia um ganhador
        const ganhadorAleatorio = candidatos[Math.floor(Math.random() * candidatos.length)];
        const ganhador = { nome: ganhadorAleatorio, data: new Date() };

        // Adiciona o ganhador ao histórico
        historico.push(ganhador);
        localStorage.setItem('historico', JSON.stringify(historico));

        // Carrega o histórico
        carregarHistorico();

        // Exibe o nome do ganhador após 1 segundo de espera
        setTimeout(() => {
            document.getElementById('ganhador').textContent = ganhadorAleatorio;
            document.getElementById('ganhadorContainer').classList.remove('hidden'); // Torna visível a bolha
        }, 1000);  // Atraso de 1 segundo

    } else {
        alert('Todos os participantes recentes já ganharam.');
    }
}

// Adiciona a função sortear ao botão de sorteio
document.getElementById('sorteioBtn').addEventListener('click', sortear);

// Carregar participantes ao iniciar a página
document.addEventListener('DOMContentLoaded', function() {
    const participantesSalvos = JSON.parse(localStorage.getItem('participantes')) || [];
    participantes = participantesSalvos;
    carregarParticipantes();
});
