"use strict";

$(function () {
  $('body').addClass('document-loaded');
  var state = {
    letScroll: true
  };
  var $pageSlider = $('[data-main-slider]');
  $pageSlider.on('init', function () {
    mouseWheel($pageSlider);
  }).on('afterChange', function () {
    state.letScroll = true;
  }).slick({
    vertical: true,
    dots: true,
    appendDots: '.pages-dots',
    infinite: false,
    arrows: false,
    verticalSwiping: true
  });
  $('[data-next-page]').on('click', function () {
    $pageSlider.slick('slickNext');
  });

  function mouseWheel($slider) {
    $(window).on('wheel', {
      $slider: $slider
    }, mouseWheelHandler);
  }

  function mouseWheelHandler(event) {
    var $slider = event.data.$slider;

    if (event.originalEvent.deltaY > 0) {
      changePageSlide('down', $slider);
    } else {
      changePageSlide('up', $slider);
    }
  }

  function changePageSlide(direction, $slider) {
    if (!state.letScroll) return;

    if (direction === 'up') {
      $slider.slick('slickPrev');
    } else {
      $slider.slick('slickNext');
    }

    state.letScroll = false;
  }
});
//# sourceMappingURL=script.js.map
