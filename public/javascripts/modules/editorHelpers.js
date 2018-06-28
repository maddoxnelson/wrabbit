function autosize(el){
  el.style.height = `${el.scrollHeight}px`
}

export function expandTextArea() {
  const textareas = [...document.querySelectorAll('textarea')];

  // This is annoying, but seems to be required in order for this to be added to the animation queue properly
  setTimeout(function(){
    textareas.forEach(area => autosize(area))
  },0)


  textareas.forEach(area => area.addEventListener('keydown', function(e) {
    autosize(e.target)
  }));
}

export function deleteWarning() {
  const deleteBtns = [...document.querySelectorAll('.delete')]

  function deleteAndRedirect(link) {
    location.href = link
  }

  deleteBtns.forEach(btn => {
    btn.addEventListener('click', e => {
      let confirm = window.confirm('Are you sure you want to delete this Bit? This is permanent.')
      if (confirm) deleteAndRedirect(btn.dataset.link)
    })
  })
}

export function changePrivacy() {
  const lockBtns = [...document.querySelectorAll('.lock-item')]
  lockBtns.forEach(btn => btn.addEventListener('click', () => btn.querySelector('.dropdown').classList.toggle('hidden')))
}

export function changeTrust() {
  const trustBtns = [...document.querySelectorAll('.trust-item')]
  trustBtns.forEach(btn => btn.addEventListener('click', () => btn.closest('.trust-parent').querySelector('.dropdown').classList.toggle('hidden')))
}
