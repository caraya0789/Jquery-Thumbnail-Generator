(function($){
    $.fn.thumbnail = function(options){
        
        var settings = $.extend({
            height:100,
            width:100,
            align:'middle'
        }, options);
        
        return this.each(function(){
            
            $(this).hide();
            
            $(this).load(function(){
                
                var $image = $(this);
                
                var width        = $image.width();
                var height       = $image.height();
                
                var thumb_width  = ($image.data('width')) ? $image.data('width') : settings.width;
                var thumb_height = ($image.data('height')) ? $image.data('height') : settings.height;
                
                var ratio        = width / height;
                var thumb_ratio  = thumb_width / thumb_height;
                
                var offsetX = 0;
                var offsetY = 0;
                
                if(thumb_ratio > 1) { // Horizontal Thumbnail                    
                    if(ratio > 1) { // Horizontal Image
                        if(ratio > thumb_ratio) {
                            $image.height(thumb_height);
                            offsetX = (thumb_height * ratio) - thumb_width;
                        } else {
                            $image.width(thumb_width);
                            offsetY = (thumb_width / ratio) - thumb_height;
                        }
                    } else { // Vertical or Square Image
                        $image.width(thumb_width);
                        offsetY = (thumb_width / ratio) - thumb_height;
                    }
                } else { // Square Vertical Thumbnail
                    if(ratio < 1) { // Vertical Image
                        if(ratio > thumb_ratio) {
                            $image.height(thumb_height);
                            offsetX = (thumb_height * ratio) - thumb_width;
                        } else {
                            $image.width(thumb_width);
                            offsetY = (thumb_width / ratio) - thumb_height;
                        }
                    } else { // Horizontal or Square Image
                        $image.height(thumb_height);
                        offsetX = (thumb_height * ratio) - thumb_width;
                    }
                }
                
                $container = $('<div></div>');
                $container.css({
                    width:thumb_width,
                    height:thumb_height,
                    overflow:'hidden',
                    position:'relative'
                });
                
                $image.css({
                    position:'absolute'
                });
                
                var align = ($image.data('align')) ? $image.data('align') : settings.align;
                
                switch(align) {
                    case 'topleft':
                        if(offsetX != 0) {
                            $image.css('left',0);
                        } else if(offsetY != 0){
                            $image.css('top',0);
                        }
                        break;
                    case 'bottomright':
                        if(offsetX != 0) {
                            $image.css('right',0);
                        } else if(offsetY != 0){
                            $image.css('bottom',0);
                        }
                        break;
                    default:
                        if(offsetX != 0) {
                            var left = 0 - (offsetX / 2);
                            $image.css('left',left);
                        } else if(offsetY != 0){
                            var top = 0 - (offsetY / 2);
                            $image.css('top',top);
                        }
                        break;
                }
                
                $image.wrap($container);
                
                $image.show();
            });
        });
    }
})(jQuery);

