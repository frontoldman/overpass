(function(window,document){
    // create the editor
    var editor = initEditor();

    //初始化json编辑器
    function initEditor(){
        var container = document.getElementById("jsoneditor");
        var topActionHeight = $('.top-action').height();
        container.style.height = (window.innerHeight - topActionHeight) + 'px';

        var editor = new JSONEditor(container);

        // set json
        var json = {
            '公司列表':{
                url:'api/v1/x',
                description:'公司列表',
                method:'GET',
                params:{
                    'name':{
                        type:'Int',
                        default:1,
                        isNull:true
                    },
                    'age':{
                        type:'String',
                        default : '',
                        isNull : false
                    }
                },
                returnValue:{
                    type:'json',
                    value:{
                        code:{
                            type:'Int',
                            description:'错误码'
                        },
                        data:{
                            type:'Array',
                            description:'公司列表',
                            listValue:{
                                type:'Object',
                                description:'单条列表值',
                                value:{
                                    name:{
                                        type:'String',
                                        description:'公司名称',
                                        size:'5-10'
                                    },
                                    status:{
                                        type:'Enum',
                                        description:'公司状态,1:开张，2:倒闭，3:Z轮，4:W轮',
                                        size:[1,2,3,4]
                                    }
                                }
                            }
                        },
                        totalPage:{
                            type:'Int',
                            description:'总页数'
                        }

                    }
                }
            }
        };

        editor.set(json);

        //['tree','code', 'form', 'text', 'view']
        var modes = ['tree','code','text'],
            mode = 0,
            changeMode = document.getElementById('changeMode');

        changeMode.onclick = function(){
            mode = ++mode%modes.length;
            console.log(modes[mode]);
            editor.setMode(modes[mode]);
        };

        return editor;
    }



})(window,document)