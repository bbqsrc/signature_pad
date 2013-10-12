var wrapper = $(document.getElementById("signature-pad")),
    clearButton = wrapper.find("[data-action=clear]")[0],
    saveButton = wrapper.find("[data-action=save]")[0],
    canvas = wrapper.find("canvas")[0],
    signaturePad;

// Adjust canvas coordinate space taking into account pixel ratio,
// to make it look crisp on mobile devices.
// This also causes canvas to be cleared.
function resizeCanvas() {
    var ratio =  window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    if (!canvas.getContext) {
        if (FlashCanvas) {
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

$(clearButton).on("click", function (event) {
    signaturePad.clear();
});

$(saveButton).on("click", function (event) {
    if (signaturePad.isEmpty()) {
        alert("Please provide signature first.");
    } else {
        $('textarea').text(signaturePad.toDataURL());
    }
});
