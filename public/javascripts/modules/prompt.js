import sample from 'lodash.sample';

function addPromptToform(prompt) {
  document.querySelector('#prompt-submit').value = prompt;
}

async function setPrompt() {
  const prompt = sample(await fetchPrompts(), 1);
  document.querySelector('#prompt-text').innerText = prompt;
  addPromptToform(prompt);
}

function fetchPrompts() {
  const promptRegex = /(\[WP\])/;

  return fetch('https://www.reddit.com/r/writingprompts.json')
    .then(response => response.json())
    // Return 27 top writing prompts
    .then(response => response.data.children.map(prompt => prompt.data.title))
    // Match only [WP] tagged writing posts (the most useful for prompts)
    .then(promptArray => promptArray.filter(prompt => prompt.match(promptRegex)));
}

export function prompt() {
  const promptBtn = document.querySelector('#prompt');

  if (promptBtn) {
    promptBtn.addEventListener('click', setPrompt);
  }
}
