// Function to convert a div to a JPG image and trigger the download
function downloadDivAsJPG() {
    const divToDownload = document.getElementById('target-div');
    
    html2canvas(divToDownload).then(canvas => {
        // Convert the canvas to a data URL
        const imgData = canvas.toDataURL('image/jpeg');
        
        // Create a temporary link element to trigger the download
        const link = document.createElement('a');
        link.href = imgData;
        link.download = 'div_image.jpg';
        link.click();
    });
}

// Add a click event listener to the download button
const downloadButton = document.getElementById('download-button');
downloadButton.addEventListener('click', downloadDivAsJPG);
