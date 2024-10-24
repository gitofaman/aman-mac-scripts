var coordinatesArr = [];

function getPercentageCoordinates(event) {
    var parentDiv = event.target;
    parentDiv.style.position = `relative`
    var rect = parentDiv.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    var percentageX = (x / parentDiv.clientWidth) * 100;
    var percentageY = (y / parentDiv.clientHeight) * 100;
    return { x: percentageX, y: percentageY };
}

function createCircle(x, y) {
    var circle = document.createElement('div');
    circle.classList.add('i-img-a');
    circle.classList.add('i-img-dot');
    circle.style.left = x + '%';
    circle.style.top = y + '%';
    document.querySelector('.parent-div').appendChild(circle);
}

// Click event listener for the parent div
document.querySelector('.parent-div').addEventListener('click', function(event) {
    var coordinates = getPercentageCoordinates(event);
    console.log('Percentage X: ' + coordinates.x + '%');
    console.log('Percentage Y: ' + coordinates.y + '%');
    
    createCircle(coordinates.x, coordinates.y);
    $('[name=x]').val(parseFloat(coordinates.x).toFixed(1))
    $('[name=y]').val(parseFloat(coordinates.y).toFixed(1))
});

$('[submit]').on('click', () => {
    console.log('clicked');
    let x = $('[name=x]').val();
    let y = $('[name=y]').val();
    let comment = $('[name=comment]').val();
    
    // Round to 1 decimal place
    x = parseFloat(x).toFixed(1);
    y = parseFloat(y).toFixed(1);

    var c = {
        x: parseFloat(x),
        y: parseFloat(y),
        comment: comment
    };

    coordinatesArr.push(c);
});