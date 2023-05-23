'use strict';

// const dataContacts = [
//   {
//     name: 'Иван',
//     surname: 'Петров',
//     phone: '+79514545454',
//   },
//   {
//     name: 'Игорь',
//     surname: 'Семёнов',
//     phone: '+79999999999',
//   },
//   {
//     name: 'Семён',
//     surname: 'Иванов',
//     phone: '+79800252525',
//   },
//   {
//     name: 'Мария',
//     surname: 'Попова',
//     phone: '+79876543210',
//   },
// ];

const getStorage = (key) => {
  const data = localStorage.getItem(key);

  return data ? JSON.parse(data) : [];
};

const setStorage = (key, obj) => {
  const data = getStorage(key);
  data.push(obj);
  localStorage.setItem(key, JSON.stringify(data));
};

const removeStorage = (phone) => {
  const key = 'data';
  const data = getStorage(key);
  const newData = data.filter(contact => contact.phone !== phone);
  localStorage.setItem(key, JSON.stringify(newData));
};

const data = getStorage('data');

const createContainer = () => {
  const container = document.createElement('div');
  container.classList.add('container');

  return container;
};

const createHeader = () => {
  const header = document.createElement('header');
  header.classList.add('header');
  const headerContainer = createContainer();
  header.append(headerContainer);
  header.headerContainer = headerContainer;

  return header;
};

const createLogo = (title) => {
  const h1 = document.createElement('h1');
  h1.classList.add('logo');
  h1.textContent = `Телефонный справочник`;

  return h1;
};

const createMain = () => {
  const main = document.createElement('main');
  const mainContainer = createContainer();
  main.append(mainContainer);
  main.mainContainer = mainContainer;

  return main;
};

const createButtonsGroup = (params) => {
  const btnWrapper = document.createElement('div');
  btnWrapper.classList.add('btn-wrapper');
  const btns = params.map(({className, type, text}) => {
    const button = document.createElement('button');
    button.type = type;
    button.textContent = text;
    button.className = className;

    return button;
  });
  btnWrapper.append(...btns);

  return {
    btnWrapper,
    btns,
  };
};

const createTable = () => {
  const table = document.createElement('table');
  table.classList.add('table', 'table-striped');
  const thead = document.createElement('thead');
  thead.insertAdjacentHTML('beforeend', `
    <tr>
      <th class="delete">Удалить</th>
      <th>Имя</th>
      <th>Фамилия</th>
      <th>Телефон</th>
    </tr>
    `);
  const tbody = document.createElement('tbody');
  table.append(thead, tbody);
  table.tbody = tbody;

  return table;
};

const createForm = () => {
  const overlay = document.createElement('div');
  overlay.classList.add('form-overlay');
  const form = document.createElement('form');
  form.classList.add('form');
  form.insertAdjacentHTML('beforeend', `
    <button class="close" type="button"></button>
    <h2 class="form-title">Добавить контакт</h2>
    <div class="form-group">
      <label class="form-label" for="name">Имя:</label>
      <input class="form-input" name="name" id="name" type="text" required>
    </div>
    <div class="form-group">
      <label class="form-label" for="surname">Фамилия:</label>
      <input class="form-input" name="surname" id="surname" type="text" required>
    </div>
    <div class="form-group">
      <label class="form-label" for="phone">Телефон:</label>
      <input class="form-input" name="phone" id="phone" type="number" required>
    </div>
  `);
  const buttonGroup = createButtonsGroup([
    {
      className: 'btn btn-primary mr-3',
      type: 'submit',
      text: 'Добавить',
    },
    {
      className: 'btn btn-danger',
      type: 'reset',
      text: 'Отмена',
    },
  ]);

  form.append(...buttonGroup.btns);
  overlay.append(form);

  return {
    overlay,
    form,
  };
};

const createFooter = () => {
  const footer = document.createElement('footer');
  footer.classList.add('footer');
  const footerContainer = createContainer();
  footer.append(footerContainer);
  footer.footerContainer = footerContainer;

  return footer;
};

const createCopyright = () => {
  const copyrightText = document.createElement('p');
  copyrightText.classList.add('copyright');
  copyrightText.textContent = `Все права защищены`;

  return copyrightText;
};

const renderPhoneBook = (app, title) => {
  const header = createHeader();
  const logo = createLogo(title);
  const main = createMain();
  const footer = createFooter();
  const copyright = createCopyright();
  const buttonGroup = createButtonsGroup([
    {
      className: 'btn btn-primary mr-3',
      type: 'button',
      text: 'Добавить',
    },
    {
      className: 'btn btn-danger',
      type: 'button',
      text: 'Удалить',
    },
  ]);

  const table = createTable();
  const form = createForm();
  header.headerContainer.append(logo);
  footer.footerContainer.append(copyright);
  main.mainContainer.append(buttonGroup.btnWrapper, table, form.overlay);
  app.append(header, main, footer);

  return {
    list: table.tbody,
    logo,
    btnAdd: buttonGroup.btns[0],
    btnDel: buttonGroup.btns[1],
    formOverlay: form.overlay,
    form: form.form,
  };
};

