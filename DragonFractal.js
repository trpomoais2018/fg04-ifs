function getPixelsForDragonFractal(iterCount, seed) {
    let random = new Random(seed);
    let x = 1;
    let y = 0;
    let pixels = new Pixels();
    for (let i = 0; i < iterCount; i++) {
        let rand = random.nextInt(2);
        let dx = (x * Math.cos(Math.PI / 4 + Math.PI / 2 * rand) 
            - y * Math.sin(Math.PI / 4 + Math.PI / 2 * rand)) / Math.sqrt(2) + rand;
        let dy = (x * Math.sin(Math.PI / 4 + Math.PI / 2 * rand) 
            + y * Math.cos(Math.PI / 4 + Math.PI / 2 * rand)) / Math.sqrt(2);
        pixels.setPixel(dx, dy);
        x = dx;
        y = dy;
    }
    return pixels;
}

//Don't ask me for this
function Random(seed) {
    this._seed = seed % 2147483647;
    if (this._seed <= 0) this._seed += 2147483646;
}
  
Random.prototype.next = function () {
    return this._seed = this._seed * 16807 % 2147483647;
};

Random.prototype.nextInt = function (max) {
    return this.next() % max;
};