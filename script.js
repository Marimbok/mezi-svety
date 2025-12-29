// ===== Odpočet: 29.12.2025 18:00:00 Praha =====
const target = new Date("2026-02-28T16:00:00+01:00"); // CET

const $ = (id) => document.getElementById(id);

const dd = $("dd");
const hh = $("hh");
const mm = $("mm");
const ss = $("ss");
const note = $("countdownNote");

// Bezpečnost: když chybí elementy, ať to nespadne potichu
if (!dd || !hh || !mm || !ss) {
  console.error("Countdown: chybí elementy dd/hh/mm/ss v HTML.");
}

function pad2(n) {
  return String(n).padStart(2, "0");
}

function renderCountdown() {
  try {
    const now = new Date();
    let diff = target.getTime() - now.getTime();

    if (Number.isNaN(diff)) {
      throw new Error("Countdown: target date je neplatné (NaN).");
    }

    if (diff <= 0) {
      diff = 0;
      if (note) note.textContent = "Je to tady.";
    } else {
      if (note) note.textContent = "";
    }

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    if (dd) dd.textContent = pad2(days);
    if (hh) hh.textContent = pad2(hours);
    if (mm) mm.textContent = pad2(mins);
    if (ss) ss.textContent = pad2(secs);
  } catch (e) {
    console.error(e);
    if (note) note.textContent = "Odpočet se nepovedlo spustit (chyba v konzoli).";
  }
}

// 1) hned vykresli
renderCountdown();

// 2) pak aktualizuj každou sekundu
setInterval(renderCountdown, 1000);

const form = document.getElementById("signupForm");
const signupSection = form.closest(".signup");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // zabrání přesměrování

    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: data,
        headers: {
          "Accept": "application/json"
        }
      });

      if (response.ok) {
        // nahradí celý formulář potvrzením
        signupSection.innerHTML = `
          <div class="signup-success">
            <h3>Odesláno</h3>
            <p>
              Tvá přihláška byla zaznamenána.<br>
              Další instrukce přijdou v pravý čas.
            </p>
          </div>
        `;
      } else {
        alert("Odeslání se nezdařilo. Zkus to prosím znovu.");
      }
    } catch (err) {
      alert("Chyba připojení. Zkus to prosím později.");
    }
  });
}

