import { removeClass } from './functions';
import { formValidation } from './form-validation';

export function showModal(modalName, mode = null, saveHeader = false) {
  const body = document.querySelector('body');
  const wrapper = document.querySelector('.wrapper');
  const header = document.querySelector('.header__wrapper');
  const modal = document.getElementById('js-modal');
  const modalMobile = document.getElementById('js-modal-mobile');
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

  // const resetValidation = formValidation();

  const timeout = 300;
  let unlock = true;

  // Проверка на наличие wrapper
  if (!wrapper) {
    console.error('Элемент .wrapper не найден на странице');
    return;
  }

  // Открытие модального окна
  function modalOpen(currentModal) {
    // Добавляем хедеру класс с position: fixed, чтобы шапка была видна
    // вместе с модальным окном
    if (saveHeader && mode === 'mobile') {
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
        if (!e.target.closest('.modal__content') && mode === 'desktop') {
          modalClose(e.target.closest('.js-modal'));
        }
      });
    }
  }

  // Закрытие модального окна
  function modalClose(modalActive, doUnlock = true) {
    if (unlock) {
      modalActive.classList.remove('open');

      // удаляем класс с position: fixed при закрытии модального окна
      removeClass(header, 'header-fixed');

      if (doUnlock) {
        bodyUnLock();
      }
    }
  }

  // Блокируем body
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

  // Разблокируем body
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

  // Обработчик кнопки, которая открывает модальное окно
  if (modalLinks.length > 0) {
    modalLinks.forEach((modalLink) => {
      modalLink.addEventListener('click', (e) => {
        const currentModal = document.getElementById(modalName);
        const errors = document.querySelectorAll('.just-validate-error-label');

        // Удаляем ошибки при открытии модального окна
        if (errors) {
          errors.forEach((el) => {
            el.remove();
          });
        }

        modalOpen(currentModal);
        e.preventDefault();
      });
    });
  }

  // Обработчик кнопки, которая закрывает модальное окно
  if (modalCloseBtns.length > 0) {
    modalCloseBtns.forEach((modalCloseBtn) => {
      modalCloseBtn.addEventListener('click', (e) => {
        modalClose(modalCloseBtn.closest('.modal'));
        e.preventDefault();
      });
    });
  }

  // Закрываем модальное окно при нажатии на esc
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
  function eventTriggering(modal, header, form) {
    removeClass(modal, 'open');
    removeClass(header, 'header-fixed');
    form.reset();
  }

  // Обработчики кнопок на формах в модальных окнах
  modalBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (mode === 'desktop' && modalForm.checkValidity()) {
        eventTriggering(modal, header, modalForm);
      } else if (mode === 'mobile' && modalMobileForm.checkValidity()) {
        eventTriggering(modalMobile, header, modalMobileForm);
      }
    });
  });
}
