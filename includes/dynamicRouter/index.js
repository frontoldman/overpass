/**
 * Created by zhangran on 15/9/22.
 */
var path = require('path');

module.exports = function (app,db) {


    db.getAll()
        .then(function (data) {
            var jsonData = JSON.parse(data);

            for(var key in jsonData){

                console.log(key);

                var apiObj = jsonData[key];

                var url = apiObj.url || '';
                var method = apiObj.method || 'get';

                url = path.join('/overpass/fake/' + url);
                method = method.toLowerCase();

                console.log('   %s %s',method.toUpperCase(),url);

                //app.get('/ha',function(req,res){
                //    res.send('haha');
                //})

                //app[method](url,function(req,res,next){
                //    res.send('haha');
                //})

            }

        })
};