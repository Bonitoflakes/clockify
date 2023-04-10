import { createElement } from "../utils/create";

let timer = [0, 0, 0, 0];

function generateTimer() {
  const a = createElement(
    "p",
    { id: "timer" },
    `day: ${timer[0]} hrs: ${timer[1]} mins: 0${timer[2]} secs: 0${timer[3]}`
  );
  document.getElementById("app")?.append(a);
}

const incrementTimer = () => {
  timer[3]++;
  if (timer[3] > 60) {
    timer[2]++;
    timer[3] = 0;
  }
  if (timer[2] > 60) {
    timer[1]++;
    timer[2] = 0;
  }
  if (timer[1] >= 24) {
    timer[0]++;
    timer[1] = 0;
  }

  let hrs;
  if (timer[1].toString().length === 1) {
    hrs = `0${timer[1]}`;
  } else {
    hrs = `${timer[1]}`;
  }

  let mins;
  if (timer[2].toString().length === 1) {
    mins = `0${timer[2]}`;
  } else {
    mins = `${timer[2]}`;
  }

  let secs;
  if (timer[3].toString().length === 1) {
    secs = `0${timer[3]}`;
  } else {
    secs = `${timer[3]}`;
  }

  document.getElementById("timer")!.innerText = `day: ${timer[0]} hrs: ${hrs} mins: ${mins} secs: ${secs}`;
  console.log(timer);
};

let isStarted = false;
let timerID: any;
document.querySelector("#timer-btn")!.addEventListener("click", () => {
  isStarted ? clearInterval(timerID) : (timerID = setInterval(incrementTimer, 1000));
  isStarted = !isStarted;
});

export { timer, incrementTimer, generateTimer };
