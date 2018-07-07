import axios from 'axios';
import { expandTextArea } from './editorHelpers';

export function loadInExistingBit() {
  const loadBtn = document.querySelector('#load-in-bit');
  const bitChooser = document.querySelector('#bit-chooser');
  const bitTitleBox = document.querySelector('#bit-title');
  const bitContentBox = document.querySelector('#bit-content');
  const lengthBtns = [...document.querySelectorAll('.length-sprint')];
  const bitForm = document.querySelector('#bit');

  async function getBitsByAuthor(url) {
    const bits = await axios.get(url)
      .then(response => response.data);

    const stuff = bits.map(bit => `
        <option value="${bit.id}">${bit.name}</option>
      `).join('');

    if (!bitChooser) return;
    bitChooser.classList.remove('hidden');
    bitChooser.innerHTML = stuff;
  }

  async function getSingleBit(url) {
    const bit = await axios.get(url)
      .then(response => response.data[0]);

    bitTitleBox.value = bit.name;
    bitContentBox.value = bit.content;
    bitForm.setAttribute('action', `/write/${bit.id}`);

    lengthBtns.forEach((btn) => {
      const button = btn;
      const btnValue = `${parseInt(btn.dataset.value, 10)}${bit.word_count}`;
      button.dataset.value = btnValue;
    });
  }

  if (!loadBtn) return;
  loadBtn.addEventListener('click', (e) => {
    const url = e.target.dataset.api;
    getBitsByAuthor(url);
  });

  if (!bitChooser) return;
  bitChooser.addEventListener('change', (e) => {
    getSingleBit(`/api/bit/${e.target.value}`);
  });
}

function freezeForm() {
  document.querySelector('#bit-content').setAttribute('readonly', true);
}

let formSubmitted = false;

export function submitForm() {
  freezeForm();
  const form = document.querySelector('#bit');
  if (!formSubmitted) {
    form.submit();
    formSubmitted = true;
  }
}

export function showEditableForms() {
  const editor = document.querySelector('#bit-content');
  editor.classList.remove('hidden');
  expandTextArea();
}
