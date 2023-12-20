import { el, setChildren, mount } from 'redom';

// Создание DOM элементов
function createSliderCounters() {
  const counter = el('span.header__counter');
  const counter2 = el('span.header__counter');

  counter.id = 'header-counter';
  counter2.id = 'header-counter-2';

  return { counter, counter2 };
}

// Добавление двух счётчиков слайдов
function addSliderCounters(sliderWrapper, pagination) {
  const counters = createSliderCounters();
  const counter = counters.counter;
  const counter2 = counters.counter2;
  let numberOfSlides = '00';

  // Проверка на наличие дочерних элементов у swiper-wrapper
  if (sliderWrapper.children) {
    numberOfSlides = sliderWrapper.children.length;
    counter.textContent = '01';
    counter2.textContent = `0${numberOfSlides}`;

    pagination.parentElement.insertBefore(counter, pagination);
    pagination.parentElement.insertBefore(counter2, pagination.nextSibling);
  } else {
    pagination.parentElement.insertBefore(counter, pagination);
  }
}

// Добавление класса
function addClass(e, className) {
  if (!e.classList.contains(className)) {
    e.classList.add(className);
  }
}

// Удаление класса
function removeClass(e, className) {
  if (e.classList.contains(className)) {
    e.classList.remove(className);
  }
}

// Проверка элемента на наличие класса
function checkClass(elem, className, elemProperty) {
  if (elemProperty === 'array') {
    elem.forEach((e) => {
      removeClass(e, className);
    });
  } else if (elemProperty === 'elem') {
    removeClass(elem, className);
  }
}

// Функция, которая добавляет фокус карточкам в услугах
function focusServicesCard(servicesLinkWrappers, servicesLinks) {
  servicesLinks.forEach((servicesLink) => {
    const servicesWrapper = servicesLink.parentNode;
    const servicesCard = servicesWrapper.parentNode;
    const servicesTitle = servicesCard.querySelector('.services-card__title');
    const servicesArrow = servicesCard.querySelector('.services-card__arrow');

    servicesLink.addEventListener('focus', () => {
      servicesWrapper.classList.add('services-card__link-wrapper--visible');
      servicesTitle.classList.add('services-card__title--opacity');
      servicesArrow.classList.add('services-card__arrow--rotate');
    });

    servicesLink.addEventListener('focusout', () => {
      checkClass(servicesLinkWrappers, 'services-card__link-wrapper--visible', 'array');
      checkClass(servicesTitle, 'services-card__title--opacity', 'elem');
      checkClass(servicesArrow, 'services-card__arrow--rotate', 'elem');
    });
  });
}

function activeServicesCard(servicesBtns) {
  servicesBtns.forEach((btn) => {
    const servicesCard = btn.parentNode;
    const servicesLinkWrapper = servicesCard.querySelector('.services-card__link-wrapper');
    const servicesTitle = servicesCard.querySelector('.services-card__title');
    const servicesArrow = btn.children[0];

    btn.addEventListener('click', () => {
      servicesLinkWrapper.classList.toggle('services-card__link-wrapper--visible');
      servicesTitle.classList.toggle('services-card__title--opacity');
      servicesArrow.classList.toggle('services-card__arrow--rotate');
    });
  });
}

function enableCheck(name, label) {
  const check = label.querySelector(`.${name}__input`);

  label.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
      if (check.checked) {
        check.checked = false;
      } else {
        check.checked = true;
      }
    }
  });
}

// Функция, которая позволяет открывать скрытый текст
const smoothHeight = (itemSelector, btnSelector, btnWrapper, contentSelector, text) => {
  const items = document.querySelectorAll(itemSelector);

  if (!items.length) return;

  items.forEach((el) => {
    const btn = btnWrapper.querySelector(btnSelector);
    const content = el.querySelector(contentSelector);
    const textBlock = el.querySelector(text);

    btn.addEventListener('click', () => {
      btn.classList.toggle('cut-rotate');
      textBlock.classList.toggle('cut-text');

      if (el.dataset.open !== 'true') {
        el.dataset.open = 'true';
        content.style.maxHeight = `${content.scrollHeight}px`;
      } else {
        el.dataset.open = 'false';
        content.style.maxHeight = '';
      }
    });

    const onResize = () => {
      if (el.dataset.open === 'true') {
        if (parseInt(content.style.maxHeight) !== content.scrollHeight) {
          content.style.maxHeight = `${content.scrollHeight}px`;
        }
      }
    };

    window.addEventListener('resize', onResize);
  });
};

export {
  addSliderCounters,
  addClass,
  removeClass,
  checkClass,
  focusServicesCard,
  activeServicesCard,
  enableCheck,
  smoothHeight,
};
