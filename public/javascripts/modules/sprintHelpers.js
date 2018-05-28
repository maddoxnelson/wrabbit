export function submitForm() {
  const form = document.querySelector('#bit');
  form.submit();
}

export function validate() {
  const genreBtns = [...document.querySelectorAll('[name="genre"]')];
  const genreChecked = genreBtns.filter(btn => btn.checked).length > 0;
  const title = document.querySelector('#bit-title').value.length > 0;
  return title && genreChecked;
}
