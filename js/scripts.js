$(document).ready(function(){
    
        

	//phone masked
	$('input[type="tel"]').mask("+7 (999) 999-99-99",{placeholder:"+7 (___) ___-__-__"});
	$('input[type="tel"]').on('click', function() {
		$(this).setCursorPosition(4);
	})
	$.fn.setCursorPosition = function(pos) {
	  this.each(function(index, elem) {
	    if (elem.setSelectionRange) {
	      elem.setSelectionRange(pos, pos);
	    } else if (elem.createTextRange) {
	      var range = elem.createTextRange();
	      range.collapse(true);
	      range.moveEnd('character', pos);
	      range.moveStart('character', pos);
	      range.select();
	    }
	  });
	  return this;
	};


    //btn tgl
    $('.js-btn-tgl').on('click', function () {
        $(this).toggleClass('active');
        return false;
    })

    //swipebox
    $('[data-swipebox]').swipebox();


    //frm counter   
    $('.js-counter .js-button-counter-minus').on('click', function () {
        var cnt = $(this).parents('.js-counter').find('.js-input-counter').val();
        cnt = parseInt(cnt);
        if (cnt > 0) {
            $(this).parents('.js-counter').find('.js-input-counter').val(cnt - 1);
        }
        return false;
    })
    $('.js-counter .js-button-counter-plus').on('click', function () {
        var cnt = $(this).parents('.js-counter').find('.js-input-counter').val();
        $(this).parents('.js-counter').find('.js-input-counter').val(cnt - 1 + 2);
        return false;
    })
    


    //toggle menu all
    $('.page-menu-wrap li ul').each(function () {
        $(this).parent().addClass('submenu');
    })
    $('.page-menu-wrap li a').on('click', function () {
        if ($(this).next('ul').length > 0) {
            if ($(window).innerWidth() < 1024) {
                if ($(this).next('ul').css('display') == 'block') {
                    $(this).next('ul').slideUp(200).parent('li').removeClass('open');
                } else {
                    $(this).next('ul').slideDown(200).parent('li').addClass('open');
                }
                return false;
            }
        }
    })
    

    
	
    //popup block
	$('.js-popup-wrap .js-btn-toggle').on('click', function() {
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$('body').removeClass('menu-show');
		} else {
			$('.js-popup-wrap:not(.no-close) .js-btn-toggle').removeClass('active');
			$(this).addClass('active');
			if ($(this).parent().hasClass('page-menu-wrap')) {
				$('body').addClass('menu-show');
			}
		}
		return false;
	})
	$('.js-popup-wrap .js-btn-close').on('click', function() {
		$(this).parents('.js-popup-wrap').children('.js-btn-toggle').removeClass('active');
		$('body').removeClass('menu-show');
		return false;
	})
	$(document).click(function(event) {
	    if ($(event.target).closest(".js-popup-block").length) return;
	    $('.js-popup-wrap:not(.no-close) .js-btn-toggle').removeClass('active');
	    $('body').removeClass('menu-show');
	    event.stopPropagation();
	});
	$('.js-popup-wrap').each(function() {
		if ($(this).hasClass('js-popup-select')) {
			if ($(this).find('.js-popup-block').find('.active').length>0) {} else {
				$(this).find('.js-popup-block').find('li').eq(0).children('a').addClass('active');
			}
			var currentSelect = $(this).find('.js-popup-block').find('.active').html();
			$(this).find('.js-btn-toggle').html(currentSelect);
		}
	})
	$('.js-popup-wrap.js-popup-select .js-popup-block a').on('click', function() {
		if ($(this).hasClass('active')) {} else {
			$(this).parents('.js-popup-wrap').find('.js-popup-block').find('.active').removeClass('active');
			$(this).addClass('active');
            $('.js-tab-block').removeClass('active');
            $('.js-tabs-nav').each(function() {
                $('.js-tab-block[data-tab*="'+$(this).find('.js-popup-block').find('.active').attr('data-tab')+'"]').addClass('active');
            })
		}
		$('.js-popup-wrap').each(function() {
			if ($(this).hasClass('js-popup-select')) {
				if ($(this).find('.js-popup-block').find('.active').length>0) {} else {
					$(this).find('.js-popup-block').find('li').eq(0).children('a').addClass('active');
				}
				var currentSelect = $(this).find('.js-popup-block').find('.active').html();
				$(this).find('.js-btn-toggle').html(currentSelect);
			}
		})
		$(this).parents('.js-popup-wrap').find('.js-btn-toggle').removeClass('active');
        
		return false;
	})


    //popups
    let popupCurrent;
    $('.js-popup-open').on('click', function () {
        $('.popup-outer-box').removeClass('active');
        $('body').addClass('popup-open');
        popupCurrent = $(this).attr('data-popup');
        $('.popup-outer-box[id="' + popupCurrent + '"]').addClass('active');
        return false;
    })
    $('.js-popup-close').on('click', function () {
        $('body').removeClass('popup-open');
        $('.popup-outer-box').removeClass('active');
        return false;
    })

    //content toggle action
    $('input[data-content]').each(function () {
        if ($(this).is(':checked')) {
            let selectContent = $(this).attr('data-content');
            $('.frm-content[data-content="' + selectContent + '"]').addClass('active');
        }
    })
    $('input[data-content]').on('click', function () {
        $('.frm-content.active').removeClass('active');
        $('input[data-content]').each(function () {
            if ($(this).is(':checked')) {
                let selectContent = $(this).attr('data-content');
                $('.frm-content[data-content="' + selectContent + '"]').addClass('active');
            }
        })
    })
    $('.btn[data-content]').on('click', function () {
        let dataContent = $(this).attr('data-content');
        $(this).attr('disabled', 'disabled');
        $('.frm-content[data-content="' + dataContent + '"]').slideDown(200);
        return false;
    })


    //datepicker
    $('.frm-field-datepicker input[type="text"]').datepicker({
        dateFormat: 'dd.mm.yy',
        dayNames: ["Воскресение", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
        dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
        monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
        firstDay: 1
    });

	//tabs
	$('.js-tabs-nav').each(function() {
		$('.js-tab-block[data-tab*="'+$(this).find('.active').attr('data-tab')+'"]').addClass('active');
	})
	$('.js-tabs-nav li a[data-tab]').on('click', function() {
		if ($(this).hasClass('active')) {} else {
			$('.js-tab-block').removeClass('active');
			$(this).parents('.js-tabs-nav').find('.active').removeClass('active');
			$(this).addClass('active');
			$('.js-tabs-nav').each(function() {
				$('.js-tab-block[data-tab*="'+$(this).find('.active').attr('data-tab')+'"]').addClass('active');
			})
		}
		return false;
	})
	


    //categories-slider-box
    if (!!$('.categories-slider-box').offset()) {
        $('.categories-slider-box .slider').slick({
            dots: true,
            slidesToShow: 6,
            variableWidth: false,
            infinite: true,
            adaptiveHeight: false,
            rows: 1,
            swipeToSlide: true,
            prevArrow: '<span class="btn-action-ico ico-arrow ico-arrow-prev"></span>',
            nextArrow: '<span class="btn-action-ico ico-arrow ico-arrow-next"></span>',
            responsive: [
                {
                    breakpoint: 1400,
                    settings: {
                        slidesToShow: 5,
                    }
                },
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 4,
                    }
                },
                {
                    breakpoint: 1024,
                    settings: {
                        variableWidth: true,
                    }
                },
            ]
        });
    }


    //catalog-slider-box
    if (!!$('.catalog-slider-box').offset()) {
        $('.catalog-slider-box .slider').slick({
            dots: false,
            slidesToShow: 5,
            variableWidth: false,
            infinite: true,
            adaptiveHeight: false,
            rows: 1,
            swipeToSlide: true,
            prevArrow: '<span class="btn-action-ico ico-arrow ico-arrow-prev"></span>',
            nextArrow: '<span class="btn-action-ico ico-arrow ico-arrow-next"></span>',
            responsive: [
                {
                    breakpoint: 1400,
                    settings: {
                        slidesToShow: 4,
                    }
                },
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 640,
                    settings: {
                        slidesToShow: 1,
                    }
                },
            ]
        });
    }
    $('.item-tile-catalog').on('click', '.button-tile-toggle', function() {
        $(this).parents('.item-tile-catalog').toggleClass('tile-active');
        return false;
    })
    
	
});