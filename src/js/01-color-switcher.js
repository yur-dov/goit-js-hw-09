const startСhangeColors = document.querySelector('button[data-start]');
startСhangeColors.addEventListener('click', setTimeOut)

const stopСhangeColors = document.querySelector('button[data-stop]');
stopСhangeColors.addEventListener('click', stopInterval)

const targetBody = document.body;

let timerId

function stopInterval() {
  clearInterval(timerId);
  startСhangeColors.disabled = false;
}

function setTimeOut() {
  timerId = setInterval(onClick, 1000);
  startСhangeColors.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onClick() {
  targetBody.style.backgroundColor = getRandomHexColor();
}