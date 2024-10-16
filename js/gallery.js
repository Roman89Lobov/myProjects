const themeToggle = document.getElementById('themeToggle');
const backButton = document.getElementById('backButton');
const body = document.body;

// Функция для установки темы
function setTheme(theme) {
  body.className = '';
  body.classList.add(theme);
  localStorage.setItem('theme', theme);
}

function loadTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    setTheme('default-theme');
  }
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-theme');
  const currentTheme = body.classList.contains('dark-theme') ? 'dark-theme' : 'default-theme';
  localStorage.setItem('theme', currentTheme);
});

backButton.addEventListener('click', () => {
  window.location.href = '../index.html';
});

// Инициализация карусели
let currentIndex = 0;
const imageCarousel = document.querySelector('.image-carousel');
let images = []; // Глобальный массив изображений

// Функция для обновления карусели
function updateCarousel() {
  images = document.querySelectorAll('.carousel-image'); // Перезагружаем список изображений
  if (images.length > 0) {
    images.forEach(img => img.style.display = 'none'); // Скрываем все изображения
    images[currentIndex].style.display = 'block'; // Отображаем текущее изображение
  } else {
    currentIndex = 0; // Сбрасываем индекс, если нет изображений
  }
}

// Функция для переключения картинок вперед
document.getElementById('nextButton').addEventListener('click', () => {
  if (images.length > 0) {
    currentIndex = (currentIndex + 1) % images.length; // Переключаем на следующее изображение
    updateCarousel(); // Обновляем карусель
  }
});

// Функция для переключения картинок назад
document.getElementById('prevButton').addEventListener('click', () => {
  if (images.length > 0) {
    currentIndex = (currentIndex - 1 + images.length) % images.length; // Переключаем на предыдущее изображение
    updateCarousel(); // Обновляем карусель
  }
});

// Сохранение изображений в localStorage
function saveImages() {
  const imageSrcArray = Array.from(images).map(img => img.src); // Перебираем все изображения
  localStorage.setItem('carouselImages', JSON.stringify(imageSrcArray)); // Сохраняем их в localStorage
}

// Загрузка изображений из localStorage
function loadImages() {
  const savedImages = JSON.parse(localStorage.getItem('carouselImages') || '[]');
  savedImages.forEach(src => {
    const newImg = document.createElement('img');
    newImg.src = src;
    newImg.classList.add('carousel-image');
    newImg.style.display = 'none';

    // Добавляем событие клика для увеличения изображения
    newImg.addEventListener('click', () => {
      const modal = document.getElementById('zoomedImageModal');
      const modalImg = document.getElementById('zoomedImg');
      modal.style.display = 'block';
      modalImg.src = newImg.src;
    });

    imageCarousel.appendChild(newImg);
  });

  currentIndex = 0; // Сбрасываем индекс
  updateCarousel(); // Обновляем карусель после загрузки изображений
}

// Увеличение изображения
imageCarousel.addEventListener('click', (event) => {
  if (event.target.classList.contains('carousel-image')) {
    const modal = document.getElementById('zoomedImageModal');
    const modalImg = document.getElementById('zoomedImg');
    modal.style.display = 'block';
    modalImg.src = event.target.src;
  }
});

let zoomedIndex = 0; // Индекс текущего изображения в модальном окне

// Обработчики для кнопок навигации
document.getElementById('prevZoomedImage').addEventListener('click', () => {
  zoomedIndex = (zoomedIndex - 1 + images.length) % images.length;
  updateZoomedImage();
});

document.getElementById('nextZoomedImage').addEventListener('click', () => {
  zoomedIndex = (zoomedIndex + 1) % images.length;
  updateZoomedImage();
});

// Функция обновления изображения в модальном окне
function updateZoomedImage() {
  const modalImg = document.getElementById('zoomedImg');
  modalImg.src = images[zoomedIndex].src; // Обновляем источник изображения
}

// Обработчик для клика по изображению в карусели
images.forEach((img, index) => {
  img.addEventListener('click', (event) => {
    zoomedIndex = index; // Запоминаем индекс выбранного изображения
    const modal = document.getElementById('zoomedImageModal');
    const modalImg = document.getElementById('zoomedImg');
    modal.style.display = 'block';
    modalImg.src = event.target.src; // Показываем увеличенное изображение
  });
});

// Закрытие модального окна
document.querySelector('.close').addEventListener('click', () => {
  document.getElementById('zoomedImageModal').style.display = 'none';
});

// Добавление нового изображения
document.getElementById('addImage').addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();

    reader.onload = function(e) {
      const result = e.target.result;
      if (typeof result === 'string') {
        const newImg = document.createElement('img');
        newImg.src = result;
        newImg.classList.add('carousel-image');
        newImg.style.display = 'none';

        newImg.addEventListener('click', () => {
          const modal = document.getElementById('zoomedImageModal');
          const modalImg = document.getElementById('zoomedImg');
          modal.style.display = 'block';
          modalImg.src = newImg.src;
        });

        imageCarousel.appendChild(newImg);
        currentIndex = images.length; // Устанавливаем индекс на добавленное изображение
        updateCarousel(); // Обновляем карусель
        saveImages(); // Сохраняем изображения в localStorage
      }
    };

    reader.readAsDataURL(file);
  }
});

// Удаление изображения
document.getElementById('deleteImage').addEventListener('click', () => {
  if (images.length > 0) {
    images[currentIndex].remove(); // Удаляем текущее изображение из DOM
    images = Array.from(document.querySelectorAll('.carousel-image')); // Обновляем массив изображений
    currentIndex = (currentIndex - 1 + images.length) % images.length; // Переключаем индекс
    updateCarousel(); // Обновляем карусель
    saveImages(); // Обновляем сохраненные изображения в localStorage
  }
});

// Восстановление темы и изображений при загрузке
window.onload = () => {
  loadTheme();
  loadImages();
};

