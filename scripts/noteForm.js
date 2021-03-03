const noteForm = document.forms["note-form"];
const noteInput = noteForm.elements["note-form__input"];

noteInput.addEventListener("focus", (evt) => {
  console.log(evt);
});
