import { expandTextArea } from './editorHelpers';

function freezeForm() {
  document.querySelector('#bit-content').setAttribute('readonly', true);
}

export function submitForm() {
  freezeForm();
  const form = document.querySelector('#bit');
  form.submit();
}

export function showEditableForms() {
  const editor = document.querySelector('#bit-content')
  editor.classList.remove('hidden')
  expandTextArea()
}
