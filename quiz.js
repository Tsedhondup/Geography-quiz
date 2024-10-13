import { CheckboxComponent } from "./checkbox-component.js";

// global variable
let xElementVal = 0; // couter value to get template tag
let rightAnswer = 0;
let wrongAnswer = 0;
let cancelTimer = 0;
export let checkboxCount = 0;
let intervalId;
let userName;

const correctAnswerIds = [
  "q-one-rightA",
  "q-two-rightB",
  "q-three-rightC",
  "q-four-rightD",
  "q-five-rightE",
  "q-six-rightF",
  "q-seven-rightG",
  "q-eight-rightH",
  "q-nine-rightI",
  "q-ten-rightJ",
];

export class QuizComponent {
  static incrementCheckBoxCount() {
    checkboxCount = 1;
  }

  static generateResultUi() {
    // generate resultUi
    const resultTemplate = document.querySelector(".result-template");
    const qContainer = document.querySelector(".question-container");
    const resultUi = resultTemplate.content.cloneNode(true);
    const rightTag = resultUi.querySelector(".right-p");
    const wrongTag = resultUi.querySelector(".wrong-p");
    const restartBtn = resultUi.querySelector(".restart button");
    const feedBack = resultUi.querySelector(".feedBack");
    const msgExcellent = `You are solid! ${userName}`; // 100%
    const msgGood = `You have potential! ${userName}`; // 70 - 90 %
    const msgAverage = `Well done! ${userName}`;
    const msgOkay = `Wow! you got 50%! ${userName}`; // 50%
    const msgPoor = `Never give up. Try again ${userName}`; // less then 50%

    // inserting textNode
    if (rightAnswer === 10) {
      feedBack.append(msgExcellent);
    } else if (rightAnswer >= 7) {
      feedBack.append(msgGood);
    } else if (rightAnswer < 7 && rightAnswer > 5) {
      feedBack.append(msgAverage);
    } else if (rightAnswer === 5) {
      feedBack.append(msgOkay);
    } else if (rightAnswer < 5) {
      feedBack.append(msgPoor);
    }
    const boldElOne = document.createElement("b");
    const boldElTwo = document.createElement("b");
    boldElOne.append("Right: ");
    boldElTwo.append("Wrong: ");
    rightTag.append(boldElOne);
    rightTag.append(`${rightAnswer}`);
    wrongTag.append(boldElTwo);
    wrongTag.append(`${wrongAnswer}`);
    const loadingMsg = document.createElement("div");
    loadingMsg.setAttribute("class", "loader");
  

    qContainer.innerHTML = "";
    qContainer.classList.add("js_display-flex");
    qContainer.append(loadingMsg);
    setTimeout(() => {
      qContainer.innerHTML = "";
      qContainer.classList.remove("js_display-flex");
      qContainer.append(resultUi);
    }, 1500);
    // set values to initial value
    xElementVal = 0;
    rightAnswer = 0;
    wrongAnswer = 0;

    restartBtn.addEventListener("click", () => {
      quizObject.generateQuestionUi(xElementVal);
      xElementVal += 1;
      rightAnswer = 0;
      wrongAnswer = 0;
      checkboxCount = 0;
    });
  }

