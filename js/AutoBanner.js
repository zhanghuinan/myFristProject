(function(){
    function AutoBanner(curEleId,url,interval){
        this.banner=document.getElementById(curEleId);
        this.banner_box=utils.firstChild(this.banner);
        this.imgList=this.banner_box.getElementsByTagName('a');
        this.small_box=utils.children(this.banner)[1];
        this.infoTitle=utils.lastChild(this.banner);
        this.info_title=this.infoTitle.getElementsByTagName('div');
        this.small_box_img=utils.firstChild(this.small_box);
        this.small_imgList=this.small_box_img.getElementsByTagName('img');
        this.oLis=this.small_box_img.getElementsByTagName('li');

        this.jsonData=null;
        this.url=url;
        this.interval=interval||3000;
        this.step=0;
        this.timer=0;
        return this.init();
    }
    AutoBanner.prototype={
        constructor:AutoBanner,
        getData:function(){
            var _this=this;
            var xhr = new XMLHttpRequest;
            xhr.open("get", this.url+ "?_="+ Math.random(), false);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
                    _this.jsonData = utils.formatJSON(xhr.responseText);
                }
            };
            xhr.send(null);
        },
        bindData:function(){
            var str1="",str2="",str3="";
            for(var i= 0,len=this.jsonData.length;i<len;i++){
                var curData=this.jsonData[i];
                var str='url("'+curData["img1"]+'") 50% 0 / cover no-repeat fixed';
                str1+="<a href='javascript:;' trueImg='"+str+"'></a>";
                i==0?str2+="<li style='bottom: 0'><img trueImg='"+this.jsonData[0]["img2"]+"' src='' alt=''></li>":str2+="<li><img trueImg='"+curData["img2"]+"' src='' alt=''></li>";
                i==0?str3+="<div class='info_title' con_id='"+i+"' style='display: block'><h3><a>"+curData["h3"]+"</a></h3><p>"+curData["p"]+"</p></div>":str3+="<div class='info_title' con_id='"+i+"'><h3><a>"+curData["h3"]+"</a></h3><p>"+curData["p"]+"</p></div>"
            }
            this.banner_box.innerHTML=str1;
            this.small_box_img.innerHTML=str2;
            this.infoTitle.innerHTML+=str3;
        },
        lazyImg:function(){
            var _this=this;
            for(var i= 0,len=_this.imgList.length;i<len;i++){
                ~function(i){
                    var curImg=_this.imgList[i];
                    var curSmallImg=_this.small_imgList[i];
                    var oImg=new Image;
                    oImg.src=curSmallImg.getAttribute('trueImg');
                    oImg.onload=function(){
                        curSmallImg.src=this.src;
                        curSmallImg.style.display='block';
                        curImg.style.background=curImg.getAttribute('trueImg');
                        if(i==0){
                            utils.css(curImg,'zIndex',1);
                            zhufengAnimate(curImg,{opacity:1},300)
                        }
                        oImg=null;
                    }
                }(i);
            }
        },
        autoMove:function(){
            if(this.step==(this.jsonData.length-1)){
                this.step=-1;
            }
            this.step++;
            this.setBanner();
        },
        setBanner: function(){
            for(var i= 0,len=this.imgList.length;i<len;i++){
                var curImg=this.imgList[i];
                zhufengAnimate(curImg,{opacity:0},700);
                if(i==this.step){
                    utils.css(curImg,'zIndex',1);
                    zhufengAnimate(curImg,{opacity:1},700);
                    continue;
                }
                utils.css(curImg,'zIndex',0);
            }
            for(i= 0;i<len;i++){
                var curLi=this.oLis[i];
                utils.css(curLi, 'bottom', -15);
                i==this.step?utils.css(curLi, 'bottom', 0):null;
            }
            for(i= 0;i<len;i++){
                var curInfo=this.info_title[i];
                var con_id=curInfo.getAttribute("con_id");
                curInfo.style.display=con_id==this.step?"block":"none";
            }
        },
        tipEvent: function () {
            var _this = this;
            for (var i = 0, len = this.oLis.length; i < len; i++) {
                var curLi = this.oLis[i];
                curLi.index = i;
                curLi.onmouseover = function () {
                    window.clearTimeout(_this.timer);
                    _this.step = this.index;
                    _this.setBanner();
                };
                curLi.onmouseout = function () {
                    _this.timer=window.setInterval(function(){
                        _this.autoMove();
                    },_this.interval);
                }
            }
        },
        init:function(){
            var _this=this;
            this.getData();
            this.bindData();
            window.setTimeout(function(){
                _this.lazyImg();
            },500);
            this.timer=window.setInterval(function(){
                _this.autoMove();
            },this.interval);
            this.tipEvent();
            return this;
        }
    };
    window.AutoBanner=AutoBanner;
})();