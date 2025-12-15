document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const msg = document.getElementById("login-msg");

  // Solo ejecutar la lógica de login si existe el formulario (Admin-panel.html)
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      console.log("Formulario enviado");

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try {
        console.log("Enviando fetch a /login con:", { email, password });
        const res = await fetch("https://delimaginariodiscos.onrender.com/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
        });

        console.log("Fetch completado, status:", res.status);
        const data = await res.json();
        console.log("Datos recibidos del backend:", data);

        if (!res.ok) {
          msg.textContent = data.error || "Error al iniciar sesión";
          msg.style.color = "red";
          return;
        }

        msg.textContent = "Login correcto";
        msg.style.color = "green";

        // Guardamos que es admin para mostrar nav
        localStorage.setItem("isAdmin", "true");

        // Redirigir al index
        setTimeout(() => {
          console.log(localStorage.getItem("isAdmin")) //justo antes de redirigir para verificar que se guardó.
          window.location.href = "/Admin-panel";
        }, 500);

      } catch (error) {
        console.error(error);
        msg.textContent = "Error de conexión";
      }
    });
  }

  // --- Lógica para index.html: mostrar nav admin y manejar logout ---
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const adminBar = document.getElementById("admin-bar");
  const logoutBtn = document.getElementById("logout");

  if (isAdmin && adminBar) {
    adminBar.style.display = "flex";
  }

 /* // Navegación interna admin
  document.querySelectorAll("#admin-bar button[data-view]").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".admin-view").forEach((v) => {
        v.style.display = "none";
      });

      const viewEl = document.getElementById(`admin-${btn.dataset.view}`);
      if (viewEl) viewEl.style.display = "block";
    });
  });
*/
  // Logout
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("isAdmin");
      window.location.href = "/index.html";
    });
  } 
});
