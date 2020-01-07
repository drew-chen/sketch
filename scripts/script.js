allCanvasBlocks = []
const CANVAS_SIZE = 40;
function createCanvasBlock() {
    let canvasBlock = document.createElement("td");
    canvasBlock.classList.add("canvas-box");
    return canvasBlock;
}
function createCanvas() {
    let canvas = document.getElementById("canvas");
    let row, canvasBlock;
    for (let i = 0; i < CANVAS_SIZE; ++i) {
        row = document.createElement("tr");
        for (let j = 0; j < CANVAS_SIZE; ++j) {
            canvasBlock = createCanvasBlock();
            row.appendChild(canvasBlock);
            allCanvasBlocks.push(canvasBlock);
        }
        canvas.appendChild(row);
    }
    // }
    // canvas.style.gridTemplateRows = `repeat(auto-fit, ${CANVAS_SIZE}, 1fr)`;
    // canvas.style.gridTemplateColumns = `repeat(auto-fit, ${CANVAS_SIZE}, 1fr)`;
    return canvas; 
}
const CANVAS = createCanvas();
document.body.appendChild(CANVAS);

  