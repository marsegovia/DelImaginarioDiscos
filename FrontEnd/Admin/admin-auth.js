// ADMIN DEV ACCESS
const ADMIN_PASSWORD = "admin123"; // después se borra

if (!localStorage.getItem("isAdmin")) {
  const pass = prompt("Ingrese clave admin");

  if (pass === ADMIN_PASSWORD) {
    localStorage.setItem("isAdmin", "true");
    location.reload();
  }
}
