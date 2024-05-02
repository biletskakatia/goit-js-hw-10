import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
let userSelectedDate;
let intervalId;
const startButton = document.querySelector('[data-start]');
const dateTimePicker = document.getElementById('datetime-picker');
startButton.disabled = true;
startButton.addEventListener('click', () => {
    updateTimer();
});
flatpickr("#datetime-picker", {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose: function(selectedDates) {
        console.log(selectedDates[0]);
        userSelectedDate = selectedDates[0];
        if (userSelectedDate < new Date()) {
            iziToast.error({
                title: 'Error',
                message: 'Please choose a date in the future',
                position: 'topCenter'
            });
        } else {
          startButton.disabled = false;
        }
    }
});

function formatTimeValue(value) {
    return String(value).padStart(2, '0');
}

function updateTimer() {
    dateTimePicker.disabled = true;
    startButton.disabled = true;
    intervalId = setInterval(() => { 
    const currentTime = new Date().getTime();
    const remainingTime = userSelectedDate.getTime() - currentTime;
    
    if (remainingTime <= 0) {
    clearInterval(intervalId);
      dateTimePicker.disabled = false;
    return;
    }

    const { days, hours, minutes, seconds } = convertMs(remainingTime);
    document.querySelector('[data-days]').textContent = formatTimeValue(days);
    document.querySelector('[data-hours]').textContent = formatTimeValue(hours);
    document.querySelector('[data-minutes]').textContent = formatTimeValue(minutes);
    document.querySelector('[data-seconds]').textContent = formatTimeValue(seconds);
}, 1000);
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
