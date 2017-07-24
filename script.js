class Settings {
	constructor(canvas) {
		this.canvas = canvas;
		this.initElements();
	}

	initElements() {
		let self = this;

		this.inputWidth = document.getElementById('input-width');
		this.inputWidth.addEventListener('input', function(e) {
			let val = e.target.value;
			self.canvas.setSize(val, self.canvas.canvas.height);
		});

		this.inputHeight = document.getElementById('input-height');
		this.inputHeight.addEventListener('input', function(e) {
			let val = e.target.value;
			self.canvas.setSize(self.canvas.canvas.width, val);
		});
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

	setSize(width, height) {
		this.setResolution(width, height);
		this.calculateVisualSize(width, height);
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

		let widthFactor = maxWidth / width;
		let heightFactor = maxHeight / height;

		if (width === maxWidth) {
			height = maxHeight;
			width *= heightFactor;
		} else if (height === maxHeight) {
			width = maxWidth;
			height *= widthFactor;
		} else if (maxWidth >= maxHeight) {
			width = maxWidth;
			height *= widthFactor;
			if (height > maxHeight) {
				this.calculateVisualSize(width, height);
				return;
			}
		} else {
			height = maxHeight;
			width *= heightFactor;
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

let canvas = new Canvas();
let settings = new Settings(canvas);

let width = settings.getWidth();
let height = settings.getHeight();
canvas.setSize(width, height);

window.addEventListener('resize', function() {
	canvas.calculateVisualSize(canvas.canvas.width, canvas.canvas.height);
});
