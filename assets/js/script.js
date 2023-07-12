
  var questions = [
    {
        question: "What is the correct syntax for referring to an external script called 'script.js'?",
        answers: [
            {text: "<script href='script.js'>", correct: false},
            {text: "<script name='script.js'>", correct: false},
            {text: "<script src='script.js'>", correct: true},
            {text: "<script file='script.js'>", correct: false}
        ]
    },
    {
        question: "How do you write 'Hello World' in an alert box?",
        answers: [
            {text: "msgBox('Hello World');", correct: false},
            {text: "alertBox('Hello World');", correct: false},
            {text: "msg('Hello World');", correct: false},
            {text: "alert('Hello World');", correct: true}
        ]
    },
    {
        question: "How do you create a function in JavaScript?",
        answers: [
            {text: "function = myFunction()", correct: false},
            {text: "function myFunction()", correct: true},
            {text: "function:myFunction()", correct: false},
            {text: "function-myFunction()", correct: false}
        ]
    },
    {
        question: "How do you call a function named 'myFunction'?",
        answers: [
            {text: "call function myFunction()", correct: false},
            {text: "myFunction()", correct: true},
            {text: "call myFunction()", correct: false},
            {text: "call.myFunction()", correct: false}
        ]
    },
  ];

  
  var timerDisplay = document.getElementById("timer");
  var initialDuration = 40; // Store the initial duration
  var duration = initialDuration;
  var timer;
  
  function startTimer() {
    duration = initialDuration; // Reset duration to its initial value
    timer = setInterval(function () {
      timerDisplay.textContent = "Time: " + duration;
  
      // Check if the timer has reached 0
      if (duration === 0) {
        clearInterval(timer);
        duration = 0;
        showScore();
      }
  
      duration--; // Decrease the duration after checking the condition
  
    }, 1000);
  }
  
  
  function subtractTime() {
    duration -= 3; // Subtract 3 seconds from the duration
  
    if (duration < 0) {
      duration = 0;
    }
  }
  
  
  var startBtn = document.getElementById("start-button");
  
  var questionElement = document.getElementById("question");
  
  var answerButtons = document.getElementById("answer-buttons");
  
  var nextButton = document.getElementById("next-btn");
  
  var timeEl = document.querySelector(".time");
  
  var playAgainButton = document.getElementById("play-again");
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  
  
  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
     
     
  }
  
  function showQuestion() {
    resetState();
    var currentQuestion = questions[currentQuestionIndex];
    var questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
  
    currentQuestion.answers.forEach(answer => {
        var button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
       answerButtons.appendChild(button);
         if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
       button.addEventListener("click", selectAnswer);
  
    });
  }
  
  function resetState() {
    nextButton.style.display = "none";
       for (var i = answerButtons.children.length - 1; i >= 0; i--) {
        answerButtons.removeChild(answerButtons.children[i]);
    }
  }
  
  function selectAnswer(e) {
    var selectedBtn = e.target;
    var isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("wrong");
        subtractTime();
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        } 
        button.disabled = true;
    });
    nextButton.style.display = "block";
  }
  
 
  function showScore() {
    resetState();
    questionElement.innerHTML = "Your score is " + score + " out of " + questions.length;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
    nextButton.removeEventListener("click", handleNextButton); // Remove the event listener from the next button
    nextButton.style.display = "block";
    nextButton.addEventListener("click", function () {
        startQuiz();
        startTimer();
    });
  }
  
  function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
  }
  
  nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
  
    });

    startBtn.addEventListener("click", function() {
        startTimer();
        startQuiz();  
    });

    function saveScore() {
        localStorage.setItem("score", score);
        localStorage.setItem("initials", initials);
    }

    function checkForEnter(event) {
        if (event.key === "Enter") {
            saveHighscore();
        }
    } 

    function saveHighscore() {
        initials = initialsEl.value.trim();
        if (initials !== "") {
            var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
            var newScore = {
                score: score,
                initials: initials
            };
            highscores.push(newScore);
            window.localStorage.setItem("highscores", JSON.stringify(highscores));
            window.location.href = "highscores.html";
        }
    }

    
 