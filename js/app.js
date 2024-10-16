// script.js
document.querySelectorAll('.work-preview').forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.style.transform = 'scale(1.05)';
  });
  item.addEventListener('mouseleave', () => {
    item.style.transform = 'scale(1)';
  });
});

const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const portfolioItems = document.querySelectorAll('.work-preview');
const navLinks = document.querySelectorAll('nav ul li a');
const header = document.querySelector('header');
const footer = document.querySelector('footer');

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-theme');
  header.classList.toggle('dark-theme');
  footer.classList.toggle('dark-theme');

  // Переключение тем у блоков портфолио и навигационных ссылок
  portfolioItems.forEach(item => item.classList.toggle('dark-theme'));
  navLinks.forEach(link => link.classList.toggle('dark-theme'));

  // Сохраняем состояние темы в localStorage
  if (body.classList.contains('dark-theme')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});

window.addEventListener('load', () => {
  const savedTheme = localStorage.getItem('theme');

  // Если тема сохранена как 'dark', применяем её ко всем элементам
  if (savedTheme === 'dark') {
    body.classList.add('dark-theme');
    header.classList.add('dark-theme');
    footer.classList.add('dark-theme');

    portfolioItems.forEach(item => item.classList.add('dark-theme'));
    navLinks.forEach(link => link.classList.add('dark-theme'));
  }
});
