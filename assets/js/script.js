// ===========================================================
// Matheus Eduan — Portfólio · script.js
// ===========================================================

document.addEventListener("DOMContentLoaded", () => {
  initFooterYear();
  initTerminal();
  initContributionGraph();
});

/* -------------------------------------------------------
   Ano atual no rodapé
------------------------------------------------------- */
function initFooterYear() {
  const el = document.getElementById("ano-atual");
  if (el) el.textContent = new Date().getFullYear();
}

/* -------------------------------------------------------
   Terminal interativo
------------------------------------------------------- */
function initTerminal() {
  const output = document.getElementById("terminal-output");
  const input  = document.getElementById("terminal-input");
  const wrap   = document.getElementById("terminal-wrap");
  if (!output || !input) return;

  // Histórico de comandos (seta para cima/baixo)
  const history = [];
  let histIndex = -1;

  // --- Definição dos comandos disponíveis ---
  const COMMANDS = {
    whoami: {
      desc: "exibe o nome do usuário atual",
      run: () => print("matheus-eduan"),
    },
    "cat sobre.txt": {
      desc: "mostra informações sobre o desenvolvedor",
      run: () => {
        print("Desenvolvedor Back-end · Brasil");
        print("Foco em Python, JavaScript, HTML e CSS.", "muted-line");
      },
    },
    "ls stack/": {
      desc: "lista as tecnologias da stack",
      run: () => print("python.py  javascript.js  index.html  style.css"),
    },
    "git status": {
      desc: "exibe o status do repositório git",
      run: () => {
        print("On branch main", "muted-line");
        print("nothing to commit, working tree clean", "muted-line");
      },
    },
    "git log": {
      desc: "mostra os últimos commits",
      run: () => {
        const logs = [
          "commit a3f9d12  →  feat: adicionar seção de sistemas operacionais",
          "commit b7c4e08  →  fix: gráfico de contribuições dinâmico",
          "commit d1a2f55  →  chore: atualizar imagens de ferramentas",
          "commit 9e8b301  →  init: estrutura inicial do portfólio",
        ];
        logs.forEach(l => print(l, "muted-line"));
      },
    },
    "cat contato.txt": {
      desc: "exibe informações de contato",
      run: () => {
        print("GitHub  → github.com/matheuseduan");
        print("LinkedIn → linkedin.com/in/matheuseduan", "muted-line");
      },
    },
    "uname -a": {
      desc: "exibe informações do sistema",
      run: () => print("Linux dev 6.x #1 SMP x86_64 GNU/Linux", "muted-line"),
    },
    pwd: {
      desc: "mostra o diretório atual",
      run: () => print("/home/matheus-eduan/projetos"),
    },
    date: {
      desc: "exibe a data e hora atual",
      run: () => print(new Date().toLocaleString("pt-BR")),
    },
    help: {
      desc: "lista todos os comandos disponíveis",
      run: () => {
        printRaw(`<span class="out-line">Comandos disponíveis:</span>`);
        printRaw(`<span class="muted-line">─────────────────────────────────</span>`);
        const all = { ...COMMANDS, clear: { desc: "limpa o terminal" }, restart: { desc: "reinicia a animação inicial" } };
        Object.entries(all).forEach(([cmd, { desc }]) => {
          printRaw(
            `<span class="out-line">` +
            `<span class="help-cmd">${escapeHtml(cmd)}</span>` +
            `<span class="muted-line"> - ${escapeHtml(desc)}</span>` +
            `</span>`
          );
        });
        printRaw(`<span class="muted-line">─────────────────────────────────</span>`);
      },
    },
  };

  // --- Utilitários de output ---
  function print(text, cls = "out-line") {
    const span = document.createElement("span");
    span.className = cls;
    span.textContent = text;
    output.appendChild(span);
    scrollBottom();
  }

  function printRaw(html) {
    const span = document.createElement("span");
    span.innerHTML = html;
    output.appendChild(span);
    scrollBottom();
  }

  function printPrompt(cmd) {
    const span = document.createElement("span");
    span.className = "prompt";
    span.textContent = "$ " + cmd;
    output.appendChild(span);
  }

  function scrollBottom() {
    output.scrollTop = output.scrollHeight;
  }

  // --- Intro animada (digita os comandos iniciais) ---
  const introLines = [
    { cmd: "whoami",        delay: 400  },
    { cmd: "cat sobre.txt", delay: 1200 },
    { cmd: "ls stack/",     delay: 2400 },
    { cmd: "git status",    delay: 3400 },
  ];

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function runIntro() {
    if (prefersReducedMotion) {
      introLines.forEach(({ cmd }) => {
        printPrompt(cmd);
        COMMANDS[cmd]?.run();
      });
      printRaw(`<span class="muted-line">── digite <span class="help-cmd">help</span> para ver os comandos disponíveis ──</span>`);
    } else {
      introLines.forEach(({ cmd, delay }) => {
        setTimeout(() => {
          printPrompt(cmd);
          COMMANDS[cmd]?.run();
          if (cmd === "git status") {
            setTimeout(() => {
              printRaw(`<span class="muted-line">── digite <span class="help-cmd">help</span> para ver os comandos disponíveis ──</span>`);
            }, 300);
          }
        }, delay);
      });
    }
  }

  runIntro();

  // --- Processar comando digitado ---
  function runCommand(raw) {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    printPrompt(cmd);

    if (cmd === "clear") {
      output.innerHTML = "";
      return;
    }

    if (cmd === "restart") {
      output.innerHTML = "";
      runIntro();
      return;
    }

    if (COMMANDS[cmd]) {
      COMMANDS[cmd].run();
    } else {
      print(`comando não encontrado: ${cmd}`, "err-line");
      print(`digite "help" para ver os comandos disponíveis.`, "muted-line");
    }
  }

  // --- Eventos do input ---
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const val = input.value;
      if (val.trim()) {
        history.unshift(val);
        histIndex = -1;
      }
      runCommand(val);
      input.value = "";
      e.preventDefault();
    }

    // Navegar no histórico com seta para cima/baixo
    if (e.key === "ArrowUp") {
      if (histIndex < history.length - 1) histIndex++;
      input.value = history[histIndex] ?? "";
      e.preventDefault();
    }
    if (e.key === "ArrowDown") {
      if (histIndex > 0) histIndex--;
      else { histIndex = -1; input.value = ""; }
      input.value = history[histIndex] ?? "";
      e.preventDefault();
    }
  });

  // Clicar em qualquer lugar do terminal foca o input
  wrap.addEventListener("click", () => input.focus());
}

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/* -------------------------------------------------------
   Gráfico de contribuições — API REAL do GitHub (GraphQL)
------------------------------------------------------- */
const GITHUB_CONFIG = {
  username: "matheuseduan",
  token: "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",
};

