// Добавь функционал изменения темы при нажатии (событие change) на чекбокс #theme-switch-toggle в тулбаре.

// По умолчанию тема светлая.
// При изменении темы, необходимо добавлять на элемент body класс light-theme или dark-theme.
// Выбранная тема должна сохраняться между перезагрузками страницы. Для хранения темы используй localStorage.
// Если при загрузке страницы тема тёмная, не забудь поставить свойство checked у чекбокса #theme-switch-toggle в true, чтобы ползунок сдвинулся в правильное положение.
// Для удобства хранения списка тем используй такое перечисление.

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

import menu from './menu.json';

const refs = {
  menu: document.querySelector('.js-menu'),
  switch: document.querySelector('.theme-switch__toggle'),
};

const menuMarkup = menu
  .map(({ ingredients, name, description, image, price }) => {
    return `<li class="menu__item">
  <article class="card">
    <img class="card__image" src="${image}" alt="" />
    <div class="card__content">
      <h2 class="card__name">${name}</h2>
      <p class="card__price">${price}</p>
      <p class="card__descr">${description}</p>
      <ul class="tag-list">
        ${ingredients
          .map(ingredient => {
            return `<li class="tag-list__item">${ingredient}</li>`;
          })
          .join('')}
         </ul>
    </div>
    <button class="card__button button"></button>
  </article>
</li>`;
  })
  .join('');

checkLocalStoreTheme();

refs.menu.insertAdjacentHTML('afterbegin', menuMarkup);

function setLightTheme() {
  document.body.classList.add('light-theme');
  localStorage.setItem('theme', Theme.LIGHT);
  document.body.classList.remove('dark-theme');
}

function setDarkTheme() {
  document.body.classList.add('dark-theme');
  localStorage.setItem('theme', Theme.DARK);
  document.body.classList.remove('light-theme');
}

console.dir(refs.switch);
refs.switch.addEventListener('change', onSwitchChange);

function onSwitchChange() {
  if (!refs.switch.checked) {
    setLightTheme();
  } else {
    setDarkTheme();
  }
}

function checkLocalStoreTheme() {
  if (localStorage.getItem('theme')) {
    document.body.classList.add(localStorage.getItem('theme'));
  }

  if (localStorage.getItem('theme') === Theme.DARK) {
    refs.switch.checked = true;
  }
}
