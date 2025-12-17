// Nastav cílové datum a čas (Praha)
// Formát: new Date(rok, měsíc-1, den, hodina, minuta, sekunda)
const target = new Date(2025, 11, 29, 18, 0, 0); // 29.12.2025 18:00

const dd = document.getElementById("dd");
const hh = document.getElementById("hh");
const mm = document.getElementById("mm");
const ss = document.getElementById("ss");
const note = document.getElementById("countdownNote");

function pad(n){ return String(n).padStart(2, "0"); }

function tick(){
  const now = new Date();
  let diff = target - now;

  if (diff <= 0){
    dd.textContent = "00";
    hh.textContent = "00";
    mm.textContent = "00";
    ss.textContent = "00";
    note.textContent = "Už to začalo.";
    return;
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  dd.textContent = pad(days);
  hh.textContent = pad(hours);
  mm.textContent = pad(mins);
  ss.textContent = pad(secs);

  note.textContent = `Čas se krátí!`;
}

tick();
setInterval(tick, 1000);
