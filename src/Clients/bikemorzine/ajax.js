// const nextPageLink = 'https://bike-morzine.webflow.io/staging/accomodations-slider-demo';
// console.log('working on it');

// fetch(nextPageLink)
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return response.text();
//   })
//   .then(responseText => {
//     const parser = new DOMParser();
//     const doc = parser.parseFromString(responseText, 'text/html');
//     const elements = doc.querySelectorAll('.full-section');

//     // Assuming you have an element with the id "cms-block"
//     const cmsBlock = document.getElementById('cms-block');
    
//     elements.forEach(element => {
//       cmsBlock.appendChild(element.cloneNode(true));
//     });
//   })
//   .catch(error => {
//     console.error('Fetch request failed:', error);
//   })
//   .finally(() => {
//     console.log('Fetch DONE');
//   });

// function resizeIframe() {
//     const iframes = document.querySelectorAll(".iframe-parent iframe");
//     iframes.forEach(iframe=>{
//         if (iframe) {
//             iframe.style.height = iframe.contentWindow.document.body.scrollHeight + "px";
//         }
//     })
// }
