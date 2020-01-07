allCanvasBlocks = []
const width = 16
const height = 16
function createCanvasBlock() {
    let canvasBlock = document.create("div");
    canvasBlock.classList.add("canvas-block");
    return canvasBlock;
}
function createCanvas() {
    let canvas = document.getElementById("canvas");
    for (let i = 0; i < height; ++i) {
        for (let j = 0; j < width; ++j) {
            let canvasBlock = createCanvasBlock();
            canvas.appendChild(canvasBlock);
            allCanvasBlocks.push(canvasBlock);
        }
    }
    return canvas; 
}
const CANVAS = createCanvas();


  