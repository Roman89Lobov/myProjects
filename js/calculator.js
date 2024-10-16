document.getElementById('themeToggle').addEventListener('click', function() {
  document.body.classList.toggle('dark-theme');

  // Сохраняем текущую тему в localStorage
  if (document.body.classList.contains('dark-theme')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});

// При загрузке страницы проверяем, какая тема была сохранена
window.addEventListener('load', function() {
  const savedTheme = localStorage.getItem('theme');

  // Если в localStorage сохранена темная тема, применяем её
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
  }
});



document.getElementById('backButton').addEventListener('click', function() {
  window.location.href = '../index.html'; // Переход на главную страницу
});

const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
let currentInput = '';

buttons.forEach(button => {
  button.addEventListener('click', function() {
    const value = this.value;

    if (value === '=') {
      try {
        currentInput = eval(currentInput);
        display.value = currentInput;
      } catch {
        display.value = 'Error';
        currentInput = '';
      }
    } else if (value === 'C') {
      // Здесь сброс значений
      currentInput = ''; // Очищаем текущее введенное значение
      display.value = ''; // Очищаем дисплей
    } else {
      currentInput += value;
      display.value = currentInput;
    }
  });
});
