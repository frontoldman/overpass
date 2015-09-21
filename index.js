/**
 * Created by zhangran on 15/9/19.
 */

/**
 *  引入Module
  * @type {*|exports|module.exports}
 */
var    express = require('express');
var     logger = require('morgan');
var    session = require('express-session');
var bodyParser = require('body-parser');
var initModule = require('./includes/init');

//创建实例应用
var app = express();

//设置模版引擎
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


app.response.message = function (msg) {
    // 引用session
    var sess = this.req.session;
    // simply add the msg to an array for later
    sess.messages = sess.messages || [];
    sess.messages.push(msg);
    return this;
};


//日志
if (!module.parent) app.use(logger('dev'));

//静态资源目录
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'overpass'
}));

// parse request bodies (req.body)
app.use(bodyParser.urlencoded({ extended: true }));

initModule(app);

app.get('/', function (req, res, next) {
    res.render('index');
});

//500
app.use(function (err, req, res, next) {
    if (!module.parent) console.error(err.stack);
    res.status(500).render('500');
});


//404
app.use(function (req, res, next) {
    res.status(404).render('404', {url: req.originalUrl});
});

/* istanbul ignore next */
if (!module.parent) {
    app.listen(3000);
    console.log('Express started on port 3000');
}


