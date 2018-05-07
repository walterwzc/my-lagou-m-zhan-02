/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = "{{each result}}  <li>    <img src=\"//static.lagou.com/{{$value.companyLogo}}\">    <div>      <h2>{{$value.companyName}}</h2>      <p>        <span>          {{$value.positionName}}        </span>        <span>{{$value.salary}}</span>      </p>      <p>{{$value.createTime}}</p>    </div>  </li>{{/each}}"

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var layoutTpl = __webpack_require__(2)
var headerTpl = __webpack_require__(3)
var footerTpl = __webpack_require__(4)
var mainTpl = __webpack_require__(5)

var common = __webpack_require__(6)

// 页面预渲染
$('#root').html(layoutTpl)
$('.container').html(headerTpl + mainTpl + footerTpl)

// 动态页面装载 #路由
common.render()

// 页面（tab）切换
// common.changeTab()


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">  </div>"

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = "<header>拉勾网</header>"

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = "<footer>  <ul>    <li class=\"active\" data-url=\"#index\">      <i class=\"yo-ico\">&#xe6b8;</i>      <b>职位</b>    </li>    <li data-url=\"#search\">      <i class=\"yo-ico\">&#xe7da;</i>      <b>搜索</b>    </li>    <li data-url=\"#mine\">      <i class=\"yo-ico\">&#xe78b;</i>      <b>我的</b>    </li>  </ul></footer>"

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = "<div class=\"swiper-container\">  <div class=\"swiper-wrapper\">      <div class=\"swiper-slide\">        <div class=\"main\"></div>      </div>      <div class=\"swiper-slide\">        <div class=\"main\"></div>      </div>      <div class=\"swiper-slide\">        <div class=\"main\"></div>      </div>  </div></div>"

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var indexTpl = __webpack_require__(7)
var searchTpl = __webpack_require__(8)
var mineTpl = __webpack_require__(9)

var poslistTpl = __webpack_require__(0)

var home = __webpack_require__(10)
var scrollUtil = __webpack_require__(11)

