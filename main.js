'use strict'
var gCanvas
var gCtx
var gType
var gMousePressed = false;
var gLastX, gLastY;

function init() {
    gCanvas = document.querySelector('#draw-canvas');
    gCtx = gCanvas.getContext('2d')
    gType = 'pen'
    initCanvas()
}

function initCanvas() {
    gCanvas.width = document.body.scrollWidth
    gCanvas.height = document.body.scrollHeight
    setMouseEvent()
}

function setMouseEvent() {
    $('#draw-canvas').mousedown(function (e) {
        gMousePressed = true;
        draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
    });

    $('#draw-canvas').mousemove(function (e) {
        if (gMousePressed) {
            draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
        }
    });

    $('#draw-canvas').mouseup(function (e) {
        gMousePressed = false;
    });
    $('#draw-canvas').mouseleave(function (e) {
        gMousePressed = false;
    });
}

function onSelect(elSelect) {
    var selectedVal = elSelect.value
    if (selectedVal === 'circle') gType = 'circle'
    if (selectedVal === 'square') gType = 'square'
    if (selectedVal === 'pen') gType = 'pen'

}

// draws options
function draw(x, y, isDown) {
    if (gType === 'pen') drawPen(x, y, isDown)
    if (gType === 'square') drawSquare(x, y, isDown)
    if (gType === 'circle') drawCircle(x, y, isDown)

    gLastX = x;
    gLastY = y;
}


function drawPen(x, y, isDown) {
    if (isDown) {
        gCtx.beginPath();
        gCtx.strokeStyle = $('#selColor').val();
        gCtx.lineWidth = $('#selWidth').val();
        gCtx.lineJoin = "round";
        gCtx.moveTo(gLastX, gLastY);
        gCtx.lineTo(x, y);
        gCtx.closePath();
        gCtx.stroke();
    }
}

function drawCircle() {
    gCtx.beginPath()
    gCtx.arc(100, 300, 50, 0, 2 * Math.PI);
    gCtx.stroke()
    gCtx.fill()
}