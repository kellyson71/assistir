let contadorNao = 0;

const btnSim = document.getElementById('btnSim');
const btnNao = document.getElementById('btnNao');
const mensagem = document.getElementById('mensagem');
const titulo = document.getElementById('titulo');

// Adicionar nova constante para tempo mínimo
const tempoMinimo = 3000; // 3 segundos
const tempoInicial = Date.now();

const frases = [
    // Fase 1: Inicial (0-4)
    "Apertou o botao errado ai",
    "Tá negando assim de cara? qualee.",
    "Escolhi um filme bom, juro!",
    "Tá, não quer? Mas por quê??",
    "Vamo tentar, confia em mim.",

    // Fase 2: Tentando convencer (5-9)
    "nos ve no Netflix Party",
    "nao? entao Discord ",
    "tmb nao?? nos ve ate no zap ",
    "Cê escolhe! Juro que não reclamo.",
    "É o filme o problema? Que tal MegaMente?",
    "Como treinar seu dragão?",
    "QUALEEE... Kung Fu Panda? Esse tu curte, vaii",

    // Fase 3: Apelando pra opções (10-14)
    "MDS, ja to tô ficando sem ideia. Estúdio Ghibli??",
    "Um Lugar Silencioso 2??",
    "Série? Bora. Qualquer uma que cê quiser.",
    "Nada? Nem série, nem filme? c ta difícil, hein.",
    "A gente assiste até comercial, se cê quiser.",

    // Fase 4: Últimos recursos (15-19)
    "Fala aí, o que cê quer? Literalmente qualquer coisa.",
    "Já abri o link, só falta tu.",
    "Cê não vai me deixar no vácuo, né? Boraaa.",
    "Meu Deus, tá me fazendo implorar, vamo logo."
];


// Função para garantir que o botão fique na área visível
function getPosicaoSegura(elemento, margin = 50) {
    // Reduz a área de fuga para 60% do tamanho da viewport
    const areaUtil = 0.6; // 60% da viewport
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    const maxX = (viewportWidth * areaUtil) - elemento.offsetWidth - margin;
    const maxY = (viewportHeight * areaUtil) - elemento.offsetHeight - margin;
    
    const btnSimRect = btnSim.getBoundingClientRect();
    const distanciaMinima = 100; // Reduzida de 150 para 100
    
    let x, y;
    let tentativas = 0;
    const maxTentativas = 10;

    do {
        // Centraliza a área de fuga
        x = (window.innerWidth - (maxX + margin)) / 2 + Math.random() * maxX;
        y = (window.innerHeight - (maxY + margin)) / 2 + Math.random() * maxY;
        
        const distancia = Math.hypot(
            x - (btnSimRect.left + btnSimRect.width/2),
            y - (btnSimRect.top + btnSimRect.height/2)
        );
        
        if (distancia >= distanciaMinima) break;
        tentativas++;
    } while (tentativas < maxTentativas);

    return {
        x: x + window.scrollX,
        y: y + window.scrollY
    };
}

function scrollParaBotao(x, y) {
    const padding = 50; // Espaço extra para garantir que o botão fique visível
    
    // Pega posição atual do botão
    const btnRect = btnNao.getBoundingClientRect();
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    
    // Dimensões da viewport
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Calcula se o botão está fora da área visível
    const isOffscreenRight = btnRect.right > viewportWidth;
    const isOffscreenLeft = btnRect.left < 0;
    const isOffscreenTop = btnRect.top < 0;
    const isOffscreenBottom = btnRect.bottom > viewportHeight;
    
    if (isOffscreenRight || isOffscreenLeft || isOffscreenTop || isOffscreenBottom) {
        // Calcula nova posição de scroll
        let newX = x - (viewportWidth / 2) + (btnRect.width / 2);
        let newY = y - (viewportHeight / 2) + (btnRect.height / 2);
        
        // Garante que não ultrapassamos os limites do documento
        newX = Math.max(0, Math.min(newX, document.documentElement.scrollWidth - viewportWidth));
        newY = Math.max(0, Math.min(newY, document.documentElement.scrollHeight - viewportHeight));
        
        window.scrollTo({
            left: newX,
            top: newY,
            behavior: 'smooth'
        });
    }
}

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

function criarTelaPreta() {
    const tela = document.createElement('div');
    tela.className = 'tela-preta';
    
    // Adiciona container para melhor controle do layout
    tela.innerHTML = `
        <div style="max-width: 90%; width: 400px; text-align: center;">
            <h2>Aff... você ganhou! 😅</h2>
            <button id="btnRepensar">Quer repensar? 🤔</button>
        </div>
    `;
    
    document.body.appendChild(tela);
    return tela;
}

function moverBotao(isTouchEvent = false) {
    // Se chegou ao fim das frases
    if (contadorNao >= frases.length) {
        const telaPreta = criarTelaPreta();
        telaPreta.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Previne scroll quando tela preta aparecer
        
        const btnRepensar = document.getElementById('btnRepensar');
        btnRepensar.addEventListener('click', () => {
            if (confirm('Tem certeza que não quer assistir comigo? 🥺')) {
                telaPreta.style.display = 'none';
                btnNao.style.display = 'none';
                btnSim.style.display = 'block';
                btnSim.style.position = 'static';
                btnSim.style.transform = 'scale(1)';
                btnSim.style.margin = '0 auto';
            }
        });
        
        btnNao.style.display = 'none';
        return;
    }

    const { x, y } = getPosicaoSegura(btnNao, 20);
    
    btnNao.style.position = 'absolute';
    btnNao.style.transition = 'all 0.3s ease';
    btnNao.style.left = `${x}px`;
    btnNao.style.top = `${y}px`;
    
    const rotacao = (Math.random() - 0.5) * 20;
    btnNao.style.transform = `rotate(${rotacao}deg)`;
    
    btnSim.style.transform = `scale(${1 + (contadorNao * 0.15)})`;
    btnNao.innerText = frases[contadorNao % frases.length];
    
    // Aumenta o delay do scroll para garantir que o botão já terminou de se mover
    setTimeout(() => scrollParaBotao(x, y), 150);
    
    contadorNao++;
}

if (isMobile) {
    // Para dispositivos móveis
    btnNao.addEventListener('touchstart', (e) => {
        e.preventDefault();
        moverBotao(true);
    });
} else {
    // Para desktop
    btnNao.addEventListener('mouseenter', (e) => {
        moverBotao(false);
    });
}

// Ajuste no comportamento do botão Sim
btnSim.addEventListener('click', () => {
    const tempoDecorrido = Date.now() - tempoInicial;
    
    if (tempoDecorrido < tempoMinimo && contadorNao === 0) {
        alert('Ei! Tenta clicar no não primeiro! 😤');
        return;
    }
    
    mostrarMensagemFinal();
});

function mostrarMensagemFinal() {
    const telaPreta = document.querySelector('.tela-preta');
    if (telaPreta) {
        telaPreta.remove();
        document.body.style.overflow = ''; // Restaura scroll
    }
    
    titulo.style.display = 'none';
    btnSim.style.display = 'none';
    btnNao.style.display = 'none';
    mensagem.classList.remove('escondido');
    mensagem.style.animation = 'aparecer 1s ease';
    
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}
