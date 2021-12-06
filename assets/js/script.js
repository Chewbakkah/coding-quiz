var submitBtnEl = document.querySelector("#submit-btn");
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
var userNameInput = document.querySelector("#user-name");
var formEl = document.querySelector("#user-name-form");
var submitVerifyEl = document.querySelector("#submit-username");
// x = question from questionbank
var x = 0;
// y = answers from questionbank
var y = 0;
var highScore = 0;
var questionBank = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    answers: [
      { text: "<javascript>", correct: false },
      { text: "<scripting>", correct: false },
      { text: "<script>", correct: true },
      { text: "<js>", correct: false }
    ],
  },
  {
    question: "Where is the correct place to insert a JavaScript?",
    answers: [
      { text: "The <body> section", correct: false },
      { text: "The <head> section", correct: false },
      { text: "Both the <head> and <body> will work", correct: true },
      { text: "Neither", correct: false }
    ],
  },
  {
    question: "What is the correct syntax for referring to an external script called \"xxx.js\"?",
    answers: [
        { text: "<script src=\"xxx.js\">", correct: true },
        { text: "<script name=\"xxx.js\">", correct: false },
        { text: "<script href=\"xxx.js\">", correct: false },
        { text: "None of these", correct: false }
    ],
  },
  {
    question: "How do you write \"Hello World\" in an alert box?",
    answers: [
        { text: "msgBox(\"Hellow World\");", correct: false },
        { text: "alert(\"Hellow World\");", correct: true },
        { text: "alertBox(\"Hello World\");", correct: false },
        { text: "msg(\"Hello World\");", correct: false }
    ],
  },
  {
    question: "How do you call a function named \"myFunction\"?",
    answers: [
        { text: "myFunction()", correct: true },
        { text: "call myFunction()", correct: false },
        { text: "HEY LADY!", correct: false },
        { text: "call function myFunction()", correct: false }
    ],
  },
  {
    question: "How to write an IF statement in JavaScript?",
    answers: [
        { text: "if i=5", correct: false },
        { text: "if i = 5 then", correct: false },
        { text: "if i == 5 then", correct: false },
        { text: "if (i == 5)", correct: true }
    ],
  },
  {
    question: "How to write an IF statement for executing some code if \"i\" is NOT equal to 5?",
    answers: [
        { text: "if (i != 5)", correct: true },
        { text: "if (i<>5)", correct: false },
        { text: "if i =! 5 then", correct: false },
        { text: "if i<>5", correct: false }
    ],
  },
  {
    question: "How can you add a comment in a JavaScript?",
    answers: [
        { text: "<!--This is a comment-->", correct: false },
        { text: "'This is a comment", correct: false },
        { text: "//This is a comment", correct: true },
        { text: "!!This is a comment!!", correct: false }
    ],
  },
  {
    question: "How do you round the number 7.25, to the nearest integer?",
    answers: [
        { text: "Math.rnd(7.25)", correct: false },
        { text: "rnd(7.25)", correct: false },
        { text: "Math.round(7.25)", correct: true },
        { text: "round(7.25)", correct: false }
    ],
  },
  {
    question: "How do you find the number with the highest value of x and y?",
    answers: [
        { text: "ceil(x,y)", correct: false },
        { text: "Math.ceil(x,y)", correct: false },
        { text: "Math.max(x,y)", correct: true },
        { text: "top(x,y)", correct: false }
    ],
  },
];
var randomArray = [];
var user = [];
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
var saveUser = function(){
    localStorage.setItem("user", JSON.stringify(user));
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
  if (userNameInput.value == "") {
    submitVerifyEl.classList.remove("hidden");
    formEl.classList.remove("hidden");
    submitBtnEl.classList.remove("hidden");
  } else {
    var userInfo = {
      username: userNameInput.value.trim(),
      score: highScore,
    };
    user.push(userInfo);
    saveUser();
    retryBtnEl.classList.remove("hidden");
  }  
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
  var n = questionBank[x].answers.length -3;
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
  formEl.classList.add("hidden");
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

var retryBtnClicked = function () {
  window.location.reload();
};

var submitBtnClicked = function (event) {
  event.preventDefault();
  submitVerifyEl.classList.add("hidden");
  submitBtnEl.classList.add("hidden");
  formEl.classList.add("hidden");
  endScreen();
};

function requiredUserName() {
  var empty = document.forms["form1"].value;
  if (empty == "") {
    formEl.classList.remove("hidden");
    alert("Please Enter Username");
    return false;
  }
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
submitBtnEl.addEventListener("click", submitBtnClicked);
// things left to do
// load high score to local Storage
// link high scores to end page
// style everything
