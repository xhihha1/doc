

    function sum(a, b) {
    return a + b;
    }

    console.log(sum.toString());
    // expected output: "function sum(a, b) {
    //                     return a + b;
    //                   }"



You could use the Function constructor to avoid creating a global variable:  

    var func = Function("return " + so.actions[i].func)();

This is equivalent to:  

    var func = eval("(function () { return " + so.actions[i].func + " })()");