import { removeClass } from './functions';

export function openBurger() {
  const header = document.querySelector('.header');
  const nav = document.getElementById('nav');
  const burger = document.getElementById('burger');
  const navLinkArray = document.querySelectorAll('.nav__link');

  function closeMenu() {
    // Закрытие меню при клике на ссылку в навигации
    navLinkArray.forEach((navLink) => {
      navLink.addEventListener('click', () => {
        removeClass(header, 'open');
      });
    });

    // Закрытие меню при клике на escape
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        burger.blur();
        removeClass(header, 'open');
      }
    });

    // Закрытие меню при клике вне его
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !burger.contains(e.target)) {
        removeClass(header, 'open');
      }
    });
  }

  // Нажатие на бургер
  burger.addEventListener('click', () => {
    header.classList.toggle('open');
  });

  // Медиа-запрос max-width: 1024px
  if (window.matchMedia('(max-width: 1024px)').matches) {
    closeMenu();
  }

  // Изменение ширины экрана
  window.addEventListener('resize', () => {
    closeMenu();
  });
}
