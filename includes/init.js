/**
 * Created by zhangran on 15/9/21.
 */

var               s = require('fs');
var            path = require('path');
var          config = require('../config');
var              Db = require('./db/');
var bootControllers = require('./controllers/boot');

function init(app) {

    var db = new Db(config);

    bootControllers(app,config);

    //db.getDb()
    //    .then(function (data) {
    //        return JSON.parse(data);
    //    })
    //    .then(function (data) {
    //
    //    })
    //    .fail(function (error) {
    //        console.error(error);
    //    })

    global.db = db;

}


module.exports = init;