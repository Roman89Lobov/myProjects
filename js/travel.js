document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('themeToggle');
  const backButton = document.getElementById('backButton');
  const body = document.body;

  // Темы
  function setTheme(theme) {
    body.className = '';
    body.classList.add(theme);
    localStorage.setItem('theme', theme);
  }

  function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    setTheme(savedTheme || 'default-theme');
  }

  themeToggle.addEventListener('click', () => {
    const currentTheme = body.classList.contains('dark-theme') ? 'default-theme' : 'dark-theme';
    setTheme(currentTheme);
  });

  backButton.addEventListener('click', () => {
    window.location.href = '../index.html';
  });

  loadTheme();

  // Инициализация Яндекс карты
  ymaps.ready(init);
  let map;
  let selectedCoords = null;
  const destinationList = document.getElementById('destinationList');
  const form = document.getElementById('destinationForm');
  const locationInput = document.getElementById('locationName');
  const descriptionInput = document.getElementById('description');
  let destinations = [];

  function init() {
    map = new ymaps.Map("map", {
      center: [55.751574, 37.573856], // Начальная позиция карты (Москва)
      zoom: 10
    });

    // Загрузка сохраненных точек
    loadDestinations();

    // Обработчик кликов по карте для выбора местоположения
    map.events.add('click', function (e) {
      const coords = e.get('coords');
      selectedCoords = { lat: coords[0], lng: coords[1] };
      alert(`Вы выбрали координаты: ${coords[0].toFixed(5)}, ${coords[1].toFixed(5)}`);
    });
  }

  // Добавление метки на карту
  function addMarker(dest) {
    const placemark = new ymaps.Placemark([dest.lat, dest.lng], {
      balloonContent: `<strong>${dest.name}</strong><br>${dest.description}`
    });
    map.geoObjects.add(placemark);
  }

  // Добавление пункта в список
  function addDestinationToList(dest) {
    const listItem = document.createElement('li');
    listItem.textContent = `${dest.name}: ${dest.description}`;
    destinationList.appendChild(listItem);
  }

  // Сохранение данных в localStorage
  function saveDestinations() {
    localStorage.setItem('destinations', JSON.stringify(destinations));
  }

  // Загрузка данных из localStorage
  function loadDestinations() {
    const saved = localStorage.getItem('destinations');
    if (saved) {
      destinations = JSON.parse(saved);
      destinations.forEach(dest => {
        addMarker(dest);
        addDestinationToList(dest);
      });
    }
  }

  // Обработчик отправки формы
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = locationInput.value.trim();
    const description = descriptionInput.value.trim();

    if (name && description && selectedCoords) {
      const newDestination = {
        name,
        description,
        lat: selectedCoords.lat,
        lng: selectedCoords.lng
      };

      destinations.push(newDestination);
      saveDestinations();
      addMarker(newDestination);
      addDestinationToList(newDestination);

      // Очищаем форму и сбрасываем выбранные координаты
      locationInput.value = '';
      descriptionInput.value = '';
      selectedCoords = null;
    } else {
      alert('Пожалуйста, заполните все поля и выберите место на карте.');
    }
  });
});
