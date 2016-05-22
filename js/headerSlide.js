~function(){
    var header = document.getElementById("header");
    var navList = document.getElementById("nav_list");
    var nav_right=document.getElementById("nav_right");
    var arrow_left = utils.firstChild(nav_right);
    var arrow_right = utils.firstChild(navList);
    var navFirst = utils.children(navList)[1];
    var navSecond = utils.children(navList)[2];
    var navThird = utils.children(navList)[3];
    var search_show = utils.lastChild(navList);
    var close_btn = utils.lastChild(search_show);
    var oLis=navList.getElementsByTagName("li");
    var search_btn=utils.children(nav_right)[1];
    var logo_right=utils.lastChild(nav_right);
    var nav_small = utils.next(navList);
    var OUls = utils.children(nav_small);
    var leftWidth = document.getElementById("leftWidth");
    var leftVal = utils.next(leftWidth);
    var nav_active = utils.next(leftWidth.parentNode);
    var active1 = utils.firstChild(nav_active);
    var width = utils.css(leftWidth, "width");
    var left = utils.css(leftVal, "left");
    var activeWidth = utils.css(active1, "width");
    var timer1=utils.children(header)[2];
    var timer2=utils.children(header)[3];
    var logoRight_small=utils.lastChild(header);
    /*实现滑动*/

    header.onmouseover =hSlide;
    function hSlide(e) {
        e = e || window.event;
        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
        var target = e.target || e.srcElement;
        var liLeft = null, curA = null, curAWidth = null, data = null, curEle = null;
        if (target.parentNode.tagName.toUpperCase() === "UL" || target.parentNode.parentNode.tagName.toUpperCase() === "UL") {
            nav_active.style.display="block";
            if (target.tagName.toUpperCase() === "LI") {
                var childTarget = utils.children(target)[0];
                data = childTarget.getAttribute("data-id");
                curEle = target;
            } else if (target.tagName.toUpperCase() === "A") {
                curEle = target.parentNode;
                data = target.getAttribute("data-id");
            }
            liLeft = utils.offset(curEle).left;
            curA = utils.firstChild(curEle);
            curAWidth = utils.css(curA, "width");
            zhufengAnimate(leftWidth, {width: (liLeft - 12)}, 200);
            zhufengAnimate(leftVal, {left: (liLeft - 12)}, 200);
            zhufengAnimate(nav_active, {left: (liLeft - 12)}, 200);
            zhufengAnimate(active1, {width: curAWidth}, 200);
            for (var i = 0, len = OUls.length; i < len; i++) {
                var curUl = OUls[i];
                var curDataId = curUl.getAttribute("data-id");
                curUl.style.display = data == curDataId ? "block" : "none";
                nav_small.style.display = "block";
            }
        }
        document.onmouseover =initState;
    };
    logoRight_small.onmouseover=nav_small.onmouseover = function (e) {
        e = e || window.event;
        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
    };

    document.onmouseover =initState;
    function initState(e) {
        e = e || window.event;
        var target = e.target || e.srcElement;
        var parents = parentAll(target);
        for (var i = 0, len = parents.length; i < len; i++) {
            var curClass = parents[i].className;
            if (!(curClass == "header")) {
                zhufengAnimate(leftWidth, {width: width}, 300);
                zhufengAnimate(leftVal, {left: left}, 300);
                zhufengAnimate(nav_active, {left: left}, 300);
                zhufengAnimate(active1, {width: activeWidth}, 300);
                logoRight_small.style.display =nav_small.style.display = "none";
            }
        }
    };
    /*获取所有的父亲节点*/
    function parentAll(curEle) {
        var ary = [];
        var parent = curEle.parentNode;
        while (parent) {
            ary.unshift(parent);
            parent = parent.parentNode;
        }
        return ary;
    }

    /*点击箭头向左滑动*/
    arrow_left.onclick = function () {
        arrow_right.style.display=navThird.style.display = "block";
        utils.css(navFirst,{zIndex:9});
        zhufengAnimate(navFirst,{left:"-250"},300,function(){
            arrow_left.style.display=nav_active.style.display=navFirst.style.display="none";
            utils.css(arrow_right,{zIndex:15});
            zhufengAnimate(leftWidth, {width: width-35}, 100);
            zhufengAnimate(leftVal, {left: left-35}, 100);
            document.onmouseover=null;
        });
        zhufengAnimate(navSecond,{left:"140"},300);
        zhufengAnimate(navThird,{right:"380"},300)
    };
    /*点击箭头向右滑动*/
    arrow_right.onclick = function () {
        utils.css(navFirst,{zIndex:9});
        navFirst.style.display="block";
        zhufengAnimate(navFirst,{left:"190"},300);
        zhufengAnimate(navSecond,{left:"650"},300);
        zhufengAnimate(navThird,{right:"-200"},300,function() {
            arrow_right.style.display=navThird.style.display = "none";
            arrow_left.style.display=nav_active.style.display="block"
            utils.css(navFirst,{zIndex:12});
            utils.css(arrow_right, {zIndex: 8});
            zhufengAnimate(leftWidth, {width: width }, 100);
            zhufengAnimate(leftVal, {left: left}, 100);
            document.onmouseover = initState;
        })
    };

    /*点击搜索按钮*/
    search_btn.onclick=function(){
        timer1.style.display=nav_small.style.display=arrow_right.style.display=nav_active.style.display="none";
        utils.css(nav_right,{zIndex:8});
        zhufengAnimate(leftWidth, {width: width-35}, 100);
        zhufengAnimate(leftVal, {left: left-35}, 100);
        zhufengAnimate(timer2, {height: 0}, 100);
        document.onmouseover=null;
        for(var i=0;i<oLis.length;i++){
            var curLi=oLis[i];
            curLi.width=utils.css(curLi,"width");
            zhufengAnimate(oLis[i],{width:0,height:0,fontSize:0},300,function(){
                search_show.style.display="block";
                header.onmouseover=null;
            });
        }
    };
    close_btn.onclick=function(){
        search_show.style.display="none";
        timer1.style.display=nav_small.style.display=arrow_right.style.display=nav_active.style.display="block";
        utils.css(nav_right,{zIndex:15});
        zhufengAnimate(leftWidth, {width: width}, 100);
        zhufengAnimate(leftVal, {left: left}, 100);
        zhufengAnimate(timer2, {height: 73}, 100);
        document.onmouseover=initState;
        for(var i=0;i<oLis.length;i++){
            zhufengAnimate(oLis[i],{width:oLis[i].width,height:50,fontSize:"14px"},300,function(){
                header.onmouseover=hSlide;
            });
        }
    }
    logo_right.onmouseover=function(){
        logoRight_small.style.display="block";
    }

}()