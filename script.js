let canvas = document.getElementById('canvas');

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

let settings = new Settings();
