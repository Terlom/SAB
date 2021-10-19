/*--------------------------SCROLLING-PLUGIN-By-Roman-S-----------------------------------*/
(function($){

    $.fn.scrollToSection = function(options){

        options = $.extend({
            scrollSpeed:700,
            headerSize:0,
            buttons: false,
            navigation:false,
            sectionSelector:'section'
        },options);

        var canScroll = true;
        var pageHeight = $('html').height();
        var $this = this.attr('id');
        var scrollableSections = $('#'+$this).children().filter(options.sectionSelector);
        var navigationItems;
        var activeScreen = 0;


        var controls = new Object();

        controls.button =   "<div class='scrollToSection-Controls'>" +
                                "<div class='scrollToSection-Control' data-control='1'>" +
                                "</div>" +
                                "<div class='scrollToSection-Control' data-control='-1'>" +
                                "</div>" +
                            "</div>";

        var navigation = new Object();

        navigation.list = $("<ul class='screen-nav'></ul>");

        init();

        getSectionArray($this);



        function init(){
            $('html, body').animate({
                scrollTop:  $(scrollableSections[activeScreen]).offset().top - options.headerSize
            },options.scrollSpeed);

            builder();
        }

        function goToSection(){
            if($(scrollableSections[activeScreen]).offset()){
                $('html, body').animate({
                    scrollTop:$(scrollableSections[activeScreen]).offset().top - options.headerSize
                },options.scrollSpeed);
                $('.screen-nav li').removeClass('active');
                $(navigationItems[activeScreen]).addClass('active');
                if($(scrollableSections[activeScreen]).hasClass('another__color')){
                    $('.screen-nav').addClass('custom__theme');
                }else{
                    $('.screen-nav').removeClass('custom__theme');
                }
            }
        }

        function getSectionArray($this){
            scrollableSections = $('#'+$this).children().filter(options.sectionSelector);
            // console.log("section array updated");
        }

        /*-----------------------------NAVIGATION FUNCTIONS-----------------------------*/

        function builder(){
            buildButton();
            buildNavigation()
        }
        function buildButton(){
            if(options.buttons){
                $('#'+$this).append(controls.button)
            }
            else{
                return false
            }
        }
        function buildNavigation(){
            if(options.navigation){
                scrollableSections.each(function(key){
                    navigation.list.append('<li data-section="'+key+'" ></li>')
                });
                $('#'+$this).append(navigation.list);
                navigationItems = navigation.list.children().filter("li");
            }
            else{
                return false
            }
        }

        //-----------------------------MOUSE-BIND-EVENTS---------------------------------

        $(window).bind('mousewheel DOMMouseScroll MozMousePixelScroll', function(event) {

            var dynamicHeight = $('html').height();
            if(pageHeight != dynamicHeight) {
                getSectionArray($this);
                pageHeight = dynamicHeight;
            }
            delta = parseInt(event.originalEvent.wheelDelta || -event.originalEvent.detail);
            if(canScroll){
                canScroll = false;
                setTimeout(function() {
                    canScroll = true;
                }, options.scrollSpeed + 100);
                if (delta >= 0) {
                    activeScreen--;
                    goToSection();
                } else {
                    activeScreen++;
                    goToSection();
                }
            }
        });

        //-----------------------------KEY-BOARD-BIND-EVENTS----------------------------

        $(document).keydown(function(e){
            if(canScroll){
                canScroll = false;
                setTimeout(function() {
                    canScroll = true;
                }, options.scrollSpeed + 100);
                if (e.keyCode == 37 || e.keyCode == 38) {
                    activeScreen--;
                    goToSection();
                    return false;
                }
                if (e.keyCode == 39 || e.keyCode == 40) {
                    activeScreen++;
                    goToSection();
                    return false;
                }
            }
        });

        //-----------------------------CONTROLS-BINDING----------------------------


        $('#'+$this).on('click','[data-section]',function(){
            console.log(activeScreen);
            if(canScroll) {
                canScroll = false;
                setTimeout(function () {
                    canScroll = true;
                }, options.scrollSpeed + 100);
                    activeScreen = $(this).attr('data-section');
                    goToSection();
            }
        });

        $('#'+$this).on('click','.scrollToSection-Control',function(){
            if(canScroll) {
                canScroll = false;
                setTimeout(function () {
                    canScroll = true;
                }, options.scrollSpeed + 100);
                if ($(this).attr('data-control') < 0) {
                    activeScreen--;
                    goToSection();
                    return false;
                } else {
                    activeScreen++;
                    goToSection();
                    return false;
                }
            }
        });

        var ts;

        $(window).bind('touchmove', function (e){
            e.preventDefault();
        });
        $(window).bind('touchstart', function (e){
            ts = e.originalEvent.touches[0].clientY;
        });

        $(window).bind('touchend', function (e){
            var te = e.originalEvent.changedTouches[0].clientY;
            if(canScroll) {
                canScroll = false;
                setTimeout(function () {
                    canScroll = true;
                }, options.scrollSpeed + 100);
                if (ts > te + 5) {
                    activeScreen++;
                    goToSection();
                } else if (ts < te - 5) {
                    activeScreen--;
                    goToSection();
                }
            }
        });


    };
    return this;
})(jQuery);