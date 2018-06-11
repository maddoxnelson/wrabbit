export function submitForm() {
  const form = document.querySelector('#bit');
  form.submit();
}

export function validate() {
  const title = document.querySelector('#bit-title').value.length > 0;
  return title;
}
