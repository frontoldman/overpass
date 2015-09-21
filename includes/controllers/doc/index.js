/**
 * Created by zhangran on 15/9/21.
 */



exports.before = function (req, res, next) {
    var id = req.params.doc_id;
    if (!id) return next();
    next();
};

exports.list = function (req, res, next) {
    var db = global.db;
    res.format({
        html: function () {
            res.render('list', {});
        },
        text: function () {
            res.send('text');
        },
        json: function () {

            db.getAll()
                .then(function (data) {
                    res.json(JSON.parse(data));
                })
                .fail(next)
        }
    });
};

exports.edit = function (req, res, next) {
    res.render('edit', {user: req.user});
};

exports.show = function (req, res, next) {
    res.render('show', {user: req.user});
};

exports.update = function (req, res, next) {
    var db = global.db;
    var jsonData = req.body['data'];

    db.save(jsonData)
        .then(function () {
            res.json({
                code: 1000
            });
        })
        .fail(next)

};
