(function(window,document){
    // create the editor
    var container = document.getElementById("jsoneditor");
    container.style.height = window.innerHeight + 'px';

    var editor = new JSONEditor(container);

    // set json
    var json = {
        "Array": [1, 2, 3],
        "Boolean": true,
        "Null": null,
        "Number": 123,
        "Object": {"a": "b", "c": "d"},
        "String": "Hello World"
    };
    editor.set(json);

    // get json
    var json = editor.get();

    var modes = ['tree','text'];
    var mode = 0;

    var changeMode = document.getElementById('changeMode');
    changeMode.onclick = function(){
        mode = ++mode%modes.length;
        console.log(mode);
        editor.setMode(modes[mode]);
    }

})(window,document)