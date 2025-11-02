// tiny helpers
const $ = (sel, el = document) => el.querySelector(sel);
const $$ = (sel, el = document) => Array.from(el.querySelectorAll(sel));

function setYear() {
  const y = new Date().getFullYear();
  const n = $("#year");
  if (n) n.textContent = y;
}

function showView(route) {
  $$(".view").forEach(v => v.classList.remove("is-active"));
  const view = $("#view-" + route);
  if (view) view.classList.add("is-active");

  $$(".nav-btn").forEach(b => b.removeAttribute("aria-current"));
  const btn = $(`.nav-btn[data-route="${route}"]`);
  if (btn) btn.setAttribute("aria-current", "page");

  // focus main for a11y
  const main = $("#app");
  if (main) main.focus();
}

function hookNav() {
  $$(".nav-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      const route = e.currentTarget.dataset.route;
      showView(route);
    });
  });

  // links with data-route
  $$(".btn[data-route]").forEach(a => {
    a.addEventListener("click", e => {
      e.preventDefault();
      showView(e.currentTarget.dataset.route);
    });
  });
}

function seedProjects() {
  const data = [
    { title: "Sentiment_Analysis_v5", tags: ["Python", "NLP", "VADER"], blurb: "Sentence scoring with hedging logic, charts, and summary text." },
    { title: "Survey Model Runner", tags: ["Snowflake", "Dataiku"], blurb: "Parametrized runs, significance tests, and Tableau feed." },
    { title: "AB Test Harness", tags: ["JS", "Stats"], blurb: "Local prompt phrasing tests with logging and quick charts." }
  ];
  const grid = $("#projects-grid");
  if (!grid) return;
  grid.innerHTML = data.map(p => `
    <article class="card" role="listitem">
      <h4>${p.title}</h4>
      <p>${p.blurb}</p>
      <div class="badges">
        ${p.tags.map(t => `<span class="badge">${t}</span>`).join("")}
      </div>
    </article>
  `).join("");
}

function hookChat() {
  const form = $("#chat-form");
  const log = $("#chat-log");
  if (!form || !log) return;

  form.addEventListener("submit", e => {
    e.preventDefault();
    const input = $("#chat-input");
    const text = input.value.trim();
    if (!text) return;
    log.insertAdjacentHTML("beforeend", `<div class="msg user">${text}</div>`);
    input.value = "";

    // placeholder AI response
    setTimeout(() => {
      log.insertAdjacentHTML("beforeend",
        `<div class="msg ai">Thanks. The real model hookup comes later.</div>`);
      log.scrollTop = log.scrollHeight;
    }, 300);
  });
}

function boot() {
  setYear();
  hookNav();
  seedProjects();
  hookChat();
  showView("home");
}

document.addEventListener("DOMContentLoaded", boot);
