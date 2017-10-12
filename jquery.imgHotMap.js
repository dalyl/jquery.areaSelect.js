/**
 * 
 * Created by daly on 17/10/10.
 */

(function ($, undefined) {

    function imgHotMap($ele, options)
    {
        this.$ele = $ele;
        this.options = options;
    }

    imgHotMap.prototype.init = function () {
        var the=this;
        var mapName=this.$ele.attr("usemap");
        if(mapName===undefined)mapName="map-"+guid();
        var $oldMap=$("map[name='"+mapName+"']");
        $oldMap.remove();

        this.$ele.attr("usemap",mapName);
        var map_define="<map name=\""+mapName+"\" >"
        var width=this.$ele.width();
        var height=this.$ele.height();
        $(the.options.areasData).each(function(){
            var area=ConverArea(width,height,the.options.baseWidth,the.options.baseHeight,this.x,this.y,this.width,this.height);
            var areaData=this.data;
            if(areaData){
                map_define +=" <area shape=\"rect\" coords=\""+area.x+","+area.y+","+area.width+","+area.height+"\" href=\""+areaData.link+"\" alt=\""+areaData.alt+"\" />"
            }
        });
        map_define +=" </map>";
        var $map=$(map_define);
        $map.insertAfter(the.$ele)
    }   

    function ConverArea(width,height,baseWidth,baseHeight,areaX,areaY,areaWidth,areaHeight)
    {
        var vate_w=width/baseWidth;
        var vate_h=height/baseHeight;
        var new_x=Math.round(areaX*vate_w);
        var new_y=Math.round(areaY*vate_h);
        var new_w=Math.round(areaWidth*vate_w);
        var new_h=Math.round(areaHeight*vate_h);
        return {x:new_x,y:new_y,width:new_w,height:new_h};
    }

    function S4() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
     }
     function guid() {
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
     }

    $.fn.imgHotMap = function (opts) {
        var defaultOptions = {
            baseWidth:100,
            baseHeight:100,
            areasData:[]
        };
        if ( $.isPlainObject(opts)) {
           var options = $.extend({}, defaultOptions, opts);
           var as= new imgHotMap(this,options)
           as.init();
        } else {
            $(this).each(function(){
                var options ={
                    baseWidth:this.attr("data-baseWidth"),
                    baseHeight:this.attr("data-baseHeight"),
                    areas:this.attr("data-areas"),
                }

                for(var index in options){
                    if(options[index]==undefined)
                    {
                        console.error('attributes  must not be null');
                        return;
                    }
                }
                var as= new  imgHotMap(this,options)
                as.init();
            });    
        }
    }
})(jQuery);