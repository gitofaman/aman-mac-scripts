function removeEl(indices, arr) {
    // Make sure indices is an array
    if (!Array.isArray(indices)) {
        indices = [indices];
    }

    // Sort indices in descending order to avoid issues with removing elements
    indices.sort(function(a, b) {
        return b - a;
    });

    // Remove elements from the array based on the indices
    $.each(indices, function(_, index) {
        arr.splice(index, 1);
    });

    return arr;
}

// Example usage:
var myArray = [1, 2, 3, 4, 5];
removeEl(1, myArray); // Removes the 2nd element (index 1)
console.log(myArray); // Output: [1, 3, 4, 5]

myArray = [1, 2, 3, 4, 5];
removeEl([1, 3], myArray); // Removes the 2nd and 4th elements (indices 1 and 3)
console.log(myArray); // Output: [1, 3, 5]
