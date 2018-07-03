import sample from 'lodash.sample';

function addPromptToform(promptValue) {
  document.querySelector('#prompt-submit').value = promptValue;
}

function fetchPrompts() {
  const promptRegex = /(\[WP\])/;

  return fetch('https://www.reddit.com/r/writingprompts.json')
    .then(response => response.json())
    // Return 27 top writing prompts
    .then(response => response.data.children.map(promptItem => promptItem.data.title))
    // Match only [WP] tagged writing posts (the most useful for prompts)
    .then(promptArray => promptArray.filter(promptItem => promptItem.match(promptRegex)));
}

async function setPrompt() {
  const promptText = sample(await fetchPrompts(), 1);
  document.querySelector('#prompt-text').innerText = promptText;
  addPromptToform(promptText);
}

function prompt() {
  const promptBtn = document.querySelector('#prompt');

  if (promptBtn) {
    promptBtn.addEventListener('click', setPrompt);
  }
}

export default prompt;
