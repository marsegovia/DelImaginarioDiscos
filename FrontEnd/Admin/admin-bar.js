const isAdmin = localStorage.getItem("isAdmin") === "true";

if (isAdmin) {
  document.getElementById("admin-bar").style.display = "flex";
}

document.querySelectorAll("#admin-bar button[data-view]").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".admin-view").forEach(v => v.style.display = "none");
    document.getElementById(`admin-${btn.dataset.view}`).style.display = "block";
  });
});


document.getElementById("logout")?.addEventListener("click", () => {
  localStorage.removeItem("isAdmin");
  location.reload();
});