async function initContributionGraph() {
  const container = document.getElementById("contrib-graph");
  const caption   = document.querySelector(".contrib__caption");
  if (!container) return;

  const tooltip = document.createElement("div");
  tooltip.className = "contrib-tooltip";
  document.body.appendChild(tooltip);

  container.innerHTML = `<span class="contrib-loading">Buscando contribuições do GitHub…</span>`;

  try {
    const data = await fetchGitHubContributions(GITHUB_CONFIG.username, GITHUB_CONFIG.token);
    renderContribGraph(container, caption, tooltip, data);
  } catch (err) {
    console.error("Erro ao buscar contribuições:", err);
    container.innerHTML = `<span class="contrib-error">Não foi possível carregar as contribuições. Verifique o token.</span>`;
    if (caption) caption.textContent = "Erro ao carregar dados do GitHub.";
  }
}

async function fetchGitHubContributions(username, token) {
  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                color
              }
            }
          }
        }
      }
    }
  `;

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Authorization": `bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables: { username } }),
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  if (json.errors) throw new Error(json.errors[0].message);
  return json.data.user.contributionsCollection.contributionCalendar;
}

function renderContribGraph(container, caption, tooltip, calendar) {
  const { totalContributions, weeks } = calendar;

  const MONTH_NAMES = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
  const DAY_NAMES   = ["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"];

  container.innerHTML = "";
  const fragment = document.createDocumentFragment();
  let delay = 0;

  weeks.forEach((week) => {
    week.contributionDays.forEach((day) => {
      const cell = document.createElement("span");
      cell.className = "cell";
      cell.style.animationDelay = `${delay}ms`;
      delay += 2;

      const count = day.contributionCount;
      let level = 0;
      if      (count >= 10) level = 4;
      else if (count >= 5)  level = 3;
      else if (count >= 2)  level = 2;
      else if (count >= 1)  level = 1;

      cell.dataset.level = level;

      const d     = new Date(day.date + "T12:00:00");
      const nome  = `${DAY_NAMES[d.getDay()]}, ${d.getDate()} de ${MONTH_NAMES[d.getMonth()]} de ${d.getFullYear()}`;
      const label = count === 0 ? "Sem contribuições" : count === 1 ? "1 contribuição" : `${count} contribuições`;

      cell.dataset.tip = `${label} · ${nome}`;

      cell.addEventListener("mouseenter", (e) => {
        tooltip.textContent = cell.dataset.tip;
        tooltip.classList.add("visible");
        positionTooltip(e);
      });
      cell.addEventListener("mousemove", positionTooltip);
      cell.addEventListener("mouseleave", () => tooltip.classList.remove("visible"));

      fragment.appendChild(cell);
    });
  });

  container.appendChild(fragment);
  if (caption) caption.textContent = `${totalContributions} contribuições no último ano`;

  function positionTooltip(e) {
    const tw = tooltip.offsetWidth;
    let left = e.clientX - tw / 2;
    if (left < 8) left = 8;
    if (left + tw > window.innerWidth - 8) left = window.innerWidth - tw - 8;
    tooltip.style.left = left + "px";
    tooltip.style.top  = (e.clientY - 44) + "px";
  }
}
