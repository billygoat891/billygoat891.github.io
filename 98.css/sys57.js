// Init

var F = new window.FileSystem("C:");

// Jquery

$(function () {
    $(".window").draggable({ handle: ".title-bar" });
    $(".window-body").disableSelection();
});

// Other

const button = document.querySelector(".window-close");

button.addEventListener("click", (event) => {
    button.parentNode.parentNode.parentNode.remove();
});

function showDate() {
    var date = new Date();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    if (h < 10) {
        h = "0" + h;
    }
    if (m < 10) {
        m = "0" + m;
    }
    if (s < 10) {
        s = "0" + s;
    }
    var time = h + ":" + m;
    document.getElementById("clock").innerHTML = time;
}

showDate();
setInterval(showDate, 1000);
