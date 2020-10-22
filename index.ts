const form = document.querySelector<HTMLFormElement>('[name="verify"]');
const inputs = form.querySelectorAll<HTMLInputElement>('.inputs input');
const button = document.querySelector<HTMLButtonElement>('[type="submit"]');

function checkIfAllInputAreCorrect() {
  let anyIsEmpty = false;

  inputs.forEach(input => {
    // Check if input value is non empty
    const hasValue = input.value !== ' ' && input.value !== '' && !!input.value;
  
    // Set flag
    if (!hasValue) {
      anyIsEmpty = true;
    }
  })

  return !anyIsEmpty;
}

function handleInput(e: Event) {
  // check for data that was inputtted and if there is a next input, focus it
  const input = e.target as HTMLInputElement;
  const nextInput = input.nextElementSibling as HTMLInputElement;

  if (nextInput && input.value) {
    nextInput.focus();
  }
}

function handlePaste(e: ClipboardEvent) {
  const paste = e.clipboardData.getData('text');
  // loop over each input, and populate with the index of that string
  inputs.forEach((input: HTMLInputElement, i) => {
    input.value = paste[i] || '';
    
    // Auto submit the form if all fields are filled after a paste
    if (checkIfAllInputAreCorrect() && input.value && i === (inputs.length - 1)) {
      button.focus();
    }
  });
}

function handleFocus(e: FocusEvent) {
  // select the text when the next input is focused
 (e.target as HTMLInputElement).select();
}

function handleKeyDown(e: KeyboardEvent) {
  // support for backspacing from 1 input to another
  const key = e.key;
  const prevInput = ((e.target as HTMLInputElement).previousElementSibling as HTMLInputElement);

  // If backspace is pressed and there is a previous element, focus it
  if (key === "Backspace" && prevInput) {
    prevInput.focus();
  }
}

inputs[0].addEventListener('paste', handlePaste);

form.addEventListener('input', handleInput);

inputs.forEach(input => {
  input.addEventListener('focus', handleFocus);
  input.addEventListener('keyup', handleKeyDown);
});

