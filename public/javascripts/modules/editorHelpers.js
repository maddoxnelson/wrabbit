function autosize(el) {
  const element = el;
  element.style.height = `${el.scrollHeight}px`;
}

export function expandTextArea() {
  const textareas = [...document.querySelectorAll('textarea')];

  // This is annoying, but seems to be required in order for this
  // to be added to the animation queue properly
  setTimeout(() => {
    textareas.forEach(area => autosize(area));
  }, 0);

  textareas.forEach(area => area.addEventListener('keydown', (e) => {
    autosize(e.target);
  }));
}

export function deleteWarning() {
  const deleteBtns = [...document.querySelectorAll('.delete')];

  function deleteAndRedirect(link) {
    window.location.href = link;
  }

  deleteBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const confirm = window.confirm('Are you sure you want to delete this Bit? This is permanent.'); // eslint-disable-line no-alert
      if (confirm) deleteAndRedirect(btn.dataset.link);
    });
  });
}

export function changePrivacy() {
  const lockBtns = [...document.querySelectorAll('.lock-item')];
  lockBtns.forEach(btn => btn.addEventListener('click', () => btn.querySelector('.dropdown').classList.toggle('hidden')));
}

export function changeTrust() {
  const trustBtns = [...document.querySelectorAll('.trust-item')];
  trustBtns.forEach(btn => btn.addEventListener('click', () => btn.closest('.trust-parent').querySelector('.dropdown').classList.toggle('hidden')));
}
