/**
 * Created by zhangran on 15/9/22.
 */
var path = require('path');
var Mock = require('mockjs');

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
        function dealJsonData(data) {
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
        function generateData(returnValue) {
            var data;
            switch (returnValue.type.toLowerCase()) {
                case 'object':
                case 'json':
                    data = {};
                    var value = returnValue.value;
                    for (var key in value) {
                        if (value.hasOwnProperty(key)) {
                            data[key] = generateData(value[key]);
                        }
                    }
                    break;
                case 'string':
                    data = Mock.Random.string('lower',1,10)
                        + Mock.Random.string('number',1,3)
                        + Mock.Random.string('lower',1,10);
                    break;
                case 'int':
                    data = Mock.Random.integer(1, 100);
                    break;
                case 'array':
                    data = [];
                    var size = Mock.Random.integer(5, 1000);
                    for (var i = 0; i < size; i++) {
                        data.push(generateData(returnValue.value));
                    }
                    break;

            }

            return data;
        }

    });


};