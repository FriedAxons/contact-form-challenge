// DOM elements
const firstnameInput = document.getElementById("firstname-input");
const lastnameInput = document.getElementById("lastname-input");
const emailInput = document.getElementById("email-input");
const radioInputs = document.querySelectorAll('input[name="radioAnswer"]');
const messageInput = document.getElementById("message-textarea");
const checkbox = document.getElementById("checkbox");
const submitButton = document.getElementById("submit-button");
const successContainer = document.querySelector(".success-container");
const formContainer = document.querySelector(".contact-form-container");

// Error elements
const firstnameError = document.querySelector(".firstname-error");
const lastnameError = document.querySelector(".lastname-error");
const emailError = document.querySelector(".email-error");
const radioError = document.querySelector(".radio-error");
const textareaError = document.querySelector(".textarea-error");
const checkboxError = document.querySelector(".consent-error");

let formSubmitted = false;

function validateTextInput(input, errorElement) {
  if (formSubmitted && input.value.trim() === "") {
    input.style.border = "1px solid hsl(0, 66%, 54%)";
    errorElement.classList.add("active");
    return false;
  } else {
    input.style.border = "1px solid hsl(186, 15%, 59%)";
    errorElement.classList.remove("active");
    return true;
  }
}

function validateEmailInput(input, errorElement) {
  const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  if (formSubmitted && !emailPattern.test(input.value)) {
    input.style.border = "1px solid hsl(0, 66%, 54%)";
    errorElement.classList.add("active");
    return false;
  } else {
    input.style.border = "1px solid hsl(186, 15%, 59%)";
    errorElement.classList.remove("active");
    return true;
  }
}

function validateRadioInput(radioInputs, errorElement) {
  let isChecked = false;
  radioInputs.forEach((radio) => {
    if (radio.checked) isChecked = true;
  });
  if (formSubmitted && !isChecked) {
    errorElement.classList.add("active");
    return false;
  } else {
    errorElement.classList.remove("active");
    return true;
  }
}

function validateCheckboxInput(checkbox, errorElement) {
  if (formSubmitted && !checkbox.checked) {
    errorElement.classList.add("active");
    return false;
  } else {
    errorElement.classList.remove("active");
    return true;
  }
}

function countActiveErrors() {
  const errors = document.querySelectorAll(
    ".firstname-error, .lastname-error, .email-error, .radio-error, .textarea-error, .consent-error"
  );
  let activeErrors = 0;
  errors.forEach((error) => {
    if (error.classList.contains("active")) {
      activeErrors++;
    }
  });
  return activeErrors;
}

document.querySelectorAll(".radio-container").forEach((container) => {
  container.addEventListener("click", () => {
    const radioInput = container.querySelector('input[type="radio"]');
    container.style.border = "1px solid hsl(169, 82%, 27%)";
    radioInput.checked = true;
    radioInput.dispatchEvent(new Event("change"));

    // Remove the selected class from all radio containers
    document
      .querySelectorAll(".radio-container")
      .forEach((c) => c.classList.remove("selected"));

    // Add the selected class to the clicked container
    container.classList.add("selected");
  });
});

function adjustPadding() {
  const activeErrors = countActiveErrors();
  formContainer.style.paddingBottom = activeErrors > 0 ? "30px" : "0px";
}

submitButton.addEventListener("click", (e) => {
  e.preventDefault();

  // Indicate form has been submitted
  formSubmitted = true;

  const isFirstNameValid = validateTextInput(firstnameInput, firstnameError);
  const isLastNameValid = validateTextInput(lastnameInput, lastnameError);
  const isEmailValid = validateEmailInput(emailInput, emailError);
  const isRadioValid = validateRadioInput(radioInputs, radioError);
  const isMessageValid = validateTextInput(messageInput, textareaError);
  const isCheckboxValid = validateCheckboxInput(checkbox, checkboxError);

  if (
    isFirstNameValid &&
    isLastNameValid &&
    isEmailValid &&
    isRadioValid &&
    isMessageValid &&
    isCheckboxValid
  ) {
    firstnameInput.value = "";
    lastnameInput.value = "";
    emailInput.value = "";
    messageInput.value = "";
    checkbox.checked = false;
    radioInputs.forEach((radio) => (radio.checked = false));

    successContainer.classList.add("active");
  } else {
    // There are errors, adjust padding
    adjustPadding();
  }
});

function addInputListeners(input, errorElement) {
  input.addEventListener("input", () => {
    if (formSubmitted) {
      validateTextInput(input, errorElement);
      adjustPadding();
    }
  });
}

function addRadioListeners(radioInputs, errorElement) {
  radioInputs.forEach((radio) => {
    radio.addEventListener("change", () => {
      if (formSubmitted) {
        validateRadioInput(radioInputs, errorElement);
        adjustPadding();
      }
    });
  });
}

function addCheckboxListener(checkbox, errorElement) {
  checkbox.addEventListener("change", () => {
    if (formSubmitted) {
      validateCheckboxInput(checkbox, errorElement);
      adjustPadding();
    }
  });
}

addInputListeners(firstnameInput, firstnameError);
addInputListeners(lastnameInput, lastnameError);
addInputListeners(emailInput, emailError);
addInputListeners(messageInput, textareaError);
addRadioListeners(radioInputs, radioError);
addCheckboxListener(checkbox, checkboxError);

adjustPadding();