  static timerHandler(timer, checkboxs) {
    let seconds = 20;
    const timerId = setInterval(() => {
      seconds -= 1;
      cancelTimer += 1;
      timer.value = "";
      timer.value = `${seconds}s`;
      if (cancelTimer === 12) {
        timer.style.backgroundColor = "#f13c20";
        timer.style.color = "#eefbfb";
      }
      if (cancelTimer === 21) {
        cancelInterval();
      }
    }, 1000);

    // setting timerId for global usecase
    intervalId = timerId;
    // internal call back functions

    function cancelInterval() {
      // clear timeInterval
      clearInterval(timerId);
      // cancel timer set to initia value
      cancelTimer = 0;
      // update checkbox count
      if (checkboxCount != 1) {
        wrongAnswer += 1;
      }
      if (xElementVal === 10) {
        alert("quiz finished");
        // getting user name
        userName = prompt("Hi its Geography quiz, tell me your name");
        if (!userName) {
          userName = "Friend!";
        }
        // filter for checked checkbox
        for (const checkbox of checkboxs) {
          if (checkbox.checked === true) {
            // update checkbox count
            const checkBoxId = checkbox.id;
            if (correctAnswerIds.includes(checkBoxId)) {
              rightAnswer += 1;
            }
            if (!correctAnswerIds.includes(checkBoxId)) {
              wrongAnswer += 1;
            }
          }
        }
        QuizComponent.generateResultUi();
        return;
      } else {
        alert("Next question");
        // filter for checked checkbox
        for (const checkbox of checkboxs) {
          if (checkbox.checked === true) {
            const checkBoxId = checkbox.id;
            if (correctAnswerIds.includes(checkBoxId)) {
              rightAnswer += 1;
            }
            if (!correctAnswerIds.includes(checkBoxId)) {
              wrongAnswer += 1;
            }
          }
        }
        quizObject.generateQuestionUi(xElementVal);
        xElementVal += 1;
      }
    }
  }

  static handlerOnButtons() {
    let nextBtns;
    let checkboxs;
    let timer;
    try {
      nextBtns = document.querySelector(".next");
      checkboxs = document.querySelectorAll(".checkBtn");
      timer = document.querySelector(".timer input");
    } catch (error) {}

    if (nextBtns) {
      nextBtns.addEventListener("click", () => {
        // clear timeInterval
        clearInterval(intervalId);
        // cancel timer set to initia value
        cancelTimer = 0;

        // update checkbox count
        if (checkboxCount != 1) {
          wrongAnswer += 1;
        }
        // if quiz is over or not
        if (xElementVal === 10) {
          // getting user name
          userName = prompt("Hi its fun quiz, tell me your name");
          if (!userName) {
            userName = "Friend!";
          }
          // filter for checked checkbox
          for (const checkbox of checkboxs) {
            if (checkbox.checked === true) {
              const checkBoxId = checkbox.id;
              if (correctAnswerIds.includes(checkBoxId)) {
                rightAnswer += 1;
              }
              if (!correctAnswerIds.includes(checkBoxId)) {
                wrongAnswer += 1;
              }
            }
          }
          QuizComponent.generateResultUi();
          return;
        } else {
          // filter for checked checkbox
          for (const checkbox of checkboxs) {
            if (checkbox.checked === true) {
              const checkBoxId = checkbox.id;
              if (correctAnswerIds.includes(checkBoxId)) {
                rightAnswer += 1;
              }
              if (!correctAnswerIds.includes(checkBoxId)) {
                wrongAnswer += 1;
              }
            }
          }
          quizObject.generateQuestionUi(xElementVal);
          xElementVal += 1;
        }
      });
    }
    // timer handler
    QuizComponent.timerHandler(timer, checkboxs);
    // checkbox handler
    CheckboxComponent.handlerCheckbox(checkboxs);
  }

  generateQuestionUi(xElement) {
    checkboxCount = 0; // set to initial value

    const questionContainer = document.querySelector(".question-container");
    questionContainer.classList.add(".js_display-block");
    if ("content" in document.createElement("template")) {
      const questionTemplate = document.querySelectorAll("template")[xElement];
      const questionUI = questionTemplate.content.cloneNode(true);
      questionContainer.innerHTML = "";
      questionContainer.append(questionUI);

      QuizComponent.handlerOnButtons();
    }
    // update checkbox count
  }

  constructor() {
    this.startBtn = document.querySelector(".start");
  }
}

const quizObject = new QuizComponent();

quizObject.startBtn.addEventListener("click", () => {
  quizObject.generateQuestionUi(xElementVal);
  xElementVal += 1;
  console.log(xElementVal);
});
