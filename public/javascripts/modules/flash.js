export function flashClickHandler() {
  const flashMessages = [...document.querySelectorAll('.flash-messages')];

  flashMessages.forEach((flash) => {
    setTimeout(() => { flash.remove(); }, 3000);
  });
}
