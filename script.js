const respostes = [
  {
    id: 1,
    grup: "DAW1A",
    puntuacio: 4,
    comentari: "Tot clar, la practica ha estat facil de seguir.",
    data: "2026-05-21T09:10:00"
  },
  {
    id: 2,
    grup: "DAW1B",
    puntuacio: 5,
    comentari: "M'ha agradat treballar amb exemples visuals.",
    data: "2026-05-21T09:25:00"
  },
  {
    id: 3,
    grup: "ASIX1",
    puntuacio: 3,
    comentari: "Caldria repetir la part de grafiques.",
    data: "2026-05-21T09:45:00"
  },
  {
    id: 4,
    grup: "DAW1A",
    puntuacio: 2,
    comentari: "M'ha costat una mica la validacio.",
    data: "2026-05-21T10:05:00"
  },
  {
    id: 5,
    grup: "DAW1B",
    puntuacio: 4,
    comentari: "",
    data: "2026-05-21T10:20:00"
  }
];

const groups = ["DAW1A", "DAW1B", "ASIX1"];
const scoreColors = ["#ef4444", "#f97316", "#f59e0b", "#22c55e", "#2563eb"];

const form = document.querySelector("#surveyForm");
const groupInput = document.querySelector("#group");
const scoreInput = document.querySelector("#score");
const commentInput = document.querySelector("#comment");
const formMessage = document.querySelector("#formMessage");
const groupFilter = document.querySelector("#groupFilter");

const activeFilterText = document.querySelector("#activeFilterText");
const totalResponses = document.querySelector("#totalResponses");
const averageScore = document.querySelector("#averageScore");
const positivePercent = document.querySelector("#positivePercent");
const analyzedGroup = document.querySelector("#analyzedGroup");
const barChart = document.querySelector("#barChart");
const scorePie = document.querySelector("#scorePie");
const scoreLegend = document.querySelector("#scoreLegend");
const positivePie = document.querySelector("#positivePie");
const positiveLegend = document.querySelector("#positiveLegend");
const groupComparison = document.querySelector("#groupComparison");
const responsesList = document.querySelector("#responsesList");

form.addEventListener("submit", guardarResposta);
groupFilter.addEventListener("change", renderPanel);

function guardarResposta(event) {
  event.preventDefault();

  const grup = groupInput.value;
  const puntuacio = Number(scoreInput.value);
  const comentari = commentInput.value.trim();

  if (!groups.includes(grup)) {
    showMessage("Selecciona un grup valid.", false);
    return;
  }

  if (!Number.isInteger(puntuacio) || puntuacio < 1 || puntuacio > 5) {
    showMessage("La puntuacio ha de ser un numero enter entre 1 i 5.", false);
    return;
  }

  const novaResposta = {
    id: getNextId(),
    grup,
    puntuacio,
    comentari,
    data: new Date().toISOString()
  };

  respostes.push(novaResposta);
  form.reset();
  groupInput.value = grup;
  showMessage("Resposta guardada correctament.", true);
  renderPanel();
}

function showMessage(text, isOk) {
  formMessage.textContent = text;
  formMessage.classList.toggle("ok", isOk);
}

function getNextId() {
  const ids = respostes.map((resposta) => resposta.id);
  return ids.length ? Math.max(...ids) + 1 : 1;
}

function filtrarRespostes(grupFiltre) {
  if (grupFiltre === "TOTS") {
    return [...respostes];
  }

  return respostes.filter((resposta) => resposta.grup === grupFiltre);
}

function calcularEstadistiques(llista) {
  const total = llista.length;
  const suma = llista.reduce((acc, resposta) => acc + resposta.puntuacio, 0);
  const positives = llista.filter((resposta) => resposta.puntuacio >= 4).length;

  return {
    total,
    mitjana: total ? suma / total : 0,
    positivesPercent: total ? (positives / total) * 100 : 0
  };
}

function comptarPuntuacions(llista) {
  return [1, 2, 3, 4, 5].map((puntuacio) => ({
    puntuacio,
    total: llista.filter((resposta) => resposta.puntuacio === puntuacio).length
  }));
}

function renderPanel() {
  const filtre = groupFilter.value;
  const dadesFiltrades = filtrarRespostes(filtre);
  const stats = calcularEstadistiques(dadesFiltrades);
  const distribucio = comptarPuntuacions(dadesFiltrades);

  activeFilterText.textContent = filtre === "TOTS"
    ? "Mostrant totes les respostes"
    : `Mostrant dades del grup seleccionat al formulari: ${filtre}`;

  totalResponses.textContent = stats.total;
  averageScore.textContent = stats.total ? stats.mitjana.toFixed(1) : "-";
  positivePercent.textContent = `${stats.positivesPercent.toFixed(1)}%`;
  analyzedGroup.textContent = filtre === "TOTS" ? "Tots" : filtre;

  renderBarChart(distribucio);
  renderScorePie(distribucio, stats.total);
  renderPositivePie(stats);
  renderGroupComparison(filtre);
  renderResponses(dadesFiltrades);
}

