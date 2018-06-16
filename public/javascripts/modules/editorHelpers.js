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
      if (confirm) deleteAndRedirect(e.target.dataset.link)
    })
  })
}
