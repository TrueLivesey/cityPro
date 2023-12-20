import './libs/modernizr-custom';
import { loadHeaderSwiper, loadServicesSwiper, loadPortfolioSwiper } from './libs/swiper';
import {
  addSliderCounters,
  focusServicesCard,
  activeServicesCard,
  enableCheck,
  smoothHeight,
} from './modules/functions';
import { openBurger } from './modules/burger';
import { formValidation } from './modules/form-validation';
import { backToTop } from './modules/back-to-top';
import { initMap } from './modules/initMap';

const headerSliderWrapper = document.querySelector('.header-swiper__wrapper');
const headerSliderPagination = document.querySelector('.header__pagination');
const servicesLinkWrappers = document.querySelectorAll('.services-card__link-wrapper');
const servicesLinks = document.querySelectorAll('.services-card__link');
const servicesBtns = document.querySelectorAll('.services-card__arrow-block');
const requestPhone = document.getElementById('request-form-phone');
const requestCheckLabel = document.querySelector('.request-form__label-check');
const portfolioBtnWrapper = document.querySelector('.portfolio__swiper-wrapper');
const aboutBtnWrapper = document.querySelector('.about__wrapper');

// Загрузка слайдера в хедере
loadHeaderSwiper();
// Создание динамического счётчика (количество слайдов на странице)
addSliderCounters(headerSliderWrapper, headerSliderPagination);

// Открытые бургер меню
openBurger();

// Загрузка слайдера в услугах
loadServicesSwiper();
// Добавление фокуса на карточки в услугах
focusServicesCard(servicesLinkWrappers, servicesLinks);
// Клик по стрелочке в услугах на мобильных приложениях
activeServicesCard(servicesBtns);

// Загрузка слайдера в портфолио
loadPortfolioSwiper();
// Открываем скрытый текст
smoothHeight(
  '.portfolio-swiper__slide',
  '.cut',
  portfolioBtnWrapper,
  '.portfolio-swiper__text-block',
  '.portfolio-swiper__text',
);

// Открываем скрытый текст в about
smoothHeight('.about', '.cut', aboutBtnWrapper, '.about__text-block', '.about__text');

// Валидация формы в секции "оставьте заявку"
formValidation('request-form', 'request-form-name', requestPhone, 'request-form-check');
// Нажатие enter на чекбокс
enableCheck('request-form', requestCheckLabel);

// Кнопка "вернуться наверх"
backToTop();

// Инициализация яндекс карты
initMap();
