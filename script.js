const hour = document.getElementById('hour');
const minute = document.getElementById('minute');
const AmPm = document.getElementById('ampm');
const setAlarmBtn = document.getElementById('setBtn');
const content = document.getElementById('content');
const ringTone = new Audio('ringtone.mp3');
const secondBtn = document.getElementById('secondBtn');
const body = document.querySelector('body');
const resumeBtn = document.getElementById('resumeBtn');
const welcomeScreen = document.getElementById('welcomeScreen');
const alarmTimeIndicator = document.getElementById('alarmText');
let CurrentTime = document.getElementById('currentTime');
let alarmSts = document.getElementById("alarmSts");
// Check if user has exited webpage


if (!localStorage.getItem('exited')) {
    localStorage.setItem('exited', 'false');
} else {
    // Check alarm set up already is been triggered
    if (localStorage.getItem('exited') == 'true' && localStorage.getItem('isAlarmSet') == 'true') {
        welcomeScreen.className = 'welcomeScreen flex';
    }
}

// Play ringtone continously on resume
if (!localStorage.getItem('toPlay')) {
    localStorage.setItem('toPlay', 'no');
}

// Hide Alarm indicator if alarm is not set
if (localStorage.getItem('alarmTime') == "00:00:AM")
    alarmTimeIndicator.className = "no-display";

// Add class to content
if (!localStorage.getItem('contentClass')) {
    localStorage.setItem('contentClass', 'content flex');
    content.className = localStorage.getItem('contentClass');
} else {
    content.className = localStorage.getItem('contentClass');
}

// Set button text
if (!localStorage.getItem('btnText')) {
    localStorage.setItem('btnText', 'Set Alarm');
    setAlarmBtn.textContent = localStorage.getItem('btnText');
} else {
    setAlarmBtn.textContent = localStorage.getItem('btnText');
}

// Set defualt isAlarm
if (!localStorage.getItem('isAlarmSet')) {
    localStorage.setItem('isAlarmSet', 'false');
}

// Set default alarm time
if (!localStorage.getItem('alarmTime')) {
    localStorage.setItem('alarmTime', '00:00:PM');
}

// Set hour values
for (let i = 12; i > 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = ` <option value="${i}">${i}</option>`;
    hour.firstElementChild.insertAdjacentHTML("afterend", option);
}
// Set Minute values
for (let i = 59; i >= 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = ` <option value="${i}">${i}</option>`;
    minute.firstElementChild.insertAdjacentHTML("afterend", option);
}
// Set AM/PM values
for (let i = 2; i > 0; i--) {
    let am_pm = i == 1 ? "AM" : "PM";
    let option = `<option value="${am_pm}">${am_pm}</option>`;
    AmPm.firstElementChild.insertAdjacentHTML("afterend", option);
}


// Play Alarm function
const playAlarm = () => {
    if ((localStorage.getItem('exited') == 'xxx') || (localStorage.getItem('toPlay' == 'yes'))) {
        ringTone.play();
    }
    ringTone.loop = true;
}

setInterval(() => {
    let date = new Date();
    // var h = ((date.getHours() - 12));
    let h = date.getHours(); 
    let m = date.getMinutes();
    let s = date.getSeconds();
    let ampm = "AM";

    // 12 Hour Format
    if (h > 11) {
    h = h - 12;
    // ampm = (date.getHours()) < 12 ? 'AM' : 'PM';
    ampm = 'PM'
    }

    // if hour value is 0 then set it to 12
    h = h == 0 ? h = 12 : h;
    // Adding 0 before h , m ,s 
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    // Update time every second
    currentTime.textContent = `${h}:${m}:${s} ${ampm}`;

    // Play ringtone if alarm time mathces with current time
    if ((localStorage.getItem('alarmTime') == `${h}:${m}:${ampm}`) || (localStorage.getItem('toPlay') == 'yes')) {
        playAlarm();
        alarmSts.src="alarm_ring.gif";
    }
}, 1000);



