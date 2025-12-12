const formProducto = document.getElementById("formProducto");

formProducto.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(formProducto);

  console.log("🟢 SUBMIT OK");

  const res = await fetch("http://localhost:3000/products/create", {
    method: "POST",
    body: formData
  });

  const data = await res.json();
  console.log("🟣 RESP:", data);
});
