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

  $('[data-tabs]').each(function () {
    var $tabsContainer = $(this);
    $tabsContainer.find('[data-tab-head]').first().addClass('active');
    $tabsContainer.find('[data-tab-content]').hide().eq(0).show();
  });
  $('[data-tab-head]').click(function () {
    if (!$(this).is('.active')) {
      var $tabsContainer = $(this).closest('[data-tabs]');
      $tabsContainer.find('[data-tab-content]').hide().eq($(this).index()).fadeIn();
      $tabsContainer.find('[data-tab-head]').removeClass('active');
      $(this).addClass('active');
    }
  });

  var isMobile = function isMobile() {
    return $(window).width() < 767;
  };

  var isTablet = function isTablet() {
    return $(window).width() < 999 && $(window).width() > 767;
  };

  var isWideScreen = function isWideScreen() {
    return $(window).width() > 1440;
  };

  var $commonSliders = $('[data-gallery-slider]');
  $commonSliders.each(function () {
    var $slider = $(this);
    $slider.on('init reInit afterChange', function (event, slick, currentSlide) {
      currentSlide = (currentSlide ? currentSlide : 0) + 1;
      $slider.parent().find('[data-gallery-slider-number]').html("".concat(currentSlide, " <span style=\"opacity: .5\">/ ").concat(slick.slideCount, "</span>"));
      var $slides = slick.$slides,
          title = $slides.eq(currentSlide - 1).find('[data-caption').data('caption');
      $slider.parent().find('[data-gallery-slider-title]').text(title);
    }).slick({
      dost: false,
      infinite: false,
      slidesToShow: 1,
      prevArrow: $slider.parent().find('[data-gallery-slider-prev]'),
      nextArrow: $slider.parent().find('[data-gallery-slider-next]')
    });
  });
});
//# sourceMappingURL=script.js.map
