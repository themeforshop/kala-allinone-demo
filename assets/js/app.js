//var isMobile = /iPhone|iPod|iPad|Phone|Mobile|Android|hpwos/i.test(navigator.userAgent);
//var isPhone = /iPhone|iPod|Phone|Android/i.test(navigator.userAgent);
/* SHARED VARS */
var touch = false;

// handles Animate
function dataAnimate() {
    $('[data-animate]').each(function() {

        var $toAnimateElement = $(this);

        var toAnimateDelay = $(this).attr('data-delay');

        var toAnimateDelayTime = 0;

        if (toAnimateDelay) {
            toAnimateDelayTime = Number(toAnimateDelay);
        } else {
            toAnimateDelayTime = 200;
        }

        if (!$toAnimateElement.hasClass('animated')) {

            $toAnimateElement.addClass('not-animated');

            var elementAnimation = $toAnimateElement.attr('data-animate');

            $toAnimateElement.appear(function() {

                setTimeout(function() {
                    $toAnimateElement.removeClass('not-animated').addClass(elementAnimation + ' animated');
                }, toAnimateDelayTime);

            }, {
                accX: 0,
                accY: -80
            }, 'easeInCubic');

        }

    });
}

function animateclick(){
	$(".menu-demo").click(function() {
		$('html, body').animate({
				scrollTop: $(".demoTheme-layout").offset().top 
			}, 1000);
		return false;
		});
		$(".menu-features").click(function() {
		$('html, body').animate({
				scrollTop: $(".featuresTheme-layout").offset().top 
			}, 1000);
		return false;
	});	
}

jQuery(document).ready(function($) {
    /* DETECT PLATFORM */
    $.support.touch = 'ontouchend' in document;

    if ($.support.touch) {
        touch = true;
        $('body').addClass('touch');
    } else {
        $('body').addClass('notouch');
    }

    /* Handle Animate */
	if (($(window).innerWidth() >= 1200) && (touch == false)) {
        dataAnimate();
    } else {
        $('.not-animated').css("opacity", "1");
    }
	animateclick();
});
