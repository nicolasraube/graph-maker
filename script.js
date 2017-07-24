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
		//defaults
		this.canvas.width = 300;
		this.canvas.height = 300;
		this.canvas.style.width = 300 + 'px';
		this.canvas.style.height = 300 + 'px';

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

	calculateVisualSize(width, height) {
		this.setVisualSize(width, height);
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

let settings = new Settings();
let canvas = new Canvas();

let width = settings.getWidth();
let height = settings.getHeight();
canvas.setResolution(width, height);
canvas.calculateVisualSize(width, height);

//console.log(wrapper.getBoundingClientRect().height);
