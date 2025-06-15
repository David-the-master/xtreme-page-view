// navbar-buscador.js

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("floatingSearchInput");

  if (input) {
    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        const query = input.value.trim();
        if (query !== "") {
          window.location.href = `./productos.html?search=${encodeURIComponent(query)}`;
        }
      }
    });
  }
});