// Set alarm 
const setAlarm = () => {

    // Clear alarm
    if (localStorage.getItem('isAlarmSet') == 'true') {
        // Reset Alarm time
        localStorage.setItem('alarmTime', "00:00:AM");
        ringTone.pause();
        //changing back to image instead of giff
        alarmSts.src="clock.png";
        // Enable selection of time
        localStorage.setItem('contentClass', 'content flex')
        content.className = localStorage.getItem('contentClass');
        // change button text to "Set alarm"
        localStorage.setItem('btnText', 'Set Alarm')
        setAlarmBtn.textContent = localStorage.getItem('btnText');
        // Hide resume button
        resumeBtn.hidden = true
        // Reset alarm indicator
        alarmTimeIndicator.textContent = "Alarm Time set to: ";
        alarmTimeIndicator.className = "no-display";
        // Set want to play to no to stop alarm
        localStorage.setItem('toPlay', 'no')
        // Return
        return localStorage.setItem('isAlarmSet', 'false');
    }

    // Getting alarm time from user
    let time = `${hour.value}:${minute.value}:${AmPm.value}`;
    if (time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")) {
        alert("Please select a valid time");
        return;
    }

    // Set alarm to true
    localStorage.setItem('isAlarmSet', 'true');
    // Set alarm time
    localStorage.setItem('alarmTime', time);
    // Disable selection of time when alarm is set
    localStorage.setItem('contentClass', 'content flex disable');
    content.className = localStorage.getItem('contentClass');
    // Set button text to "Clear Alarm";
    localStorage.setItem('btnText', 'Clear Alarm')
    setAlarmBtn.textContent = localStorage.getItem('btnText');
    // Set Alarm Time indicator
    alarmTimeIndicator.textContent = "Alarm Time set to: " + localStorage.getItem('alarmTime');
    alarmTimeIndicator.className = "";
    // Set user exited to false to avoid DOM exception
    localStorage.setItem('exited', 'xxx');
}

function formatTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
  
    // Convert hours to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // "0" should be displayed as "12"
  
    // Add leading zeros if needed
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
  
    return hours + ':' + minutes + ':' + ampm;
  }


  function compareTime(time1, time2) {
    // Extract hours, minutes, and am/pm indicator from time1
    const time1Parts = time1.split(':');
    const time1Hours = parseInt(time1Parts[0]);
    const time1Minutes = parseInt(time1Parts[1]);
    const time1AmPm = time1Parts[2];
  
    // Extract hours, minutes, and am/pm indicator from time2
    const time2Parts = time2.split(':');
    const time2Hours = parseInt(time2Parts[0]);
    const time2Minutes = parseInt(time2Parts[1]);
    const time2AmPm = time2Parts[2];
  
    // Convert hours to 24-hour format
    const hour1 = time1AmPm === 'PM' ? time1Hours + 12 : time1Hours;
    const hour2 = time2AmPm === 'pm' ? time2Hours + 12 : time2Hours;
  
    // Compare hours
    if (hour1 < hour2) {
      return -1;
    } else if (hour1 > hour2) {
      return 1;
    } else {
      // If hours are equal, compare minutes
      if (time1Minutes < time2Minutes) {
        return -1;
      } else if (time1Minutes > time2Minutes) {
        return 1;
      } else {
        // If hours and minutes are equal, return 0 (equal)
        return -1;
      }
    }
  }

// Hide Welcome Screen
const hideWelcomeScreen = () => {
    // hide WelcomeScreen
    welcomeScreen.className = 'no-display';
    // Set alarm time indicator
    alarmTimeIndicator.textContent = "Alarm Time set to: " + localStorage.getItem('alarmTime');
    // Set exited to xxx to avoid DomException
    localStorage.setItem('exited', 'xxx');
    // Set want to play to play ringtone even if time has expired
    // let alrmHr = parseInt(localStorage.getItem('alarmTime').substring(0, 2));
    // let alrmMin = parseInt(localStorage.getItem('alarmTime').substring(3, 5));
    // let alrmAmPm = localStorage.getItem('alarmTime').substring(6, 8);
    let timeNow = formatTime();
    let isalrmGreat = compareTime(localStorage.getItem('alarmTime'),timeNow);
    if(isalrmGreat===1){
        localStorage.setItem('toPlay', 'no');
    }else{
        localStorage.setItem('toPlay', 'yes');
        alarmSts.src='clock.png'
    }
    
}

// --------------------Eventlisteners-----------------------------

// Set Button
setAlarmBtn.addEventListener('click', setAlarm);
// Resume Button
resumeBtn.addEventListener('click', hideWelcomeScreen);

// Check if user has exited the page or refreshed
const beforeUnloadListener = (event) => {
    localStorage.setItem('exited', 'true');
};
window.addEventListener("beforeunload", beforeUnloadListener);