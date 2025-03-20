document.addEventListener('DOMContentLoaded', () => {

    if (document.getElementById('totalProducts')) {
      const products = JSON.parse(localStorage.getItem('products')) || [];
      document.getElementById('totalProducts').innerText = products.length;
      document.getElementById('lowStock').innerText = products.filter(p => p.quantity < 5).length;
    }
  
    const productForm = document.getElementById('productForm');
    const productTable = document.getElementById('productTable');
  
    if (productForm) {
      productForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('productName').value;
        const quantity = parseInt(document.getElementById('productQuantity').value);
  
        const products = JSON.parse(localStorage.getItem('products')) || [];
        products.push({ name, quantity });
        localStorage.setItem('products', JSON.stringify(products));
  
        alert('Product Added!');
        window.location.reload();
      });
  
      const products = JSON.parse(localStorage.getItem('products')) || [];
      products.forEach((product, index) => {
        const row = `<tr>
          <td>${product.name}</td>
          <td>${product.quantity}</td>
          <td><button onclick="deleteProduct(${index})">Delete</button></td>
        </tr>`;
        productTable.innerHTML += row;
      });
    }
  });
  
  function deleteProduct(index) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
    alert('Product Deleted!');
    window.location.reload();
  }
  
  // Reports using Chart.js
  if (document.getElementById('salesChart')) {
    const ctx = document.getElementById('salesChart').getContext('2d');
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const labels = products.map(p => p.name);
    const quantities = products.map(p => p.quantity);
  
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Product Quantity',
          data: quantities,
          backgroundColor: '#007bff'
        }]
      }
    });
  }
  
  if (document.getElementById('themeSelector')) {
    const themeSelector = document.getElementById('themeSelector');
    themeSelector.value = localStorage.getItem('theme') || 'light';
  
    themeSelector.addEventListener('change', () => {
      const theme = themeSelector.value;
      document.body.style.backgroundColor = theme === 'dark' ? '#333' : '#f5f5f5';
      localStorage.setItem('theme', theme);
    });
  }