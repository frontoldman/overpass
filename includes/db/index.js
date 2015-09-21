/**
 * Created by zhangran on 15/9/21.
 */

var fs = require('fs');
var  Q = require('q');

function Db(config){
    this.config = config;
}

Db.prototype.getAll = function(){
    var config = this.config;
    return Q.nfcall(fs.readFile, config.document_path, "utf-8");
};

Db.prototype.save = function(jsonText){
    var config = this.config;
    return Q.nfcall(fs.writeFile, config.document_path, jsonText , "utf-8");
}

module.exports = Db;