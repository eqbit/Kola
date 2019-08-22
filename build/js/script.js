"use strict";

$(function () {
  var state = {
    delta: 0
  };
  var $pageSlider = $('[data-main-slider]');
  $pageSlider.on('init', function () {
    mouseWheel($pageSlider);
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
    state.delta += event.originalEvent.deltaY;

    if (state.delta > 100) {
      $slider.slick('slickNext');
      state.delta = 0;
    }

    if (state.delta < -100) {
      $slider.slick('slickPrev');
      state.delta = 0;
    }

    console.log(state.delta);
  }
});
//# sourceMappingURL=script.js.map
