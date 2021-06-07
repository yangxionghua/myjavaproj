//目录导航控件
//支持: IE8+
(function (window, $) {

    var PLUGIN_NAME = 'jqanchor';
    var document = window.document;


    /**
     * polyfill for document.scrollingElement 目前只针对IE,其他浏览器几乎都支持了
     * https://github.com/mathiasbynens/document.scrollingElement/blob/master/scrollingelement.js
     * https://github.com/yangg/scrolling-element
     */
    var getScrollingCache = null;
    function getScrolling() {
        if (document.scrollingElement) {
            return document.scrollingElement;
        }
        if (getScrollingCache) {
            return getScrollingCache;
        } else if (document.body.scrollTop) {
            // speed up if scrollTop > 0
            return (getScrollingCache = document.body);
        } else if (document.documentElement.scrollTop) {
            // speed up if scrollTop > 0
            return (getScrollingCache = document.documentElement);
        }
        var iframe = document.createElement('iframe');
        iframe.style.height = '1px';
        document.documentElement.appendChild(iframe);
        var doc = iframe.contentWindow.document;
        doc.write('<!DOCTYPE html><div style="height:9999em">x</div>');
        doc.close();
        var isCompliant = doc.documentElement.scrollHeight > doc.body.scrollHeight;
        iframe.parentNode.removeChild(iframe);
        return (getScrollingCache = isCompliant ? document.documentElement : document.body);
    }




    function _init(target, state, options) {
        var state = $.data(target, PLUGIN_NAME);
        var options = state.options;
        var selecter = state.selecter.hide();

        //fix:修复不同内核滚动元素不同问题
        if (!options.scrolling) {
            if (target === window || target === document || target === document.body || target === document.documentElement) {
                options.scrolling = getScrolling();
            } else {
                options.scrolling = selecter;
            }
        }
        //fix end


        if (!options.scrolling.fn) {
            options.scrolling = $(options.scrolling);
        }

        state.anchor = $('<div class="jqanchor"></div>').appendTo(options.scrolling.is('html') ? document.body : options.scrolling);


        creare(target,state);


        state.viewPointValue = options.viewPoint();

        selecter.on('scroll.' + PLUGIN_NAME, function () {

            if (state.going) return;
            if (state.titmer && (new Date() - state.timerLast) < options.delay) {
                state.titmer = clearTimeout(state.titmer);
            }
            state.titmer = setTimeout(function () {
                state.timerLast = new Date();
                var scrollTop = options.scrolling.scrollTop() + state.viewPointValue;
                var active = null;
                if (scrollTop <= 200) {

                    active = state.links[0].anchor;
                }
                else {
                    for (var i = 0, l = state.links.length; i < l; i++) {
                        if (state.links[i].target.offset().top + options.offset > scrollTop) {
                            break;
                        }
                        active = state.links[i].anchor;
                    }
                }

                setActive(state, active);

            }, options.delay);
        });


        selecter.on('resize.' + PLUGIN_NAME, function () {
            state.viewPointValue = options.viewPoint();
            selecter.triggerHandler('scroll.' + PLUGIN_NAME);
        });

        state.anchor.on('click', 'span', function () {
            var index = $(this).attr('data-index');
            var link = state.links[index];
            var top = link.target.offset().top + options.offset;
            state.going = true;
            setActive(state, link.anchor);
            if (options.smoothScroll) {
                options.scrolling.stop(true, false).animate({ scrollTop: top }, 500, function () {
                    state.going = false;
                });
            } else {
                options.scrolling.scrollTop(top);
            }
            options.onSelect && options.onSelect.call(target, link.target);
        });





        selecter.triggerHandler('scroll.' + PLUGIN_NAME);
    }

    function setActive(state, active) {
        if (state.nodeType) {
            state = $.data(state, PLUGIN_NAME);
        }
        if (active && state.active != active) {
            if (state.active) {
                state.active.removeClass('active');
            }
            state.active = active;
            state.active.addClass('active');
        }
    }

    function creare(target, state) {
        if (!state) {
            state =  $.data(target, PLUGIN_NAME);
        }
        var options = state.options;

        state.links = [];
        var ul = $('<ul></ul>');
        options.scrolling.find(options.selecters).filter(options.filter).each(function (i, item) {
            var a = $('<li><span data-index="' + i + '">' + $(this).text() + '</span></li>').appendTo(ul);
            state.links.push({ target: $(this), anchor: a, index: i });
        });
        state.anchor.html(ul);


        state.anchor.css({ 'top': ($(window).height() - state.anchor.height()) * 0.5, right: options.right });

    }

    function refresh(target) {
        var  state = $.data(target, PLUGIN_NAME);
        setTimeout(function () {
            creare(target, state);
            state.selecter.triggerHandler('scroll.' + PLUGIN_NAME);
        },0);
    }


    $.fn[PLUGIN_NAME] = function (options) {
        if (typeof options == 'string' && $.fn[PLUGIN_NAME].methods[options]) {
            return $.fn[PLUGIN_NAME].methods[options].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof options === 'object' || !options) {
            return $.fn[PLUGIN_NAME].methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + options + ' does not exist on jQuery' + PLUGIN_NAME);
        }
    };
    $.fn[PLUGIN_NAME].version = "1.0";
    $.fn[PLUGIN_NAME].defaults = {
        selecters: 'h1,h2,h3,h4,h5,h6',  //锚点选择器
        scrolling: undefined,            //最大的滚动容器,默认是选择器指定的，如果选择器是 window或者document 则为 $(document.scrollingElement);
        delay: 500,                      //延迟滚动时间
        position: 'center',              //目录显示右侧位置，top,center,bottom
        right: 20,                       //右侧距离
        offset: -20,                     //每个元素的offset位移值
        viewPoint: function () {         //触发显示的临近线，默认是浏览器垂直中心线位置附近
            return $(window).height() * 0.5 - 20;
        },
        filter: function () {            //锚点过滤函数
            return true;
        },
        smoothScroll: true,              //是否平滑滚动
        onSelect: function (domLink) { } //点击目录项事件
    };
    $.fn[PLUGIN_NAME].methods = {
        init: function (options) {
            return this.each(function () {
                var $this = $(this);
                var state = $.data(this, PLUGIN_NAME);
                if (state) {
                    $.extend(state.options, options);
                } else {
                    var settings = $.extend({}, $.fn[PLUGIN_NAME].defaults, options, eval('(' + ($this.attr('data-options') || '{}') + ')'));
                    state = $.data(this, PLUGIN_NAME, {
                        target: this,
                        selecter: $this,
                        options: settings
                    });
                    _init(this, state, options);
                }
            });
        },
        options: function () {
            return $.data(this[0], PLUGIN_NAME).options;
        },
        refresh: function () {
            return this.each(function () {
                refresh(this);
            });
        }
    };


})(window, jQuery);