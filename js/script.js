// Constants to connect to HTML IDs
const startBtn = document.getElementById('startButton')
const introTxt = document.getElementById('introText')
const nextBtn = document.getElementById('nextButton')
const hsBtn = document.getElementById('btnHighscores')
const questionsContainerEl = document.getElementById('questionContainer')
const questionEl = document.getElementById('question')
const answerEl = document.getElementById('answerButtons')

// Variable for questions array
let randomQuestion, currentQuestion

// Event Listeners for buttons
startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestion++
    nextQuestion()
})

// Start game function that hides Start button and text
function startGame() {
    console.log('Started')
    introTxt.classList.add('hide')
    startBtn.classList.add('hide')
    randomQuestion = questions.sort(() => Math.random() - .5)
    currentQuestion = 0
    questionsContainerEl.classList.remove('hide')
    nextQuestion();
}

// Functions to show next questions and randomly show them
function nextQuestion(params) {
    resetState()
    showQuestion(randomQuestion[currentQuestion])
}

function showQuestion(question) {
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerEl.appendChild(button)
    });
}

// Every time a question is answered reset body color 
function resetState() {
    clearStatus(document.body)
    nextBtn.classList.add('hide')
    while (answerEl.firstChild){
        answerEl.removeChild(answerEl.firstChild)
    }
}

// When selecting answer check if it's the right one and change the answer boxes
function selectAnswer(e) {
    const selectBtn = e.target
    const correct = selectBtn.dataset.correct
    setStatus(document.body, correct)
    Array.from(answerEl.children).forEach(button => {
        setStatus(button, button.dataset.correct)
    })

    //Stop the function if all questions in array have been answered
    if (randomQuestion.length > currentQuestion + 1) {
    nextBtn.classList.remove('hide')
    } else {
        hsBtn.classList.remove('hide')
    }
}

 // Setting status to correct or wrong
function setStatus(element, correct) {
    clearStatus(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}
 //Clear status for next question
function clearStatus(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}



// Questions array
const questions = [
    
    {
        question: 'Commonly used data types DO NOT Include:',
        answers: [
            { text: 'strings', correct: false },
            { text: 'booleans', correct: false},
            { text: 'alerts', correct: true},
            { text: 'numbers', correct: false}
        ]
    },

    {
        question: 'The condition in an if / else statement is enclosed within ______',
        answers: [
            { text: 'parentheses', correct: true },
            { text: 'quotes', correct: false },
            { text: 'curly brackets', correct: false },
            { text: 'square brackets', correct: false }
        ]
    },

    {
        question: 'Arrays in JavaScript can be used to store _____',
        answers: [
            { text: 'numbers and strings', correct: false },
            { text: 'other arrays', correct: false },
            { text: 'booleans', correct: false },
            { text: 'all of the above', correct: true }
        ]
    },

    {
        question: 'String values must be enclosed within _____ when being assigned to variables',
        answers: [
            { text: 'commas', correct: false },
            { text: 'quotes', correct: true },
            { text: 'curly brackets', correct: false },
            { text: 'parentheses', correct: false }
        ]
    },

    {
        question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
        answers: [
            { text: 'JavaScript', correct: false },
            { text: 'terminal/bash', correct: false },
            { text: 'for loops', correct: false },
            { text: 'console.log', correct: true }
        ]
    }

]