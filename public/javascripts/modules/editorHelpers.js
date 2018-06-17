function autosize(el){
  el.style.height = `${el.scrollHeight}px`
}

export function expandTextArea() {
  const textareas = [...document.querySelectorAll('textarea')];
  textareas.forEach(area => autosize(area))
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
  const privacyToggle = document.querySelector('#privacy-toggle')
  const privacyForm = document.querySelector('#privacy-form')

  if (!privacyToggle) return
  lockBtns.forEach(btn => {
    btn.addEventListener('click', e => {
      privacyToggle.parentNode.classList.toggle('hidden')
    })
  })

  privacyToggle.addEventListener('change', e => {
     privacyForm.value = e.target.value
     privacyToggle.parentNode.classList.toggle('hidden')

     if (privacyForm.value !== 'world') {
       document.querySelector('.lock-open').classList.add('hidden')
       document.querySelector('.lock-closed').classList.remove('hidden')
     } else {
       document.querySelector('.lock-open').classList.remove('hidden')
       document.querySelector('.lock-closed').classList.add('hidden')
     }
  })
}
