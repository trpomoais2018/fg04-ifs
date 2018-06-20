class Pixels {

  constructor() {
    this.pixelsCollection = [];
  }

  setPixels(x, y) {
    this.pixelsCollection.push({ x: x, y: y });
  }

  drawDragonFractal(image, size) {
    if (this.pixelsCollection.length === 0) return;
    const maxX = this.max((p) => p.x);
    const maxY = this.max((p) => p.y);
    const minX = this.min((p) => p.x);
    const minY = this.min((p) => p.y);
    const width = maxX - minX;
    const height = maxY - minY;
    const scaleX = (image.width - 20) / width;
    const scaleY = (image.height - 20) / height;
    const scale = Math.min(scaleX, scaleY);
    for (let pixel of this.pixelsCollection) {
      let x = (pixel.x - minX - width / 2) * scale + image.width / 2.0;
      let y = (pixel.y - minY - height / 2) * scale + image.height / 2.0;
      x = Math.ceil(x);
      y = Math.ceil(y);
      this.putColor(image, x, y, size.width);
    }
    return image;
  }

  setPixel(x, y) {
    this.pixelsCollection.push({ x: x, y: y });
  }

  putColor(image, x, y, width) {
    image.data[4 * (x + width * y) + 0] = 125;
    image.data[4 * (x + width * y) + 1] = 125;
    image.data[4 * (x + width * y) + 2] = 125;
    image.data[4 * (x + width * y) + 3] = 255;
    return image;
  }

  max(selector) {
    let max = Number.MIN_SAFE_INTEGER;
    for (let pixel of this.pixelsCollection) {
      let element = selector(pixel);
      if (element > max) {
        max = element;
      }
    }
    return max;
  }

  min(selector) {
    let min = Number.MAX_SAFE_INTEGER;
    for (let pixel of this.pixelsCollection) {
      if (selector(pixel) < min) {
        min = selector(pixel);
      }
    }
    return min;
  }
}

function getDragonFractal(image, size) {
  const iterCount = 100000;
  let x = 1.0;
  let x1 = 0.0;
  let y = 0.0;
  let y1 = 0.0;
  const angle45 = Math.PI / 4;
  const pixels = new Pixels();
  for (let i = 0; i < iterCount; i++) {
    const rnd = Math.random() > 0.5 ? 1 : 0;
    x1 = (x * Math.cos(angle45 + Math.PI / 2 * rnd)
      - y * Math.sin(angle45 + Math.PI / 2 * rnd)) / Math.sqrt(2) + 1 * rnd;
    y1 = (x * Math.sin(angle45 + Math.PI / 2 * rnd)
      + y * Math.cos(angle45 + Math.PI / 2 * rnd)) / Math.sqrt(2);
    x = x1;
    y = y1;
    pixels.setPixel(x, y);
  }
  return pixels.drawDragonFractal(image, size);
}