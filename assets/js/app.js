//var isMobile = /iPhone|iPod|iPad|Phone|Mobile|Android|hpwos/i.test(navigator.userAgent);
//var isPhone = /iPhone|iPod|Phone|Android/i.test(navigator.userAgent);
/* SHARED VARS */
var touch = false;

function showSidebar() {
    $('[data-icon-menu]').on('click', function(e) {
        e.preventDefault();	
        $('[data-header-sidebar]').addClass('show');
        $('[data-close-sidebar]').addClass('active');
    });
    $('[data-close-sidebar]').on('click', function(e) {	
        e.preventDefault();	
        $('[data-header-sidebar]').removeClass('show');
        $('[data-close-sidebar]').removeClass('active');
    });
}

function filter() {
    // Filter More Click
    $('[data-menu-more]').on('click', function(e) {
        e.preventDefault();
        if ($(this).hasClass('less')) {
            $(this).addClass("more").removeClass('less').html('More ...');
            $('.more-item').removeClass('show').addClass('hide');
        } else {
            $(this).addClass("less").removeClass('more').html('Close (X)');
            $('.more-item').removeClass('hide').addClass('show');
        }
    });
    // Filter Click
    $('[data-style]').on( 'click', function(e)  {
        e.preventDefault();
        $('[data-style]').removeClass("active");
        $(this).addClass("active");						
        var selected = '.'+$(this).data( "style" );

        $('.demo-preview-item').addClass("hide").removeClass("fadeIn animated");
        $(selected).removeClass("hide wow").addClass("fadeIn animated");
        $(selected).removeAttr("style");
    });
}

function stickyHeader() {
    if ($(window).scrollTop() > 60) {
        if (!$('[data-header]').hasClass('affix')) {
            $('[data-header]').addClass('affix');
        }
    } else {
        if ($('[data-header]').hasClass('affix')) {
            $('[data-header]').removeClass('affix');
        }
    }
}

function countInfo() {
    var initCount = function(){
        var info = $('[data-info]'),
            windownTop = $(window).scrollTop(),
            windownHeight = $(window).height();
        if(windownTop + windownHeight >= info.offset().top && windownTop <= info.offset().top + info.height()) {
            info.each(function() {
                if(!$(this).hasClass('active-count')){
                    $(this).addClass('active-count');
                    var number = $(this).find('[data-number]').data('number');
                    var suffix = $(this).data('info');
                    var timer = $(this).data('item-timer');
                    countDown($(this).find('[data-number]'), 0, number, suffix, timer);
                }
            });
        }
    }
    var countDown = function($this, first, number, suffix, timer){
        if(first <= number ){
            if (number == 5) {
                $this.html(first.toLocaleString());
            } else {
                $this.html(first.toLocaleString()+'+');
            }
            setTimeout (function() { countDown($this, first+suffix, number, suffix, timer); }, timer);
        } else {
            return false;
        }
    }
    initCount();
}

function countHome() {
    var initCount = function(){
        var info = $('[data-item-number]'),
            windownTop = $(window).scrollTop(),
            windownHeight = $(window).height();
        if(windownTop + windownHeight >= info.offset().top && windownTop <= info.offset().top + info.height()) {
            info.each(function() {
                if(!$(this).hasClass('active-count')){
                    $(this).addClass('active-count');
                    var number = $(this).data('item-number');
                    var suffix = $(this).data('item-suffix');
                    var timer = $(this).data('item-timer');
                    countDown($(this), 0, number, suffix, timer);
                }
            });
        }
    }
    var countDown = function($this, first, number, suffix, timer){
        if(first <= number ){
            $this.html(first.toLocaleString());
            setTimeout (function() { countDown($this, first+suffix, number, suffix, timer); }, timer);
        } else {
            return false;
        }
    }
    initCount();
}

