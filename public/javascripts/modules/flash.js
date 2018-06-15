export function flashClickHandler() {
  const flashMessages = [...document.querySelectorAll('.flash-messages')];

  flashMessages.forEach(flash => {
    setTimeout(function(){ flash.remove() }, 3000);
  })
}