const createRow = ({name: firstname, surname, phone}) => {
  const tr = document.createElement('tr');
  tr.classList.add('contact');
  const tdDel = document.createElement('td');
  tdDel.classList.add('delete');
  const buttonDel = document.createElement('button');
  buttonDel.classList.add('del-icon');
  tdDel.append(buttonDel);
  const tdName = document.createElement('td');
  tdName.textContent = firstname;
  const tdSurname = document.createElement('td');
  tdSurname.textContent = surname;
  const tdPhone = document.createElement('td');
  const phoneLink = document.createElement('a');

  phoneLink.href = `tel:${phone}`;
  phoneLink.textContent = phone;
  tr.phoneLink = phoneLink;
  tdPhone.append(phoneLink);

  tr.append(tdDel, tdName, tdSurname, tdPhone);

  return tr;
};

const renderContacts = (elem, data) => {
  const allRow = data.map(createRow);
  elem.append(...allRow);

  return allRow;
};

const howerRow = (allRow, logo) => {
  const text = logo.textContent;
  allRow.forEach(contact => {
    contact.addEventListener('mouseenter', () => {
      logo.textContent = contact.phoneLink.textContent;
    });
    contact.addEventListener('mouseleave', () => {
      logo.textContent = text;
    });
  });
};

const init = (selectorApp, title) => {
  const app = document.querySelector(selectorApp);
  const phoneBook = renderPhoneBook(app, title);

  const {
    list,
    logo,
    btnAdd,
    formOverlay,
    form,
    btnDel,
  } = phoneBook;

  const allRow = renderContacts(list, data);

  howerRow(allRow, logo);

  btnAdd.addEventListener('click', () => {
    formOverlay.classList.add('is-visible');
  });

  formOverlay.addEventListener('click', e => {
    const target = e.target;
    if (target === formOverlay || target.classList.contains('close')) {
      formOverlay.classList.remove('is-visible');
    }
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name');
    const surname = formData.get('surname');
    const phone = formData.get('phone');

    if (name && surname && phone) {
      setStorage('data', {name, surname, phone});
      const newRow = createRow({name, surname, phone});
      list.append(newRow);
      howerRow([newRow], logo);
      form.reset();
      formOverlay.classList.remove('is-visible');
    }
  });

  btnDel.addEventListener('click', () => {
    document.querySelectorAll('.delete').forEach(del => {
      del.classList.toggle('is-visible');
    });
  });

  list.addEventListener('click', e => {
    if (e.target.closest('.del-icon')) {
      const contact = e.target.closest('.contact');
      const phone = contact.phoneLink.textContent;
      removeStorage(phone);
      contact.remove();
    }
  });

  // const existingContacts = getStorage('data');
  // if (existingContacts.length === 0) {
  //   dataContacts.forEach(contact => {
  //     setStorage('data', contact);
  //   });
  // };
};

window.phoneBookInit = init;


