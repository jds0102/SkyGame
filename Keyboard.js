 function Keyboard() {
    var self = this;
    this.isKeyDown = {};
}

document.onkeydown = function (event) {
    var key = String.fromCharCode(event.keyCode);
    KB.isKeyDown[key] = true;
}
document.onkeyup = function (event) {
    var key = String.fromCharCode(event.keyCode);
    KB.isKeyDown[key] = false;
}

var KB = new Keyboard();