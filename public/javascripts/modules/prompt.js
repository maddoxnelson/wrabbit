import sample from 'lodash.sample';

function addPromptToform(promptValue) {
  const promptSubmit = document.querySelector('#prompt-submit');
  if (!promptSubmit) return
  promptSubmit.value = promptValue;
}

function checkLocalStorage() {
  if (!window.localStorage.bitPrompts) return false
  return JSON.parse(window.localStorage.bitPrompts)
}

async function fetchPrompts() {
  const promptRegex = /(\[WP\])/;

  const savedPrompts = checkLocalStorage()

  if (savedPrompts) return savedPrompts;
  
  const prompts = await fetch('https://www.reddit.com/r/writingprompts.json?limit=100')
    .then(response => response.json())
    // Return 27 top writing prompts
    .then(response => response.data.children.map(promptItem => promptItem.data.title))
    // Match only [WP] tagged writing posts (the most useful for prompts)
    .then(promptArray => promptArray.filter(promptItem => promptItem.match(promptRegex)));
  
  window.localStorage.bitPrompts = JSON.stringify(prompts);

  return prompts;
}

export async function setPrompt() {
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
