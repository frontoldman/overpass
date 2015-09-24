(function (window, document) {
    // create the editor
    var app = window.app || {};

    var apiQ = getApi();

    initEditor();
    initSave();
    initApiShape();

    //初始化json编辑器
    function initEditor() {
        var container = document.getElementById("jsoneditor");
        var topActionHeight = $('.top-action').height();
        container.style.height = (window.innerHeight - topActionHeight) + 'px';

        var editor = new JSONEditor(container, {
            change: function () {
                //console.log(arguments);
            }
        });

        //['tree','code', 'form', 'text', 'view']
        var modes = ['tree', 'code', 'text'],
            mode = 0,
            changeMode = document.getElementById('changeMode');

        changeMode.onclick = function () {
            mode = ++mode % modes.length;
            editor.setMode(modes[mode]);
        };

        apiQ.done(function (data) {
            editor.set(data);
        });


        app.editor = editor;
        //return editor;
    }

    function initApiShape(){
        var template = $('#template').html();
        var shapeContent = $('#api-shape-list');

        apiQ.done(function (data) {
            console.log(data);

            var html = '';
            for(var key in data){
                html += juicer(template,{
                    data:data[key],
                    key:key
                });
            }

            shapeContent.append(html);
        });
    }

    //获取数据
    function getApi() {
        return $.ajax({
            url: '/docs',
            dataType: 'json'
        })
    }

    function initSave() {

        var editor = app.editor;
        var $saveBtn = $('#save');
        $saveBtn.on('click', function () {
            var jsonData = editor.get();
            store(jsonData)
                .done(function (data) {
                    if(data.code == 1000){
                        alert('保存成功');
                    }
                })
        });

        function store(data) {
            return $.ajax({
                url: '/doc/all',
                type: 'put',
                dataType: 'json',
                data:{
                    data:JSON.stringify(data)
                }
            })
        }
    }


})(window, document)