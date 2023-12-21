import { removeClass } from './functions';
import { formValidation } from './form-validation';

export function showModal() {
  const body = document.querySelector('body');
  const wrapper = document.querySelector('.wrapper');
  const header = document.querySelector('.header__wrapper');
  const modalLinks = document.querySelectorAll('.js-modal-open');
  const lockPadding = document.querySelectorAll('.lock-padding');
  const modalForm = document.getElementById('modal-form');
  const modalMobileForm = document.getElementById('modal-mobile-form');
  const modalCloseBtns = document.querySelectorAll('.modal-close-btn');
  const modalPhone = document.getElementById('modal-form-phone');
  const modalMobilelPhone = document.getElementById('modal-mobile-form-phone');
  const modalBtn = document.getElementById('modal-btn');
  const modalMobileBtn = document.getElementById('modal-mobile-btn');
  const modalBtns = [modalBtn, modalMobileBtn];

  let modal = null;
  let modalMobile = null;
  let currentModalGlobal = null;
  let unlock = true;
  let isMobileScreen = window.innerWidth < 1024;
  const timeout = 300;

  // Проверка на наличие wrapper
  if (!wrapper) {
    console.error('Элемент .wrapper не найден на странице');
    return;
  }

  // Получаем ссылки на модальные окна
  modalMobile = document.getElementById('js-modal-mobile');
  modal = document.getElementById('js-modal');

  // Открытие модального окна
  function modalOpen(currentModal, saveHeader) {
    // Добавляем хедеру класс с position: fixed, чтобы шапка была видна
    // вместе с модальным окном
    if (saveHeader) {
      header.classList.add('header-fixed');
      header.addEventListener(
        'click',
        (e) => {
          const modalActive = document.querySelector('.js-modal.open');
          if (modalActive && e.target.closest('.header__wrapper')) {
            modalClose(modalActive);
          }
        },
        { once: true },
      );
    }

    const errors = document.querySelectorAll('.just-validate-error-label');

    // Удаляем ошибки при открытии модального окна
    if (errors) {
      errors.forEach((el) => {
        el.remove();
      });
    }

    if (currentModal && unlock) {
      const modalActive = document.querySelector('.js-modal.active');
      if (modalActive) {
        modalClose(modalActive, false);
      } else {
        bodyLock();
      }

      // Закрываем модальное окно, если кликнули не по его контенту
      currentModal.classList.add('open');
      currentModal.addEventListener('click', (e) => {
        if (!e.target.closest('.modal__content') && currentModal.classList.contains('modal')) {
          modalClose(e.target.closest('.js-modal'));
        }
      });
    }
  }

  // Функция для открытия нужного модального окна
  function openCurrentyModal() {
    if (isMobileScreen) {
      if (modalMobile) {
        modalOpen(modalMobile, true);
      }
    } else if (!isMobileScreen) {
      if (modal) {
        modalOpen(modal);
      }
    }
  }

  // Закрытие модального окна
  function modalClose(modalActive) {
    if (unlock) {
      modalActive.classList.remove('open');

      if (document.querySelector('.open')) {
        document.querySelector('.open').classList.remove('open');
      }

      // удаляем класс с position: fixed при закрытии модального окна и
      // разблокируем body
      removeClass(header, 'header-fixed');
      bodyUnLock();
    }
  }

  // Обработчик кнопки, которая открывает модальное окно
  if (modalLinks.length > 0) {
    modalLinks.forEach((modalLink) => {
      modalLink.addEventListener('click', (e) => {
        openCurrentyModal();
        e.preventDefault();
      });
    });
  }

  // Функция для обновления состояния экрана
  function updateScreenState() {
    isMobileScreen = window.innerWidth < 1024;
  }

  // Слушатель изменения размера экрана
  window.addEventListener('resize', () => {
    updateScreenState();
  });

  // Функция для блокировки body для того, чтобы не было скачка при
  // открытии модального окна без скорлла на странице
  function bodyLock() {
    const lockPaddingValue = window.innerWidth - wrapper.offsetWidth + 'px';

    if (lockPadding.length > 0) {
      lockPadding.forEach((lockPaddingElem) => {
        lockPaddingElem.style.paddingRight = lockPaddingValue;
      });
    }

    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');

    unlock = false;
    setTimeout(() => {
      unlock = true;
    }, timeout);
  }

  // Фкнкция, которая убирает класс lock у body (разблокировывает его)
  function bodyUnLock() {
    setTimeout(() => {
      if (lockPadding.length > 0) {
        lockPadding.forEach((lockPaddingElem) => {
          lockPaddingElem.style.paddingRight = '0px';
        });
      }

      body.style.paddingRight = '0px';
      body.classList.remove('lock');
    }, timeout);

    unlock = false;
    setTimeout(() => {
      unlock = true;
    }, timeout);
  }

  // Обработчик кнопки, которая закрывает модальное окно
  if (modalCloseBtns.length > 0) {
    modalCloseBtns.forEach((modalCloseBtn) => {
      modalCloseBtn.addEventListener('click', (e) => {
        modalClose(modalCloseBtn.closest('.modal'));
        bodyUnLock();
        e.preventDefault();
      });
    });
  }

  // Закрытие модального окна при нажатии на esc
  document.addEventListener('keydown', (e) => {
    if (e.which === 27) {
      const modalActive = document.querySelector('.js-modal.open');
      modalClose(modalActive);
    }
  });

  // Валидация формы в модальном окне
  formValidation('modal-form', 'modal-form-name', modalPhone, 'modal-form-check');

  // Валидация формы в мобильном модальном окне
  formValidation(
    'modal-mobile-form',
    'modal-mobile-form-name',
    modalMobilelPhone,
    'modal-mobile-form-check',
  );

  // Закрываем форму, возвращаем позиционирование хедеру и очищаем поля
  function eventTriggering(modal, header) {
    removeClass(modal, 'open');
    removeClass(header, 'header-fixed');

    if (modal.classList.contains('modal-mobile')) {
      modalMobileForm.reset();
    } else {
      modalForm.reset();
    }
    bodyUnLock();
  }

  // Обработчики кнопок на формах в модальных окнах
  modalBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      currentModalGlobal = btn.closest('.js-modal');

      if (currentModalGlobal.getElementsByTagName('form')[0].checkValidity()) {
        eventTriggering(currentModalGlobal, header);
      }
    });
  });
}
