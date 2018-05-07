var layoutTpl = require('../templates/layout.html')
var headerTpl = require('../templates/header.html')
var footerTpl = require('../templates/footer.html')
var mainTpl = require('../templates/main.html')

var common = require('./views/common')

// 页面预渲染
$('#root').html(layoutTpl)
$('.container').html(headerTpl + mainTpl + footerTpl)

// 动态页面装载 #路由
common.render()

// 页面（tab）切换
// common.changeTab()
