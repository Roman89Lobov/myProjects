document.addEventListener('DOMContentLoaded', () => {
  const backButton = document.getElementById('backButton');
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;

  // Проверяем сохраненную тему при загрузке страницы
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    body.classList.add(savedTheme); // Применяем сохранённую тему
  }

  const questions = {
    capitals: [
      { question: 'Столица Франции?', answers: ['Париж', 'Берлин', 'Мадрид', 'Рим'], correct: 0 },
      { question: 'Столица Японии?', answers: ['Пекин', 'Сеул', 'Токио', 'Бангкок'], correct: 2 },
      { question: 'Столица Австралии?', answers: ['Сидней', 'Мельбурн', 'Канберра', 'Брисбен'], correct: 2 },
      { question: 'Столица Канады?', answers: ['Торонто', 'Ванкувер', 'Оттава', 'Монреаль'], correct: 2 },
      { question: 'Столица Бразилии?', answers: ['Сан-Паулу', 'Рио-де-Жанейро', 'Сальвадор', 'Бразилиа'], correct: 3 },
      { question: 'Столица Индии?', answers: ['Мумбаи', 'Калькутта', 'Бангалор', 'Нью-Дели'], correct: 3 },
      { question: 'Столица России?', answers: ['Санкт-Петербург', 'Новосибирск', 'Москва', 'Владивосток'], correct: 2 },
      { question: 'Столица Южной Африки?', answers: ['Йоханнесбург', 'Дурбан', 'Претория', 'Кейптаун'], correct: 2 },
      { question: 'Столица Италии?', answers: ['Венеция', 'Милан', 'Флоренция', 'Рим'], correct: 3 },
      { question: 'Столица Египта?', answers: ['Александрия', 'Гиза', 'Луксор', 'Каир'], correct: 3 },
      { question: 'Столица Мексики?', answers: ['Гвадалахара', 'Монтеррей', 'Мехико-Сити', 'Тихуана'], correct: 2 },
      { question: 'Столица Аргентины?', answers: ['Мендоса', 'Кордова', 'Буэнос-Айрес', 'Росарио'], correct: 2 },
      { question: 'Столица Кении?', answers: ['Момбаса', 'Накуру', 'Элдорет', 'Найроби'], correct: 3 },
      { question: 'Столица Испании?', answers: ['Барселона', 'Севилья', 'Валенсия', 'Мадрид'], correct: 3 },
      { question: 'Столица Швеции?', answers: ['Мальмё', 'Гетеборг', 'Уппсала', 'Стокгольм'], correct: 3 },
      { question: 'Столица Турции?', answers: ['Стамбул', 'Измир', 'Анталия', 'Анкара'], correct: 3 },
      { question: 'Столица Саудовской Аравии?', answers: ['Джидда', 'Мекка', 'Медина', 'Эр-Рияд'], correct: 3 },
      { question: 'Столица Тайланда?', answers: ['Пхукет', 'Чиангмай', 'Паттайя', 'Бангкок'], correct: 3 },
      { question: 'Столица Норвегии?', answers: ['Берген', 'Тронхейм', 'Ставангер', 'Осло'], correct: 3 },
      { question: 'Столица Филиппин?', answers: ['Себу', 'Давао', 'Кесон-Сити', 'Манила'], correct: 3 }
      // Можно добавить вопросов
    ],
    football: [
      { question: 'Какой клуб выиграл Лигу чемпионов в 2021 году?', answers: ['Челси', 'Манчестер Сити', 'ПСЖ', 'Бавария'], correct: 0 },
      { question: 'Какой клуб известен как «Красные дьяволы»?', answers: ['Ливерпуль', 'Манчестер Юнайтед', 'Арсенал', 'Милан'], correct: 1 },
      { question: 'Какой клуб играет на «Сантьяго Бернабеу»?', answers: ['Реал Мадрид', 'Барселона', 'Атлетико Мадрид', 'Севилья'], correct: 0 },
      { question: 'Какой клуб имеет прозвище «Канониры»?', answers: ['Челси', 'Арсенал', 'Тоттенхэм', 'Вест Хэм'], correct: 1 },
      { question: 'К какому клубу Лионель Месси присоединился в 2021 году?', answers: ['Барселона', 'ПСЖ', 'Манчестер Сити', 'Интер Майами'], correct: 1 },
      { question: 'Какой клуб является самым успешным в истории Серии А?', answers: ['Милан', 'Интер Милан', 'Ювентус', 'Рома'], correct: 2 },
      { question: 'Какой клуб базируется в Мюнхене?', answers: ['Боруссия', 'Байер', 'Бавария', 'Герта'], correct: 2 },
      { question: 'Какой клуб выиграл Английскую Премьер-лигу в 2020 году?', answers: ['Ливерпуль', 'Манчестер Сити', 'Челси', 'Лестер'], correct: 0 },
      { question: 'За какой клуб сейчас играет Криштиану Роналду (по состоянию на 2024 год)?', answers: ['Ювентус', 'Манчестер Юнайтед', 'Аль Наср', 'Реал Мадрид'], correct: 2 },
      { question: 'Какой клуб известен как «Синие»?', answers: ['Лестер', 'Челси', 'Эвертон', 'Тоттенхэм'], correct: 1 },
      { question: 'Какой клуб выиграл Ла Лигу в 2021 году?', answers: ['Атлетико Мадрид', 'Барселона', 'Реал Мадрид', 'Севилья'], correct: 0 },
      { question: 'Какой клуб славится своей фан-секцией «Желтая стена»?', answers: ['Бавария Мюнхен', 'Боруссия Дортмунд', 'РБ Лейпциг', 'Шальке 04'], correct: 1 },
      { question: 'Какой клуб выиграл Лигу 1 в 2021 году?', answers: ['ПСЖ', 'Лилль', 'Монако', 'Марсель'], correct: 1 },
      { question: 'Какой клуб выиграл Кубок Либертадорес в 2022 году?', answers: ['Фламенго', 'Бока Хуниорс', 'Ривер Плейт', 'Палмейрас'], correct: 0 },
      { question: 'Какой клуб известен как «Старая синьора»?', answers: ['Наполи', 'Милан', 'Ювентус', 'Рома'], correct: 2 },
      { question: 'Какой клуб играет на «Энфилде»?', answers: ['Эвертон', 'Ливерпуль', 'Манчестер Юнайтед', 'Лидс Юнайтед'], correct: 1 },
      { question: 'Какой клуб выиграл больше всего Кубков Англии?', answers: ['Ливерпуль', 'Манчестер Юнайтед', 'Арсенал', 'Челси'], correct: 2 },
      { question: 'Какой клуб выиграл Бундеслигу в 2022 году?', answers: ['Бавария Мюнхен', 'Боруссия Дортмунд', 'РБ Лейпциг', 'Байер Леверкузен'], correct: 0 },
      { question: 'Какой клуб выиграл Лигу Европы в 2022 году?', answers: ['Айнтрахт Франкфурт', 'Рейнджерс', 'Вест Хэм', 'Севилья'], correct: 0 },
      { question: 'Какой клуб выиграл больше всего титулов Лиги чемпионов УЕФА?', answers: ['Реал Мадрид', 'Милан', 'Ливерпуль', 'Барселона'], correct: 0 }
      // Можно добавить вопросов
    ],
    marvel: [
      { question: 'Кто первый Мститель?', answers: ['Железный Человек', 'Капитан Америка', 'Тор', 'Халк'], correct: 1 },
      { question: 'Как называется молот Тора?', answers: ['Мьёльнир', 'Громобой', 'Гунгнир', 'Скурдж'], correct: 0 },
      { question: 'Какой камень бесконечности у Вижена?', answers: ['Камень Времени', 'Камень Разума', 'Камень Силы', 'Камень Души'], correct: 1 },
      { question: 'Кто главный злодей в фильме «Мстители: Война бесконечности»?', answers: ['Альтрон', 'Локи', 'Танос', 'Красный Череп'], correct: 2 },
      { question: 'Каково настоящее имя Черной Пантеры?', answers: ['Т\'Чака', 'Киллмонгер', 'Т\'Чалла', 'Н\'Джобу'], correct: 2 },
      { question: 'Кто такой Зимний Солдат?', answers: ['Сэм Уилсон', 'Баки Барнс', 'Клинт Бартон', 'Скотт Лэнг'], correct: 1 },
      { question: 'Как зовут ИИ-помощника Тони Старка?', answers: ['ДЖАРВИС', 'ПЯТНИЦА', 'КАРЕН', 'ЭДИТ'], correct: 0 },
      { question: 'В каком фильме киновселенной Marvel впервые появился Человек-паук?', answers: ['Человек-паук: Возвращение домой', 'Первый мститель: Противостояние', 'Мстители: Эра Альтрона', 'Железный человек 3'], correct: 1 },
      { question: 'Как зовут альтер эго Питера Квилла?', answers: ['Ракета', 'Звездный Лорд', 'Дракс', 'Грут'], correct: 1 },
      { question: 'Какой ученый Брюс Баннер?', answers: ['Астрофизик', 'Химик', 'Генетик', 'Физик'], correct: 3 },
      { question: 'Кто такая Алая Ведьма?', answers: ['Наташа Романофф', 'Пегги Картер', 'Ванда Максимофф', 'Джейн Фостер'], correct: 2 },
      { question: 'Какого персонажа играет актер Бенедикт Камбербэтч?', answers: ['Локи', 'Танос', 'Доктор Стрэндж', 'Ник Фьюри'], correct: 2 },
      { question: 'Из чего сделан щит Капитана Америки?', answers: ['Адамантий', 'Вибраниум', 'Титан', 'Карбонадий'], correct: 1 },
      { question: 'Кто сестра Черной Пантеры?', answers: ['Окойе', 'Накия', 'Шури', 'Рамонда'], correct: 2 },
      { question: 'Кто убил родителей Тони Старка?', answers: ['Локи', 'Альтрон', 'Красный Череп', 'Зимний Солдат'], correct: 3 },
      { question: 'С какой планеты Танос?', answers: ['Асгард', 'Титан', 'Ксандар', 'Сакаар'], correct: 1 },
      { question: 'Кто является директором Щ.И.Т.а?', answers: ['Ник Фьюри', 'Мария Хилл', 'Фил Коулсон', 'Стив Роджерс'], correct: 0 },
      { question: 'Какой персонаж стал новым Капитаном Америкой?', answers: ['Баки Барнс', 'Сэм Уилсон', 'Тони Старк', 'Соколиный глаз'], correct: 1 },
      { question: 'Какой герой известен как «Верховный маг»?', answers: ['Локи', 'Доктор Стрэндж', 'Алая Ведьма', 'Древний'], correct: 1 },
      { question: 'Какой расы Локи?', answers: ['Асгардец', 'Ледяной великан', 'Кри', 'Человек'], correct: 1 }
      // Можно добавить вопросов
    ]
  };

  let currentCategory = 'capitals';
  let currentQuestionIndex = 0;

  // Счетчики правильных и неправильных ответов
  let correctAnswers = 0;
  let incorrectAnswers = 0;

  const questionElement = document.getElementById('question');
  const answersElement = document.getElementById('answers');
  const nextQuestionButton = document.getElementById('nextQuestion');

  // Элементы для отображения счетчиков
  const correctCounter = document.getElementById('correctCounter');
  const incorrectCounter = document.getElementById('incorrectCounter');

  function loadQuestion(category, index) {
    const questionData = questions[category][index];
    questionElement.textContent = questionData.question;
    answersElement.innerHTML = '';
    questionData.answers.forEach((answer, i) => {
      const button = document.createElement('button');
      button.textContent = answer;
      button.disabled = false; // Включаем кнопки
      button.addEventListener('click', () => checkAnswer(i, questionData.correct, button));
      answersElement.appendChild(button);
    });
    nextQuestionButton.style.display = 'none';
  }

  function checkAnswer(selected, correct, button) {
    const buttons = answersElement.querySelectorAll('button');
    buttons.forEach(btn => btn.disabled = true); // Отключаем все кнопки после выбора ответа

    if (selected === correct) {
      button.classList.add('correct');
      correctAnswers++;  // Увеличиваем счетчик правильных ответов
    } else {
      button.classList.add('incorrect');
      incorrectAnswers++;  // Увеличиваем счетчик неправильных ответов
    }
    updateCounters();  // Обновляем отображение счетчиков
    nextQuestionButton.style.display = 'block';
  }

  // Функция для обновления счетчиков на экране
  function updateCounters() {
    correctCounter.textContent = `Правильные ответы: ${correctAnswers}`;
    incorrectCounter.textContent = `Неправильные ответы: ${incorrectAnswers}`;
  }

  nextQuestionButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions[currentCategory].length) {
      loadQuestion(currentCategory, currentQuestionIndex);
    } else {
      questionElement.textContent = 'Квиз завершен!';
      answersElement.innerHTML = '';
      nextQuestionButton.style.display = 'none';
    }
  });

  document.querySelectorAll('#quizCategories button').forEach(button => {
    button.addEventListener('click', (e) => {
      currentCategory = e.target.getAttribute('data-category');
      currentQuestionIndex = 0;
      correctAnswers = 0; // Сбрасываем счетчик правильных ответов при переключении категории
      incorrectAnswers = 0; // Сбрасываем счетчик неправильных ответов
      updateCounters(); // Обновляем счетчики на экране
      loadQuestion(currentCategory, currentQuestionIndex);
    });
  });

  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');

    // Сохраняем текущую тему в localStorage
    if (body.classList.contains('dark-theme')) {
      localStorage.setItem('theme', 'dark-theme');
    } else {
      localStorage.removeItem('theme'); // Удаляем тему, если активна светлая
    }
  });

  backButton.addEventListener('click', () => {
    window.location.href = '../index.html';
  });

  loadQuestion(currentCategory, currentQuestionIndex);
});
