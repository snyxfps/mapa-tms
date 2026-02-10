const tmsList = [
  { nome: "DATAPAR - RODOPAR", SMP: true,  Multicadastro: false, RCV: true  },
  { nome: "SSW",              SMP: true,  Multicadastro: true,  RCV: true  },
  { nome: "PROTEUS - TOTVS",  SMP: true,  Multicadastro: true,  RCV: true  },
  { nome: "BSOFT",            SMP: true,  Multicadastro: false, RCV: true  },
  { nome: "ESL",              SMP: true,  Multicadastro: false, RCV: false },
  { nome: "STRADA",           SMP: true,  Multicadastro: true,  RCV: false },
  { nome: "SENIOR - AT&M",    SMP: true,  Multicadastro: false, RCV: true  },
  { nome: "BRK",              SMP: true,  Multicadastro: false, RCV: false },
  { nome: "SANKIA",           SMP: true,  Multicadastro: false, RCV: false },
  { nome: "MATRIXCARGO",      SMP: true,  Multicadastro: true,  RCV: false },
  { nome: "ZELA",             SMP: true,  Multicadastro: false, RCV: false },
  { nome: "VCR",              SMP: true,  Multicadastro: false, RCV: true  },
  { nome: "TRIZY",            SMP: true,  Multicadastro: false, RCV: false },
  { nome: "A3SOFT",           SMP: true,  Multicadastro: false, RCV: false },
  { nome: "SENSATTA",         SMP: true,  Multicadastro: false, RCV: false },
  { nome: "PRAXIO",           SMP: true,  Multicadastro: false, RCV: false },
  { nome: "GLOBUS",           SMP: true,  Multicadastro: false, RCV: false },
  { nome: "ATUA - AT&M",      SMP: true,  Multicadastro: true,  RCV: true  },
  { nome: "AVACORP",          SMP: true,  Multicadastro: false, RCV: true  },
  { nome: "AZ SHIP",          SMP: true,  Multicadastro: false, RCV: false },
  { nome: "BELT SISTEMAS",    SMP: true,  Multicadastro: false, RCV: false },
  { nome: "BRUDAM",           SMP: true,  Multicadastro: true,  RCV: true  },
  { nome: "DATAMEX - NSTECH", SMP: true,  Multicadastro: false, RCV: false },
  { nome: "ESCALASOFT",       SMP: true,  Multicadastro: false, RCV: false },
  { nome: "INFLOR",           SMP: true,  Multicadastro: false, RCV: false },
  { nome: "KMM - NSTECH",     SMP: true,  Multicadastro: true,  RCV: true  },
  { nome: "HERMES TM3",       SMP: true,  Multicadastro: false, RCV: false },
  { nome: "VIASOFT",          SMP: true,  Multicadastro: false, RCV: false },
  { nome: "INTERSITE",        SMP: true,  Multicadastro: true,  RCV: true  },
  { nome: "CTRC",             SMP: false, Multicadastro: false, RCV: true  },
  { nome: "GTI",              SMP: false, Multicadastro: false, RCV: true  },
  { nome: "DSS",              SMP: true,  Multicadastro: false, RCV: true  },
  { nome: "PRÓCION",          SMP: false, Multicadastro: false, RCV: true  },
  { nome: "ETL",              SMP: false, Multicadastro: false, RCV: true  },
  { nome: "SAP",              SMP: true,  Multicadastro: false, RCV: false },
  { nome: "SIL SISTEMA",      SMP: false, Multicadastro: false, RCV: true  },
  { nome: "SIIMP SISTEMA",    SMP: false, Multicadastro: false, RCV: true  },
  { nome: "A2O",              SMP: false, Multicadastro: false, RCV: true  },
  { nome: "FING",             SMP: false, Multicadastro: false, RCV: true  },
  { nome: "MASTER TRANSP",    SMP: false, Multicadastro: false, RCV: true  },
  { nome: "IMBRA",            SMP: false, Multicadastro: false, RCV: true  },
  { nome: "GW",               SMP: false, Multicadastro: false, RCV: true  },
  { nome: "SIBRAX SOFTWARE",  SMP: false, Multicadastro: false, RCV: true  },
  { nome: "NEOGRID",          SMP: false, Multicadastro: false, RCV: true  },
  { nome: "SIAT",             SMP: false, Multicadastro: false, RCV: true  },
  { nome: "SERVICE LOGIC",    SMP: false, Multicadastro: false, RCV: true  },
  { nome: "LOGCTe",           SMP: false, Multicadastro: false, RCV: true  },
  { nome: "TDS SISTEMAS",     SMP: false, Multicadastro: false, RCV: true  },
  { nome: "FRETE FACIL",      SMP: false, Multicadastro: false, RCV: true  },
  { nome: "DB FRETE",         SMP: false, Multicadastro: false, RCV: true  },
  { nome: "MITT",             SMP: false, Multicadastro: false, RCV: true  },
  { nome: "DATAMEX ONLINE",   SMP: false, Multicadastro: false, RCV: true  },
];

