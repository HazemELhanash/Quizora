//Display score
const score = localStorage.getItem('score');
const questions = JSON.parse(localStorage.getItem('questions')).questions;
const userAnswers = JSON.parse(localStorage.getItem('userAnswers'));
document.getElementById("score").textContent = score;

//Display the recap of the questions and answers
const container = document.getElementById("main-content");

questions.forEach((q, index) => {
  const userAnswer = userAnswers[index];
//Questions container creation
  const questionDiv = document.createElement("div");
  questionDiv.classList.add("question-block");
//Questions title creation
  const questionTitle = document.createElement("h3");
  questionTitle.textContent = `${index + 1}. ${q.question}`;
  questionDiv.appendChild(questionTitle);
//Ansers list creation
  q.options.forEach(option => {
    const optionDiv = document.createElement("span");
    optionDiv.textContent = option;
    optionDiv.classList.add("option");
//Checking right answer
    if (option === q.answer) {
      optionDiv.classList.add("correct");
    }
//Checking the wrong answer
    if (option === userAnswer && option !== q.answer) {
      optionDiv.classList.add("wrong");
    }
//Displaying the answer of the user
    if (option === userAnswer) {
        optionDiv.classList.add("selected");
    }

    questionDiv.appendChild(optionDiv);
  });
//Connecting the questions
  container.appendChild(questionDiv);
});
