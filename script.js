// Variáveis globais
let participantes = [];
let historico = JSON.parse(localStorage.getItem('historico')) || [];

// Função para adicionar participante à lista
function adicionarParticipante() {
    const nome = document.getElementById('nomeParticipante').value.trim();
    if (nome !== "") {
        participantes.push(nome);
        atualizarParticipantes();
        document.getElementById('nomeParticipante').value = ""; // Limpa o campo
        fecharModal();
    }
}

// Função para atualizar a lista de participantes na tela
function atualizarParticipantes() {
    const lista = document.getElementById('participantesList');
    lista.innerHTML = "";
    participantes.forEach((participante, index) => {
        const li = document.createElement('li');
        li.textContent = participante;
        lista.appendChild(li);
    });
}

// Função para mostrar a bolha de ganhador após o sorteio
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

        // Atualiza o nome do ganhador e exibe a bolha
        document.getElementById('ganhador').textContent = ganhadorAleatorio;
        document.getElementById('ganhadorContainer').classList.remove('hidden'); // Torna visível

        // Adiciona ao histórico
        historico.push(ganhador);
        localStorage.setItem('historico', JSON.stringify(historico));

        carregarHistorico(); // Atualiza o histórico na tela
    } else {
        alert('Todos os participantes recentes já ganharam.');
    }
}

// Função para carregar o histórico de ganhadores
function carregarHistorico() {
    const historicoContainer = document.getElementById('historicoList');
    historicoContainer.innerHTML = ""; // Limpa o conteúdo atual

    historico.forEach(ganhador => {
        const li = document.createElement('li');
        li.textContent = `${ganhador.nome} - ${ganhador.data}`;
        historicoContainer.appendChild(li);
    });
}

// Função para limpar o histórico (com autenticação de senha)
function limparHistorico() {
    const senha = prompt("Digite a senha para limpar o histórico:");
    if (senha === "senha123") { // A senha para confirmação
        localStorage.removeItem('historico'); // Remove o histórico do localStorage
        historico = [];
        carregarHistorico();
    } else {
        alert("Senha incorreta.");
    }
}

// Função para abrir o modal de adicionar participante
function abrirModal() {
    document.getElementById('modal').style.display = 'block';
}

// Função para fechar o modal de adicionar participante
function fecharModal() {
    document.getElementById('modal').style.display = 'none';
}

// Inicializa o histórico ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    carregarHistorico();
    atualizarParticipantes();
});
