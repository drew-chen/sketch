let paintColor = "red";
let backgroundColor = "white";
let canvasSize = 10;
let eraser = false;
let isPainting = false;

/**
 * Constructs a paintable block.
 */
function createCanvasBlock() {
    let canvasBlock = document.createElement("td");
    canvasBlock.classList.add("canvas-box");
    return canvasBlock;
}
/**
 * Removes all children elements from a given element.
 * 
 * @param {string} elementId The name of the element.
 */
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
/** Sets up the canvas' event listeners for the first time. */
function createCanvas() {
    let canvas = updateCanvas();
    canvas.addEventListener("mousedown", () => isPainting = true);
    canvas.addEventListener("click", () => isPainting = false);
    canvas.addEventListener("mouseleave", () => isPainting = false);
    return canvas;
}
/** Paints a canvas box. */
function paint() {
    if (isPainting) {
        this.style.backgroundColor = paintColor;
    }
}
/**
 * Returns whether the given color is a valid color in CSS.
 * 
 * @param {string} colorStr The CSS color value.
 */
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
    let newPColor = document.getElementById("paint-color").value;
    if (newPColor && isColor(newPColor)) {
        paintColor = newPColor;
        valid = true;
    }
    let newBgColor = document.getElementById("bg-color").value;
    if (newBgColor && isColor(newBgColor)) {
        backgroundColor = newBgColor;
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


