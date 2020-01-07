const ALL_BLOCKS = []
let canvasSize = prompt("Enter size");
const color = prompt("enter color");
let eraser = false;
let isPainting = false;
function createCanvasBlock() {
    let canvasBlock = document.createElement("td");
    canvasBlock.classList.add("canvas-box");
    return canvasBlock;
}
function createCanvas() {
    let canvas = document.getElementById("canvas");
    let row, canvasBlock;
    for (let i = 0; i < canvasSize; ++i) {
        row = document.createElement("tr");
        for (let j = 0; j < canvasSize; ++j) {
            canvasBlock = createCanvasBlock();
            row.appendChild(canvasBlock);
            ALL_BLOCKS.push(canvasBlock);
        }
        canvas.appendChild(row);
    }
    canvas.addEventListener("mousedown", () => isPainting = true);
    canvas.addEventListener("mouseup", () => isPainting = false);
    canvas.addEventListener("mouseleave", () => isPainting = false);
    return canvas; 
}
function paint() {
    if (isPainting) {
        this.style.backgroundColor = color;
    }
}
const canvas = createCanvas();
document.body.appendChild(canvas);
if (!eraser) {
    ALL_BLOCKS.forEach(block => 
        block.addEventListener("mouseover", paint)
    );
}


