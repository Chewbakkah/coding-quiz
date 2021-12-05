var startBtnEl = document.querySelector("#start-btn");
var instructionsEl = document.querySelector("#instructions");
var questionsEl = document.querySelector("#question-container");
var questionBank = [
    {
        available: true,
        question: 'Test Question 1 Answer A',
        answers: [
            {text: 'a', correct: true},
            {text: 'b', correct: false}
        ]
    },
    {
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

createQuestionEl = function () {
    
}

  startBtnClicked = function () {
    console.log("you clicked start");
    startBtnEl.classList.add('hiden')
    instructionsEl.classList.add('hiden')
    questionsEl.classList.remove('hiden')
    
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
