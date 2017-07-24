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
			self.canvas.generateGraph();
		});

		this.inputHeight = document.getElementById('input-height');
		this.inputHeight.addEventListener('input', function(e) {
			let val = e.target.value;
			self.canvas.setSize(self.canvas.canvas.width, val);
			self.canvas.generateGraph();
		});

		this.inputVertexSize = document.getElementById('input-vertex-size');
		this.canvas.vertexSize = this.inputVertexSize.value;
		this.inputVertexSize.addEventListener('input', function(e) {
			let val = e.target.value;
			self.canvas.vertexSize = val;
			self.canvas.generateGraph();
		});

		this.inputVertexAmount = document.getElementById('input-vertex-amount');
		this.canvas.vertexAmount = this.inputVertexAmount.value;
		this.inputVertexAmount.addEventListener('input', function(e) {
			let val = e.target.value;
			self.canvas.vertexAmount = val;
			self.canvas.generateGraph();
		});
	}

	getWidth() {
		return this.inputWidth.value;
	}

	getHeight() {
		return this.inputHeight.value;
	}
}

class Vertex {
	constructor(canvas) {
		this.canvas = canvas;

		this.x = this.getRandomX();
		this.y = this.getRandomY();
		this.radius = this.canvas.vertexSize;
		this.color = '#000';
	}

	getRandomX() {
		return Math.floor(Math.random() * this.canvas.canvas.width + 1);
	}

	getRandomY() {
		return Math.floor(Math.random() * this.canvas.canvas.height + 1);
	}

	draw(context) {
		context.beginPath();
		context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		context.fill();
	}
}

class Edge {

}

class Canvas {
	constructor() {
		this.canvas = document.getElementById('canvas');
		//defaults
		this.canvas.width = 1000;
		this.canvas.height = 1000;
		this.canvas.style.width = 1000 + 'px';
		this.canvas.style.height = 1000 + 'px';

		this.context = this.canvas.getContext('2d');

		this.wrapper = document.getElementById('canvas-wrapper');

		this.vertices = [];
		this.edges = [];
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

	generateGraph() {
		this.clear();

		this.vertices = [];

		for (let i = 0; i < this.vertexAmount; i++) {
			this.vertices.push(new Vertex(this));
		}

		this.draw(this.context);
	}

	draw(context) {
		for (let i = 0; i < this.vertices.length; i++) {
			let vertex = this.vertices[i];
			vertex.draw(context);
		}
	}

	clear() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
}

let canvas = new Canvas();
let settings = new Settings(canvas);

let width = settings.getWidth();
let height = settings.getHeight();
canvas.setSize(width, height);

canvas.generateGraph();

window.addEventListener('resize', function() {
	canvas.calculateVisualSize(canvas.canvas.width, canvas.canvas.height);
});
