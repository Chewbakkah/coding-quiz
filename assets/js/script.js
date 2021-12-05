var startBtnEl = document.querySelector("#start-btn");
var instructionsEl = document.querySelector("#instructions");
var questionsEl = document.querySelector("#question-container");
var questionEl = document.querySelector("#question");
var answerEl = document.querySelector("#answer-buttons");
// x = question from questionbank
var x = 0;
// y = answers from questionbank
var y = 0;
var highScore = 0;
var questionBank = [
  {
    index: 0,
    available: true,
    question: "Test Question 1 Answer A",
    answers: [
      { text: "a", correct: true },
      { text: "b", correct: false },
      { text: "c", correct: false },
    ],
  },
  {
    index: 1,
    available: true,
    question: "Test Question 2 Answer B",
    answers: [
      { text: "a", correct: false },
      { text: "b", correct: true },
    ],
  },
  {
    index: 2,
    available: true,
    question: "Test Question 3 Answer B",
    answers: [
      { text: "a", correct: false },
      { text: "b", correct: true },
    ],
  },
  {
    index: 3,
    available: true,
    question: "Test Question 4 Answer B",
    answers: [
      { text: "a", correct: false },
      { text: "b", correct: true },
    ],
  },
  {
    index: 4,
    available: true,
    question: "Test Question 5 Answer B",
    answers: [
      { text: "a", correct: false },
      { text: "b", correct: true },
    ],
  },
  {
    index: 5,
    available: true,
    question: "Test Question 6 Answer B",
    answers: [
      { text: "a", correct: false },
      { text: "b", correct: true },
    ],
  },
  {
    index: 6,
    available: true,
    question: "Test Question 7 Answer B",
    answers: [
      { text: "a", correct: false },
      { text: "b", correct: true },
    ],
  },
  {
    index: 7,
    available: true,
    question: "Test Question 8 Answer B",
    answers: [
      { text: "a", correct: false },
      { text: "b", correct: true },
    ],
  },
  {
    index: 8,
    available: true,
    question: "Test Question 9 Answer B",
    answers: [
      { text: "a", correct: false },
      { text: "b", correct: true },
    ],
  },
  {
    index: 9,
    available: true,
    question: "Test Question 10 Answer B",
    answers: [
      { text: "a", correct: false },
      { text: "b", correct: true },
    ],
  },
];

var timerEl = document.getElementById("countdown");
// Timer that counts down from 90
function countdown() {
  //may have to declare this globally to subtract time on wrong answer?
  var timeLeft = 90;
  var timeInterval = setInterval(function () {
    if (timeLeft > 1) {
      timerEl.textContent = timeLeft + " seconds remaining";
      timeLeft--;
    } else if (timeLeft === 1) {
      timerEl.textContent = timeLeft + " second remaining";
      timeLeft--;
    } else {
      timerEl.textContent = "";
      clearInterval(timeInterval);
      //put game ending function here
    }
  }, 1000);
}

var randomQuestionSelector = function () {
  z = Math.floor(Math.random() * 10);
  if (questionBank[z].available === false) {
    randomQuestionSelector();
  } else {
    x = z;
  }
};

var answerBtnClicked = function (event) {
    let selectedBtn = event.target
    let correctBtn = selectedBtn.dataset.correct
    if (correctBtn === "true"){
        console.log("you clicked correct answer");
    }else{
        console.log("you clicked wrong answer");
    }
};

var populateAnswers = function () {
  let buttonEl = document.createElement("button");
  buttonEl.className = "btn answer-btn";
  let buttonElText = document.createTextNode(questionBank[x].answers[y].text);
  if (questionBank[x].answers[y].correct === true) {
    buttonEl.dataset.correct = questionBank[x].answers[y].correct;
  }
  buttonEl.addEventListener("click", answerBtnClicked);
  buttonEl.appendChild(buttonElText);
  answerEl.appendChild(buttonEl);
  y++;
};

var populateQuestion = function () {
  let pEl = document.createElement("p");
  let pElText = document.createTextNode(questionBank[x].question);
  pEl.appendChild(pElText);
  questionEl.appendChild(pEl);
  questionBank[x].available = "false";
  questionBank[x].answers.forEach(populateAnswers);
  var setId = document.querySelectorAll(".answer-btn");
  for (var i = 0; i < setId.length; i++) {
    setId[i].id = "answer-btn" + i;
  }
};

startBtnClicked = function () {
  console.log("you clicked start");
  startBtnEl.classList.add("hidden");
  instructionsEl.classList.add("hidden");
  questionsEl.classList.remove("hidden");
  randomQuestionSelector();
  populateQuestion();
  countdown();
};

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
