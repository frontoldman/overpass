/**
 * Created by zhangran on 15/9/21.
 */

exports.before = function(req, res, next){
    var id = req.params.doc_id;
    if (!id) return next();
    next();
};

exports.list = function(req, res, next){
    res.format({
        html: function(){
            res.render('list',{});
        },
        text: function(){
            res.send('text');
        },
        json: function(){
            res.json({});
        }
    });
};

exports.edit = function(req, res, next){
    res.render('edit', { user: req.user });
};

exports.show = function(req, res, next){
    res.render('show', { user: req.user });
};

exports.update = function(req, res, next){
    var body = req.body;
    req.user.name = body.user.name;
    res.message('Information updated!');
    res.redirect('/user/' + req.user.id);
};
