const ALL_BLOCKS = []
let paintColor = "red";
let backgroundColor = "white";
let eraser = false;
let isPainting = false;
function createCanvasBlock() {
    let canvasBlock = document.createElement("td");
    canvasBlock.classList.add("canvas-box");
    return canvasBlock;
}
function removeChildrenById(elementId) {
    const parent = document.getElementById(elementId)
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild)
    }
}
function resizeCanvas(size) {
    removeChildrenById("canvas");
    let canvas = document.getElementById("canvas");
    let row, canvasBlock;
    for (let i = 0; i < size; ++i) {
        row = document.createElement("tr");
        for (let j = 0; j < size; ++j) {
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
    let canvas = resizeCanvas(10);
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
function setSettings() {
    let formCanvasSize = document.getElementById("resolution").value;
    if (formCanvasSize && !isNaN(formCanvasSize)) {
        resizeCanvas(formCanvasSize);
    }
}
let canvas = createCanvas();
document.body.appendChild(canvas);
if (!eraser) {
    ALL_BLOCKS.forEach(block => 
        block.addEventListener("mouseover", paint)
    );
}
let settingsButton = document.getElementById("submit");
settingsButton.onclick = setSettings;


