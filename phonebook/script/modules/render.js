import {createContainer, createHeader, createLogo, createMain, createButtonsGroup, createTable, createForm, createFooter, createCopyright, createRow, hoverRow,} from './createElements.js';

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

const renderContacts = (elem, data) => {
  const allRow = data.map(createRow);
  elem.append(...allRow);

  return allRow;
};

export {
  renderPhoneBook,
  renderContacts,
};
