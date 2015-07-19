/*!
    Author: Omar Aguirre Aranda
    Year: 2015
    jQuery - emojipass v1.2

 */
(function($) {
    $.fn.emojiPass = function(options) {
        var settings = $.extend({
            JSONpath:'http://localhost/jquery.emojipass/js/json/', //path of the json file by default for localhost
            CSSpath : 'css/jquery.emojipass.css', //path of the css file by default
            iconsdirectory   : 'js/emoji/', //path by the fault for emoji icons
            inputpassheight : '40',
            imgsize: '33',
            popupwidth:'300px',
            popupheigth:'200px',
            useImages:true
        }, options);
        var status = true;
        var plugin = this; //make main div accesible
        var wrapper = $(this).attr('id') +"-wrapper";
        if(settings.CSSpath!=null){$('head').append('<link rel="stylesheet" href="'+settings.CSSpath+'" type="text/css" />');}
        $(this).before('<div id="'+wrapper+'" class="emoji-wrapper"><span id="emoji-popup"><div  id="emojiImgs" ></div></span></div>');
        $(this).css({"height": settings.inputpassheight});
        $("#"+wrapper).children("#emoji-popup").css({"-webkit-box-shadow":"0px 0px 5px 0px rgba(70, 70, 70, 0.6)","-moz-box-shadow":"0px 0px 5px 0px rgba(70, 70, 70, 0.6)","box-shadow":"0px 0px 5px 0px rgba(70, 70, 70, 0.6)","border":"#CCCCCC solid 1px","background-color":"#E5E5E5","border-radius": "4px","position":"absolute","top":"40px","width":"300px","min-height": "100px","padding":"4px","display":"none","margin-left":"10px","padding-top": "10px"});
        $("#"+wrapper).children("#emojiImgs").css({"word-wrap":" break-word",   "cursor":"default"});
        $('head').append("<style>#emoji-popup:after {content: '';display: block;position: absolute;left: 20px;top:-8px;border-top: 15px solid transparent;border-left: 15px solid transparent;border-right: 15px solid transparent;background: #E5E5E5;border-right:1px solid #CCCCCC; border-bottom:1px solid #CCCCCC; -moz-transform:rotate(225deg); -webkit-transform:rotate(225deg);}</style>");
        $("#"+wrapper).css({"position": "relative"});
        setImages(); //get dictionary of images

        if(status){
                 //open div with images
                $(this).focus(function(){
                    $(".emoji-wrapper").children('#emoji-popup').hide();
                    $("#"+wrapper).children('#emoji-popup').show();
                });
                //image click action
                $("#"+wrapper).children("#emoji-popup").children("#emojiImgs").children("img").click(function() {
                    $(plugin).val( $(plugin).val() + $(this).attr("alt"));
                });
                $("#"+wrapper).children("#emoji-popup").children("#emojiImgs").children(".img").click(function() {
                    $(plugin).val( $(plugin).val() + $(this).attr("id"));
                });
                //close popup when clicking out
                $(document.body).mousedown(function(event) {
                    var target = $(event.target);
                    if (!target.parents().andSelf().is('#emoji-popup')) { // Clicked outside
                          $("#"+wrapper).children('#emoji-popup').hide();
                    }
                });
                ///close popup with esc key
                $( document ).on( 'keydown', function ( e ) {
                    if ( e.keyCode === 27 ) { // ESC
                          $("#"+wrapper).children('#emoji-popup').hide();
                    }
                });
        }

        //functions
        function getDictionary(){
             var json = null;
                $.ajax({
                    'async': false,
                    'url': settings.JSONpath+'document_icons.json',
                    'dataType': "json",
                    'success': function (data) {
                        json = data;
                    }
                });
              return json;
        }
        function setImages(){ //set images into div
            try{
                dictionary = getDictionary();
                status = true;
                var randomImgs = shuffle(dictionary.icons);
                for(var i=0; i < randomImgs.length; i++){
                        if(settings.useImages){
                            $("#"+wrapper).children('#emoji-popup').children('#emojiImgs').prepend('<img  src="'+settings.iconsdirectory+randomImgs[i].img+'" alt="'+randomImgs[i].val+'" />');
                            $("#emojiImgs img").css({"width":settings.imgsize,"padding":"1px"});
                        }else{
                            $("#"+wrapper).children('#emoji-popup').children('#emojiImgs').prepend('<span class="img" id="'+randomImgs[i].val+'" >'+randomImgs[i].val+'</span>');
                            $(".img").css({"font-size": "30px","width":settings.imgsize});
                        }
                }
            }catch(err){
                status = false;
            }
        }
        function shuffle(o){ //shuffle dictionary
            for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
        }
//finishes emojipass function
    }
}(jQuery));