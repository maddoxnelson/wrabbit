import { submitForm, validate } from './sprintHelpers';

function strPadLeft(string, pad, length) {
  return (new Array(length+1).join(pad)+string).slice(-length);
}

function hideBox(el) {
  el.classList.add('hidden');
}

function updateClock(time) {
  const countdownClock = document.querySelector('#clock');
  let min = Math.floor(time / 60);
  let sec = time - min * 60;
  let formattedTime = `${strPadLeft(min, '0', 1)}:${strPadLeft(sec, '0', 2)}`;
  countdownClock.innerText = formattedTime;
}

function countdown(duration = 5) {

  const ms = duration * 1000;
  let ticker = duration - 1;

  const clock = setInterval(() => {
    updateClock(ticker);
    ticker--;
  }, 1000);

  return new Promise(resolve => {

    setTimeout(() => {
      clearInterval(clock);
      resolve('resolved');
    }, ms);
  });
}

async function runSprint() {
  if (validate()) {
    hideBox(document.getElementById('timed'))
    const time = parseInt(this.dataset.value) * 60;
    console.log('Sprint starting in 5 seconds...')
    await countdown(5);
    console.log(`${this.dataset.value} ${this.dataset.unit} sprint starting!!`)
    await countdown(time);
    console.log('SPRINT COMPLETE! Take 15 seconds to finish your current sentence.')
    await countdown(15);
    submitForm();
    console.log('Display stats on the next page')
  } else {

  }
}

function init() {
  const timedBtns = [...document.querySelectorAll('.timed-sprint')];
  timedBtns.forEach(btn => btn.addEventListener('click', runSprint));
}

function timedSprint() {
  init();
}

export default timedSprint;
