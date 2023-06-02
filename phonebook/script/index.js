'use strict';

// отправка данных на сервер, группы чекбоксов

// const form = document.querySelector('.my-form');
//
// const sendData = data => console.log('Отправка: ', data);
//
// form.addEventListener('submit', e => {
//   e.preventDefault();
//
//   const checkboxes = new Set();
//
//   [...form.elements].forEach(elem => {
//     if (elem.type === 'checkbox') {
//       checkboxes.add(elem.name);
//     }
//   })
//
//   const data = {};
//
//   const formData = new FormData(e.target);
//
//   for (const [name, value] of formData) {
//     if (checkboxes.has(name)) {
//       if (Array.isArray(data[name])) {
//         data[name].push(value);
//       } else {
//         data[name] = [value];
//       }
//     } else {
//       data[name] = value;
//     }
//   }
//
//   sendData(JSON.stringify(data)); // серверы обычно понимают formData, но иногда нужно отправлять данные в JSON
// });