function video() {
    var video = $('[data-video]'),
        windownTop = $(window).scrollTop(),
        windownHeight = $(window).height();
    if(windownTop + windownHeight >= video.offset().top && windownTop <= video.offset().top + video.height()) {
        video[0].play();
        if (!video.hasClass('played')) {
            video.addClass('played');
        }
    } else {
        if (video.hasClass('played')) {
            video.removeClass('played');
            video[0].pause();
        }
    }
}

function animateClick(){
	$('[data-menu-animate]').on( 'click', function(e)  {
        e.preventDefault();
        var data = $(this).data('menu-animate');
		$('html, body').animate({
            scrollTop: $('#'+data).offset().top - 100
        }, 1000);
	});	
}

function sliderTheme(){
    $('[data-slider-theme]').each(function() {
        var time = $(this).data('slider-theme');
        $(this).slick({
            lazyLoad: 'ondemand',
            pauseOnHover: false,
            autoplay: true,
            speed: 1000,
            autoplaySpeed: time,
            prevArrow: '<button class="slick-prev"><img src="assets/icon/icon-left.svg" alt="Previous"></button>',
            nextArrow: '<button class="slick-next"><img src="assets/icon/icon-right.svg" alt="Next"></button>',
            slidesToShow: 1,
            slidesToScroll: 1
        }); 
    });
}

function handleScrollTop() {
    var toTop = function(a){
        var b = $('[data-scroll-to-top]');
        if (a == "on") {
            b.addClass("on fadeInRight ").removeClass("off fadeOutRight"); 
        } else {
            b.addClass("off fadeOutRight animated").removeClass("on fadeInRight"); 
        }
    }
    $(window).on('scroll', function() {
        var b = $(this).scrollTop();
        var c = $(this).height();
        if (b > 0) { 
            var d = b + c / 2;
        } 
        else { 
            var d = 1 ;
        }    
        if (d < 1e3 && d < c) { 
            toTop("off");
        }
        else {
            toTop("on"); 
        }
    });  
    $('[data-scroll-to-top]').on( 'click', function(e)  {
        e.preventDefault();
        $('body,html').animate({scrollTop:0},800,'swing');
    });
}

