allCanvasBlocks = []
const CANVAS_SIZE = 16;
function createCanvasBlock() {
    let canvasBlock = document.createElement("div");
    canvasBlock.textContent = "test";
    canvasBlock.classList.add("canvas-box");
    return canvasBlock;
}
function createCanvas() {
    let canvas = document.getElementById("canvas");
    // for (let i = 0; i < CANVAS_SIZE; ++i) {
    //     for (let j = 0; j < CANVAS_SIZE; ++j) {
    //         let canvasBlock = createCanvasBlock();
    //         canvas.appendChild(canvasBlock);
    //         allCanvasBlocks.push(canvasBlock);
    //     }
    // }
    canvas.style.gridTemplateRows = `repeat(${CANVAS_SIZE}, 1fr)`;
    canvas.style.gridTemplateColumns = `repeat(${CANVAS_SIZE}, 1fr)`;
    return canvas; 
}
const CANVAS = createCanvas();
document.body.appendChild(CANVAS);

  