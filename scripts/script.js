let paintColor = "red";
let backgroundColor = "white";
let canvasSize = 10;
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
/** Updates canvas to match configuration according to settings. */
function updateCanvas() {
    removeChildrenById("canvas");
    let canvas = document.getElementById("canvas");
    let row, canvasBlock;
    for (let i = 0; i < canvasSize; ++i) {
        row = document.createElement("tr");
        for (let j = 0; j < canvasSize; ++j) {
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
    let canvas = updateCanvas();
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
    return tmp.color == colorStr;
}
/** Set global variables representing to values in settings form. */
function setSettings() {
    let newCanvasSize = document.getElementById("resolution").value;
    let valid = false;
    if (!isNaN(newCanvasSize) && newCanvasSize >= 2 && newCanvasSize <= 150) {
        canvasSize = newCanvasSize;
        valid = true;
    }
    let pColor = document.getElementById("paint-color").value;
    if (pColor && isColor(pColor)) {
        paintColor = pColor;
        valid = true;
    }
    let bgColor = document.getElementById("bg-color").value;
    if (bgColor && isColor(bgColor)) {
        backgroundColor = bgColor;
        valid = true;
    }
    if (valid) {
        updatePreview();
    }
    return valid;
}
function updatePreview() {
    paintPreview.style.backgroundColor = paintColor;
    backgroundPreview.style.backgroundColor = backgroundColor;
}
let canvas = createCanvas();
document.body.appendChild(canvas);
let settingsButton = document.getElementById("submit");
settingsButton.onclick = updateCanvas;
settingsButton.onkeyup = settingsButton.onkeydown = setSettings;

let paintPreview = document.getElementById("paint-preview");
let backgroundPreview = document.getElementById("background-preview");
paintPreview.onkeyup = paintPreview.onkeydown = updatePreview;
backgroundPreview.onkeyup = backgroundPreview.onkeyup = updatePreview;


