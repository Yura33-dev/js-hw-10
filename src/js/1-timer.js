'use strict';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startBtn = document.querySelector('[data-start]');
startBtn.setAttribute('disabled', true);

const inputPicker = document.querySelector('#datetime-picker');

let userSelectedDate;
let timerUpdate;

flatpickr(inputPicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];

    if (userSelectedDate <= new Date()) {
      iziToast.error({
        title: 'Something went wrong!',
        message: 'Please choose a date in the future',
        position: 'topRight',
        progressBar: false,
      });
      startBtn.setAttribute('disabled', true);
    } else if (userSelectedDate > new Date()) {
      startBtn.removeAttribute('disabled');
    }
  },
});

startBtn.addEventListener('click', e => {
  e.target.setAttribute('disabled', true);
  inputPicker.setAttribute('disabled', true);

  const daysMarkup = document.querySelector('[data-days]'),
    hoursMarkup = document.querySelector('[data-hours]'),
    minutesMarkup = document.querySelector('[data-minutes]'),
    secondsMarkup = document.querySelector('[data-seconds]');

  timerUpdate = setInterval(
    () =>
      startTimer({
        daysMarkup,
        hoursMarkup,
        minutesMarkup,
        secondsMarkup,
        time: userSelectedDate - new Date(),
      }),
    1000
  );

  iziToast.success({
    title: 'Done!',
    message: 'Timer has been started',
  });
});

function startTimer({
  daysMarkup,
  hoursMarkup,
  minutesMarkup,
  secondsMarkup,
  time,
}) {
  if (time >= 0) {
    const { days, hours, minutes, seconds } = convertMs(time);

    daysMarkup.textContent = addLeadingZero(days);
    hoursMarkup.textContent = addLeadingZero(hours);
    minutesMarkup.textContent = addLeadingZero(minutes);
    secondsMarkup.textContent = addLeadingZero(seconds);
  } else {
    clearInterval(timerUpdate);
    inputPicker.removeAttribute('disabled');
    iziToast.info({
      title: 'That is all!',
      message: 'Timer has been finished',
    });
  }
}

function addLeadingZero(value) {
  if (value < 10) return `0${value}`;
  return value;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
