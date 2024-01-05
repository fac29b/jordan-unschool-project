const gptForm = document.getElementById("gpt-form");

gptForm.addEventListener("submit", (e) => {
  e.preventDefault();
  //input collection and validation
  const inputField = new FormData(gptForm);
  const inputValue =
    inputField.get("user-input") === undefined ||
    inputField.get("user-input").length === 0
      ? ""
      : inputField.get("user-input");
});
