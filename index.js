/**
 * Created by zhangran on 15/9/19.
 */

/**
 *  引入Module
  * @type {*|exports|module.exports}
 */
var express    = require('express');
var initModule = require('./includes/init');

//创建实例应用
var app = express();

//设置模版引擎
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//静态资源目录
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));

app.get('/',function(req,res){
    res.render('index');
});

//500
app.use(function(err, req, res, next){
    if (!module.parent) console.error(err.stack);
    res.status(500).render('500');
});

//404
app.use(function(req, res, next){
    res.status(404).render('404', { url: req.originalUrl });
});

initModule(app);

/* istanbul ignore next */
if (!module.parent) {
    app.listen(3000);
    console.log('Express started on port 3000');
}