let contadorNao = 0;

const btnSim = document.getElementById('btnSim');
const btnNao = document.getElementById('btnNao');
const mensagem = document.getElementById('mensagem');
const titulo = document.getElementById('titulo');

const frases = [
    // Fase 1: Descrença inicial (0-4)
    "Não",
    "Eita, você clicou em não?",
    "Deve ser um erro né?",
    "Você sabe que esse é o botão errado, né?",
    "Tá confusa com os botões?",

    // Fase 2: Achando que é brincadeira (5-9)
    "Aah, entendi... Tá se divertindo né?",
    "Fazendo graça comigo...",
    "Olha... se continuar assim",
    "Vou mudar todas as frases pra 'não' mesmo",
    "Última chance de parar com a brincadeira!",

    // Fase 3: Começa a preocupar (10-14)
    "Espera... é sério isso?",
    "Você tá mesmo querendo dizer não?",
    "Não pode ser...",
    "Eu tô ficando preocupado",
    "Será que fiz algo errado?",

    // Fase 4: Desespero começa (15-19)
    "Por favor, não faz isso!",
    "Tô de joelhos agora!",
    "PELO AMOR DE DEUS",
    "Meu coração não aguenta",
    "Tô chorando já 😭",

    // Fase 5: Negociação (20-24)
    "Te dou sorvete!",
    "E chocolate também!",
    "Um iPhone novo que tal?",
    "Uma viagem pra Disney!",
    "UM CARRO ZERO!",

    // Fase 6: Desespero total (25-29)
    "Tô hipotecando a casa!",
    "Vendendo meu rim!",
    "SOCORRO!!!",
];

btnNao.addEventListener('mouseenter', (e) => {
    const distanciaMinima = 100;
    let x, y;
    
    do {
        x = Math.random() * (window.innerWidth - btnNao.offsetWidth);
        y = Math.random() * (window.innerHeight - btnNao.offsetHeight);
    } while (
        Math.abs(x - e.clientX) < distanciaMinima &&
        Math.abs(y - e.clientY) < distanciaMinima
    );
    
    btnNao.style.position = 'absolute';
    btnNao.style.transition = 'all 0.3s ease';
    btnNao.style.left = `${x}px`;
    btnNao.style.top = `${y}px`;
    btnNao.style.transform = `rotate(${Math.random() * 360}deg)`;
    
    btnSim.style.transform = `scale(${1 + (contadorNao * 0.15)})`;
    btnNao.innerText = frases[contadorNao % frases.length];
    contadorNao++;
});

btnSim.addEventListener('click', () => {
    titulo.style.display = 'none';
    btnSim.style.display = 'none';
    btnNao.style.display = 'none';
    mensagem.classList.remove('escondido');
    document.body.style.background = 'linear-gradient(45deg, #ff6b6b, #ffd6e0, #f8e3ff)';
    mensagem.style.animation = 'aparecer 1s ease';
});
