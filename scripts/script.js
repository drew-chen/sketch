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
            if (backgroundColor.localeCompare("rainbow") == 0) {
                canvasBlock.classList.add("rainbow");
            } else {
                canvasBlock.classList.remove("rainbow");
                canvasBlock.style.backgroundColor = backgroundColor;
            }
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
/** Generates random colors. */
function getRandomColor() {
    return '#'+(Math.random()*0xFFFFFF|0).toString(16);
}
/** Paints or erases a canvas box. */
function paint() {
    if (isPainting) {
        if (eraser) {
            this.style.backgroundColor = backgroundColor;
        } else {
            this.classList.remove("rainbow");
            if (paintColor.localeCompare("rainbow") == 0) {
                this.style.backgroundColor = getRandomColor();
            } else { 
                this.style.backgroundColor = paintColor;
            }
        }
    }
}
/**
 * Returns whether the given color is a valid color in CSS.
 * 
 * @param {string} colorStr The CSS color value.
 */
function isColor(colorStr) {
    if (colorStr.localeCompare("rainbow") == 0) {
        return true;
    }
    let tmp = new Option().style;
    tmp.color = colorStr;
    return tmp.color == colorStr;
}
/** 
 * Set global variables representing to values in settings form. 
 * If any setting has been changed, returns true. 
*/
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
    let newBgColor = document.getElementById("background-color").value;
    if (newBgColor && isColor(newBgColor)) {
        backgroundColor = newBgColor;
        valid = true;
    }
    return valid;
}
/** Preview colors of settings. */
function updatePreview() {
    setSettings();
    let paintPreview = document.getElementById("paint-preview");
    let backgroundPreview = document.getElementById("background-preview");
    if (paintColor.localeCompare("rainbow") == 0) {
        paintPreview.classList.add("rainbow");
    } else {
        paintPreview.classList.remove("rainbow");
        paintPreview.style.backgroundColor = paintColor;
    }
    if (backgroundColor.localeCompare("rainbow") == 0) {
        backgroundPreview.classList.add("rainbow");
    } else {
        backgroundPreview.classList.remove("rainbow");
        backgroundPreview.style.backgroundColor = paintColor;
    }
}
/** Set up previews and forms. Previews are updated live with input. */
function createSettings() {
    let paintColorInput = document.getElementById("paint-color");
    let backgroundColorInput = document.getElementById("background-color");
    paintColorInput.onkeyup = updatePreview;
    paintColorInput.onkeypress = updatePreview;
    backgroundColorInput.onkeyup = updatePreview
    backgroundColorInput.onkeypress = updatePreview;
    let paintForm = document.getElementById("paint-form");
    paintForm.onsubmit = () => false;
}
/**
 * Turns off eraser and sets only the paint button as selected.
 * 
 * @param {object} eraserBtn The eraser button to be unselected.
 */
function selectPaintButton(eraserBtn) {
    return function () {
        eraser = false;
        this.classList.add("selected");
        eraserBtn.classList.remove("selected");
    };
}
/**
 * Turns on the eraser and sets only the eraser button as selected.
 * 
 * @param {object} paintBtn The paint button to be unselected.
 */
function selectEraseButton(paintBtn) {
    return function () {
        eraser = true;
        this.classList.add("selected");
        paintBtn.classList.remove("selected");
    };
}
function submitSettings() {
    setSettings();
    updateCanvas();
}
/** Open the canvas as a .png file in another tab. */
function save() {
    html2canvas(canvas).then(function(canvas) {
        let base64image = canvas.toDataURL("image/png");
        window.open(base64image , "_blank");
    });   
}
let canvas = createCanvas();
createSettings();
updatePreview();
document.body.appendChild(canvas);
let submitSettingsButton = document.getElementById("submit");
submitSettingsButton.onclick = submitSettings;
let paintButton = document.getElementById("select-paint");
let eraserButton = document.getElementById("select-erase");
paintButton.onclick = selectPaintButton(eraserButton);
eraserButton.onclick = selectEraseButton(paintButton);
let saveButton = document.getElementById("save");
saveButton.onclick = save;

