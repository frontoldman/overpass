/**
 * Created by zhangran on 15/9/21.
 */

var     fs = require('fs');
var   path = require('path');
var config = require('../config');
var     Db = require('./db/');

function init(app) {
    var db = new Db(config);
    db.getDb()
        .then(function (data) {
            return JSON.parse(data);
        })
        .then(function (data) {

        })
        .fail(function (error) {
            console.error(error);
        })

}


module.exports = init;