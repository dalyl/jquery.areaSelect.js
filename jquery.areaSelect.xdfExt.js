/**
 * 
 * Created by daly on 17/10/10.
 */

(function ($, undefined) {
    
        console.log('jquery.areaSelect.xdfExt.js by daly https://github.com/dalyl/jquery.areaSelect.js');
    
        function ImageSelect($ele, options) {
            this.$ele = $ele;
            this.options = options;
            this.$ImageEditCurrent=	undefined ;
            this.CurrentWidth=options.cavnasWidth;
            this.CurrentHeight=options.cavnasHeight;
            var size=getImgNaturalDimensions($ele[0]);
            var sizeVate= size.width/size.height;    
            if(this.CurrentWidth/this.CurrentHeight<sizeVate&&size.width >this.CurrentWidth)
            {
                 this.CurrentHeight = (1/sizeVate)*this.CurrentWidth;
            }
            else if( size.height  > this.CurrentHeight)
            {
                this.CurrentWidth= this.CurrentHeight*sizeVate ;
            }
        }
    
        ImageSelect.prototype.init = function () {
            var the=this;
            the.$ImageEditCurrent=$("<img src=\""+the.$ele[0].src+"\" width=\""+ this.CurrentWidth+"px\"  height=\""+this.CurrentHeight+"px\"> ");
            var data = the.options.areaData;
            the.$ImageEditCurrent.load(function(){
                var _this=this;
                var areas=[];
                $(data).each(function(){
                    var datax=this.x;
                    var datay=this.y;
                    var dataw=this.width;
                    var datah=this.height;
                    var area={x:datax,y:datay,width:dataw,height:datah}
                    areas.push(area);
                });
    
                var options = { initAreas:areas };
                $(_this).areaSelect(options);
    
                $(data).each(function(){ 
                    var link=this.link;
                    var datax=this.x;
                    var datay=this.y;
                    var dataw=this.width;
                    var datah=this.height;
                    var area={x:datax,y:datay,width:dataw,height:datah}
                    the.$ImageEditCurrent.areaSelect('setAreaData',area,link);
                });
    
                the.PreviewArea($(_this).areaSelect('get'));
    
                $(_this).areaSelect('bindChangeEvent', function (event, data) {
                    the.PreviewArea(data.areas);
                });
    
                $(_this).areaSelect('bindSelectEvent', function (area,data) {
                    the.EditAreaData(area,data );
                });
            }); 
    
            the.options.$cavnasCtrl.append( the.$ImageEditCurrent );
    
            the.options.$dataBindCtrl.link.change(function(){
                var x= the.options.$dataBindCtrl.x.val();
                var y= the.options.$dataBindCtrl.y.val();
                var w= the.options.$dataBindCtrl.width.val();
                var h= the.options.$dataBindCtrl.height.val();
                var link= the.options.$dataBindCtrl.link.val();
                var area={x:x,y:y,width:w,height:h};
                the.$ImageEditCurrent.areaSelect('setAreaData',area,link);
                the.save();
            });
        }
    
        ImageSelect.prototype.save = function () {
            var the=this;
            var data= the.$ImageEditCurrent.areaSelect('getData');
            the.options.areaData=[];
            $(data).each(function(){
                var area=this;
                var item={x:area.x,y:area.y,width:area.width,height:area.height,link:area.data};
                the.options.areaData.push(item);
            });
            the.$ele.data('ImageSelect', the);
        }
    
        ImageSelect.prototype.Select = function () {
            this.options.$cavnasCtrl.empty();
            this.init();
        }
        
        ImageSelect.prototype.PreviewArea= function (areas) {
            var the=this;
            var size=the.options.preViewWidth;
            var $preview = the.options.$partialCtrl;
            $preview.empty();
            for (var index in areas) {
                var area = areas[index];
                var width= the.CurrentWidth;
                var height= the.CurrentHeight;
    
                var v_x=size/area.width;
                var v_y=size/area.height;
    
                var pre_width=v_x * width;
                var pre_height=v_y * height;
                var pre_left=0-( area.x * v_x);
                var pre_top= 0-( area.y * v_y);
    
                var $div = $('<div/>').css({
                    'height': size,
                    'width': size,
                });
    
                var $img = $('<img class="_Preview_" data-x="'+area.x+'" data-y="'+area.y+'"  data-w="'+area.width+'"  data-h="'+area.height+'"  >').css({
                    width: Math.round(pre_width),
                    height: Math.round(pre_height),
                    marginLeft: Math.round(pre_left),
                    marginTop: Math.round(pre_top)
                });
    
                $img.attr("src", the.$ele[0].src);
                $div.append($img);
                $preview.append($div);
                $img.bind("click",function(){
                    var datax=$(this).attr("data-x");
                    var datay=$(this).attr("data-y");
                    var dataw=$(this).attr("data-w");
                    var datah=$(this).attr("data-h");
                    var selectArea={x:datax,y:datay,width:dataw,height:datah}
                    var data= the.$ImageEditCurrent.areaSelect('getAreaData',selectArea)
                    the.EditAreaData(selectArea,data);
                });
            }
            the.save();
        }
        
        ImageSelect.prototype.EditAreaData=function (area,data)
         {
            var the=this;
            the.options.$dataBindCtrl.x.val(0);
            the.options.$dataBindCtrl.y.val(0);
            the.options.$dataBindCtrl.width.val(0);
            the.options.$dataBindCtrl.height.val(0);
            the.options.$dataBindCtrl.link.val("");
            if(area){
                the.options.$dataBindCtrl.x.val(area.x);
                the.options.$dataBindCtrl.y.val(area.y);
                the.options.$dataBindCtrl.width.val(area.width);
                the.options.$dataBindCtrl.height.val(area.height);
                the.options.$dataBindCtrl.link.val(data);
            }
        }

        ImageSelect.prototype.get= function () {
            var data= this.$ele.data('ImageSelect');
            return {Name:this.$ele[0].src,data:data.options.areaData};
        }
    
        function getImgNaturalDimensions(img, callback) {
            return {width:img.naturalWidth,height:img.naturalHeight} 
            /*
              var nWidth, nHeight
            if (img.naturalWidth) { // 现代浏览器
                nWidth = img.naturalWidth
                nHeight = img.naturalHeight
            } else { // IE6/7/8
                var imgae = new Image()
                image.src = img.src
                return {width:image.width,height:image.height} 
            }
            return {width: nWidth,height:nHeight}  
            */
        }
    
    
        $.fn.imgSelect = function (method) {
            var as;
            var defaultOptions = {
                $cavnasCtrl:$("#imageFrame"),
                $partialCtrl:$("#imagePreview"),
                $dataBindCtrl:{
                    x:$("#_current_area_x"),
                    y:$("#_current_area_y"),
                    width:$("#_current_area_w"),
                    height:$("#_current_area_h"),
                    link:$("#_current_area_link"),
                },
                cavnasWidth:800,
                cavnasHeight:600,
                preViewWidth:100,
                areaData: [],
                triggerMethod: "click",
            };
            as = this.data('ImageSelect');
            if (as == undefined && (method === undefined || $.isPlainObject(method))) {
                var options = $.extend({}, defaultOptions, method);
                as = new ImageSelect(this, options);
                this.data('ImageSelect', as);
                $(this).bind(options.triggerMethod,function(){
                    as.Select();
                })
            } else {
                if (as == undefined) {
                    console.error('pls invoke imgSelect() on this element first!');
                } else if (as[method] != undefined) {
                    return as[method](Array.prototype.slice.call(arguments, 1));
                } else {
                    console.error('no function ' + method);
                }
            }
        }
    })(jQuery);