console.log("Script loaded");

const headerEl = document.querySelector('.header');

window.addEventListener('scroll', () => {
    console.log("Scroll event triggered");
    if (window.scrollY > 200) {
        headerEl.classList.add('header-scrolled');
        console.log("Header scrolled class added");
    } else {
        headerEl.classList.remove('header-scrolled');
        console.log("Header scrolled class removed");
    }
});

const menuToggle = document.querySelector('.menu-toggle');
const navItems = document.querySelector('.navitems');

menuToggle.addEventListener('click', () => {
    navItems.classList.toggle('active');
});


window.transitionToPage = function(href) {
    document.querySelector('body').style.opacity = 0
    setTimeout(function() { 
        window.location.href = href
    }, 500)
}

document.addEventListener('DOMContentLoaded', function(event) {
    document.querySelector('body').style.opacity = 1
});

const activePage = window.location.pathname;
const navLinks = document.querySelectorAll('nav a').forEach(link => {
    if(link.href.includes(`${activePage}`)){
        link.classList.add('active');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const categoryFilter = document.getElementById('category');
    const priceFilter = document.getElementById('price');
    const productContainer = document.getElementById('products-container');
    const selectedFiltersContainer = document.getElementById('selected-filters'); // New container for selected filters
  
    function filterProducts() {
      const category = categoryFilter.value;
      const price = priceFilter.value;
  
      // Update selected filters display
      selectedFiltersContainer.innerHTML = `${category}`;
  
      const columns = Array.from(productContainer.querySelectorAll('.column'));
  
      // Filter by category first
      columns.forEach(column => {
        const productCategory = column.getAttribute('data-category');
        let categoryMatch = category === 'all' || category === productCategory;
        column.style.display = categoryMatch ? 'block' : 'none';
      });
  
      // Sort by price
      let visibleColumns = columns.filter(column => column.style.display !== 'none');
  
      if (price === 'low-high') {
        visibleColumns.sort((a, b) => parseFloat(a.getAttribute('data-price')) - parseFloat(b.getAttribute('data-price')));
      } else if (price === 'high-low') {
        visibleColumns.sort((a, b) => parseFloat(b.getAttribute('data-price')) - parseFloat(a.getAttribute('data-price')));
      }
  
      // Append sorted elements back to the container
      visibleColumns.forEach(column => {
        productContainer.appendChild(column);
      });
    }
  
    categoryFilter.addEventListener('change', filterProducts);
    priceFilter.addEventListener('change', filterProducts);
  
    filterProducts(); // Initial filter
  });