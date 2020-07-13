function factorial(n) {
    var f = 1;
    while (n > 1) {
        f *= (n--);
    }
    return f;
}
var v = factorial("5");
//f();
alert(v); // 5 * 4 * 3 * 2 * 1
