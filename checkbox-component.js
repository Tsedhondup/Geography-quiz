// import { checkboxCount } from "./quiz";

export class CheckboxComponent {
  static handlerCheckbox(checkboxs) {
    checkboxs.forEach((item) => {
      item.addEventListener("click", (event) => {
        event.stopPropagation();
        const eSrc = event.target;

        // unchecked rest of the checkboxes
        for (const chkBox of checkboxs) {
          chkBox.checked = false;
        }
        // checked current checked box true
        eSrc.checked = true;

        // update checkboxCount
        import("./quiz.js").then((module) => {
          module.QuizComponent.incrementCheckBoxCount();
        });
      });
    });
  }
}
