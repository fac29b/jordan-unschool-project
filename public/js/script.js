const gptForm = document.getElementById("gpt-form");

gptForm.addEventListener("submit", (e) => {
  e.preventDefault();
  //input collection and validation
  const inputField = new FormData(gptForm);
  const inputValue =
    inputField.get("userInput") === undefined ||
    inputField.get("userInput").length === 0
      ? ""
      : inputField.get("userInput");
});
