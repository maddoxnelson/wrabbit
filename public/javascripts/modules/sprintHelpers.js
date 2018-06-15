import { expandTextArea } from './editorHelpers';

function freezeForm() {
  document.querySelector('#bit-content').setAttribute('readonly', true);
}

let formSubmitted = false

export function submitForm() {
  freezeForm();
  const form = document.querySelector('#bit');
  if (!formSubmitted) {
    form.submit();
    formSubmitted = true
  }

}

export function showEditableForms() {
  const editor = document.querySelector('#bit-content')
  editor.classList.remove('hidden')
  expandTextArea()
}
