var beautify = require('js-beautify').js_beautify
var fs = require("fs");

function vars(input) {
    var tmp = {};
    var variables = input.split("var");

    variables = variables.slice(1, variables.length);

    variables.forEach((item, key) => {
        var splt = item.split("=");
        var varname = splt[0];
        var varvalue = splt[1].replace(";", "");

        try {
            tmp[varname.trim()] = JSON.parse(varvalue);
        }
        catch(e) {
            tmp[varname.trim()] = varvalue;
        }
    });

    return tmp;
}

module.exports = {
    read: (file, cb) => {
        fs.readFile(file, 'utf-8', (err, content) => {
            var tmp = { functions: { }, variables: {} };

            // get functions
            var functions = content.split("function");

            functions.forEach((element) => {
                var fnc = element.split(") {");

                if(fnc.length > 1) {
                    if(element.split("var").length > 1) {
                        tmp.variables = vars(element);
                    }

                    var fncname = fnc[0].split("(");

                    var name = fncname[0].trim();
                    var params = fncname[1];

                    tmp.functions[name] = {
                        params: []
                    };

                    params.split(",").forEach((prm) => {
                        tmp.functions[name].params.push(prm.trim());
                    }, this);
                } else {
                   tmp.variables = vars(fnc[0]);
                }
            });

            if(typeof cb === "function") cb(null, tmp);
        });
    },
    write: (file, content, cb, write) => {
        var tmp = "";
    
        for(variable in content.variables) {
            tmp += "var " + variable + " = " + JSON.stringify(content.variables[variable]);
        }

        for(func in content.functions) {
            tmp += "function " + func + "(" + content.functions[func].params.toString() + ") { }";
        }

        if(write !== false) {
            fs.writeFileSync(file, beautify(tmp, { indent_size: 2 }), 'utf-8');
        }

        if(typeof cb === "function") cb(null, content);
    }
};