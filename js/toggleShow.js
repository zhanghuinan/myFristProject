~function(){
    function ToggleShow(curId){
        this.content=document.getElementById(curId);
        this.wrapper_box=utils.getElementsByClass("wrapper_box",this.content)[0];
        this.info_title=utils.getElementsByClass("infoTitle",this.content);
        this.open_wrapper=utils.getElementsByClass("open_wrapper",this.content)[0];
        this.close_wrapper=utils.getElementsByClass("close_wrapper",this.content)[0];
        this.close_wrapper.onclick=this.myBind(this.close,this);
        this.open_wrapper.onclick=this.myBind(this.show,this);

    }
    ToggleShow.prototype.myBind=function(){
        var fn=arguments[0],context=arguments[1];
            return  function(){
                fn.call(context)
            }
    };
    ToggleShow.prototype.show=function(){
        var _this=this;
        this.open_wrapper.style.display="none";
        for(var i= 0,len=this.info_title.length;i<len;i++){
            zhufengAnimate(this.info_title[i],{bottom:286},300,function(){
                _this.wrapper_box.style.display="block";
                zhufengAnimate(_this.wrapper_box,{
                    width:100,
                    height:50,
                    marginLeft:-560,
                    bottom: 230
                },100,function() {
                    zhufengAnimate(_this.wrapper_box, {
                        width: 920,
                        height: 223,
                        marginLeft: -460,
                        bottom: 62
                    }, 300)})
            })
        }
    };
    ToggleShow.prototype.close=function() {
        var _this=this;
        this.open_wrapper.style.display = "block";
            zhufengAnimate(_this.wrapper_box, {
                width: 100,
                height: 50,
                marginLeft: -560,
                bottom:  230
            }, 300, function () {
                zhufengAnimate(_this.wrapper_box, {
                    width: 0,
                    height: 0,
                    marginLeft: -920,
                    bottom: 100
                }, 100, function () {
                    _this.wrapper_box.style.display = "none";
                    for (var i = 0, len = _this.info_title.length; i < len; i++) {
                        zhufengAnimate(_this.info_title[i], {bottom: 62}, 300)
                    }
                });

            });
        };
    window.ToggleShow=ToggleShow;
}();