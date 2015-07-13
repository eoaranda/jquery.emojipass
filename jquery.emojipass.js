/*!
 * Author: Omar Aguirre
* jQuery - emojipass v0.1
 * Licensed under the MIT license
 */
(function($) {
    $.fn.emojiPass = function(options) {
        var settings = $.extend({
            stylesheet : 'jquery.emojipass.css', //if not found or not existing please set to null
            directory   : 'emoji/',
            closeimage : 'imgs/close.png',
            inputpassheight : '40',
            imgsize: '35',
            imghovercolor: '#E0ECF8',
            popupwidth:'300px',
            popupheigth:'220px'
        }, options);
        var plugin = this; //make main div accesible
        var wrapper = $(this).attr('id') +"-wrapper";
        var imgs_dictionary='[{"img":"icon_1.png","val":"\u2709"},{"img":"icon_2.png","val":"\u26a1"},{"img":"icon_3.png","val":"\ud83d\udebd"},{"img":"icon_4.png","val":"\ud83c\udf34"},{"img":"icon_5.png","val":"\ud83c\udf88"},{"img":"icon_6.png","val":"\u2712"},{"img":"icon_7.png","val":"\u2b50"},{"img":"icon_8.png","val":"\ud83d\udcbe"},{"img":"icon_9.png","val":"\u2764"},{"img":"icon_11.png","val":"\u2600"},{"img":"icon_13.png","val":"\ud83d\ude97"},{"img":"icon_14.png","val":"\u2708"},{"img":"icon_15.png","val":"\ud83c\udfb1"},{"img":"icon_16.png","val":"\u2702"},{"img":"icon_17.png","val":"\u231b"},{"img":"icon_18.png","val":"\ud83c\udf84"},{"img":"icon_19.png","val":"\ud83d\udc0d"},{"img":"icon_20.png","val":"\ud83d\udc3c"},{"img":"icon_21.png","val":"\ud83d\udca9"},{"img":"icon_22.png","val":"\ud83d\udc7b"},{"img":"icon_23.png","val":"\ud83c\udf35"},{"img":"icon_24.png","val":"\ud83c\udfb8"},{"img":"icon_25.png","val":"\u270f"},{"img":"icon_26.png","val":"\ud83d\udeb2"},{"img":"icon_27.png","val":"\ud83c\udf69"},{"img":"icon_28.png","val":"\u2615"},{"img":"icon_30.png","val":"\ud83d\udc33"},{"img":"icon_31.png","val":"\ud83d\udc22"},{"img":"icon_32.png","val":"\ud83d\udc18"},{"img":"icon_33.png","val":"\ud83d\ude80"},{"img":"icon_34.png","val":"\ud83d\udc7d"},{"img":"icon_35.png","val":"\ud83d\ude21"},{"img":"icon_36.png","val":"\ud83c\udfc6"},{"img":"icon_37.png","val":"\ud83d\ude18"},{"img":"icon_38.png","val":"\ud83d\ude0e"},{"img":"icon_39.png","val":"\ud83d\udc25"},{"img":"icon_40.png","val":"\ud83d\ude0d"}]';
    if(settings.stylesheet!=null){$('head').append('<link rel="stylesheet" href="'+settings.stylesheet+'" type="text/css" />');}
    $(this).before('<div id="'+wrapper+'" class="emoji-wrapper"><span id="emoji-popup"><span id="emoji-close"><img src="'+settings.closeimage+'"></span><div  id="emojiImgs" ></div></span></div>');
    //set default styles
    $(this).css({"height": settings.inputpassheight});
    $("#"+wrapper).children("#emoji-popup").css({"background": "linear-gradient(to bottom, #f7f7f8 0%, #ffffff 100%)","box-shadow": "0 1px 2px rgba(0, 0, 0, 0.4) inset, 0 -1px 0 rgba(0, 0, 0, 0.05) inset","border-radius": "6px","position":"absolute","top":settings.inputpassheight,"width":settings.popupwidth,"height":settings.popupheigth,"padding":"4px","display":"none"});
    $("#"+wrapper).css({"position": "relative"});
    $("#"+wrapper).children("#emoji-popup").children("#emoji-close").css({"float": "right","cursor": "pointer","margin-top": "-18","margin-right": "-18"});
   setImages();

    $(this).focus(function(){
        $(".emoji-wrapper").children('#emoji-popup').hide();
        $("#"+wrapper).children('#emoji-popup').show();
    });

    $("#"+wrapper).children("#emoji-popup").children("#emoji-close").click(function() {
         $("#"+wrapper).children('#emoji-popup').hide();
    });
    $("#"+wrapper).children("#emoji-popup").children("#emojiImgs").children("img").click(function() {
        console.log("image");
        $(plugin).val( $(plugin).val() + $(this).attr("alt"));
    });

    function shuffle(o){ //shuffle dictionary
        for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    };

    function setImages(){ //set images into div
        var randomImgs = shuffle(JSON.parse(imgs_dictionary));
        for(var i=0; i < randomImgs.length; i++){
         $("#"+wrapper).children('#emoji-popup').children('#emojiImgs').prepend('<img  src="'+settings.directory+randomImgs[i]["img"]+'" alt="'+randomImgs[i]["val"]+'" />');}
         $("#emojiImgs img").css({"width":settings.imgsize,"padding":"1px"});
    };
//finishes emojipass function
    }
}(jQuery));