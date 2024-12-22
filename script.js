let contadorNao = 0;
const simBtn = document.getElementById('simBtn');
const naoBtn = document.getElementById('naoBtn');
const titulo = document.getElementById('titulo');

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

// Removido o evento mouseover que fazia o botão fugir

// Adicionar função de scroll automático
function scrollToButtons() {
    const buttonsDiv = document.querySelector('.buttons');
    buttonsDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

naoBtn.addEventListener('click', () => {
    contadorNao++;
    if (contadorNao < frases.length) {
        naoBtn.textContent = frases[contadorNao];
        // Aumenta o botão Sim
        simBtn.style.fontSize = `${16 + contadorNao * 3}px`;
        simBtn.style.padding = `${15 + contadorNao * 2}px ${30 + contadorNao * 2}px`;
        // Aumenta o espaço entre os botões
        document.querySelector('.buttons').style.gap = `${15 + contadorNao * 5}px`;
        // Adicionar pequeno delay para o scroll acontecer após a animação
        setTimeout(scrollToButtons, 100);
    } else {
        // Quando acabam as opções
        titulo.textContent = "Aff, desisto... 😤";
        document.querySelector('.gif').src = 'https://media.giphy.com/media/26ufcVAp3AiJJsrIs/giphy.gif';
        naoBtn.style.display = 'none';
        simBtn.textContent = "Repensar? 🤔";
        simBtn.style.fontSize = '1.2em';
        simBtn.style.padding = '15px 30px';
    }
});

simBtn.addEventListener('click', () => {
    if (simBtn.textContent === "Repensar? 🤔") {
        // Reset do estado inicial
        contadorNao = 0;
        titulo.textContent = "Quer assistir comigo? 🎬";
        naoBtn.style.display = 'block';
        naoBtn.textContent = "Não 😕";
        simBtn.textContent = "SIM! 😊";
        document.querySelector('.gif').src = 'https://media.tenor.com/Smph2uXkObIAAAAi/yor-forger-dance.gif';
        document.querySelector('.buttons').style.gap = '15px';
    } else {
        titulo.textContent = "AEEEEE! 🎉 Vou preparar as pipocas! 🍿";
        naoBtn.style.display = 'none';
        simBtn.style.display = 'none';
        document.querySelector('.gif').src = 'https://media.tenor.com/fFnRKgwGSLEAAAAi/anya-forger-anya-spy-x-family-anime.gif';
    }
});
