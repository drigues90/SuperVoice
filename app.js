// SuperVoice site — sem trackers, sem dependências.
// Troque o e-mail abaixo pelo endereço oficial antes de publicar.
const CONTACT_EMAIL = "granprixtrivia@gmail.com";

(function () {
  // Ano dinâmico no rodapé
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  // Menu mobile
  const btn = document.getElementById("menuBtn");
  const nav = document.getElementById("mainNav");
  if (btn && nav) {
    btn.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        nav.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Formulário de exclusão -> monta e-mail via mailto (nada é enviado pela página)
  const form = document.getElementById("deleteForm");
  if (form) {
    const emailLink = document.getElementById("contactEmail");
    if (emailLink) {
      emailLink.textContent = CONTACT_EMAIL;
      emailLink.href = "mailto:" + CONTACT_EMAIL;
    }
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const err = document.getElementById("formError");
      const accountEmail = document.getElementById("accountEmail").value.trim();
      const scope = document.getElementById("scope").value;
      const name = document.getElementById("displayName").value.trim();
      const extra = document.getElementById("extra").value.trim();

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(accountEmail)) {
        err.textContent = "Informe o e-mail da conta para localizarmos seus dados.";
        return;
      }
      err.textContent = "";
      const subject = "SuperVoice — Solicitação de exclusão (" + scope + ")";
      const body = [
        "Solicito a exclusão dos meus dados conforme abaixo.",
        "",
        "E-mail da conta: " + accountEmail,
        "Nome (opcional): " + (name || "-"),
        "Escopo: " + scope,
        "Detalhes (opcional): " + (extra || "-"),
        "",
        "Declaro que sou o titular desta conta."
      ].join("\n");
      window.location.href =
        "mailto:" + CONTACT_EMAIL +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);
    });
  }
})();
