jQuery(document).ready(function($) {
		$('.menu').mobileMenu({
			defaultText: 'Navigate to...',
			className: 	 'select-menu',
			subMenuDash: '&nbsp;&nbsp;&ndash;'
		});
		
		$('#wp-calendar td:not(#next, #prev):has(a)').addClass('cal_has_posts');
		
		/*Fancy Box*/
		$('article.format-image .entry-content a img').each(function (i) {
			$(this).parent('a').addClass('fancybox');
		});
		
		if ($(".fancybox").length > 0) {
			$(".fancybox").fancybox({
				openEffect		 : 'elastic',
				closeEffect		 : 'elastic',
				openSpeed  		 : 250,
				closeSpeed 	 	 : 250,
				width 		 	 : 800,
				height 		 	 : 600,
				autoCenter 		 : true,
				autoSize		 : true,
				preload   		 : true,
				maxWidth 		 : 1024,
				maxHeight 		 : 768,
				'hideOnContentClick': true,
				helpers : {
					overlay : {
						css : {
							'background' : 'rgba(0, 0, 0, 0.85)'
						}
					}
				}
				
		});
		}
		
		$('#back-top a').click(function () {
			$('body,html').animate({ scrollTop: 0}, 850)
			return false;
		});
	
		$('.menu li:has(ul)').mobileMenuDropdown();
		$(window).resize();
		
		if ($('.resp_full_width_menu').length > 0){
			var respMenuMaxHeight = $(window).height()/2 + 50;
			$('.resp_full_width_menu .site-header .menu_wrapper').css({'max-height' : respMenuMaxHeight});
			$('.resp_full_width_menu button.navbar-toggle').live('click', function(){
				if ($(this).hasClass('collapsed')){
					$('.resp_full_width_menu .menu_wrapper').fadeIn('slow').removeClass('collapse');
					$(this).removeClass('collapsed');
				} else {
					$('.resp_full_width_menu .menu_wrapper').fadeOut('slow').addClass('collapse');
					$(this).addClass('collapsed');
				}
			});
		}
		
		$('.resp_full_width_menu .language_switcher .current').live('click', function(e) {
			var el = $(this);
			var child = el.find('#lang-select-popup');
			if (child.hasClass('active')) {
				child.removeClass('active').hide().css({'margin':'20px 0 0 0','opacity':0,'visibility':'hidden'});
			} else {
				child.addClass('active').show().css({'margin':'1px 0 0 0','opacity':1,'visibility':'visible'});
			}
		});
		
		fixed_header();
});

jQuery(window).bind('resize', function() { 
	vhGroupClass   = jQuery('.responsive #page-header .container header .header-hgroup').data('originalstyle');
	vmWrapperClass = jQuery('.responsive #page-header .container header .menu-wrapper').data('originalstyle');
	
	if (jQuery(window).width() <= 767)	 {
		if (jQuery('.responsive .cart-button').length > 0) {
			jQuery('.responsive .select-menu').css({'max-width':'80%', 'margin' : '6px 0 25px 0'});		
		} 
		jQuery('.responsive #page-header .container header .header-hgroup').removeClass(vhGroupClass).addClass('center-pos');
		jQuery('.responsive #page-header .container header .menu-wrapper').removeClass(vmWrapperClass).addClass('center-pos');
	} else {
		jQuery('.select-menu').css({'max-width':'none', 'margin' : '0 0 25px 0'});		
			
		jQuery('.responsive #page-header .container header .header-hgroup').removeClass('center-pos').addClass(vhGroupClass);
		jQuery('.responsive #page-header .container header .menu-wrapper').removeClass('center-pos').addClass(vmWrapperClass);
	}
	
	autoWidthMenu();
	jQuery(window).scroll();
	fixed_header();
	
});

function autoWidthMenu () {
	var vElemsWidth = 0;
	if (jQuery('.menu-wrapper').hasClass('center-pos')) {
		if ((jQuery('.cart-button').length > 0) || (jQuery('#header_language_select').length > 0)) {
			if (jQuery('.cart-button').length > 0){
				vElemsWidth += jQuery('.cart-button').outerWidth(true);
			}
			if (jQuery('#header_language_select').length > 0){
				vElemsWidth += jQuery('#header_language_select').outerWidth(true);
			}
			vElemsWidth += jQuery('.site-navigation').outerWidth() + 2;
		} else {
			vElemsWidth = jQuery('.site-navigation').outerWidth() + 20;
		}		
		jQuery('.menu-wrapper').css({'max-width': vElemsWidth + 'px'})
	} else {
		jQuery('.menu-wrapper').css({'max-width': 'none'})
	}
}

jQuery(window).bind('scroll', function() { 
	var is_sufficient_height = false;
	var vContentHeight 	 = jQuery('body').outerHeight();
	var vWinHeight  	 = jQuery(window).height();
	var vHeaderContainer = jQuery('.head-container').outerHeight();
	
	if ((vContentHeight - vWinHeight) > 0) {
		if (((vContentHeight - vWinHeight) - (vHeaderContainer+125)) > vHeaderContainer) {
			is_sufficient_height = true;
		}
	}
	
	if ((ThGlobal.is_fixed_header != -1) && (is_sufficient_height)) {
		if ((jQuery(this).scrollTop() + 50) > vHeaderContainer) {
			if (jQuery('#wpadminbar').length > 0) {
				jQuery(".head-container").addClass('fixed is_indent'); 
			} else {
				jQuery(".head-container").addClass('fixed'); 
			}  
		} else { 
			jQuery(".head-container").removeClass('fixed is_indent');
		}
	} else {
			jQuery(".head-container").removeClass('fixed is_indent');
	}
	
	if(jQuery(window).scrollTop() + jQuery(window).height() == jQuery(document).height()) {
		jQuery('#back-top').fadeIn('slow'); 
	} else {
		jQuery('#back-top').fadeOut('slow');
	}
});

function fixed_header(){
	if (ThGlobal.is_fixed_header == 1){
		jQuery('#page').css({'margin-top':jQuery(".head-container").outerHeight()});
	} else {
		jQuery('#page').css({'margin-top':0});
	}
}