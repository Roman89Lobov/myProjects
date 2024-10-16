const themeToggle = document.getElementById('themeToggle');
const themeSwitcher = document.getElementById('themeSwitcher');
const backButton = document.getElementById('backButton');
const body = document.body;

// Функция для установки темы
function setTheme(theme) {
  body.className = ''; // Сбрасываем все классы
  body.classList.add(theme); // Добавляем класс для выбранной темы
  localStorage.setItem('theme', theme); // Сохраняем тему в localStorage
}

// Сохранение и восстановление темы
function loadTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    setTheme(savedTheme); // Если тема сохранена, применяем её
  } else {
    setTheme('default-theme'); // Если темы нет, применяем тему по умолчанию
  }
}

// Добавляем обработчики на кнопки для смены темы
themeSwitcher.addEventListener('click', (event) => {
  const theme = event.target.getAttribute('data-theme');
  if (theme) {
    setTheme(theme);
  }
});

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-theme');
  const currentTheme = body.classList.contains('dark-theme') ? 'dark-theme' : 'default-theme';
  localStorage.setItem('theme', currentTheme);
});

backButton.addEventListener('click', () => {
  window.location.href = '../index.html'; // Переход на главную страницу
});

// Восстанавливаем тему при загрузке
loadTheme();

// Логика для трекера задач
const taskInput = document.getElementById('taskInput');
const deadlineInput = document.getElementById('deadlineInput'); // Поле для выбора дедлайна
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');
const prioritySelect = document.getElementById('prioritySelect'); // Добавляем селектор приоритета
const filterStatus = document.getElementById('filterStatus'); // Селектор фильтра
const sortCriteria = document.getElementById('sortCriteria'); // Новый элемент для сортировки
const completedCount = document.getElementById('completedCount');
const pendingCount = document.getElementById('pendingCount');

let tasks = []; // Массив для хранения задач

// Функция для добавления новой задачи с приоритетом
function addTask() {
  const taskText = taskInput.value.trim();
  const priority = prioritySelect.value; // Получаем выбранный приоритет
  const deadline = deadlineInput.value; // Получаем выбранный дедлайн

  if (taskText) {
    const task = {
      text: taskText,
      completed: false, // Статус выполнения задачи
      priority: priority,
      deadline: deadline ? new Date(deadline).toISOString() : null, // Сохраняем дедлайн, если он есть
      dateAdded: new Date().toISOString() // Сохраняем дату добавления
    };

    tasks.push(task); // Добавляем задачу в массив
    taskInput.value = ''; // Очищаем поле ввода
    deadlineInput.value = ''; // Очищаем поле дедлайна
    saveTasks(); // Сохраняем задачи после добавления
    renderTasks(); // Перерисовываем задачи после добавления
  }
}


// Функция для сортировки задач
function sortTasks() {
  const criteria = sortCriteria.value; // Получаем выбранный критерий сортировки

  if (criteria === 'date') {
    tasks.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded)); // Сортировка по дате
  } else if (criteria === 'priority') {
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]); // Сортировка по приоритету
  }

  renderTasks(); // Перерисовываем задачи после сортировки
}

// Сохранение задач в localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Загрузка задач из localStorage
function loadTasks() {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    tasks = JSON.parse(savedTasks).map(task => {
      // Преобразуем дату из строки обратно в объект
      return {
        ...task,
        dateAdded: new Date(task.dateAdded).toISOString() // Преобразуем дату в ISO строку для consistency
      };
    });
  }
}

// Функция для обновления количества задач
function updateTaskCount() {
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = tasks.length - completedTasks;

  completedCount.textContent = String(completedTasks);
  pendingCount.textContent = String(pendingTasks);
}

