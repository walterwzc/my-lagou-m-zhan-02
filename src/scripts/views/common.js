var indexTpl = require('../../templates/home.html')
var searchTpl = require('../../templates/search.html')
var mineTpl = require('../../templates/mine.html')

var poslistTpl = require('../../templates/poslist.html')

var home = require('./home')
var scrollUtil = require('../utils/iscroll.util.js')

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