allCanvasBlocks = []
const canvasSize = 16;
function createCanvasBlock() {
    let canvasBlock = document.createElement("div");
    canvasBlock.textContent = "test";
    canvasBlock.classList.add("canvas-box");
    return canvasBlock;
}
function createCanvas() {
    let canvas = document.getElementById("canvas");
    for (let i = 0; i < canvasSize; ++i) {
        for (let j = 0; j < canvasSize; ++j) {
            let canvasBlock = createCanvasBlock();
            canvas.appendChild(canvasBlock);
            allCanvasBlocks.push(canvasBlock);
        }
    }
    return canvas; 
}
const CANVAS = createCanvas();
document.body.appendChild(CANVAS);
document.body.appendChild(createCanvasBlock());

  