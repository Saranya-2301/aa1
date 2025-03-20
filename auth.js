document.addEventListener('DOMContentLoaded', () => {

    const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('registerUsername').value;
      const password = document.getElementById('registerPassword').value;

      const users = JSON.parse(localStorage.getItem('users')) || [];
      if (users.find(user => user.username === username)) {
        alert('Username already exists!');
        return;
      }
      users.push({ username, password });
      localStorage.setItem('users', JSON.stringify(users));
      alert('Registration Successful!');
      window.location.href = 'plogin.html';
    });
  }

  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('loginUsername').value;
      const password = document.getElementById('loginPassword').value;

      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(user => user.username === username && user.password === password);

      if (user) {
        alert('Login Successful!');
        window.location.href = 'dashboard.html';
      } else {
        alert('Invalid Credentials!');
      }
    });
  }
});