function renderBarChart(distribucio) {
  const maxim = Math.max(...distribucio.map((item) => item.total), 1);

  barChart.innerHTML = distribucio.map((item) => {
    const amplada = (item.total / maxim) * 100;

    return `
      <div class="bar-item">
        <span>${item.puntuacio} estrella${item.puntuacio === 1 ? "" : "es"}</span>
        <div class="bar-track">
          <div class="bar-fill" style="width: ${amplada}%"></div>
        </div>
        <span class="bar-count">${item.total}</span>
      </div>
    `;
  }).join("");
}

function renderScorePie(distribucio, total) {
  const segments = distribucio.map((item, index) => ({
    label: `${item.puntuacio}/5`,
    value: item.total,
    color: scoreColors[index]
  }));

  scorePie.style.background = buildConicGradient(segments, total);
  scoreLegend.innerHTML = segments.map((segment) => {
    const percent = total ? (segment.value / total) * 100 : 0;

    return `
      <li>
        <span class="dot" style="background: ${segment.color}"></span>
        ${segment.label}: ${segment.value} (${percent.toFixed(1)}%)
      </li>
    `;
  }).join("");
}

function renderPositivePie(stats) {
  const positives = stats.total ? Math.round((stats.positivesPercent / 100) * stats.total) : 0;
  const noPositives = stats.total - positives;
  const segments = [
    { label: "Positives (4-5)", value: positives, color: "#22c55e" },
    { label: "No positives (1-3)", value: noPositives, color: "#f59e0b" }
  ];

  positivePie.style.background = buildConicGradient(segments, stats.total);
  positiveLegend.innerHTML = segments.map((segment) => {
    const percent = stats.total ? (segment.value / stats.total) * 100 : 0;

    return `
      <li>
        <span class="dot" style="background: ${segment.color}"></span>
        ${segment.label}: ${percent.toFixed(1)}%
      </li>
    `;
  }).join("");
}

function buildConicGradient(segments, total) {
  if (!total) {
    return "#e5e7eb";
  }

  let start = 0;
  const parts = segments
    .filter((segment) => segment.value > 0)
    .map((segment) => {
      const degrees = (segment.value / total) * 360;
      const end = start + degrees;
      const part = `${segment.color} ${start}deg ${end}deg`;
      start = end;
      return part;
    });

  return `conic-gradient(${parts.join(", ")})`;
}

function renderGroupComparison(filtre) {
  groupComparison.innerHTML = groups.map((grup) => {
    const dadesGrup = filtrarRespostes(grup);
    const stats = calcularEstadistiques(dadesGrup);
    const percent = (stats.mitjana / 5) * 100;
    const label = filtre === grup ? `${grup} (seleccionat)` : grup;

    return `
      <div class="comparison-row">
        <span>${label}</span>
        <div class="comparison-track">
          <div class="comparison-fill" style="width: ${percent}%"></div>
        </div>
        <span class="comparison-value">${stats.total ? stats.mitjana.toFixed(1) : "-"}/5</span>
      </div>
    `;
  }).join("");
}

function renderResponses(llista) {
  const ordenades = [...llista].sort((a, b) => new Date(b.data) - new Date(a.data));

  if (!ordenades.length) {
    responsesList.innerHTML = '<p class="empty">No hi ha respostes per aquest filtre.</p>';
    return;
  }

  responsesList.innerHTML = ordenades.map((resposta) => {
    const nivell = resposta.puntuacio >= 4 ? "high" : resposta.puntuacio === 3 ? "medium" : "low";
    const comentari = resposta.comentari || "Sense comentari";

    return `
      <article class="response-item ${nivell}">
        <span class="response-group">${resposta.grup}</span>
        <p><strong>Puntuacio:</strong> ${resposta.puntuacio}/5</p>
        <p><strong>Comentari:</strong> ${escapeHtml(comentari)}</p>
        <span class="response-date">${formatDate(resposta.data)}</span>
      </article>
    `;
  }).join("");
}

function formatDate(dataIso) {
  return new Intl.DateTimeFormat("ca-ES", {
    dateStyle: "short",
    timeStyle: "short"
  }).format(new Date(dataIso));
}

function escapeHtml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

renderPanel();
