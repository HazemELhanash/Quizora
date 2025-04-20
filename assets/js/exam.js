//Declar variables
let questionArray = [];
let answerArray = [];
let questionNumber = 0;
let nextButton;
let prevButton;
let submitButton;
let inputs;
let spans;
let score = 0;
let progressBar;
let counter = 0;
let timeoutflag= false;
window.onload = function () {
  const duration = 60 * 60; // Timer duration in seconds (1 hour)
  const display = document.getElementById("timer");
  startTimer(duration, display);
};

//Fetch the JSON file from local storage
fetch("questions.json")
  .then((response) => response.json())
  .then((data) => {
    //Filling the questions in an array
    data.questions = shuffleArray(data.questions);
    questionArray = data.questions;
    answerArray = new Array(questionArray.length).fill(null);

    //Fetch the progress bar
    const progressBar = document.getElementById("progress");

    for (let i = 0; i < 10; i++) {
      const div = document.createElement("div");
      div.textContent = i + 1;
      div.classList.add("progress-box"); // Add a class for styling
      div.id = String(i);
      div.addEventListener("click", function () {
        questionNumber = Number(div.id);
        inputs.forEach((input) => {
          input.checked = false;
        });
        writeQuestion(questionArray[questionNumber]);
        const currentQuestionBox = document.getElementById(
          String(questionNumber)
        );
        if (!currentQuestionBox.classList.contains("flageGreen")) {
          flage.classList.remove("flageGreen");
        } else {
          flage.classList.add("flageGreen");
        }
      });
      progressBar.appendChild(div);
    }
    var flage = document.getElementById("flage");
    var flg = false;

    flage.addEventListener("click", function () {
      const currentQuestionBox = document.getElementById(
        String(questionNumber)
      );
      if (flage.classList.contains("flageGreen")) {
        flage.classList.remove("flageGreen");
        counter--;
        currentQuestionBox.classList.remove("flageGreen");
        if (answerArray[questionNumber] !== null) {
          currentQuestionBox.classList.add("completed");
        }
      } else {
        currentQuestionBox.classList.add("flageGreen");
        flage.classList.add("flageGreen");
        counter++;
        if (currentQuestionBox.classList.contains("completed")) {
          currentQuestionBox.classList.remove("completed");
        }
      }

      //flg = !flg;
    });
    //Call writeQuestion to render the questions
    writeQuestion(questionArray[questionNumber]);

    //Fetch buttons
    nextButton = document.getElementById("next");
    prevButton = document.getElementById("prev");
    submitButton = document.getElementById("submit");
    //Add event listener for the next button
    nextButton.addEventListener("click", function () {
      //Check the boundary condition
      if (questionNumber < questionArray.length - 1) {
        //Clear the radio buttons before rendering the new question
        inputs.forEach((input) => {
          input.checked = false;
        });
        questionNumber++;
        writeQuestion(questionArray[questionNumber]);
        const currentQuestionBox = document.getElementById(String(questionNumber));
        if(!currentQuestionBox.classList.contains("flageGreen"))
        {
          flage.classList.remove("flageGreen"); 
        }
        else{
          flage.classList.add("flageGreen");
        }
      }
    });

    //Add event listener for the previous button
    prevButton.addEventListener("click", function () {
      //Check the boundary condition
      if (questionNumber > 0) {
        //Clear the radio buttons before rendering the new question
        inputs.forEach((input) => {
          input.checked = false;
        });
        questionNumber--;
        writeQuestion(questionArray[questionNumber]);
        const currentQuestionBox = document.getElementById(
          String(questionNumber)
        );
        if (!currentQuestionBox.classList.contains("flageGreen")) {
          flage.classList.remove("flageGreen");
        } else {
          flage.classList.add("flageGreen");
        }
      }
    });

    //Add event listener for submit button
    submitButton.addEventListener("click", function () {
      submitAnswers(data);
    });

    //Give Timer for the Exam
    setTimeout(function () {
      timeoutflag=true;
      submitAnswers(data);
    }, 10000);
  })
  .catch((error) => console.error("Error fetching JSON:", error));

//Renders the question on the page
function writeQuestion(questionOBJ) {
  document.querySelector("h2").textContent = questionOBJ.question;

  // Clear previous highlight
  const allProgressBoxes = document.querySelectorAll(".progress-box");
  allProgressBoxes.forEach((box) => box.classList.remove("selected"));

  // Highlight current progress box
  const currentQuestionBox = document.getElementById(String(questionNumber));
  if (currentQuestionBox) {
    currentQuestionBox.classList.add("selected");

    // Mark as completed if already answered
    if (
      answerArray[questionNumber] !== null &&
      !currentQuestionBox.classList.contains("flageGreen")
    ) {
      currentQuestionBox.classList.add("completed");
    }
  }
  //select all the inputs and text
  spans = document.querySelectorAll(".questions > span");
  inputs = document.querySelectorAll('input[type="radio"]');

  //clone the inputs and nodes and write the new questions
  for (let i = 0; i < 4; i++) {
    spans[i].textContent = questionOBJ.options[i];
    let newInput = inputs[i].cloneNode(true);
    newInput.value = questionOBJ.options[i];
    newInput.checked = answerArray[questionNumber] === newInput.value;

    //add event listener to the inputs
    newInput.addEventListener("change", function () {
      answerArray[questionNumber] = newInput.value;

      // Mark current as completed
      const currentBox = document.getElementById(String(questionNumber));
      if (currentBox && !currentBox.classList.contains("flageGreen")) {
        currentBox.classList.add("completed");
      }
    });

    inputs[i].parentNode.replaceChild(newInput, inputs[i]);
  }

  inputs = document.querySelectorAll('input[type="radio"]');
}

//Shuffle array elements
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
//function to calculate the score
function validateAnswer(questionOBJ, answer) {
  if (questionOBJ.answer === answer) {
    score++;
  }
}
//function to submit the answers when time runs out or pressing submit
function submitAnswers(data) {
  if (counter === 0 || timeoutflag === true) {
    localStorage.setItem("questions", JSON.stringify(data));
    localStorage.setItem("userAnswers", JSON.stringify(answerArray));
    for (let i = 0; i < questionArray.length; i++) {
      validateAnswer(questionArray[i], answerArray[i]);
    }
    localStorage.setItem("score", score);
    let msg = document.getElementById("message");
    msg.style.display = "none";

    location.href = "results.html"
  }
  else{
  let msg = document.getElementById("message");
  msg.style.display = "block";
  }
}

//function to run the exam timer
function startTimer(duration, display) {
  let timer = duration,
    hours,
    minutes,
    seconds;
  setInterval(function () {
    hours = Math.floor(timer / 3600);
    minutes = Math.floor((timer % 3600) / 60);
    seconds = timer % 60;

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = hours + ":" + minutes + ":" + seconds;

    if (--timer < 0) {
      timer = duration;
    }
  }, 1000);
}
