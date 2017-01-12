module.exports = (file, content, cb, write) => {
    var tmp = "";

    for(variable in content.variables) {
        tmp += "var " + variable + " = " + JSON.stringify(content.variables[variable]);
    }

    for(func in content.functions) {
        tmp += "function " + func + "(" + content.functions[func].params.toString() + ") { }";
    }

    if(write !== false) {
        var fs = require("fs");
        var beautify = require('js-beautify').js_beautify;
        
        fs.writeFileSync(file, beautify(tmp, { indent_size: 2 }), 'utf-8');
    }

    if(typeof cb === "function") cb(null, content);
}