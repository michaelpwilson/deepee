module.exports = (input) => {
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