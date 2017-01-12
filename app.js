var deepee = require("./index.js");

deepee.read('test.js', (err, content) => {
    console.log("[START] hello params: " + content.functions.hello.params);
    content.functions.hello.params.push("p3");

    deepee.write('test.js', content, (err) => {
        console.log("[FINISH] hello params: " + content.functions.hello.params);
    });
});