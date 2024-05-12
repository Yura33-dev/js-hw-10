'use strict';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('form.form');

form.addEventListener('submit', e => {
  e.preventDefault();

  const { delay, state } = e.target.elements;

  makePromise(state.value, delay.value)
    .then(data => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${data} ms`,
      });
    })
    .catch(error => {
      iziToast.error({
        message: `❌ Rejected promise in ${error} ms`,
      });
    });
});

function makePromise(state, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      state === 'fulfilled' ? resolve(delay) : reject(delay);
    }, delay);
  });
}
