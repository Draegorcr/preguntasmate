const questions = [
    {
        topText: "¿Qué figura se muestra en la imagen?",
        image: null, // Asegúrate de que la imagen esté en la ruta correcta
        bottomText: "Observa con atención antes de responder.",
        options: ["Triángulo", "Cuadrado", "Círculo", "Rectángulo"],
        answer: "Triángulo"
    },
    {
        topText: "¿Cuánto es 5 + 3?",
        image: null,
        bottomText: null,
        options: ["6", "7", "8", "9"],
        answer: "8"
    },
    {
        topText: 'Considere una circunferencia "c" de centro P(2,-3) y radio 3:',
        image: null,
        bottomText: 'La ecuación de la circunferencia "c" corresponde a:',
        options: [
            "(x – 2)² + (y + 3)² = 9",
            "(x + 2)² + (y – 3)² = 9",
            "(x – 2) + (y + 3) = 9",
            "(x – 2)^2 + (y + 3)^2 = 9"
        ],
        answer: "(x – 2)^2 + (y + 3)^2 = 9"
    },
    {
        topText: 'Considere la siguiente gráfica de la circunferencia “c” de centro P y radio 5:',
        image: 'imagenes/pregunta 4.png', // Asegúrate de que la imagen esté en esta ruta
        bottomText: 'De acuerdo con la información dada la ecuación de una recta tangente a “c” corresponde a',
        options: [
            "y = 5",
            "x = -8",
            "x = -2",
        ],
        answer: "x = -8"
    }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 0;
let timer;
let selectedTime = 0;

const configEl = document.getElementById("config");
const quizEl = document.getElementById("quiz");
const questionTop = document.getElementById("question-top");
const questionImg = document.getElementById("question-img");
const questionBottom = document.getElementById("question-bottom");
const optionsEl = document.getElementById("options");
const timerEl = document.getElementById("timer");
const scoreEl = document.getElementById("score");
const nextBtn = document.getElementById("nextBtn");
const startBtn = document.getElementById("startBtn");
const timeSelect = document.getElementById("timeSelect");

startBtn.onclick = () => {
    const skipWarning = localStorage.getItem("skipWarning");

    if (!skipWarning) {
        alert("Una vez que comiences, no podrás pausar el tiempo. ¡Buena suerte!");

        const dontShowAgain = confirm("¿Quieres que este mensaje no se vuelva a mostrar?");
        if (dontShowAgain) {
            localStorage.setItem("skipWarning", "true");
        }
    }

    selectedTime = parseInt(timeSelect.value);
    configEl.style.display = "none";
    quizEl.style.display = "block";
    showQuestion();
};



function showQuestion() {
    clearInterval(timer);
    timeLeft = selectedTime;

    if (selectedTime > 0) {
        timerEl.textContent = `Tiempo: ${formatTime(timeLeft)}`;
        timer = setInterval(() => {
            timeLeft--;
            timerEl.textContent = `Tiempo: ${formatTime(timeLeft)}`;
            if (timeLeft === 0) {
                clearInterval(timer);
                nextQuestion();
            }
        }, 1000);
    } else {
        timerEl.textContent = "Sin límite de tiempo";
    }

    const q = questions[currentQuestion];
    questionTop.textContent = q.topText || "";
    questionBottom.textContent = q.bottomText || "";

    // Mostrar la imagen si existe
    if (q.image) {
        questionImg.src = q.image;
        questionImg.style.display = "block"; // Mostrar la imagen
    } else {
        questionImg.style.display = "none"; // Ocultar la imagen si no hay
    }

    // Cargar las opciones
    optionsEl.innerHTML = "";
    q.options.forEach(option => {
        let btn = document.createElement("button");
        btn.textContent = option;
        btn.onclick = () => {
            if (option === q.answer) score++;
            clearInterval(timer);
            nextQuestion();
        };
        optionsEl.appendChild(btn);
    });
}

nextBtn.onclick = nextQuestion;

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        questionTop.textContent = "¡Juego terminado!";
        questionImg.style.display = "none";
        questionBottom.textContent = "";
        optionsEl.innerHTML = "";
        timerEl.textContent = "";
        nextBtn.style.display = "none";
        scoreEl.textContent = `Tu puntaje: ${score} / ${questions.length}`;
    }
}

function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? '0' + sec : sec}`;
}
