var clearButton = document.getElementById("clear"),
    saveButton = document.getElementById("save"),
    canvas = document.getElementById("canvas"),
    output = document.getElementById("clear"),
    signaturePad;


function on(node, eventName, func) {
    if (node.addEventListener) {
        node.addEventListener(eventName, func);
    } else if (node.attachEvent) {
        node.attachEvent('on' + eventName, function(e) {
            func.call(this, e || window.event);
        });
    }
}


// Adjust canvas coordinate space taking into account pixel ratio,
// to make it look crisp on mobile devices.
// This also causes canvas to be cleared.
function resizeCanvas() {
    var ratio =  window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    if (!canvas.getContext) {
        if (window.FlashCanvas) {
            FlashCanvas.initElement(canvas);
        } else {
            throw new Error("FlashCanvas missing.");
        }
    }
    canvas.getContext("2d").scale(ratio, ratio);
}

window.onresize = resizeCanvas;
resizeCanvas();

signaturePad = new SignaturePad(canvas, {minWidth: 1});

on(clearButton, "click", function (event) {
    signaturePad.clear();
});

on(saveButton, "click", function (event) {
    if (signaturePad.isEmpty()) {
        alert("Please provide signature first.");
    } else {
        output.innerHTML = signaturePad.toDataURL();
    }
});
