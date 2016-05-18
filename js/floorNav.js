~function () {
    var content_main = document.getElementById("content_main");
    var anchor = document.getElementById("anchor");
    var content_all = document.getElementById("content_all");
    var contents = utils.getElementsByClass("content", content_all);
    //1.实现自动轮播
    var Height = utils.win("clientHeight");
    var totalTop = 0, step = 0;
    var ary = [], ary1 = [];
    for (var i = 0, len = contents.length; i < len; i++) {
        contents[i].isLoad = false;
    }
    load(0);
    function load(n) {
        if (!contents[n].isLoad) {
            ary[n] = new AutoBanner(contents[n].id, "json/list" + (n + 1) + ".txt", 3000, n);
            ary1[n] = new ToggleShow(contents[n].id);
            contents[n].isLoad = true;
        }
    }

    function clearTimer() {
        for (var i = 0, len = ary.length; i < len; i++) {
            if (ary[i]) {
                window.clearTimeout(ary[i].timer);
            }
        }
    }

    //2.滚动及楼层导航

    var oLis = anchor.getElementsByTagName("li");
    var timer = 0;

    function scroll(e) {
        totalTop = utils.css(content_main, 'top');
        window.clearTimeout(timer);
        if (e.wheelDelta < 0) {
            if (step >= (contents.length - 1)) {
                step = (contents.length - 1);
                zhufengAnimate(content_main, {top: -step * Height - 200}, 500);
                return;
            }
            step++;
        } else if (e.wheelDelta > 0) {
            if (totalTop <= (-step * Height - 200)) {
                step = (contents.length - 1);
            } else if (step == 0) {
                step = 0
            } else {
                step--;
            }
        }
        changeActive();
        clearTimer();
        zhufengAnimate(content_main, {top: -step * Height}, 300);
        if(ary[step]){
            ary[step].timer = window.setInterval(function () {
                ary[step].autoMove();
            }, 3000);
        }
        if (!contents[step].isLoad) {
            load(step);
        }

    }

    content_main.onmousewheel = function (e) {
        e = e || window.event;
        window.clearTimeout(timer);
        timer = window.setTimeout(function () {
            scroll(e);
        }, 120);
    };
    for (i = 0, len = oLis.length - 1; i < len; i++) {
        var curLi = oLis[i];
        curLi.index = i;
        curLi.onclick = function (e) {
            e = e || window.event;
            step = this.index;
            changeActive();
            scroll(e)
        };
    }
    function changeActive() {
        for (var i = 0; i < oLis.length - 1; i++) {
            utils.removeClass(oLis[i], "active")
        }
        utils.addClass(oLis[step], "active")
    }
}();