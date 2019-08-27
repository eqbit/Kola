$(function () {
  $('body').addClass('document-loaded');
  
  let state = {
    letScroll: true
  };
  
  const $pageSlider = $('[data-main-slider]');
  $pageSlider
    .on('init', () => {
      mouseWheel($pageSlider);
    })
    .on('afterChange', function () {
      state.letScroll = true;
    })
    .slick({
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
    $(window).on('wheel', {$slider: $slider}, mouseWheelHandler);
  }
  
  function mouseWheelHandler(event) {
    const $slider = event.data.$slider;
    
    if (event.originalEvent.deltaY > 0) {
      changePageSlide('down', $slider);
    } else {
      changePageSlide('up', $slider);
    }
  }
  
  function changePageSlide(direction, $slider) {
    if (!state.letScroll)
      return;
    
    if (direction === 'up') {
      $slider.slick('slickPrev');
    } else {
      $slider.slick('slickNext');
    }
    
    state.letScroll = false;
  }
  
  $('[data-tabs]').each(function () {
    const $tabsContainer = $(this);
    
    $tabsContainer.find('[data-tab-head]').first().addClass('active');
    $tabsContainer.find('[data-tab-content]').hide().eq(0).show();
  });
  
  $('[data-tab-head]').click(function () {
    if (!$(this).is('.active')) {
      const $tabsContainer = $(this).closest('[data-tabs]');
      $tabsContainer.find('[data-tab-content]').hide().eq($(this).index()).fadeIn();
      $tabsContainer.find('[data-tab-head]').removeClass('active');
      $(this).addClass('active');
    }
  });
  
  const isMobile = function () {
    return $(window).width() < 767;
  };
  
  const isTablet = function () {
    return $(window).width() < 999 && $(window).width() > 767;
  };
  
  const isWideScreen = function () {
    return $(window).width() > 1440;
  };

  
  const $commonSliders = $('[data-gallery-slider]');

  $commonSliders.each(function () {
    const $slider = $(this);

    $slider
      .on('init reInit afterChange', (event, slick, currentSlide) => {
        currentSlide = (currentSlide ? currentSlide : 0) + 1;
        $slider.parent().find('[data-gallery-slider-number]').html(`${currentSlide} <span style="opacity: .5">/ ${slick.slideCount}</span>`);

        const $slides = slick.$slides,
          title = $slides.eq(currentSlide - 1).find('[data-caption').data('caption');

        $slider.parent().find('[data-gallery-slider-title]').text(title);
      })
      .slick({
        dost: false,
        infinite: false,
        slidesToShow: 1,
        prevArrow: $slider.parent().find('[data-gallery-slider-prev]'),
        nextArrow: $slider.parent().find('[data-gallery-slider-next]'),
        fade: true,
        speed: 100
      });
  });

  $('[data-team-slider]').slick({
    slidesToShow: 4,
    infinite: false,
    prevArrow: $('[data-team-slider-prev]'),
    nextArrow: $('[data-team-slider-next]')
  });

  const $clubGallery = $('[data-club-tab-gallery]'),
      $clubContent = $('[data-club-tab-content]'),
      $clubHead = $('[data-club-tab-head]');

  $clubGallery.hide().eq(0).show();
  $clubContent.hide().eq(0).show();
  $clubHead.eq(0).addClass('active');

  $clubHead.on('click', function () {
    const $this = $(this);

    $clubHead.removeClass('active');
    $this.addClass('active');

    $clubContent.hide().eq($this.index()).fadeIn();
    $clubGallery.hide().eq($this.index()).fadeIn()
        .find('[data-gallery-slider]').slick('setPosition');
  })
  
  $('[data-club-view-slider]').on('click', function () {
    if(!$(this).is('.active')) {
      const $tab = $(this).closest('[data-club-tab-gallery]')
      $tab.find('[data-gallery-plan]').hide();
      $tab.find('[data-club-view-plan]').removeClass('active');
      $(this).addClass('active');
      $tab.find('[data-gallery-slider]').fadeIn().slick('setPosition');
      $tab.find('[data-gallery-info]').fadeIn();
    }
  });
  
  $('[data-club-view-plan]').on('click', function () {
    if(!$(this).is('.active')) {
      const $tab = $(this).closest('[data-club-tab-gallery]')
      $tab.find('[data-gallery-slider]').hide();
      $tab.find('[data-club-view-slider]').removeClass('active');
      $tab.find('[data-gallery-info]').hide();
      $(this).addClass('active');
      $tab.find('[data-gallery-plan]').fadeIn();
    }
  });

  $('[data-custom-select]').select2()
      .on("select2:open", function () {
        $('.select2-results__options').niceScroll();
      });

  $('[data-custom-select-no-search]').select2({
    minimumResultsForSearch: Infinity
  }).on("select2:open", function () {
    $('.select2-results__options').niceScroll();
  });
});