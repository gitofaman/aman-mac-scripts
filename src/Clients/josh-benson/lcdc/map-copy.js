var n = 0

document.getElementById('map-1').addEventListener('click', function (event) {
    // Get the position of the click relative to the element
    const x = event.offsetX;
    const y = event.offsetY;

    // Calculate the percentage coordinates relative to the bottom left corner
    const percentageX = (x / this.clientWidth) * 100;
    const percentageY = 100 - (y / this.clientHeight) * 100;

    // Display the coordinates
    var mapX = percentageX.toFixed(2)
    var mapY = percentageY.toFixed(2)

    console.log("copied X:" + mapX)
    console.log("copied Y:" + mapY)
});