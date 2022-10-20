
// Running code in block after doc finishes loading.
$(document).ready(function() {
    var textelem= $(".fade-in-text");
    fading(textelem);
});

function fading(obj) {
    obj.fadeToggle(1000, function () {
        fading(obj);
    });
}