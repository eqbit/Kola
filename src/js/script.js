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
    .on('afterChange', (event, slick, currentSlide) => {
      event.stopPropagation();
      state.letScroll = true;
      checkHeaderMenu(currentSlide);
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
  
  const $riverGallery = $('[data-river-tab-gallery]'),
    $riverContent = $('[data-river-tab-content]'),
    $riverHead = $('[data-river-tab-head]');
  
  $riverGallery.hide().eq(0).show();
  $riverContent.hide().eq(0).show();
  $riverHead.eq(0).addClass('active');
  
  $riverHead.on('click', function () {
    const $this = $(this);
  
    $riverHead.removeClass('active');
    $this.addClass('active');
  
    $riverContent.hide().eq($this.index()).fadeIn();
    $riverGallery.hide().eq($this.index()).fadeIn()
      .find('[data-gallery-slider]').slick('setPosition');
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
        event.stopPropagation();
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
        speed: 300,
        responsive: [
          {
            breakpoint: 1000,
            settings: {
              slidesToShow: 3,
              centerMode: true,
              fade: false,
              infinite: true
            }
          }
        ]
      });
  });
  
  $('[data-team-slider]').slick({
    slidesToShow: 4,
    infinite: false,
    prevArrow: $('[data-team-slider-prev]'),
    nextArrow: $('[data-team-slider-next]'),
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 3
        }
      }
    ]
  }).on('afterChange', function(event) {
    event.stopPropagation();
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
  });
  
  $('[data-club-view-slider]').on('click', function () {
    if (!$(this).is('.active')) {
      const $tab = $(this).closest('[data-club-tab-gallery]');
      $tab.find('[data-gallery-plan]').hide();
      $tab.find('[data-club-view-plan]').removeClass('active');
      $(this).addClass('active');
      $tab.find('[data-gallery-slider]').fadeIn().slick('setPosition');
      $tab.find('[data-gallery-info]').fadeIn();
    }
  });
  
  $('[data-club-view-plan]').on('click', function () {
    if (!$(this).is('.active')) {
      const $tab = $(this).closest('[data-club-tab-gallery]');
      $tab.find('[data-gallery-slider]').hide();
      $tab.find('[data-club-view-slider]').removeClass('active');
      $tab.find('[data-gallery-info]').hide();
      $(this).addClass('active');
      $tab.find('[data-gallery-plan]').fadeIn();
    }
  });
  
  $('[data-custom-select]').select2()
    .on('select2:open', function () {
      $('.select2-results__options').niceScroll();
    });
  
  $('[data-custom-select-no-search]').select2({
    minimumResultsForSearch: Infinity
  }).on('select2:open', function () {
    $('.select2-results__options').niceScroll();
  });
  
  let formData = {};
  
  const $dataHandle = $('[data-handle]');
  
  $dataHandle.on('change', function (e) {
    formData[e.target.name] = e.target.type === 'checkbox'
      ? e.target.checked
      : e.target.value;
  
    if(e.target.type !== 'checkbox') {
      checkFormdata();
    }
  });
  
  const $focusHandle = $('[data-focus-handle]');
  
  $focusHandle.on('focus', function() {
    $(this).closest('.input-container').addClass('has-focus');
  }).on('blur', function() {
    $(this).closest('.input-container').removeClass('has-focus');
  });
  
  const checkFormdata = () => {
    for(let key in formData) {
      if(!!formData[key]) {
        $(`[name=${key}]`).closest('.input-container').addClass('has-value');
      } else {
        $(`[name=${key}]`).closest('.input-container').removeClass('has-value');
      }
    }
  };
  
  function isEmail(email) {
    const regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }
  
  const $emailInput = $('[data-email-validation]');
  
  $emailInput.on('blur', function(e) {
    if(!isEmail(e.target.value)) {
      $(this).closest('.input-container').addClass('has-error');
    } else {
      $(this).closest('.input-container').removeClass('has-error');
    }
  });
  
  $emailInput.on('input change', function(e) {
    if($(this).closest('.input-container').is('.has-error')) {
      if(isEmail(e.target.value)) {
        $(this).closest('.input-container').removeClass('has-error');
      } else {
        $(this).closest('.input-container').addClass('has-error');
      }
    }
  });
  
  $('[data-form]').on('submit', e => {
    e.preventDefault();
    
    const $form = $(this);
    
    $form.find('[data-required]').each(function() {
      if(!formData[$(this).attr('name')]) {
        $(this).closest('.input-container').addClass('has-error');
      }
    });
    
    if($form.find('.has-error').length) return false;
    
    $.ajax({
      url: 'api.json',
      type: 'get',
      dataType: 'json',
      data: formData,
      success: () => {
        $('[data-form]').hide();
        $('[data-form-success]').fadeIn().removeClass('contacts-form-success--hidden');
      }
    });
  });
  
  $('[data-required]').on('change', e => {
    if(!$(e.target).is('[data-email-validation]')) {
      if(e.target.value) {
        $(e.target).closest('.has-error').removeClass('has-error');
      }
    }
  });
  
  $('[data-another-form]').on('click', function () {
    $('[data-form-success]').hide().addClass('contacts-form-success--hidden');
    $('[data-form]').fadeIn();
    formData = {};
    $('[data-form]').find('input').val('');
    $('[data-form]').find('.has-value').removeClass('has-value');
    $('[data-form]').find('[type=checkbox]').prop( "checked", false );
    $('[data-custom-select]').val(null).trigger('change');
    $('[data-custom-select-no-search]').val(null).trigger('change');
  });
  
  const $anchorLink = $('[data-anchor-link]');
  
  $anchorLink.on('click', function (e) {
    e.preventDefault();
  
    $pageSlider.slick('slickGoTo', $(this).index() + 1)
  });
  
  const checkHeaderMenu = currentSlide => {
    $anchorLink.removeClass('active');
    if(currentSlide - 1 >= 0) {
      $anchorLink.eq(currentSlide - 1).addClass('active');
    }
  };
  
  $('[data-show-scheme]').on('click', function () {
    $(this).hide();
    
    const $tab = $(this).closest('[data-river-tab-content]');
    
    $tab.find('[data-river-text]').hide();
    $tab.find('[data-river-scheme]').fadeIn();
    $tab.find('[data-show-text]').fadeIn();
  });
  
  $('[data-show-text]').on('click', function () {
    $(this).hide();
    
    const $tab = $(this).closest('[data-river-tab-content]');
    
    $tab.find('[data-river-scheme]').hide();
    $tab.find('[data-river-text]').fadeIn();
    $tab.find('[data-show-scheme]').fadeIn();
  });
});