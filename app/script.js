class Settings {
	constructor(canvas) {
		this.canvas = canvas;
		this.initElements();
	}

	initElements() {
		let self = this;

		/* buttons */

		let btnRegenerate = document.getElementById('btn-regenerate');
		btnRegenerate.addEventListener('click', function(e) {
			self.canvas.generateGraph();
		});

		let btnDownload = document.getElementById('btn-download');
		btnDownload.addEventListener('click', function(e) {
			alert("Please right click on the image and select \"Save image as...\"");
		});

		/* left settings column */

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

		let inputVertexSize = document.getElementById('input-vertex-size');
		this.canvas.vertexSize = inputVertexSize.value;
		inputVertexSize.addEventListener('input', function(e) {
			let val = e.target.value;
			self.canvas.vertexSize = val;
			self.canvas.generateGraph();
		});

		let inputVertexAmount = document.getElementById('input-vertex-amount');
		this.canvas.vertexAmount = inputVertexAmount.value;
		inputVertexAmount.addEventListener('input', function(e) {
			let val = e.target.value;
			self.canvas.vertexAmount = val;
			self.canvas.generateGraph();
		});

		let inputVertexNeighborRadius = document.
			getElementById('input-vertex-neighbor-radius');
		this.canvas.vertexNeighborRadius = inputVertexNeighborRadius.value;
		inputVertexNeighborRadius.addEventListener('input', function(e) {
			let val = e.target.value;
			self.canvas.vertexNeighborRadius = val;
			self.canvas.generateGraph();
		});

		let inputEdgeWidth = document.getElementById('input-edge-width');
		this.canvas.edgeWidth = inputEdgeWidth.value;
		inputEdgeWidth.addEventListener('input', function(e) {
			let val = e.target.value;
			self.canvas.edgeWidth = val;
			self.canvas.generateGraph();
		});


		/* right settings column */

		let inputBackgroundColor = document.
			getElementById('input-background-color');
		this.canvas.backgroundColor = inputBackgroundColor.value;
		inputBackgroundColor.addEventListener('change', function(e) {
			let val = e.target.value;
			self.canvas.backgroundColor = val;
			self.canvas.generateGraph();
		});

		let inputVertexColor = document.getElementById('input-vertex-color');
		this.canvas.vertexColor = inputVertexColor.value;
		inputVertexColor.addEventListener('change', function(e) {
			let val = e.target.value;
			self.canvas.vertexColor = val;
			self.canvas.generateGraph();
		});

		let inputEdgeColor = document.getElementById('input-edge-color');
		this.canvas.edgeColor = inputEdgeColor.value;
		inputEdgeColor.addEventListener('change', function(e) {
			let val = e.target.value;
			self.canvas.edgeColor = val;
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
		this.neighborRadius = this.canvas.vertexNeighborRadius;
		this.color = this.canvas.vertexColor;
	}

	getRandomX() {
		return Math.floor(Math.random() * (this.canvas.canvas.width-this.canvas.vertexSize) + this.canvas.vertexSize);
	}

	getRandomY() {
		return Math.floor(Math.random() * (this.canvas.canvas.height-this.canvas.vertexSize) + this.canvas.vertexSize);
	}

	draw(context) {
		context.beginPath();
		context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		context.fillStyle = this.color;
		context.fill();
	}

	getNeighbors(vertices) {
		let neighbors = [];
		for (let i = 0; i < vertices.length; i++) {
			let vertex = vertices[i];
			if (this.isNeighbor(vertex) && !this.isConnectedTo(vertex)) {
				neighbors.push(vertex);
			}
		}
		return neighbors;
	}

	isNeighbor(vertex) {
		if (Math.sqrt(Math.abs(this.x - vertex.x) + Math.abs(this.y - vertex.y))
				<= this.neighborRadius) {
			return true;
		}

		return false;
	}

	isConnectedTo(vertex) {
		for (let i = 0; i < this.canvas.edges.length; i++) {
			let edge = this.canvas.edges[i];
			if (edge.getOtherVertex(this) === vertex) {
				return true;
			}
		}

		return false;
	}
}

class Edge {
	constructor(vertex1, vertex2, canvas) {
		this.x1 = vertex1.x;
		this.y1 = vertex1.y;
		this.x2 = vertex2.x;
		this.y2 = vertex2.y;
		this.color = canvas.edgeColor;
		this.width = canvas.edgeWidth;
	}

	draw(context) {
		context.beginPath();
		context.moveTo(this.x1, this.y1);
		context.lineTo(this.x2, this.y2);
		context.strokeStyle = this.color;
		context.lineWidth = this.width;
		context.stroke();
	}

	getOtherVertex(vertex) {
		if (vertex === this.vertex1) {
			return this.vertex2;
		} else if (vertex === this.vertex2) {
			return this.vertex1;
		}
	}
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

		this.edges = [];

		for (let i = 0; i < this.vertices.length; i++) {
			let vertex = this.vertices[i];
			let neighbors = vertex.getNeighbors(this.vertices);
			for (let j = 0; j < neighbors.length; j++) {
				let neighbor = neighbors[j];
				this.edges.push(new Edge(vertex, neighbor, this));
			}
		}

		this.draw(this.context);
	}

	draw(context) {
		context.fillStyle = this.backgroundColor;
		context.fillRect(0, 0, this.canvas.width, this.canvas.height);

		for (let i = 0; i < this.edges.length; i++) {
			let edge = this.edges[i];
			edge.draw(context);
		}
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