// Функция для отображения задач в зависимости от выбранного фильтра
function renderTasks() {
  taskList.innerHTML = ''; // Очищаем список задач перед рендером

  // Фильтрация задач по статусу
  let filteredTasks = tasks;
  if (filterStatus.value === 'completed') {
    filteredTasks = tasks.filter(task => task.completed);
  } else if (filterStatus.value === 'incomplete') {
    filteredTasks = tasks.filter(task => !task.completed);
  }

  // Отображаем задачи в зависимости от фильтра
  filteredTasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.style.display = 'inline-block';
    li.style.margin = '5px';
    li.style.padding = '5px';
    li.style.fontSize = '14px';

    // Цвет задачи в зависимости от приоритета
    if (task.priority === 'high') {
      li.style.backgroundColor = '#f8d7da'; // Бледно-красный (высокий приоритет)
    } else if (task.priority === 'medium') {
      li.style.backgroundColor = '#fff3cd'; // Бледно-желтый (средний приоритет)
    } else {
      li.style.backgroundColor = '#d4edda'; // Бледно-зеленый (низкий приоритет)
    }

    // Текст задачи
    const taskText = document.createElement('span');
    taskText.textContent = task.text;
    taskText.style.color = body.classList.contains('dark-theme') ? 'black' : 'black';

    if (task.completed) {
      taskText.classList.add('completed');
    }

    // Визуализация дедлайнов
    if (task.deadline) {
      const deadlineDate = new Date(task.deadline);
      const currentDate = new Date();
      const timeDiff = deadlineDate - currentDate;
      const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

      const deadlineSpan = document.createElement('span');
      deadlineSpan.textContent = ` (Дедлайн: ${deadlineDate.toLocaleDateString()})`;
      deadlineSpan.style.marginLeft = '10px';
      deadlineSpan.style.fontSize = '12px';

      // Визуализация просроченных дедлайнов или приближающихся
      if (daysDiff < 0) {
        li.style.border = '2px solid red'; // Просроченная задача
        deadlineSpan.style.color = 'red';
      } else if (daysDiff <= 3) {
        li.style.border = '2px solid orange'; // Дедлайн скоро
        deadlineSpan.style.color = 'orange';
      } else {
        deadlineSpan.style.color = '#777'; // Далёкий дедлайн
      }

      li.appendChild(deadlineSpan);

      // Создание кнопки редактирования дедлайна
      const editDeadlineButton = document.createElement('button');
      editDeadlineButton.textContent = 'Edit Deadline';
      editDeadlineButton.style.marginLeft = '10px';

      editDeadlineButton.addEventListener('click', () => {
        const newDeadlineInput = document.createElement('input');
        newDeadlineInput.type = 'date';
        newDeadlineInput.value = task.deadline ? new Date(task.deadline).toISOString().substring(0, 10) : '';
        deadlineSpan.replaceWith(newDeadlineInput); // Заменяем текст дедлайна на input для редактирования

        const saveDeadlineButton = document.createElement('button');
        saveDeadlineButton.textContent = 'Save Deadline';
        saveDeadlineButton.style.marginLeft = '10px';

        saveDeadlineButton.addEventListener('click', () => {
          task.deadline = newDeadlineInput.value ? new Date(newDeadlineInput.value).toISOString() : null;
          saveTasks(); // Сохраняем задачу с новым дедлайном
          renderTasks(); // Перерисовываем задачи после изменения дедлайна
        });

        li.appendChild(saveDeadlineButton);
      });

      li.appendChild(editDeadlineButton);
    }

    // Логика зачёркивания задачи
    taskText.addEventListener('click', () => {
      if (!taskText.isContentEditable) { // Проверка на режим редактирования
        task.completed = !task.completed; // Меняем статус задачи
        renderTasks(); // Перерисовываем задачи
        saveTasks(); // Сохраняем задачи после изменения
      }
    });

    taskList.appendChild(li);

    updateTaskCount();

    // Создаем кнопку редактирования задачи
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.style.marginLeft = '10px';

    editButton.addEventListener('click', () => {
      if (editButton.textContent === 'Edit') {
        taskText.contentEditable = "true";
        taskText.focus(); // Устанавливаем фокус на текст для редактирования
        editButton.textContent = 'Save';
      } else {
        taskText.contentEditable = "false";
        task.text = taskText.textContent; // Обновляем текст задачи в массиве задач
        editButton.textContent = 'Edit';
        saveTasks(); // Сохраняем задачу после редактирования
      }
    });

    // Кнопка для удаления задачи
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.classList.add('delete-button');
    deleteButton.style.marginLeft = '10px';
    deleteButton.addEventListener('click', () => {
      tasks.splice(index, 1); // Удаляем задачу из массива
      renderTasks(); // Перерисовываем задачи
      saveTasks(); // Сохраняем задачи после удаления
    });

    // Добавляем время и дату добавления задачи
    const taskDate = document.createElement('span');
    taskDate.textContent = ` (Добавлено: ${task.dateAdded.toLocaleString()})`;
    taskDate.style.marginLeft = '10px';
    taskDate.style.fontSize = '12px';
    taskDate.style.color = '#777'; // Более светлый цвет для даты

    li.appendChild(taskText);
    li.appendChild(taskDate); // Добавляем дату и время
    li.appendChild(editButton); // Добавляем кнопку "Edit"
    li.appendChild(deleteButton);
    taskList.appendChild(li);
  });
}

// Сортировка задач при изменении критерия
sortCriteria.addEventListener('change', sortTasks);

// Фильтрация задач при изменении выбора фильтра
filterStatus.addEventListener('change', renderTasks);

// Добавляем задачу по клику на кнопку
addTaskButton.addEventListener('click', addTask);

// Добавляем задачу по нажатию клавиши "Enter"
taskInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    addTask();
  }
});

// // Изначальное отображение всех задач
// Загружаем задачи при загрузке страницы
window.onload = () => {
  loadTasks();
  renderTasks();
  updateTaskCount(); // Обновляем количество задач при загрузке страницы
};























// Проверяем, поддерживает ли браузер уведомления
if ("Notification" in window) {
  Notification.requestPermission().then(permission => {
    if (permission === "granted") {
      checkDeadlines();
    }
  });
}

// Функция для проверки приближающихся дедлайнов
function checkDeadlines() {
  const now = new Date();

  tasks.forEach(task => {
    const deadline = new Date(task.deadline);

    // Если дедлайн приближается (за 1 час)
    const timeDifference = deadline - now;
    if (timeDifference > 0 && timeDifference <= 3600000 && !task.notified) {
      showNotification(task.text, deadline);
      task.notified = true; // Отмечаем, что уведомление показано
      saveTasks(); // Сохраняем состояние задач
    }
  });

  // Проверяем дедлайны каждые 5 минут
  setTimeout(checkDeadlines, 300000);
}

// Функция для показа уведомлений
function showNotification(taskText, deadline) {
  const notification = new Notification("Напоминание о задаче", {
    body: `Задача "${taskText}" должна быть выполнена до ${deadline.toLocaleString()}`,
    icon: 'icon.png' // Можете добавить свой иконку
  });

  notification.onclick = () => {
    window.focus();
  };
}
