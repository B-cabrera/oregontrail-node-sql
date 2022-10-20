

// Running code in block after doc finishes loading.
$(document).ready(function() {
    var textelem= $(".fade-in-text");
    fading(textelem);

    //listening from space bar text and page.
    var text = $(".reg-text");
    var page = $("body");
});

function fading(obj) {
    obj.fadeToggle(1000, function () {
        fading(obj);
    });
}




