import { removeClass } from './functions';
import device from 'current-device';
import { showModal } from './modal';

export function openBurger() {
  const header = document.querySelector('.header');
  const nav = document.getElementById('nav');
  const burger = document.getElementById('burger');
  const navLinkArray = document.querySelectorAll('.nav__link');

  let innerWidth = window.innerWidth;

  function toggleAriaLabe(header, burger) {
    if (header.classList.contains('menu-open')) {
      burger.ariaLabel = 'Закрыть меню';
    } else {
      burger.ariaLabel = 'Открыть меню';
    }
  }

  function closeMenu() {
    // Закрытие меню при клике на ссылку в навигации
    navLinkArray.forEach((navLink) => {
      navLink.addEventListener('click', () => {
        removeClass(header, 'menu-open');
        toggleAriaLabe(header, burger);
      });
    });

    // Закрытие меню при клике на escape
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        burger.blur();
        removeClass(header, 'menu-open');
        toggleAriaLabe(header, burger);
      }
    });

    // Закрытие меню при клике вне его
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !burger.contains(e.target)) {
        removeClass(header, 'menu-open');
        toggleAriaLabe(header, burger);
      }
    });
  }

  // Нажатие на бургер
  burger.addEventListener('click', () => {
    header.classList.toggle('menu-open');
    toggleAriaLabe(header, burger);
  });

  // Медиа-запрос max-width: 1024px
  if (window.matchMedia('(max-width: 1024px)').matches) {
    closeMenu();
  }

  if (innerWidth === window.innerWidth) {
    if (window.innerWidth >= 1024) {
      // Модальное окно на десктопе
      showModal('js-modal', 'desktop');
    } else {
      // Модальное окно на мобильных экранах
      showModal('js-modal-mobile', 'mobile', true);
    }
  }
}
