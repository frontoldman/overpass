/**
 * Created by zhangran on 15/9/22.
 */
var path = require('path');

module.exports = function (app, db) {

    app.all('/fake/*', function (req, res, next) {
        var body = req.body;
        var url = req.params[0];
        var query = req.query;
        var method = req.method;

        //读取文档
        db.getAll()
            .then(dealJsonData);

        //处理文档数据
        function dealJsonData(data){
            var jsonData = JSON.parse(data);

            for (var key in jsonData) {
                var apiObj = jsonData[key];
                if (apiObj.method.toLowerCase() === method.toLowerCase()
                    && apiObj.url.toLowerCase() === url.toLowerCase()) {
                    var generateValue = generateData(apiObj.returnValue);
                    return res.send(generateValue);
                }
            }

            next();
        }

        //生成返回值
        function generateData(value){
            var data;
            switch(value.type){
                case 'json':
                    data = {};
                    break;
            }

            return data;
        }

    });


};