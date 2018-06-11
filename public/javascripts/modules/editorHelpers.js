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