module.exports = {
    changeTab: function () {
        var that = this

        $('footer li').on('tap', function () {
            location.href = $(this).attr('data-url')
            $(this).addClass('active').siblings().removeClass('active')
            that.render()
        })
    },

    renderPage: function (index) {
        var $main = $('[class*="swiper-slide"]').eq(index).find('.main')
        switch (index) {
            case 0:
                home.getPosList(function (res) {
                    poslist = template.render(poslistTpl, JSON.parse(res).content.data.page)
                    $main.html(indexTpl)
                    $main.find('main ul li:eq(0)').after(poslist)

                    // IScroll
                    scrollUtil.scroll({
                        tpl: poslistTpl,
                        loadmoreSize: 10
                    })

                    // bind tap
                    $main.find('main ul li').on('tap', function () {
                        console.log(0)
                    })
                })
                // $('html').css('font-size', '100px')
                break;
            case 1:
                $main.html(searchTpl)
                // $('html').css('font-size', '100px')
                break;
            case 2:
                $main.html(mineTpl)
                // $('html').css('font-size', '31.25vw')
                break;
            default:

        }
    },

    render: function () {
        var that = this
        that.renderPage(0)
        var mySwiper = new Swiper('.swiper-container', {
            on: {
                slideChangeTransitionStart: function () {
                    $('footer li:eq(' + this.activeIndex + ')')
                        .addClass('active').siblings()
                        .removeClass('active')
                },
            },
        })
        $('footer li').on('tap', function () {
            mySwiper.slideTo($(this).index())
            $(this).addClass('active').siblings().removeClass('active')
            that.renderPage($(this).index())
        })
    }
}

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = "<nav>  <div class=\"custom-info\">      <span>          10秒钟定制职位      </span>      <a>          <em class=\"icon\"></em>          <em class=\"text\">去登录</em>      </a>  </div></nav><main id=\"main-scroll\">  <ul>    <li class=\"head\">        <!-- <img src=\"http://fe.qfqp5.com:8000/static/images/arrow.png\"/> -->        <img src=\"http://localhost:8000/static/images/arrow.png\"/>        <span>下拉刷新...</span>    </li>    <li class=\"foot\">        <!-- <img src=\"http://fe.qfqp5.com:8000/static/images/arrow.png\" /> -->        <img src=\"http://localhost:8000/static/images/arrow.png\" />        <span>上拉加载...</span>    </li>  </ul></main>"

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = "<div>search search</div>"

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = "<div>mine</div>"

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = {
    getPosList: function (cb) {
        $.ajax({
            // url: '/api/listmore.php',
            url: '/api/listmore.json',
            dataType: "text",
            success: function (res) {
                // console.log(Object.prototype.toString.call(res));
                cb(res)
            },
            error: function (err) {
                console.log(err)
            }
        })
    }
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var poslistTpl = __webpack_require__(0)

module.exports = {
    scroll: function (options) {

        var opt = {
            tpl: poslistTpl,
            loadmoreSize: 5
        }

        opt = Object.assign({}, opt, options)

        // 页码计数器
        var pageCount = 1

        // 定义开始时候初始位置
        var topSize = 40

        // IScroll初始化
        var myScroll = new IScroll('#main-scroll', {
            probeType: 3,
            mouseWheel: true
        });

        // 将初始位置上移 topSize, 保证开始的时候loading隐藏
        myScroll.scrollBy(0, -topSize);

        // 获得头部Loading,尾部的loading是否是拉动以后的状态
        var head = $('.head img'),
            topImgHasClass = head.hasClass('up');
        var foot = $('.foot img'),
            bottomImgHasClass = head.hasClass('down');

        // 监听滚动事件
        myScroll.on('scroll', function () {
            var y = this.y,
                maxY = this.maxScrollY - y;

            // 判断下拉边界
            if (y >= 0) {
                !topImgHasClass && head.addClass('up');
                return '';
            }

            // 判断下拉边界
            if (maxY >= 0) {
                !bottomImgHasClass && foot.addClass('down');
                return '';
            }
        });

        // 监听滚动结束事件
        myScroll.on('scrollEnd', function () {
            // 为防止下拉高度不足 topSize, 去刷新页面
            if (this.y >= -topSize && this.y < 0) {
                myScroll.scrollTo(0, -topSize);
                head.removeClass('up');
            } else if (this.y >= 0) {
                // head.attr('src', 'http://fe.qfqp5.com:8000/static/images/ajax-loader.gif');
                head.attr('src', 'http://localhost:8000/static/images/ajax-loader.gif');
                // ajax下拉刷新数据
                $.ajax({
                    // url: '/api/listmore.php',
                    url: '/api/listmore.json',
                    // 之后添加的
                    dataType: "text",
                    data: {
                        pageNo: 2,
                        pageSize: 2
                    },
                    success: function (res) {
                        refreshPoslist = template.render(opt.tpl, JSON.parse(res).content.data.page)
                        $('#main main ul li:eq(0)').after(refreshPoslist)

                        // 复位
                        myScroll.scrollTo(0, -topSize);
                        head.removeClass('up');
                        // head.attr('src', 'http://fe.qfqp5.com:8000/static/images/arrow.png');
                        head.attr('src', 'http://localhost:8000/static/images/arrow.png');
                        myScroll.refresh();
                    }
                })
            }

            // 为防止上拉高度不足 topSize, 去刷新页面
            var self = this;
            var maxY = this.maxScrollY - this.y;
            if (maxY > -topSize && maxY < 0) {
                myScroll.scrollTo(0, self.maxScrollY + topSize);
                foot.removeClass('down')
            } else if (maxY >= 0) {
                // foot.attr('src', 'http://fe.qfqp5.com:8000/static/images/ajax-loader.gif');
                foot.attr('src', 'http://localhost:8000/static/images/ajax-loader.gif');
                // ajax上拉加载数据
                $.ajax({
                    // url: '/api/listmore.php',
                    url: '/api/listmore.json',
                    // 之后添加的
                    dataType: "text",
                    data: {
                        pageNo: ++pageCount,
                        pageSize: opt.loadmoreSize
                    },
                    success: function (res) {
                        loadmorePoslist = template.render(opt.tpl, JSON.parse(res).content.data.page)
                        $('#main main ul li:last').before(loadmorePoslist)

                        // 复位
                        myScroll.refresh();
                        myScroll.scrollTo(0, self.y + topSize);
                        foot.removeClass('down');
                        // foot.attr('src', 'http://fe.qfqp5.com:8000/static/images/arrow.png');
                        foot.attr('src', 'http://localhost:8000/static/images/arrow.png');
                    }
                })
            }
        })
    }
}

/***/ })
/******/ ]);