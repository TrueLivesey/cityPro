import Swiper from 'swiper';
import { Pagination, Navigation, Autoplay, EffectCreative, FreeMode } from 'swiper/modules';
import 'swiper/css';

function loadHeaderSwiper() {
  const swiper = new Swiper('.header-swiper', {
    modules: [Pagination, Autoplay],

    loop: true,

    autoplay: {
      enabled: false,
      delay: 5000,
    },

    pagination: {
      el: '.header__pagination',
      clickable: true,
    },

    breakpoints: {
      320: {
        speed: 500,
      },

      769: {
        speed: 800,
      },
    },
  });
}

function loadServicesSwiper() {
  const services = document.getElementById('services');
  const fraction = document.getElementById('services-fraction');
  const slides = services.querySelectorAll('.swiper-slide');
  const slideCount = slides.length;
  fraction.innerHTML = `<span class="fraction services__fraction-item">01</span> <span class="fraction services__fraction-item">0${slideCount}</span>`;

  const swiper = new Swiper('.services-swiper', {
    modules: [Pagination, FreeMode],

    pagination: {
      el: '.services-swiper__pagination',
      clickable: true,
    },

    breakpoints: {
      320: {
        slidesPerView: 1,
        loop: true,
        spaceBetween: 30,
      },

      480: {
        spaceBetween: 0,
        slidesPerView: 'auto',
        loop: false,
        FreeMode: true,
      },
    },

    on: {
      slideChange: () => {
        fraction.innerHTML = `<span class="fraction services__fraction-item">0${
          swiper.realIndex + 1
        }</span> <span class="fraction services__fraction-item">0${slideCount}</span>`;
      },
    },
  });
}

function loadPortfolioSwiper() {
  const portfolio = document.getElementById('portfolio');
  const fraction = document.getElementById('fraction');
  const slides = portfolio.querySelectorAll('.swiper-slide');
  const slideCount = slides.length;
  fraction.innerHTML = `<span class="portfolio-swiper__fraction-item">01</span> <span class="portfolio-swiper__fraction-item">0${slideCount}</span>`;

  let swiper = null;
  let isSwiperInitialized = false;

  // Выносим свайпер в функцию, чтобы заново его инициализировать при рендере
  // новой пагинации
  function initializeSwiper() {
    swiper = new Swiper('.portfolio-swiper', {
      modules: [Pagination, Navigation, EffectCreative],

      slidersPerView: 1,
      loop: true,
      speed: 700,
      effect: 'creative',
      creativeEffect: {
        prev: {
          shadow: false,
          translate: ['-125%', 0, -400],
        },
        next: {
          translate: ['100%', 0, 0],
        },
      },

      navigation: {
        nextEl: '.portfolio-swiper__next',
        prevEl: '.portfolio-swiper__prev',
      },

      pagination: {
        el: '.portfolio-swiper__pagination',
        type: 'custom',
        renderCustom: function (swiper, current, total) {
          return `<span class="portfolio-swiper__number">${current}</span><span class="portfolio-swiper__slash">/</span><span class="portfolio-swiper__number">${total}</span>`;
        },
        clickable: false,
      },

      breakpoints: {
        320: {
          speed: 500,
          pagination: {
            type: 'bullets',
            clickable: true,
          },
        },

        1025: {
          pagination: {
            type: 'custom',
            renderCustom: function (swiper, current, total) {
              return `<span class="portfolio-swiper__number">${current}</span><span class="portfolio-swiper__slash">/</span><span class="portfolio-swiper__number">${total}</span>`;
            },
            clickable: false,
          },
        },
      },

      // Создание фракций
      on: {
        slideChange: () => {
          fraction.innerHTML = `<span class="portfolio-swiper__fraction-item">0${
            swiper.realIndex + 1
          }</span> <span class="portfolio-swiper__fraction-item">0${slideCount}</span>`;
        },
      },
    });

    isSwiperInitialized = true;
  }

  // Инициализируем свайпер
  initializeSwiper();

  // Функция, которая удаляет свайпер и заново его инициализирует
  function destroyAndReinitializeSwiper() {
    if (isSwiperInitialized) {
      swiper.destroy();
      isSwiperInitialized = false;
    }
    initializeSwiper();
  }

  // Функция, которая создаёт пагинацию и переинициализирует свайпер
  function createPagination(swiper, type, isClickable) {
    swiper.params.pagination.type = `${type}`;
    swiper.params.pagination.clickable = isClickable;
    swiper.pagination.render();
    destroyAndReinitializeSwiper();
  }

  // Функция throttle, которая используется для window.resize
  function throttle(callee, timeout) {
    let timer = null;

    return function perform(...args) {
      // Если таймер есть, то функция уже была вызвана,
      // и значит новый вызов следует пропустить.
      if (timer) return;

      // Если таймера нет, значит мы можем вызвать функцию:
      timer = setTimeout(() => {
        // Аргументы передаём неизменными в функцию-аргумент:
        callee(...args);

        // По окончании очищаем таймер:
        clearTimeout(timer);
        timer = null;
      }, timeout);
    };
  }

  // Обёрнутая в throtle функция createPagination()
  const throttledCreatePagination = throttle(createPagination, 800);

  // Обработчик изменения ширины экрана. Меняем тип пагинации, рендерим его,
  // удаляем нынешний свайпер и заново его инициализируем
  window.addEventListener('resize', () => {
    if (swiper !== null) {
      // Для мобильных устройств
      if (window.innerWidth < 1024) {
        if (swiper.params.pagination.type !== 'bullets') {
          throttledCreatePagination(swiper, 'bullets', true);
        }
      } else {
        // Для десктопа
        if (swiper.params.pagination.type !== 'custom') {
          throttledCreatePagination(swiper, 'custom', false);
        }
      }
    }
  });
}

export { loadHeaderSwiper, loadServicesSwiper, loadPortfolioSwiper };
