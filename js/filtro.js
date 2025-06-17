document.addEventListener('DOMContentLoaded', function() {
  // Elementos del DOM
  const filtroBotones = document.querySelectorAll(".filtro-btn");
  const productos = document.querySelectorAll(".producto-card");
  const productosGrid = document.querySelector('.productos-grid');

  // Función de filtrado solo por categoría
  function filtrarProductos() {
    const filtroActivo = document.querySelector('.filtro-btn.active').dataset.filtro;
    let hayProductosVisibles = false;

    productos.forEach(producto => {
      const categoria = producto.classList[1]; // Por ejemplo: "consola", "juego", etc.

      if (filtroActivo === 'todos' || categoria === filtroActivo) {
        producto.style.display = 'block';
        hayProductosVisibles = true;
      } else {
        producto.style.display = 'none';
      }
    });

    // Mensaje si no hay productos visibles
    const mensajeSinResultados = document.getElementById('no-results-msg');
    if (!hayProductosVisibles) {
      if (!mensajeSinResultados) {
        const mensaje = document.createElement('p');
        mensaje.id = 'no-results-msg';
        mensaje.textContent = 'No se encontraron productos en esta categoría.';
        mensaje.style.textAlign = 'center';
        mensaje.style.gridColumn = '1 / -1';
        mensaje.style.color = '#fff';
        productosGrid.appendChild(mensaje);
      }
    } else if (mensajeSinResultados) {
      productosGrid.removeChild(mensajeSinResultados);
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

  // Filtrado inicial al cargar
  filtrarProductos();
});
