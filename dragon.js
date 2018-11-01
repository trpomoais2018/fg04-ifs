var canvas = document.createElement('canvas');
document.body.insertBefore(canvas, document.body.firstChild);
canvas.style.position = 'fixed';
canvas.style.top = '0px';
canvas.style.left = '0px';
canvas.width = document.body.offsetWidth;
canvas.height = window.innerHeight;
var context = canvas.getContext('2d');
var rules = [
    {
        a: 0.5,
        b: 0.5,
        c: -0.5,
        d: 0.5,
        f: 0,
    },
    {
        a: -0.5,
        b: 0.5,
        c: -0.5,
        d: -0.5,
        f: -1,
    }
];
var x = Math.random();
var y = Math.random();
context.translate(canvas.width / 2, canvas.height / 2);
drawFractal(x, y, 999999999);
function drawFractal(x, y, n) {
    if (n > 0) {
        var rule = choseTrueRule();
        var newX = rule.a * x + rule.b * y + rule.f;
        var newY = rule.c * x + rule.d * y;
        context.fillRect(newX * 200, -newY * 200, 1, 1);
        drawFractal(newX, newY, --n);
    }
}
function choseTrueRule() {
    var rand = Math.random();
    if (rand < 0.5) {
        return rules[0];
    }
    return rules[1];
}