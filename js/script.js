//  Created with help of tutorials Reference:https://www.youtube.com/watch?v=riDzcEQbX6k


// Constants to connect to HTML IDs
const startBtn = document.getElementById('start-button')
const introTxt = document.getElementById('intro-text')
const nextBtn = document.getElementById('next-button')
const hsBtn = document.getElementById('btn-highscores')
const questionsContainerEl = document.getElementById('question-container')
const questionEl = document.getElementById('question')
const answerEl = document.getElementById('answer-buttons')
const bodyEl = document.querySelector('body')
const allScores = document.getElementById('all-scores')

// Variable for questions array
let randomQuestion, currentQuestion, highScores, initials


// Event Listeners for buttons
startBtn.addEventListener('click', startGame)
startBtn.addEventListener('click', timerFun)
nextBtn.addEventListener('click', () => {
    currentQuestion++
    nextQuestion()
})

// Start game function that hides Start button and text
function startGame() {
    introTxt.classList.add('hide')
    startBtn.classList.add('hide')
    randomQuestion = questions.sort(() => Math.random() - .5)
    currentQuestion = 0
    questionsContainerEl.classList.remove('hide')
    nextQuestion();
}

// Functions to show next questions and randomly show them
function nextQuestion(params) {
    // check to see if we've reached the end of the quiz
    // if (currentQuestion === 4){
    //     console.log('No more questions');
    // }
    console.log(currentQuestion);
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
        hsBtn.classList.remove('hide'),
        questionsContainerEl.classList.add('hide'),
        bodyEl.classList.remove('wrong'),
        bodyEl.classList.remove('correct'),
        allScores.classList.remove('hide')
    };
}


 // Setting status to correct or wrong
function setStatus(element, correct) {
    clearStatus(element)
    if (correct) {
        element.classList.add('correct')
        var rightChoice = () => {
            rightAnswers += 10;
            element.removeEventListener('click', rightChoice)
        }
        element.addEventListener('click', rightChoice)

        //Wrong answer decreases timer
    } else if (!correct) {
        element.classList.add('wrong')
        var wrongChoice = () => {
            sec -= 10;
            element.removeEventListener('click', wrongChoice)
        }
        element.addEventListener('click', wrongChoice);
    } else {
        nextQuestion();
    }
}


 //Clear status for next question
function clearStatus(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}


    // Created w instructor, TAs and tutor
//Timer 
var sec = 70;
function timerFun() {
        var timer = setInterval(function () {
            if (currentQuestion === 4){
                clearInterval(timer);
                clearStatus(document.body);
            }
            sec--;
            document.getElementById('timer').innerHTML = '00:' + sec;
            if (sec === 0) {
                clearInterval(timer);
                allScores.classList.remove('hide');
            }
        }, 1000);
        return
}



function endGame(){

};

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