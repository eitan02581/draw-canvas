'use strict'
var gCanvas
var gCtx

function init() {
    gCanvas = document.querySelector('#draw-canvas');
    gCtx = gCanvas.getContext('2d')
    initCanvas()
}

function initCanvas() {
    gCanvas.width = document.body.scrollWidth
    gCanvas.height = document.body.scrollHeight
}

function onSelect(elSelect) {
    var selectedVal = elSelect.value
    if (selectedVal === 'circle') drawCircle()
    if (selectedVal === 'pen') drawPen()

}

// draws options
function drawPen() {

}

function drawCircle() {
    gCtx.beginPath()
    gCtx.arc(100, 300, 50, 0, 2 * Math.PI);
    gCtx.stroke()
    gCtx.fill()
}


function canvasClicked() {
    draw()
}

function draw() {
    gCtx.beginPath();
    gCtx.moveTo(prevX, prevY);
    gCtx.lineTo(currX, currY);
    gCtx.strokeStyle = x;
    gCtx.lineWidth = y;
    gCtx.stroke();
    gCtx.closePath();
}