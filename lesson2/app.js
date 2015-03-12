var express = require('express');
var u = require('utility');
console.log('u=' + u);
var app = express();
/**
 * 路径问题是个难点
 */
console.log('app=' + app);
app.get('/', function (req, res) {
    console.log('req=' + req);
    console.log('res=' + res);
    var q = '';
    if (req.query.q) {
        q = req.query.q;
    }
    var md5Value = u.sha1(q);
    res.send(md5Value);

})
app.listen(3000, function (req, res) {
    console.log('app is running at port 3000');
});