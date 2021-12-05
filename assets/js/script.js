var startBtnEl = document.querySelector("#start-btn");
var instructionsEl = document.querySelector("#instructions");
var questionsEl = document.querySelector("#question-container");
var questionEl = document.querySelector("#question");
var answerEl = document.querySelector("#answer-buttons");
var x = 0;
var y = 0;
var questionBank = [
    {
        index: 0,
        available: true,
        question: 'Test Question 1 Answer A',
        answers: [
            {text: 'a', correct: true},
            {text: 'b', correct: false},
            {text: 'c', correct: false}
        ]
    },
    {
        index: 1,
        available: true,
        question: 'Test Question 2 Answer B',
        answers: [
            {text: 'a', correct: false},
            {text: 'b', correct: true}
        ]
    }
]

var timerEl = document.getElementById('countdown');
// Timer that counts down from 90
function countdown() {
    //may have to declare this globally to subtract time on wrong answer?
    var timeLeft = 90;
    var timeInterval = setInterval(function () {
      if (timeLeft > 1) {
        timerEl.textContent = timeLeft + ' seconds remaining';
        timeLeft--;
      } else if (timeLeft === 1) {
        timerEl.textContent = timeLeft + ' second remaining';
        timeLeft--;
      } else {
        timerEl.textContent = '';
        clearInterval(timeInterval);
        //put game ending function here
      }
    }, 1000);
  }
//   function showQuestion(question) {
//     questionEl.innerText = questionBank.question
//     questionBank.answers.forEach(answer => {
//         const button = document.createElement('button')
//         button.innerText = answer.text
//         button.classList.add('btn')
//         if (answers.correct) {
//             button.dataset.correct = answers.correct
//         }
//         button.addEventListener('click', selectAnswer)
//         answerButtonsEl.appendChild(button)
//     })
//   }

var populateAnswers = function (){
    let buttonEl = document.createElement('button')
    buttonEl.className = "btn"
    let buttonElText = document.createTextNode(questionBank[x].answers[y].text)
    buttonEl.appendChild(buttonElText)
    answerEl.appendChild(buttonEl)
    y++;
}

var populateQuestion = function (){
    let pEl = document.createElement('p')
    let pElText = document.createTextNode(questionBank[x].question)
    pEl.appendChild(pElText)
    questionEl.appendChild(pEl)

    questionBank[x].answers.forEach(populateAnswers);
}


  startBtnClicked = function () {
    console.log("you clicked start");
    startBtnEl.classList.add('hiden')
    instructionsEl.classList.add('hiden')
    questionsEl.classList.remove('hiden')
    populateQuestion();
    countdown();
}

// //On start button click do the following:
// Hide Instructions
// Start timer
// display first question and answers
// set question available to false 


// On answer select verify if correct.
// If answer correct display "Correct!" Add 1 to score 
// If answer is wrong display "Wrong! Lose 2 Seconds" and deduct 2 seconds from timer.
// On answer select display next button 

// On next button select:
// clear question and answers
// display next question and answer set
// set question available to false 

// When time is zero
// display Game Over and score
// give link to high scores 
// give button to try again 


startBtnEl.addEventListener("click", startBtnClicked);
