function factorial(n) {
    if (typeof (n) != 'Number') return "Error";
    let f = 1;
    while (n > 1) {
        f *= n--;
    }
    return f;
}
let f = factorial(5);
f();
alert(factorial("five")); // 5 * 4 * 3 * 2 * 1