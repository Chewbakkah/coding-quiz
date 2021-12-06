var startBtnEl = document.querySelector("#start-btn");
var nextBtnEl = document.querySelector("#next-btn");
var retryBtnEl = document.querySelector("#retry-btn");
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
var countdownEl = document.querySelector("#countdown");
// x = question from questionbank
var x = 0;
// y = answers from questionbank
var y = 0;
var highScore = 0;
var questionBank = [
  {
    index: 0,
    available: "yes",
    question: "Test Question 1 Answer A",
    answers: [
      { text: "a", correct: true },
      { text: "b", correct: false },
      { text: "c", correct: false },
    ],
  },
  {
    index: 1,
    available: "yes",
    question: "Test Question 2 Answer B",
    answers: [
      { text: "a", correct: true },
      { text: "b", correct: false },
      { text: "c", correct: false },
    ],
  },
  {
    index: 2,
    available: "yes",
    question: "Test Question 3 Answer B",
    answers: [
      { text: "a", correct: true },
      { text: "b", correct: false },
      { text: "c", correct: false },
    ],
  },
  {
    index: 3,
    available: "yes",
    question: "Test Question 4 Answer B",
    answers: [
      { text: "a", correct: true },
      { text: "b", correct: false },
      { text: "c", correct: false },
    ],
  },
  {
    index: 4,
    available: "yes",
    question: "Test Question 5 Answer B",
    answers: [
      { text: "a", correct: true },
      { text: "b", correct: false },
      { text: "c", correct: false },
    ],
  },
  {
    index: 5,
    available: "yes",
    question: "Test Question 6 Answer B",
    answers: [
      { text: "a", correct: true },
      { text: "b", correct: false },
      { text: "c", correct: false },
    ],
  },
  {
    index: 6,
    available: "yes",
    question: "Test Question 7 Answer B",
    answers: [
      { text: "a", correct: true },
      { text: "b", correct: false },
      { text: "c", correct: false },
    ],
  },
  {
    index: 7,
    available: "yes",
    question: "Test Question 8 Answer B",
    answers: [
      { text: "a", correct: true },
      { text: "b", correct: false },
      { text: "c", correct: false },
    ],
  },
  {
    index: 8,
    available: "yes",
    question: "Test Question 9 Answer B",
    answers: [
      { text: "a", correct: true },
      { text: "b", correct: false },
      { text: "c", correct: false },
    ],
  },
  {
    index: 9,
    available: "yes",
    question: "Test Question 10 Answer B",
    answers: [
      { text: "a", correct: true },
      { text: "b", correct: false },
      { text: "c", correct: false },
    ],
  },
];
var randomArray = [];

var timerEl = document.getElementById("countdown");
// Timer that counts down from 60
var timeLeft = 60;
function countdown() {
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
  if (countdownEl.classList != "hidden") {
    countdownEl.classList.add("hidden");
  }
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
  retryBtnEl.classList.remove("hidden");
//   randomArray = [];
//   x = 0;
//   y = 0;
//   startBtnEl.textContent = "Retry?";
//   startBtnEl.classList.remove("hidden");
};

var randomQuestionSelector = function () {
  if (randomArray.length === 10) {
    console.log("ended random");
    endScreen();
  } else {
    var z = 0;
    var defineZ = function () {
      z = Math.floor(Math.random() * 10);
      if (randomArray.includes(z)) {
        console.log("passed 1");
        defineZ();
      } else {
        console.log("passed 2");
        x = z;
        randomArray.push(z);
      }
    };
    defineZ();
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
    timeLeft = timeLeft - 5;
  }
  questionEl.classList.add("hidden");
  answerEl.classList.add("hidden");
  nextBtnEl.classList.remove("hidden");
};

var populateAnswers = function () {
  var n = questionBank[x].answers.length - 2;
  for (var i = 0; i < n; i++) {
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
  questionBank[x].answers.forEach(populateAnswers);
};

var startBtnClicked = function () {
  countdown();
  startBtnEl.classList.add("hidden");
  instructionsEl.classList.add("hidden");
  questionsEl.classList.remove("hidden");
  randomQuestionSelector();
  populateQuestion();
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

var retryBtnClicked = function (){
    window.location.reload();
}

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
retryBtnEl.addEventListener("click", retryBtnClicked);

// things left to do
// load high score to local Storage
// link high scores to end page
// style everything
