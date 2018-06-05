class Pixels {
    constructor(){
        this.pixelsSet = [];
        this.rectScreen = null;
    }

    setPixel(x, y) {
        if (this.rectScreen == null)
            this.rectScreen = {leftTop: {x: x, y: y}, rightBottom: {x: x, y: y}};
        if (this.rectScreen.leftTop.x > x) this.rectScreen.leftTop.x = x;
        if (this.rectScreen.leftTop.y > y) this.rectScreen.leftTop.y = y;
        if (this.rectScreen.rightBottom.x < x) this.rectScreen.rightBottom.x = x;
        if (this.rectScreen.rightBottom.y < y) this.rectScreen.rightBottom.y = y;
        this.pixelsSet.push({x: x, y: y});
    }

    drawOnContext(context, size) {
        if (this.pixelsSet.length == 0) return;
        let imageData = context.createImageData(size.width, size.height);
        let width = this.rectScreen.rightBottom.x - this.rectScreen.leftTop.x;
        let height = this.rectScreen.rightBottom.y - this.rectScreen.leftTop.y;
        let scaleX = (size.width - 20) / width;
        let scaleY = (size.height - 20) / height;
        let scale = Math.min(scaleX, scaleY);
        imageData = this.fillImageData(imageData, [0, 0, 0, 255], size);
        for (let pixel of this.pixelsSet) {
            let x = (pixel.x - this.rectScreen.leftTop.x - width / 2) * scale + size.width / 2;
            let y = (pixel.y - this.rectScreen.leftTop.y - height / 2) * scale + size.height / 2;
            imageData = this.putColor(imageData, y, x, size.width, [255, 255, 0, 255]);
        }
        context.putImageData(imageData, 0, 0);
    }

    fillImageData(imageData, color, size) {
        for (let i = 0; i < size.height; i++) {
            for (let j = 0; j < size.width; j++) {
                imageData = this.putColor(imageData, i, j, size.width, color);
            }
        }
        return imageData;
    }

    putColor(imageData, y, x, width, color) {
        y = Math.ceil(y);
        x = Math.ceil(x);
        imageData.data[4 * (x + width * y) + 0] = color[0];
        imageData.data[4 * (x + width * y) + 1] = color[1];
        imageData.data[4 * (x + width * y) + 2] = color[2];
        imageData.data[4 * (x + width * y) + 3] = color[3];
        return imageData;
    }
}