let state = {
  query: "",
  sortBy: "nome",
  sortDir: "asc"
};

const tbody = document.getElementById("tmsTbody");
const searchInput = document.getElementById("searchInput");
const clearSearch = document.getElementById("clearSearch");
const hint = document.getElementById("resultHint");
const exportBtn = document.getElementById("exportBtn");

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

function normalize(str){
  return (str || "")
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function pill(v){
  return v
    ? `<span class="pill pill--yes">✔</span>`
    : `<span class="pill pill--no">✖</span>`;
}

function applyFilter(list){
  const q = normalize(state.query);
  return list.filter(t => normalize(t.nome).includes(q));
}

function applySort(list){
  const dir = state.sortDir === "asc" ? 1 : -1;

  return [...list].sort((a, b) => {
    if (state.sortBy === "nome"){
      return a.nome.localeCompare(b.nome, "pt-BR") * dir;
    }
    // SMP / Multicadastro / RCV
    const av = a[state.sortBy] ? 1 : 0;
    const bv = b[state.sortBy] ? 1 : 0;
    return (av - bv) * dir || a.nome.localeCompare(b.nome, "pt-BR") * dir;
  });
}

function renderSortIndicators(){
  document.querySelectorAll("th[data-sort]").forEach(th => {
    const key = th.getAttribute("data-sort");
    const icon = th.querySelector(".sort");
    if (!icon) return;
    icon.textContent = (key === state.sortBy) ? (state.sortDir === "asc" ? "▲" : "▼") : "";
  });
}

function render(){
  const filtered = applyFilter(tmsList);
  const sorted = applySort(filtered);

  tbody.innerHTML = sorted.map(t => `
    <tr>
      <td class="tms-name">${t.nome}</td>
      <td>${pill(t.SMP)}</td>
      <td>${pill(t.Multicadastro)}</td>
      <td>${pill(t.RCV)}</td>
    </tr>
  `).join("");

  hint.textContent = (filtered.length === tmsList.length)
    ? `Mostrando tudo (${tmsList.length})`
    : `Mostrando ${filtered.length} de ${tmsList.length}`;

  renderSortIndicators();
}

// Busca
searchInput.addEventListener("input", (e) => {
  state.query = e.target.value || "";
  render();
});

clearSearch.addEventListener("click", () => {
  searchInput.value = "";
  state.query = "";
  searchInput.focus();
  render();
});

// Ordenar
document.querySelectorAll("th[data-sort]").forEach(th => {
  th.addEventListener("click", () => {
    const key = th.getAttribute("data-sort");
    if (state.sortBy === key) {
      state.sortDir = state.sortDir === "asc" ? "desc" : "asc";
    } else {
      state.sortBy = key;
      state.sortDir = "asc";
    }
    render();
  });
});

// Tema
function setTheme(theme){
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("tms_theme_clean", theme);
  themeIcon.textContent = (theme === "dark") ? "☀️" : "🌙";
}

themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme") || "light";
  setTheme(current === "dark" ? "light" : "dark");
});

(function initTheme(){
  const saved = localStorage.getItem("tms_theme_clean");
  if (saved === "dark" || saved === "light") return setTheme(saved);
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  setTheme(prefersDark ? "dark" : "light");
})();

// Export CSV
function toCSV(rows){
  const header = ["TMS","SMP","Multicadastro","RCV"];
  const lines = [header.join(",")];
  rows.forEach(t => {
    lines.push([
      `"${t.nome.replaceAll('"','""')}"`,
      t.SMP ? "Sim" : "Não",
      t.Multicadastro ? "Sim" : "Não",
      t.RCV ? "Sim" : "Não"
    ].join(","));
  });
  return lines.join("\n");
}

exportBtn.addEventListener("click", () => {
  const rows = applySort(applyFilter(tmsList));
  const csv = toCSV(rows);

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "mapa_integracoes_tms.csv";
  document.body.appendChild(a);
  a.click();
  a.remove();

  URL.revokeObjectURL(url);
});

// Init
render();

