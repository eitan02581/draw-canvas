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
    gCanvas.width = 600;
    gCanvas.height = 300
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
    if (selectedVal === 'tube') gType = 'tube'

}

// draws options
function draw(x, y, isDown) {
    if (gType === 'pen') drawPen(x, y, isDown)
    if (gType === 'square') drawSquare(x, y, isDown)
    if (gType === 'circle') drawCircle(x, y, isDown)
    if (gType === 'tube') drawTube(x, y, isDown)

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

function drawCircle(x, y, isDown) {
    if (isDown) {
        gCtx.beginPath()
        gCtx.strokeStyle = $('#selColor').val();
        gCtx.arc(x, y, 50, 0, 2 * Math.PI);
        gCtx.moveTo(gLastX, gLastY);
        gCtx.stroke()
    }
}

function drawTube(x, y, isDown) {
    if (isDown) {
        gCtx.beginPath()
        gCtx.strokeStyle = $('#selColor').val();
        gCtx.arc(x, y, 50, 0, 2 * Math.PI);
        gCtx.moveTo(gLastX, gLastY);
        gCtx.lineTo(x, y);
        gCtx.stroke()
    }
}

function onClear() {
    initCanvas()
}

function onSave(elLink) {
    var imgContent = gCanvas.toDataURL('image/jpg');
    elLink.href = imgContent
}



function renderCanvas(img) {
    gCanvas.width = img.width;
    gCanvas.height = img.height;
    gCtx.drawImage(img, 0, 0);
}

function onFileInputChange(ev) {
    handleImageFromInput(ev, renderCanvas)
}




//UPLOAD IMG WITH INPUT FILE
function handleImageFromInput(ev, onImageReady) {
    var reader = new FileReader();

    reader.onload = function (ev) {
        var img = new Image();
        img.onload = function () {
            gCanvas.width = img.width;
            gCanvas.height = img.height;
            gCtx.drawImage(img, 0, 0);
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(ev.target.files[0]);
}