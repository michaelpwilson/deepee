var fs = require("fs");
var vars = require("./functions/vars.js")

module.exports = (file, cb) => {
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
}