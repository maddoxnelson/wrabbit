import { submitForm, showEditableForms } from './sprintHelpers';

function checkWordCount(el) {
  return el.value.split(' ').length - 1;
}

// Update the word count every 25 words
function updateWordCount(count) {
  if (count % 25 !== 0) return;
  document.querySelector('#words').innerHTML = count;
}

function hideBox(el) {
  el.classList.add('hidden');
}

function runSprint() {
  showEditableForms();
  const contentInput = document.querySelector('#bit-content');
  const wordLimit = parseInt(this.dataset.value, 10);
  contentInput.addEventListener('keyup', (e) => {
    const wordCount = checkWordCount(e.target);

    updateWordCount(wordCount);

    if (wordCount > wordLimit) {
      submitForm();
    }
  });

  hideBox(document.getElementById('length'));
}

function init() {
  const lengthBtns = [...document.querySelectorAll('.length-sprint')];
  lengthBtns.forEach(btn => btn.addEventListener('click', runSprint));
}

function lengthSprint() {
  init();
}

export default lengthSprint;