$(document).on('ready', function() {
    $.support.touch = 'ontouchend' in document;

    if ($.support.touch) {
        touch = true;
        $('body').addClass('touch');
    } else {
        $('body').addClass('notouch');
    }

    if(window !== window.parent){
        var userAgent = window.navigator.userAgent;
        if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {
            window.open('https://themeforshop.github.io/everything-demo/', '_parent');
        }
    }

    wow = new WOW({
        boxClass: 'wow',
        animateClass: 'animated',
        offset: 100,
        mobile: true,
        live: true
    });
    wow.init();

    countHome();

    showSidebar();

    filter();

    animateClick();
    
    sliderTheme();

    handleScrollTop();

    //snow
    var ww = 0;
    var wh = 0;
    var maxw = 0;
    var minw = 0;
    var maxh = 0;
    var textShadowSupport = true;
    var xv = 0;
    var snowflakes = ["\u2744", "\u2745", "\u2746"];
    var prevTime;
    var absMax = 10;
    var flakeCount = 0;
    
    $(init);

    function init()
    {
        var detectSize = function ()
        {
            ww = $(window).width();
            wh = $(window).height();
            
            maxw = ww + 300;
            minw = -300;
            maxh = wh + 300;
        };
        
        detectSize();
        
        $(window).resize(detectSize);
        
        if (!$('body').css('textShadow'))
        {
            textShadowSupport = false;
        }
        
        /* Should work in Windows 7 /*
        if (/windows/i.test(navigator.userAgent))
        {
            snowflakes = ['*']; // Windows sucks and doesn't have Unicode chars installed
            //snowflakes = ['T']; //No FF support for Wingdings
        }
        */
        
        // FF seems to just be able to handle like 50... 25 with rotation
        // Safari seems fine with 150+... 75 with rotation
        var i = 50;
        while (i--)
        {
            addFlake(true);
        }
        
        prevTime = new Date().getTime();
        setInterval(move, 50);
    }

    function addFlake(initial)
    {
        flakeCount++;
        
        var sizes = [
            {
                r: 1.0,
                css: {
                    fontSize: 15 + Math.floor(Math.random() * 20) + 'px',
                    textShadow: '9999px 0 0 rgba(238, 238, 238, 0.5)'
                },
                v: 2
            },
            {
                r: 0.6,
                css: {
                    fontSize: 50 + Math.floor(Math.random() * 20) + 'px',
                    textShadow: '9999px 0 2px #eee'
                },
                v: 6
            },
            {
                r: 0.2,
                css: {
                    fontSize: 90 + Math.floor(Math.random() * 30) + 'px',
                    textShadow: '9999px 0 6px #eee'
                },
                v: 12
            },
            {
                r: 0.1,
                css: {
                    fontSize: 150 + Math.floor(Math.random() * 50) + 'px',
                    textShadow: '9999px 0 24px #eee'
                },
                v: 20
            }
        ];
    
        var $nowflake = $('<span class="winternetz">' + snowflakes[Math.floor(Math.random() * snowflakes.length)] + '</span>').css(
            {
                /*fontFamily: 'Wingdings',*/
                color: '#eee',
                display: 'block',
                position: 'fixed',
                background: 'transparent',
                width: 'auto',
                height: 'auto',
                margin: '0',
                padding: '0',
                textAlign: 'left',
                zIndex: 9999
            }
        );
        
        if (textShadowSupport)
        {
            $nowflake.css('textIndent', '-9999px');
        }
        
        var r = Math.random();
    
        var i = sizes.length;
        
        var v = 0;
        
        while (i--)
        {
            if (r < sizes[i].r)
            {
                v = sizes[i].v;
                $nowflake.css(sizes[i].css);
                break;
            }
        }
    
        var x = (-300 + Math.floor(Math.random() * (ww + 300)));
        
        var y = 0;
        if (typeof initial == 'undefined' || !initial)
        {
            y = -300;
        }
        else
        {
            y = (-300 + Math.floor(Math.random() * (wh + 300)));
        }
    
        $nowflake.css(
            {
                left: x + 'px',
                top: y + 'px'
            }
        );
        
        $nowflake.data('x', x);
        $nowflake.data('y', y);
        $nowflake.data('v', v);
        $nowflake.data('half_v', Math.round(v * 0.5));
        
        $('body').append($nowflake);
    }
    
    function move()
    {
        if (Math.random() > 0.8)
        {
            xv += -1 + Math.random() * 2;
            
            if (Math.abs(xv) > 3)
            {
                xv = 3 * (xv / Math.abs(xv));
            }
        }
        
        // Throttle code
        var newTime = new Date().getTime();
        var diffTime = newTime - prevTime;
        prevTime = newTime;
        
        if (diffTime < 55 && flakeCount < absMax)
        {
            addFlake();
        }
        else if (diffTime > 150)
        {
            $('span.winternetz:first').remove();
            flakeCount--;
        }
        
        $('span.winternetz').each(
            function ()
            {
                var x = $(this).data('x');
                var y = $(this).data('y');
                var v = $(this).data('v');
                var half_v = $(this).data('half_v');
                
                y += v;
                
                x += Math.round(xv * v);
                x += -half_v + Math.round(Math.random() * v);
                
                // because flakes are rotating, the origin could be +/- the size of the flake offset
                if (x > maxw)
                {
                    x = -300;
                }
                else if (x < minw)
                {
                    x = ww;
                }
                
                if (y > maxh)
                {
                    $(this).remove();
                    flakeCount--;
                    
                    addFlake();
                }
                else
                {
                    $(this).data('x', x);
                    $(this).data('y', y);

                    $(this).css(
                        {
                            left: x + 'px',
                            top: y + 'px'
                        }
                    );
                    
                    // only spin biggest three flake sizes
                    if (v >= 6)
                    {
                        $(this).animate({rotate: '+=' + half_v + 'deg'}, 0);
                    }
                }
            }
        );
    }
});

$(window).on('scroll', function() {
    // stickyHeader();
    countHome();
    countInfo();
    video();
});