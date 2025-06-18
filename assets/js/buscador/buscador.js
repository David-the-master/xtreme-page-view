document.addEventListener('DOMContentLoaded', function () {
  const toggleSearchBtns = document.querySelectorAll('#toggleSearch'); // Todas las lupas
  const closeSearch = document.getElementById('closeSearch');
  const searchBar = document.querySelector('.floating-search');
  const searchInput = document.querySelector('.search-input');

  function toggleSearchBar() {
    const isVisible = searchBar.style.display === 'block';

    if (isVisible) {
      searchBar.style.display = 'none';
    } else {
      searchBar.style.display = 'block';
      searchInput.focus();
    }
  }

  // Activar con cualquier lupa
  toggleSearchBtns.forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      toggleSearchBar();
    });
  });

  // Cerrar con la X
  closeSearch.addEventListener('click', function () {
    searchBar.style.display = 'none';
  });

  // Cerrar con Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === "Escape") {
      searchBar.style.display = 'none';
    }
  });

  // Cerrar al hacer clic fuera
  document.addEventListener('click', function (e) {
    const isClickInside = searchBar.contains(e.target) || Array.from(toggleSearchBtns).some(btn => btn.contains(e.target));
    if (!isClickInside) {
      searchBar.style.display = 'none';
    }
  });
});
