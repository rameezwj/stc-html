jQuery(window).on('load', function(){

	// once page gets loaded, slide up & fade in the content
		TweenMax.fromTo('.anim_slide_up > div', 2, {y: 300, opacity: 0}, {y: 0, opacity: 1, transformOrigin: 'center bottom', ease: Power4.easeInOut, delay: 0});

		setTimeout(function(){
			// jQuery('.anim_slide_up  > div').removeAttr('style');
		}, 2000)
	// once page gets loaded, slide up & fade in the content

	/*// if users are on innerpage, hide vertical wipes on page load
	  if(jQuery('body').hasClass('page_inner')){
	  	TweenMax.to('.lds-ring', .3, {scale: .8, opacity: 0});
	    TweenMax.staggerFromTo('.vertical_wipes_wrapper > div.vwipes', .7, {left: 0, transformOrigin: 'center top'}, {left: '100%', transformOrigin: 'center top', ease: Power4.easeInOut}, .1);
	    TweenMax.to('.vertical_wipes_wrapper', 0, {display: 'none', delay: 3});
	  }
	// if users are on innerpage, hide vertical wipes on page load*/
	

	// if its not mobile device, check last play video configutation and proceed accordingly
	if(jQuery(window).width()>=768){
	  var selected_cat = localStorage.getItem("stc_selected_category");
	  var last_played_video = localStorage.getItem("stc_last_played_video");

		// console.log(last_played_video+'---'+selected_cat)
	  
	  // if(true){
	  if(last_played_video==null && selected_cat==null){
	  }
	  else if(last_played_video!=selected_cat){
	  	localStorage.setItem("stc_last_played_video", selected_cat);
	  	
	  	// TweenMax.set('.anim_slide_up > div', {y: 1000, opacity: 0});

	  	var video = document.getElementById('category_video');
	  	
	  	video.play();
	  	
	  	video.onended = function() {
	  		TweenMax.to('.video_wrapper', 2, {top: '-80%', scale: .7, 'clip-path': 'inset(0 0 80% 0)', transformOrigin: 'center top', scale: 1, ease: Power4.easeInOut});
	  		TweenMax.fromTo('.anim_slide_up > div', 3, {y: 500, opacity: 0}, {y: 0, opacity: 1, transformOrigin: 'center bottom', ease: Power4.easeInOut, delay: -.9});
	  	};
	  }
	}


	// highlight current pages submenu + goto next page functionality
		// get curent page url
		var page_url = window.location.href.split('.html');
		page_url = page_url[0].split('/');

		// highlight current page menu item
		jQuery('.sub_menu_wrapper .submenu_content a').removeClass('active');
		jQuery(`a[data-page-link=${page_url[page_url.length-1]}]`).addClass('active');

		
		if(jQuery(window).width()<=767){
			var next_page_text = 'Next';
			var previous_page_text = 'Previous';

			if(jQuery('#btn_gotoNext_page').length)
				jQuery('#btn_gotoNext_page').html(next_page_text);

			if(jQuery('#btn_gotoPrev_page').length)
				jQuery('#btn_gotoPrev_page').html(previous_page_text)
		}

		var page_switching_triggered = false;

		jQuery('.inner_page_navigation > div a#btn_gotoNext_page').on('click', function(e){
			e.preventDefault();
			var goto_page = jQuery(this).attr('data-goto-page-link');

			if(goto_page!='' && (page_switching_triggered)){
				page_switching_triggered = false;
				jQuery(`a[data-page-link=${goto_page}]`).trigger('click');
			}			
		});

		jQuery('.inner_page_navigation > div a#btn_gotoPrev_page').on('click', function(e){
			e.preventDefault();
			var goto_page = jQuery(this).attr('data-goto-page-link');

			if(goto_page!='' && (page_switching_triggered)){
				page_switching_triggered = true;
				jQuery(`a[data-page-link=${goto_page}]`).trigger('click');
			}			
		});

		setTimeout(function(){
			page_switching_triggered = true;

			// mousewheel
			  document.addEventListener('wheel', function(e) {
					if($(window).scrollTop() + $(window).height() == $(document).height()) {
						// jQuery(`#btn_gotoNext_page`).trigger('click');
					}
					// e.preventDefault();
			  }, { passive: false })
			// mousewheel
	}, 3000)


	// slide up bottom navigation after few seconds, on inner pages
		setTimeout(function(){
			TweenMax.to('.inner_page_navigation', 1, {bottom: 0, ease: Power4.easeInOut});
		}, 2000);
	// slide up bottom navigation after few seconds, on inner pages
});


jQuery('document').ready(function(){

	// if theres no value set for stc_selected_category & stc_last_played_video, remove video section from the DOM
		var selected_cat = localStorage.getItem("stc_selected_category");
		var last_played_video = localStorage.getItem("stc_last_played_video");

		if((selected_cat==null && last_played_video==null) || (last_played_video==selected_cat) || jQuery(window).width()<=767){
			jQuery('.video_wrapper').remove();
		}
	// if theres no value set for stc_selected_category & stc_last_played_video, remove video section from the DOM


	// inner submenu
		jQuery('.inner_submenu_items li').click(function(){
	    var goto_id = jQuery(this).attr('data-submenu-inner');
	    // var goto_name = jQuery(this).html();

	    // jQuery('.inner_submenu_wrapper span').html(goto_name);
	    jQuery('html, body').animate({
        scrollTop: jQuery(`#${goto_id}`).offset().top
	    }, 1500);

	    setTimeout(function(){
        jQuery('.inner_submenu_items').slideUp(500);
        jQuery('.inner_submenu_wrapper a').removeClass('cross');
	    }, 1000);
		});

		jQuery('#close_inner_submenu').click(function(){
	    jQuery('.inner_submenu_items').slideToggle(500);
	    jQuery('.inner_submenu_wrapper a').toggleClass('cross');
		});
	// inner submenu
})



if(jQuery('body').hasClass('landing_screen')){
}
