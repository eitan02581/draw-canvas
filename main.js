var gCanvas 

function init() {
initCanvas()
}

function initCanvas() {
    gCanvas = document.querySelector('#draw-canvas');
    gCanvas.width = document.body.scrollWidth
    gCanvas.height = document.body.scrollHeight
}
