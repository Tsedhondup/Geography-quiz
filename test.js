function nam() {
  // adding listener to checker & next buttons
  const checkerBtns = document.querySelectorAll(".checker");
  const nextBtns = document.querySelectorAll(".next");
  const checkboxs = document.querySelectorAll(".checkBtn");

  checkerBtns.forEach((item) => {
    item.addEventListener("click", () => {
      for (const checkedAnswer of checkboxs) {
        // get the checked answer
        if (checkedAnswer.checked == true) {
          const checkedBtnClosestParent = checkedAnswer.closest("li");
          const checkedId = checkedAnswer.id;

          // wrong answer msg
          const wrongEl = document.createElement("em");
          wrongEl.append("wrong answer ✕");
          wrongEl.setAttribute("class", "wrongEm");
          // right answer msg
          const rightEl = document.createElement("em");
          rightEl.append("✓");
          rightEl.setAttribute("class", "rightEm");

          // check if the answer is true
          if (correctAnswerIds.includes(checkedId)) {
            checkedBtnClosestParent.append(rightEl);
            // disable checker button
            item.disabled = true;
            item.style.backgroundColor = "#dddddd";
            item.style.color = "#000000";
            // disabled all the checkbox
            checkboxs.forEach((item) => {
              item.disabled = true;
            });
            // update the total right answer
            rightAnswer += 1;
          } else {
            try {
              const emEl = checkedBtnClosestParent.querySelector("em");
              checkedBtnClosestParent.removeChild(emEl);
            } catch (error) {}

            checkedBtnClosestParent.append(wrongEl);
          }
        }
      }
    });
  });
  //-----------------------------

  for (const nextBtn of nextBtns) {
    nextBtn.addEventListener("click", () => {
      if (xElementVal === 3) {
        alert("quiz is over"); // custom alert box
        // loader while generating the results
        // do some more task
        // 1 - show the result
        // 2 - give option if user to retry the quiz
        return;
      } else {
        quizObject.generateQuestionUi(xElementVal);
        xElementVal += 1;
      }
    });
  }
  // timer for questions
  const timer = document.querySelector(".timer p");
  let seconds = 30;

  const timerId = setInterval(() => {
    seconds -= 1;
    timer.innerHTML = "";
    timer.append(`${seconds}s`);
  }, 1000);

  const timerId2 = setTimeout(() => {
    clearInterval(timerId);
    // quizObject.generateQuestionUi(xElementVal);
    // xElementVal += 1;
  }, 30000);
  // clearTimeout(timerId2);
}
