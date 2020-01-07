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
function updateCanvas(size, backgroundColor) {
    removeChildrenById("canvas");
    let canvas = document.getElementById("canvas");
    let row, canvasBlock;
    for (let i = 0; i < size; ++i) {
        row = document.createElement("tr");
        for (let j = 0; j < size; ++j) {
            canvasBlock = createCanvasBlock();
            canvasBlock.style.backgroundColor = backgroundColor;
            canvasBlock.addEventListener("mouseover", paint)
            row.appendChild(canvasBlock);
        }
        canvas.appendChild(row);
    }
    return canvas;
}
function createCanvas() {
    let canvas = updateCanvas(10, "white");
    canvas.addEventListener("mousedown", () => isPainting = true);
    canvas.addEventListener("click", () => isPainting = false);
    canvas.addEventListener("mouseleave", () => isPainting = false);
    return canvas;
}
function paint() {
    if (isPainting) {
        this.style.backgroundColor = paintColor;
    }
}
function isColor(colorStr) {
    let tmp = new Option().style;
    tmp.color = colorStr;
    return s.color == colorStr;
}
function setSettings() {
    let canvasSize = document.getElementById("resolution").value;
    let valid = false;
    if (!isNaN(canvasSize) && canvasSize >= 2 && canvasSize <= 150) {
        resizeCanvas(canvasSize);
        valid = true;
    }
    let color = document.getElementById("paint-color").value;
    if (color && isColor(color)) {

        valid = true;
    }
    return valid;
}
let canvas = createCanvas();
document.body.appendChild(canvas);
let settingsButton = document.getElementById("submit");
settingsButton.onclick = setSettings;



