/**
 * Created by zhangran on 15/9/21.
 */

var               s = require('fs');
var            path = require('path');
var          config = require('../config');
var              Db = require('./db/');
var bootControllers = require('./controllers/boot');
var   dynamicRouter = require('./dynamicRouter/index');

function init(app) {

    var db = new Db(config);

    bootControllers(app,config);

    dynamicRouter(app,db);

    global.db = db;

}


module.exports = init;