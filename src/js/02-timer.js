import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from "notiflix";

const refs = {
    input: document.querySelector('input#datetime-picker'),
    btn: document.querySelector('[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
}
let selectedDate = null;
let intervalId = null;

refs.btn.addEventListener('click', onClickBtn);
refs.btn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
        return Notify.failure('Please choose a date in the future');
    }
      Notify.success('The selected date is valid!')
      selectedDate = selectedDates[0].getTime();
      return (refs.btn.disabled = false);
  },
};

flatpickr(refs.input, options);

function onClickBtn() {
  intervalId = setInterval(() => {
    const meterTime = selectedDate - Date.now();
    const { days, hours, minutes, seconds } = convertMs(meterTime);

    if (meterTime <= 0) {
      clearInterval(intervalId);
      return;
    }
    refs.btn.disabled = true;
    updateTimer({ days, hours, minutes, seconds });
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateTimer({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
}