var express = require('express');
var usermodel=require('../model/user.js').user;
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.render表示调用模版引擎解析名字index的模板，传并传入了title和users两个对象做为参数；
  res.render('users', { title: 'Express-users',users:[1,2,4,5] });
});
router.get('/adduser', function(req, res) {
  res.render('adduser', { title: 'Add New User' });
});
router.post('/add', function(req, res) {

  // Get our form values. These rely on the "name" attributes
  var userName = req.body.username;
  var userage = req.body.age;

  var thor = new usermodel({
    username: userName,
    age: userage
  });
  thor.save(function (err, thor) {
    if (err) return console.log(err);
    console.log(thor);
    var items = {
      status: '0000'
    }
    usermodel.find(function (err, fb) {
      if (err) return console.err(fb);
      console.log(fb);
      res.render('users', { title: 'Express-users-添加成功',users:fb });
    });

  });
});

module.exports = router;
