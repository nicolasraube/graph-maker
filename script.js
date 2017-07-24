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

		this.wrapper = document.getElementById('canvas-wrapper');
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
		let maxWidth = this.getWrapperWidth();
		let maxHeight = this.getWrapperHeight();

		if (width === maxWidth) {
			let factor = maxHeight / height;
			height = maxHeight;
			width = width * factor;
		} else if (height === maxHeight) {
			let factor = maxWidth / width;
			width = maxWidth;
			height = height * factor;
		} else	if (maxWidth >= maxHeight) {
			let factor = maxWidth / width;
			width = maxWidth;
			height = height * factor;

			if (height > maxHeight) {
				this.calculateVisualSize(width, height);
				return;
			}
		} else {
			let factor = maxHeight / height;
			height = maxHeight;
			width = width * factor;

			if (width > maxWidth) {
				this.calculateVisualSize(width, height);
				return;
			}
		}

		this.setVisualSize(width, height);
	}

	getWrapperWidth() {
		return this.wrapper.getBoundingClientRect().width;
	}

	getWrapperHeight() {
		return this.wrapper.getBoundingClientRect().height;
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
