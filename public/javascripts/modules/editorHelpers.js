function autosize(el){
  console.log(el)
  el.style.height = `${el.scrollHeight}px`
}

function expandTextArea() {
  const textareas = [...document.querySelectorAll('textarea')];
  textareas.forEach(area => autosize(area))
  textareas.forEach(area => area.addEventListener('keydown', function(e) {
    autosize(e.target)
  }));
}

export default expandTextArea;
