  document.getElementById("floatingSearchBtnMobile").addEventListener("click", function () {
    const query = document.getElementById("floatingSearchInputMobile").value.trim();
    if (query !== "") {
      window.location.href = `./productos.html?search=${encodeURIComponent(query)}`;
    }
  });