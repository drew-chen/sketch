const ALL_BLOCKS = []
let canvasSize = 10;
let paintColor = "red";
let backgroundColor = "white";
let eraser = false;
let isPainting = false;
function createCanvasBlock() {
    let canvasBlock = document.createElement("td");
    canvasBlock.classList.add("canvas-box");
    return canvasBlock;
}
function resizeCanvas() {
    let canvas = document.getElementById("canvas");
    let row, canvasBlock;
    for (let i = 0; i < canvasSize; ++i) {
        row = document.createElement("tr");
        for (let j = 0; j < canvasSize; ++j) {
            canvasBlock = createCanvasBlock();
            canvasBlock.style.backgroundColor = backgroundColor;
            row.appendChild(canvasBlock);
            ALL_BLOCKS.push(canvasBlock);
        }
        canvas.appendChild(row);
    } 
    return canvas;
}
function createCanvas() {
    let canvas = resizeCanvas();
    canvas.addEventListener("mousedown", () => isPainting = true);
    canvas.addEventListener("mouseup", () => isPainting = false);
    canvas.addEventListener("mouseleave", () => isPainting = false);
    return canvas;
}
function paint() {
    if (isPainting) {
        this.style.backgroundColor = paintColor;
    }
}
let canvas = createCanvas();
document.body.appendChild(canvas);
if (!eraser) {
    ALL_BLOCKS.forEach(block => 
        block.addEventListener("mouseover", paint)
    );
}


