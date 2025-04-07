const state = {
    guthaben: 0,
    einnahmen: 0,
    ziel: null,
    anzahlPersonen: 1,
    fahrpreis: 0,
    ausgabe: "Bitte wählen Sie ein Ziel",
};

const zieleUndPreise = {
    Bregenz: 90,
    Eisenstadt: 13,
    Graz: 40,
    Innsbruck: 80,
    Klagenfurt: 60,
    Linz: 40,
    Salzburg: 60,
    "St. Pölten": 15,
};

const einwerfenInput = document.getElementById("einwerfenBetrag");
const einwerfenButton = document.getElementById("einwerfenButton");
const zielSelect = document.getElementById("ziel");
const anzahlPersonenInput = document.getElementById("anzahlPersonen");
const fahrpreisSpan = document.getElementById("fahrpreis");
const guthabenSpan = document.getElementById("guthaben");
const ticketAusgabeTextarea = document.getElementById("ticketAusgabe");
const einnahmenSpan = document.getElementById("einnahmen");
const ticketKaufen = document.getElementById("ticketKaufen");
const resetBtn = document.getElementById("reset");

ö
function updateFahrpreis() {
    if (state.ziel) {
        state.fahrpreis = zieleUndPreise[state.ziel] * state.anzahlPersonen;
    } else {
        state.fahrpreis = 0;
    }
}


function render() {
    ticketAusgabeTextarea.textContent = state.ausgabe;
    guthabenSpan.textContent = `${state.guthaben} €`;
    fahrpreisSpan.textContent = `${state.fahrpreis} €`;
    einnahmenSpan.textContent = `${state.einnahmen} €`;
}

function onEinwurf() {
    const geld = einwerfenInput.valueAsNumber;
    if (isNaN(geld) || geld <= 0) {
        state.ausgabe = "Bitte einen gültigen Betrag eingeben!";
    } else {
        state.guthaben += geld;
        state.ausgabe = "Geld eingeworfen!";
    }
    einwerfenInput.value = "";
    render();
}


function onZielSelect() {
    state.ziel = zielSelect.value;
    updateFahrpreis();
    state.ausgabe = `Ziel gesetzt: ${state.ziel}`;
    render();
}


function onAnzahlChange() {
    state.anzahlPersonen = anzahlPersonenInput.valueAsNumber;
    updateFahrpreis();
    render();
}


function onTicketKaufen() {
    if (!state.ziel) {
        state.ausgabe = "Bitte wählen Sie ein Ziel!";
    } else if (state.guthaben < state.fahrpreis) {
        state.ausgabe = "Nicht genug Guthaben!";
    } else {
        let restgeld = state.guthaben - state.fahrpreis;
        state.einnahmen += state.fahrpreis;
        state.guthaben = 0;
        state.ausgabe = `=== Fahrkarte nach ${state.ziel} ===\n` +
                        `Einzelpreis: ${zieleUndPreise[state.ziel]} €\n` +
                        `Anzahl der Fahrgäste: ${state.anzahlPersonen}\n` +
                        `Summe: ${state.fahrpreis} €\n` +
                        `Gegeben: ${state.fahrpreis + restgeld} €\n` +
                        `Restgeld: ${restgeld} €\n` +
                        `============================`;
    }
    render();
}


function onReset() {
    state.guthaben = 0;
    state.anzahlPersonen = 1;
    state.ziel = null;
    state.fahrpreis = 0;
    state.ausgabe = "Bitte wählen Sie ein Ziel";
    anzahlPersonenInput.value = 1;
    render();
}


einwerfenButton.addEventListener("click", onEinwurf);
zielSelect.addEventListener("change", onZielSelect);
anzahlPersonenInput.addEventListener("change", onAnzahlChange);
ticketKaufen.addEventListener("click", onTicketKaufen);
resetBtn.addEventListener("click", onReset);


zielSelect.innerHTML = Object.keys(zieleUndPreise)
    .map((ziel) => <option value="${ziel}">${ziel}</option>)
    .join("\n");

render();