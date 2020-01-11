/** Color of painted canvas blocks. Defaults to black. */
let paintColor = "black";
/** Color of canvas blocks before painting. Defaults to white. */
let backgroundColor = "white";
/** Number of squares per side. */
let canvasSize = 10;
/** Whether or not the cursor erases or paints. */
let eraser = false;
/** Whether or not the cursor can erase or paint. */
let isPainting = false;
/** Whether or not the pencil is in use */
let pencil = false;

/** Constructs a paintable block. */
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
            if (backgroundColor === "rainbow") {
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
/**
 * Sets a block's color to a lighter version of the paint color. Each 
 * succsive call on the same block intensifies color of pencil painted 
 * blocks by 10%. 
 * 
 * @param {object} block The block to be colored by the pencil.
 */
function pencilColor(block) {
    if (paintColor === backgroundColor) {
        return;
    }
    if (block.style.backgroundColor === backgroundColor) {
        block.style.backgroundColor = paintColor;
        block.style.opacity = 0.1;
    } else if (block.style.opacity < 1) {
        block.style.opacity = Number(block.style.opacity) + 0.1;
    }
}
/** Paints (with pencil or pen) or erases a canvas box. */
function paint() {
    if (isPainting) {
        if (eraser) {
            if (backgroundColor === "rainbow") {
                this.classList.add("rainbow");
            } else {
                this.style.backgroundColor = backgroundColor;
            }
        } else {
            this.classList.remove("rainbow");
            if (paintColor === "rainbow") {
                this.style.backgroundColor = getRandomColor();      
            } else { 
                this.style.backgroundColor = paintColor;
            }
        }
        if (pencil) {
            pencilColor(this);
        } else {
            this.style.opacity = 1;
        }
    }
}
/**
 * Returns whether the given color is a valid color in CSS.
 * 
 * @param {string} colorStr The CSS color value.
 */
function validateColor(colorStr) {
    if (colorStr === "") { 
        return false; 
    }
    if (colorStr === "inherit") { 
        return false; 
    }
    if (colorStr === "transparent") { 
        return false; 
    }
    if (colorStr === "rainbow") { 
        return true; 
    }
    let tmp = new Option().style;
    tmp.color = colorStr;
    if (tmp.color == colorStr) { 
        return true; 
    }
    if (/^#(?:[0-9a-fA-F]{3}){1,2}$/.test(colorStr)) {
        return true;
    }
    let rgbMatch = colorStr.match(/\d+/);
    let isRgb = false;
    if (rgbMatch && rgbMatch.length == 3) {
        isRgb = true;
        for (let colorNum of rgbMatch) {
            if (colorNum > 255 || color < 0) {
                isRgb = false;
            }
        }
    }  
    return isRgb;
}
/**
 * Helper function for setSettings() that updates either background color or
 * paint color.
 * 
 * @param {boolean} isBackground Updates background color if true. Updates paint
 *                               color otherwise.
 */
function updateColorSetting(isBackground) {
    let colorSettingId;
    if (isBackground) {
        colorSettingId = "background-color";
    } else {
        colorSettingId = "paint-color";
    }
    let input = document.getElementById(colorSettingId)
    let newColor = input.value;
    newColor = newColor.replace(/\s+/g, '');
    if (newColor && validateColor(newColor)) {
        if (isBackground) {
            backgroundColor = newColor;
        } else {
            paintColor = newColor;
        }
        input.style.borderColor = "inherit";
    } else {
        if (newColor === "") {
            input.style.borderColor = "inherit";
        } else {
            input.style.borderColor = "tomato";
        }
    }
}
/** Set global variables representing to values in settings form. */
function setSettings() {
    let newCanvasSize = document.getElementById("resolution").value;
    if (!isNaN(newCanvasSize) && newCanvasSize >= 2 && newCanvasSize <= 150) {
        canvasSize = newCanvasSize;
    }
    updateColorSetting(true);
    updateColorSetting(false);
}
/** Preview colors of settings. */
function updatePreview() {
    setSettings();
    let paintPreview = document.getElementById("paint-preview");
    let backgroundPreview = document.getElementById("background-preview");
    if (paintColor === "rainbow") {
        paintPreview.classList.add("rainbow");
    } else {
        paintPreview.classList.remove("rainbow");
        paintPreview.style.backgroundColor = paintColor;
    }
    if (backgroundColor === "rainbow") {
        backgroundPreview.classList.add("rainbow");
    } else {
        backgroundPreview.classList.remove("rainbow");
        backgroundPreview.style.backgroundColor = backgroundColor;
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
 * Adds styling to show that it is selected. Deselects every other button.
 * 
 * @param {object} selectedBtn The button to be selected;
 */
function makeSelected(selectedBtn) {
    document.querySelectorAll(".paint").forEach(btn => {
        if (btn !== selectedBtn) {
            btn.classList.remove("selected");
        }
        selectedBtn.classList.add("selected");
    });
}
/** Turns off eraser and sets only the pen as selected. */
function selectPenButton() {
    return function () {
        eraser = false;
        pencil = false;
        makeSelected(this);
    };
}
/** Turns off the eraser and sets only the pencil as selected.*/
function selectPencilButton() {
    return function () {
        eraser = false;
        pencil = true;
        makeSelected(this);      
    };
}
/** Turns on the eraser and sets only the eraser as selected. */
function selectEraseButton() {
    return function () {
        eraser = true;
        pencil = false;
        makeSelected(this);
    };
}
/** Set canvas background and size. */
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
/** Set up canvas and attaches event listeners. */
let canvas = createCanvas();
createSettings();
updatePreview();
document.body.appendChild(canvas);
let submitSettingsButton = document.getElementById("submit");
submitSettingsButton.onclick = submitSettings;
let penButton = document.getElementById("select-pen");
let pencilButton = document.getElementById("select-pencil");
let eraserButton = document.getElementById("select-erase");
penButton.onclick = selectPenButton();
pencilButton.onclick = selectPencilButton();
eraserButton.onclick = selectEraseButton();
let saveButton = document.getElementById("save");
saveButton.onclick = save;

