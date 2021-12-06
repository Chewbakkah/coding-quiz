var startBtnEl = document.querySelector("#start-btn");
var nextBtnEl = document.querySelector("#next-btn");
var instructionsEl = document.querySelector("#instructions");
var questionsEl = document.querySelector("#question-container");
var questionEl = document.querySelector("#question");
var answerEl = document.querySelector("#answer-buttons");
var correctAnswerEl = document.querySelector("#correct-prompt");
var wrongAnswerEl = document.querySelector("#wrong-prompt");
var returnCorrectEl = document.querySelector("#return-correct");
var removeLaterEl = document.querySelector("#remove-later");
var endScreenEl = document.querySelector("#end-screen");
var highScoreEl = document.querySelector("#high-score");
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
      { text: "d", correct: false },
      { text: "e", correct: true },
    ],
  },
  {
    index: 2,
    available: true,
    question: "Test Question 3 Answer B",
    answers: [
      { text: "f", correct: false },
      { text: "g", correct: true },
    ],
  },
  {
    index: 3,
    available: true,
    question: "Test Question 4 Answer B",
    answers: [
      { text: "h", correct: false },
      { text: "i", correct: true },
    ],
  },
  {
    index: 4,
    available: true,
    question: "Test Question 5 Answer B",
    answers: [
      { text: "j", correct: false },
      { text: "k", correct: true },
    ],
  },
  {
    index: 5,
    available: true,
    question: "Test Question 6 Answer B",
    answers: [
      { text: "l", correct: false },
      { text: "m", correct: true },
    ],
  },
  {
    index: 6,
    available: true,
    question: "Test Question 7 Answer B",
    answers: [
      { text: "n", correct: false },
      { text: "o", correct: true },
    ],
  },
  {
    index: 7,
    available: true,
    question: "Test Question 8 Answer B",
    answers: [
      { text: "p", correct: false },
      { text: "q", correct: true },
    ],
  },
  {
    index: 8,
    available: true,
    question: "Test Question 9 Answer B",
    answers: [
      { text: "r", correct: false },
      { text: "s", correct: true },
    ],
  },
  {
    index: 9,
    available: true,
    question: "Test Question 10 Answer B",
    answers: [
      { text: "t", correct: false },
      { text: "u", correct: true },
    ],
  },
];

var timerEl = document.getElementById("countdown");
// Timer that counts down from 90
function countdown() {
  //may have to declare this globally to subtract time on wrong answer?
  var timeLeft = 60;
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
      endScreen();
    }
  }, 1000);
}

var endScreen = function () {
  if (questionsEl.classList != "hidden") {
    questionsEl.classList.add("hidden");
  }
  if (correctAnswerEl.classList != "hidden") {
    correctAnswerEl.classList.add("hidden");
  }
  if (wrongAnswerEl.classList != "hidden") {
    wrongAnswerEl.classList.add("hidden");
  }
  if (nextBtnEl.classList != "hidden") {
    nextBtnEl.classList.add("hidden");
  }
  endScreenEl.classList.remove("hidden");
  highScoreEl.textContent = highScore;
};

var randomQuestionSelector = function () {
  z = Math.floor(Math.random() * 10);
  if (questionBank[z].available === true) {
    x = z;
  } else if (questionBank[z].available === false) {
    randomQuestionSelector;
  } else {
    endScreen();
  }
};

var answerBtnClicked = function (event) {
  let selectedBtn = event.target;
  let correctBtn = selectedBtn.dataset.correct;
  if (correctBtn === "true") {
    correctAnswerEl.classList.remove("hidden");
    highScore++;
  } else {
    wrongAnswerEl.classList.remove("hidden");
  }
  questionEl.classList.add("hidden");
  answerEl.classList.add("hidden");
  nextBtnEl.classList.remove("hidden");
};

var populateAnswers = function () {
  var n = questionBank[x].answers.length - 1;
  for (i = 0; i < n; i++) {
    let buttonEl = document.createElement("button");
    buttonEl.className = "btn answer-btn";
    let buttonElText = document.createTextNode(questionBank[x].answers[y].text);
    if (questionBank[x].answers[y].correct === true) {
      buttonEl.dataset.correct = questionBank[x].answers[y].correct;
      returnCorrectEl.textContent = questionBank[x].answers[y].text;
    }
    buttonEl.addEventListener("click", answerBtnClicked);
    buttonEl.appendChild(buttonElText);
    answerEl.appendChild(buttonEl);
    y++;
  }
};

var populateQuestion = function () {
  let pEl = document.createElement("p");
  pEl.id = "remove-later";
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

var startBtnClicked = function () {
  startBtnEl.classList.add("hidden");
  instructionsEl.classList.add("hidden");
  questionsEl.classList.remove("hidden");
  randomQuestionSelector();
  populateQuestion();
  countdown();
};

var nextBtnClicked = function () {
  y = 0;
  clearQuestion();
  clearAnswers();
  nextBtnEl.classList.add("hidden");
  if (wrongAnswerEl.classList != "hidden") {
    wrongAnswerEl.classList.add("hidden");
  }
  if (correctAnswerEl.classList != "hidden") {
    correctAnswerEl.classList.add("hidden");
  }
  questionEl.classList.remove("hidden");
  answerEl.classList.remove("hidden");
  randomQuestionSelector();
  populateQuestion();
};

var clearQuestion = function () {
  var removeQuestion = document.getElementById("remove-later");
  removeQuestion.remove();
};

var clearAnswers = function () {
  var removeAnswers = document.getElementById("answer-buttons");
  removeAnswers.innerHTML = "";
};

startBtnEl.addEventListener("click", startBtnClicked);
nextBtnEl.addEventListener("click", nextBtnClicked);

// things left to do 
// remove time for wrong answers 
// load high score to local Storage
// link high scores to end page 
// add retry to end page 
// reset variables for retry 
