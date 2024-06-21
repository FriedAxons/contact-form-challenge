const firstnameInput = document.getElementById("firstname-input");
const firstnameError = document.querySelector(".firstname-error");
const lastnameInput = document.getElementById("lastname-input");
const lastnameError = document.querySelector(".lastname-error");
const emailInput = document.getElementById("email-input");
const emailError = document.querySelector(".email-error");
const radioInputs = document.querySelectorAll('input[name="radioAnswer"]');
const radioError = document.querySelector(".radio-error");
const messageInput = document.getElementById("message-textarea");
const textareaError = document.querySelector(".textarea-error");
const checkbox = document.getElementById("checkbox");
const checkboxError = document.querySelector(".consent-error");
const submitButton = document.getElementById("submit-button");
const successContainer = document.querySelector(".success-container");
const formContainer = document.querySelector(".contact-form-container");

function validateTextInput(input, errorElement) {
  if (input.value.trim() === "") {
    errorElement.classList.add("active");
    return false;
  } else {
    errorElement.classList.remove("active");
    return true;
  }
}

function validateEmailInput(input, errorElement) {
  const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  if (!emailPattern.test(input.value)) {
    errorElement.classList.add("active");
    return false;
  } else {
    errorElement.classList.remove("active");
    return true;
  }
}

function validateRadioInput(radioInputs, errorElement) {
  let isChecked = false;
  radioInputs.forEach((radio) => {
    if (radio.checked) isChecked = true;
  });
  if (!isChecked) {
    errorElement.classList.add("active");
    return false;
  } else {
    errorElement.classList.remove("active");
    return true;
  }
}

function validateCheckboxInput(checkbox, errorElement) {
  if (!checkbox.checked) {
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

// function adjustPadding() {}

submitButton.addEventListener("click", (e) => {
  e.preventDefault();

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
    form.submit();
  } else {
    adjustPadding();
  }
});