window.onload = checkTabs;

updateClock();
window.setInterval(updateClock, 1000)


function updateClock() {
    var d = new Date();
    var clockString = ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2)

    document.getElementsByClassName("clock")[0].textContent = clockString;
}