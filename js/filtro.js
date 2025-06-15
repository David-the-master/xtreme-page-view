document.addEventListener('DOMContentLoaded', function() {
  // Elementos del DOM
  const filtroBotones = document.querySelectorAll(".filtro-btn");
  const productos = document.querySelectorAll(".producto-card");
  const searchInput = document.getElementById('search-input');
  const productosGrid = document.querySelector('.productos-grid');

  // Efecto máquina de escribir para el placeholder
  const placeholderTexts = ["Buscar God of War...", "Buscar PlayStation 5...", "Buscar auriculares..."];
  let currentIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typePlaceholder() {
    const currentText = placeholderTexts[currentIndex];
    
    if (isDeleting) {
      searchInput.placeholder = currentText.substring(0, charIndex--);
      if (charIndex === 0) {
        isDeleting = false;
        currentIndex = (currentIndex + 1) % placeholderTexts.length;
      }
    } else {
      searchInput.placeholder = currentText.substring(0, charIndex++);
      if (charIndex > currentText.length) {
        isDeleting = true;
        setTimeout(typePlaceholder, 1000);
        return;
      }
    }
    setTimeout(typePlaceholder, isDeleting ? 50 : 100);
  }

  // Función de filtrado mejorada
  function filtrarProductos() {
    const filtroActivo = document.querySelector('.filtro-btn.active').dataset.filtro;
    const searchTerm = searchInput.value.toLowerCase();
    let hasVisibleProducts = false;

    productos.forEach(producto => {
      const nombre = producto.querySelector('h3').textContent.toLowerCase();
      const descripcion = producto.querySelector('.producto-desc').textContent.toLowerCase();
      const categoria = producto.classList[1];
      
      const coincideBusqueda = nombre.includes(searchTerm) || descripcion.includes(searchTerm);
      const coincideFiltro = filtroActivo === 'todos' || categoria === filtroActivo;
      
      if (coincideBusqueda && coincideFiltro) {
        producto.style.display = 'block';
        hasVisibleProducts = true;
      } else {
        producto.style.display = 'none';
      }
    });

    // Mostrar mensaje si no hay resultados
    const noResultsMsg = document.getElementById('no-results-msg');
    if (!hasVisibleProducts) {
      if (!noResultsMsg) {
        const msg = document.createElement('p');
        msg.id = 'no-results-msg';
        msg.textContent = 'No se encontraron productos';
        msg.style.textAlign = 'center';
        msg.style.gridColumn = '1 / -1';
        productosGrid.appendChild(msg);
      }
    } else if (noResultsMsg) {
      productosGrid.removeChild(noResultsMsg);
    }
  }

  // Eventos para los botones de filtro
  filtroBotones.forEach(btn => {
    btn.addEventListener("click", function() {
      filtroBotones.forEach(b => b.classList.remove("active"));
      this.classList.add("active");
      filtrarProductos();
    });
  });

  // Evento para la barra de búsqueda
  searchInput.addEventListener('input', filtrarProductos);

  // Iniciar efectos
  setTimeout(typePlaceholder, 1000);
  filtrarProductos(); // Filtrado inicial
});