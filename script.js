"use srickt";
const date = document.querySelector(".date");
const selectes = document.querySelectorAll("select");
const btnAlarm = document.querySelector(".btn-alarm");
let alarTime;
let state = "set";
const ringtone = new Audio("./ringtone.mp3");

for (let i = 23; i >= 0; i--) {
  i = i < 10 ? "0" + i : i + "";
  const option = `<option value="${i}" class="option">${i}</option>`;
  selectes[0].insertAdjacentHTML("beforeend", option);
}
for (let i = 59; i >= 0; i--) {
  i = i < 10 ? "0" + i : i + "";
  const option = `<option value="${i}" class="option">${i}</option>`;
  selectes[1].insertAdjacentHTML("beforeend", option);
}
setInterval(() => {
  const now = new Date();
  const secound =
    now.getSeconds() <= 9 ? "0" + now.getSeconds() : now.getSeconds();
  const minte =
    now.getMinutes() <= 9 ? "0" + now.getMinutes() : now.getMinutes();
  const hour = now.getHours() <= 9 ? "0" + now.getHours() : now.getHours();
  date.innerHTML = `${hour}:${minte}:${secound}`;
  if (alarTime == `${hour}:${minte}`) {
    ringtone.play();
    ringtone.loop = true;
    btnAlarm.innerHTML = "clear alarm";
  }
}, 1000);
btnAlarm.addEventListener("click", () => {
  const [hourElement, minteElement] = selectes;
  const houre = hourElement.value;
  const minute = minteElement.value;
  alarTime = `${houre}:${minute}`;
  checkState(state);
  if (houre.includes("hour") || minute.includes("minute")) {
    alert("Choose the time");
    btnAlarm.innerHTML = "set alarm";
    selectes.forEach((select) => {
      select.classList.remove("disable");
    });
  }
});

function checkState(state0) {
  if (state0 == "noset") {
    selectes.forEach((select) => {
      select.classList.add("disable");
    });
    btnAlarm.innerHTML = "stop alarm";
    state = "set";
  } else {
    selectes.forEach((select) => {
      select.classList.remove("disable");
    });
    btnAlarm.innerHTML = "start alarm";
    alarTime = "";
    ringtone.pause();
    state = "noset";
  }
}