// Этот код создает телефонный справочник с использованием JavaScript и localStorage для хранения контактов. Вот краткое описание каждой части кода:
//
// 1. `'use strict';` - это директива, которая включает строгий режим в JavaScript. Это помогает предотвратить некоторые ошибки и улучшает производительность.
//
// 2. `const dataContacts = [...]` - это массив объектов, который содержит начальные контакты для телефонного справочника.
//
// 3. `const getStorage = (key) => {...}` - это функция, которая получает данные из localStorage по ключу `key`. Если данные существуют, то они преобразуются из JSON-строки в объект JavaScript и возвращаются. Если данных нет, то возвращается пустой массив.
//
// 4. `const setStorage = (key, obj) => {...}` - это функция, которая добавляет новый контакт `obj` в localStorage под ключом `key`. Она получает текущие данные из localStorage с помощью функции `getStorage`, добавляет новый контакт в массив и сохраняет обновленные данные обратно в localStorage.
//
// 5. `const removeStorage = (phone) => {...}` - это функция, которая удаляет контакт из localStorage по номеру телефона `phone`. Она получает текущие данные из localStorage с помощью функции `getStorage`, фильтрует массив контактов, чтобы удалить контакт с указанным номером телефона, и сохраняет обновленные данные обратно в localStorage.
//
// 6. `const data = getStorage('data');` - это строка кода, которая получает текущие контакты из localStorage и сохраняет их в переменной `data`.
//
// 7. `const createContainer = () => {...}` - это функция, которая создает HTML-элемент `<div>` с классом `container` и возвращает его.
//
// 8. `const createHeader = () => {...}` - это функция, которая создает HTML-элемент `<header>` с классом `header`, добавляет в него контейнер с помощью функции `createContainer` и возвращает его.
//
// 9. `const createLogo = (title) => {...}` - это функция, которая создает HTML-элемент `<h1>` с классом `logo`, устанавливает его текстовое содержимое равным аргументу `title` и возвращает его.
//
// 10. `const createMain = () => {...}` - это функция, которая создает HTML-элемент `<main>`, добавляет в него контейнер с помощью функции `createContainer` и возвращает его.
//
// 11. `const createButtonsGroup = (params) => {...}` - это функция, которая создает группу кнопок на основе массива объектов `params`. Каждый объект должен содержать свойства `className`, `type` и `text`, которые определяют класс, тип и текст кнопки соответственно. Функция создает HTML-элементы `<button>` для каждой кнопки, добавляет их в общий контейнер и возвращает этот контейнер.
//
// 12. `const createTable = () => {...}` - это функция, которая создает HTML-элемент `<table>` с классами `table` и `table-striped`, добавляет в него заголовок таблицы с помощью элемента `<thead>` и тело таблицы с помощью элемента `<tbody>` и возвращает таблицу.
//
// 13. `const createForm = () => {...}` - это функция, которая создает форму для добавления нового контакта. Она создает HTML-элементы `<div>`, `<form>`, `<label>`, `<input>` и `<button>` для создания формы с полями для имени, фамилии и номера телефона и кнопками "Добавить" и "Отмена". Функция также создает кнопку "Закрыть" для закрытия формы. Все элементы добавляются в общий контейнер и этот контейнер возвращается.
//
// 14. `const createFooter = () => {...}` - это функция, которая создает HTML-элемент `<footer>` с классом `footer`, добавляет в него контейнер с помощью функции `createContainer` и возвращает его.
//
// 15. `const createCopyright = () => {...}` - это функция, которая создает HTML-элемент `<p>` с классом `copyright`, устанавливает его текстовое содержимое равным "Все права защищены" и возвращает его.
//
// 16. `const renderPhoneBook = (app, title) => {...}` - это функция, которая отрисовывает телефонный справочник на странице. Она принимает аргументы `app` и `title`, где `app` - это HTML-элемент для отрисовки телефонного справочника (обычно элемент `<body>`), а `title` - это заголовок телефонного справочника (используется для создания логотипа). Функция использует другие функции для создания элементов шапки (`createHeader`), логотипа (`createLogo`), основного содержимого (`createMain`), кнопок (`createButtonsGroup`), таблицы (`createTable`), формы (`createForm`) и подвала (`createFooter`). Все эти элементы добавляются в элемент `app`. Функция также сохраняет ссылки на некоторые элементы (например, на список контактов или на форму) для дальнейшего использования и возвращает эти ссылки.
//
// 17. `const createRow = ({name: firstname, surname, phone}) => {...}` - это функция, которая создает строку таблицы для отображения одного контакта. Она принимает аргумент объекта с свойствами `name`, `surname` и `phone`, которые соответствуют имени, фамилии и номеру телефона контакта соответственно. Функция создает HTML-элементы `<tr>`, `<td>` и `<button>` для отображения информации о контакте и кнопки удаления контакта. Все эти элементы добавляются в строку таблицы и строка таблицы возвращается.
//
// 18. `const renderContacts = (elem, data) => {...}` - это функция, которая отрисовывает список контактов в таблице. Она принимает аргументы `elem` и `data`, где `elem` - это элемент `<tbody>` таблицы (полученный из функции `renderPhoneBook`), а `data` - это массив объектов с информацией о контактах. Функция использует другую функцию (`createRow`) для создания строки таблицы для каждого контакта из массива данных. Все строки таблицы добавляются в элемент `<tbody>` таблицы.
//
// 19. Далее следует код для обработки различных пользовательских действий: наведение курсора на строку таблицы (`howerRow`), нажатие на кнопку "Добавить" (`btnAdd.addEventListener(...)`), закрытие формы (`formOverlay.addEventListener(...)`), отправка формы (`form.addEventListener(...)`), удаление всех контактов (`btnDel.addEventListener(...)`), удаление одного контакта (`list.addEventListener(...)`).
//
// 20. В конце файла есть код для запуска всего приложения: вызывается функция init() c параметрами selectorApp (селектор элемента app) and title (заголовок телефонного справочника).
