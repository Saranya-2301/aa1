// Check authentication status
function checkAuth() {
    const user = localStorage.getItem('user');
    if (!user) {
      loadPage('plogin');
    } else {
      loadPage('dashboard');
    }
  }
  
  // Load pages dynamically
  function loadPage(page) {
    fetch(`pages/${page}.html`)
      .then(response => response.text())
      .then(data => {
        document.getElementById('content').innerHTML = data;
        if (page === 'reports') generateChart();
        if (page === 'inventory') loadProducts();
      })
      .catch(error => {
        document.getElementById('content').innerHTML = `<p>Error loading page: ${error}</p>`;
      });
  }
  
  // ---------- Product Management Functions ----------
  
  function loadProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const table = document.getElementById('productTable');
    table.innerHTML = '';
    products.forEach((product, index) => {
      const row = `<tr>
        <td>${product.name}</td>
        <td>${product.quantity}</td>
        <td>${product.price}</td>
        <td>
          <button onclick="deleteProduct(${index})">Delete</button>
        </td>
      </tr>`;
      table.innerHTML += row;
    });
  }
  
  function addProduct() {
    const name = document.getElementById('productName').value;
    const quantity = document.getElementById('productQuantity').value;
    const price = document.getElementById('productPrice').value;
  
    if (name && quantity && price) {
      const products = JSON.parse(localStorage.getItem('products')) || [];
      products.push({ name, quantity, price });
      localStorage.setItem('products', JSON.stringify(products));
      alert('Product added successfully!');
      loadProducts();
    } else {
      alert('Please fill in all product fields.');
    }
  }
  
  function deleteProduct(index) {
    const products = JSON.parse(localStorage.getItem('products'));
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
    loadProducts();
  }
  
  // ---------- Authentication Functions ----------
  
  function login() {
    const username = document.getElementById('loginUser').value;
    const password = document.getElementById('loginPass').value;
    const storedUser = localStorage.getItem('user');
    const storedPassword = localStorage.getItem('password');
    if (username === storedUser && password === storedPassword) {
      alert("Login successful!");
      loadPage('dashboard');
    } else {
      alert("Invalid credentials.");
    }
  }
  
  function register() {
    const username = document.getElementById('registerUser').value;
    const password = document.getElementById('registerPass').value;
    if (!username || !password) {
      alert("Please fill in all fields.");
      return;
    }
    localStorage.setItem('user', username);
    localStorage.setItem('password', password);
    alert("Registration successful! Please login.");
    loadPage('plogin');
  }
  
  function logout() {
    localStorage.removeItem('user');
    loadPage('plogin');
  }
  
  // ---------- Chart.js Report Generation ----------
  
  function generateChart() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const labels = products.map(p => p.name);
    const data = products.map(p => parseInt(p.quantity));
  
    const ctx = document.getElementById('productChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Product Stock Levels',
          data: data,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }
  
  // Initialize app
  window.onload = checkAuth;
  