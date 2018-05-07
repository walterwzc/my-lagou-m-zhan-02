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