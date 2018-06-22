let canvas = document.getElementById('canv');
let ctx = canvas.getContext("2d");

const scaleFactor = 250;
ctx.transform(scaleFactor, 0, 0, scaleFactor, canvas.width / 2, canvas.height / 2);


const transforms = [p => {
    return {
        x: p.x * 0.5 + p.y * 0.5,
        y: -p.x * 0.5 + p.y * 0.5
    }
} ,
    p => {
        return {
            x: -p.x * 0.5 + p.y * 0.5 - 1,
            y: -p.x * 0.5 - p.y * 0.5
        }
    }]

    
const drawDragon = (depth, prevPoint) => {
    if (depth <= 0) return;

    let p1 = transforms[0](prevPoint);
    let p2 = transforms[1](prevPoint);

    drawPoint(p1);
    drawPoint(p2);

    drawDragon(depth - 1, p1);
    drawDragon(depth - 1, p2);
}

const drawPoint = p => ctx.fillRect(p.x, p.y, 1 / scaleFactor, 1 / scaleFactor);
drawDragon(17, {x: 0, y: 0});