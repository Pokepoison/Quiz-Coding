const questions = [
    
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
      if (duration <= 0) {
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
  
  
  var startBtn = document.getElementById("start-btn");
  

  
  const questionElement = document.getElementById("question");
  
  const answerButtons = document.getElementById("answer-buttons");
  
  const nextButton = document.getElementById("next-btn");
  
  var timeEl = document.querySelector(".time");
  
  //answerButtons.addEventListener("click", startTimer);
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  
  
  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
     // Clear existing scores from the end screen
     const finalScoreElement = document.getElementById("final-score");
     finalScoreElement.innerHTML = "";
  }
  
  function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
  
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
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
    //while (answerButtons.firstChild) {
       // answerButtons.removeChild(answerButtons.firstChild);
       for (var i = answerButtons.children.length - 1; i >= 0; i--) {
        answerButtons.removeChild(answerButtons.children[i]);
    }
  }
  
  function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
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
  
  function saveScore(initials, score) {
    // Retrieve existing scores from local storage (if any)
    const existingScores = JSON.parse(localStorage.getItem("scores")) || [];
  
    // Add the new score to the existing scores array
    existingScores.push({ initials, score });
  
    // Store the updated scores array in local storage
    localStorage.setItem("scores", JSON.stringify(existingScores));
  }
  
 
  function showScore() {
    resetState();
    questionElement.innerHTML = "Your score is " + score + " out of " + questions.length;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
    nextButton.removeEventListener("click", handleNextButton); // Remove the event listener from the next button
    //=> this is new
    nextButton.addEventListener("click", function () {
        startQuiz();
        startTimer();
    });
    
    // Prompt the user to enter their initials
    const initialsInput = document.getElementById("initials");
    const initials = initialsInput.value;
  
    // Call the saveScore function to store the score in local storage
    saveScore(initials, score);
  }
  
  const saveButton = document.getElementById("save-btn");
saveButton.addEventListener("click", function() {
  const initialsInput = document.getElementById("initials");
  const initials = initialsInput.value;

  // Call the saveScore function to store the score in local storage
  saveScore(initials, score);
});

// Recall scores from local storage
const scores = JSON.parse(localStorage.getItem("scores")) || [];

// Sort the scores in descending order
scores.sort((a, b) => b.score - a.score);

// Display the scores in a list
const scoreList = document.getElementById("score-list");
scoreList.innerHTML = scores.map(score => `<li>${score.initials} - ${score.score}</li>`).join("");
  
  
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
  startQuiz();

    
 


