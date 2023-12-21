# Спринт-проект Сити-Про

Ссылка на сайт — https://truelivesey.github.io/cityPro

## Информация о разработке

- В качестве сборщика файлов использовалась комбинация Gulp и Webpack со множеством дополнительных плагинов для обработки html, стилей, js-кода и графики. Также в работе применялся препроцессор sass.
- Html код написан с использованием БЭМ и проверен на валидаторе. Он разбит на множество секций, который располагаются в соответствующей папке.
- Js-код поделён на модули, каждый из которых представляет собой функцию, вызванную в основном main.js. Были написаны функции для бургер-меню, модальных окон (десктопной и мобильной версии), скрытых текстов, фокуса, счётчика слайдов в хедере, кнопки "наверх" и другие...
- Для оптимизации были сжаты картинки (использовался тег picture с форматом webp, для этого все картинки были обработаны) и шрифты (удалены все лишние символы).
- Была проведена работа по доступности. Проставлены aria-label там, где это необходимо.
- Svg-графика в основном расположена в отдельном файле sprite.svg, но часть используется в качестве фона (свойство background) или вынесена в основной документ, чтобы была возможность отображать градиенты.
- Все интерактивные элементы стилизованы.
- Сайт полностью адаптивный.

## Библиотеки

- **Swiper** — слайдер с большим функционалом
- **Just-validate** — валидация форм.
- **Inputmask** — создание маски для номера телефона в форме.
- **Redom** — упрощенное создание DOM-элементов.
- **Moderniz-custom** — определение поддержки браузером webp, чтобы использовать его для фоновых изображений в стилях.

## Установка

1. Установить пакеты и зависимости комнадой **npm i**
2. Собрать gulp-сборку командой **gulp**

## Тестирование

Сайт протестирован в браузерах:

- Google Chrome
- Mozilla Firefox
- Opera
- Яндекс.Браузер
- Vivaldi
- Microsoft Edge

**IE не поддерживается**

Данные lighthouse:

1. Perfomance: 96
2. Accessibility: 92
3. Best practice: 100
4. SEO: 90