import Swiper from 'swiper';
import { Pagination, Navigation, Autoplay, EffectCreative } from 'swiper/modules';
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
      el: '.header-swiper__pagination',
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
    modules: [Pagination],

    breakpoints: {
      320: {
        slidesPerView: 1,
        loop: true,
        spaceBetween: 30,
        pagination: {
          el: '.services-swiper__pagination',
          clickable: true,
        },
      },

      768: {
        slidesPerView: 'auto',
        loop: false,
        pagination: 'none',
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

function loadPortfoilioSwiper() {
  const portfolio = document.getElementById('portfolio');
  const fraction = document.getElementById('fraction');
  const slides = portfolio.querySelectorAll('.swiper-slide');
  const slideCount = slides.length;
  fraction.innerHTML = `<span class="portfolio-swiper__fraction-item">01</span> <span class="portfolio-swiper__fraction-item">0${slideCount}</span>`;

  const swiper = new Swiper('.portfolio-swiper', {
    modules: [Pagination, Navigation, EffectCreative],

    slidersPerView: 1,
    speed: 1000,
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
    loop: true,

    navigation: {
      nextEl: '.portfolio-swiper__next',
      prevEl: '.portfolio-swiper__prev',
    },

    pagination: {
      el: '.portfolio-swiper__pagination',
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

    on: {
      slideChange: () => {
        fraction.innerHTML = `<span class="portfolio-swiper__fraction-item">0${
          swiper.realIndex + 1
        }</span> <span class="portfolio-swiper__fraction-item">0${slideCount}</span>`;
      },
    },
  });
}

export { loadHeaderSwiper, loadServicesSwiper, loadPortfoilioSwiper };
