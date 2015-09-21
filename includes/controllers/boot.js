/**
 * Created by zhangran on 15/9/21.
 */

var express = require('express');
var      fs = require('fs');


module.exports = function(parent,config){

    fs.readdirSync(__dirname).forEach(function(name){
        //忽略boot.js
        if('boot.js' === name){
            return;
        }

        console.log(name);

        var controller = require('./' + name + '/index');
        var prefix = controller.prefix || '';
        var name = controller.name || name;
        var app = express();

        var handler;
        var method;
        var path;

        if (controller.engine) app.set('view engine', controller.engine);
        app.set('views', __dirname + '/' + name + '/views');

        for (var key in controller) {
            // "reserved" exports
            if (~['name', 'prefix', 'engine', 'before'].indexOf(key)) continue;
            // route exports
            switch (key) {
                case 'show':
                    method = 'get';
                    path = '/' + name + '/:' + name + '_id';
                    break;
                case 'list':
                    method = 'get';
                    path = '/' + name + 's';
                    break;
                case 'edit':
                    method = 'get';
                    path = '/' + name + '/:' + name + '_id/edit';
                    break;
                case 'update':
                    method = 'put';
                    path = '/' + name + '/:' + name + '_id';
                    break;
                case 'create':
                    method = 'post';
                    path = '/' + name;
                    break;
                case 'index':
                    method = 'get';
                    path = '/';
                    break;
                default:
                    /* istanbul ignore next */
                    throw new Error('unrecognized route: ' + name + '.' + key);
            }

            handler = controller[key];
            path = prefix + path;

            if (controller.before) {
                app[method](path, controller.before, handler);
                console.log('     %s %s -> before -> %s', method.toUpperCase(), path, key);
            } else {
                app[method](path, handler);
                console.log('     %s %s -> %s', method.toUpperCase(), path, key);
            }
        }

        //挂载到应用上
        parent.use(app);
    });

};