class Settings {
  constructor() {
    this.initElements();
  }

  initElements() {
    this.inputWidth = document.getElementById('input-width');
    this.inputHeight = document.getElementById('input-height');
  }

  getWidth() {
    return this.inputWidth.value;
  }

  getHeight() {
    return this.inputHeight.value;
  }
}

class Canvas {
  constructor() {
    this.canvas = document.getElementById('canvas');
    this.context = this.canvas.getContext('2d');
  }

  setResolution(width, height) {
    this.setResWidth(width);
    this.setResHeight(height);
  }

  setResWidth(width) {
    this.canvas.width = width;
  }

  setResHeight(height) {
    this.canvas.height = height;
  }

  setVisualSize(width, height) {
    this.setVisualWidth(width);
    this.setVisualHeight(height);
  }

  setVisualWidth(width) {
    this.canvas.style.width = width + 'px';
  }

  setVisualHeight(height) {
    this.canvas.style.height = height + 'px';
  }
}

let canvas = new Canvas();
let settings = new Settings();
canvas.setResolution(settings.getWidth(), settings.getHeight());
canvas.setVisualSize(settings.getWidth(), settings.getHeight());
