// // document.addEventListener("DOMContentLoaded", function () {
// //   var content = document.querySelector(".w-richtext");
// //   var tocContainer = document.querySelector("#toc");

// //   if (content && tocContainer) {
// //       generateTableOfContents(content, tocContainer);
// //   }
// // });

// // function generateTableOfContents(content, tocContainer) {
// //   var toc = "<ul class='toc-list'>";
// //   var headingLevels = [1, 2, 3, 4, 5, 6]; // Adjust based on the heading levels in your content

// //   content.innerHTML = content.innerHTML.replace(
// //       /<h(\d)>([^<]+)<\/h(\d)>/gi,
// //       function (str, openLevel, titleText, closeLevel) {
// //           if (headingLevels.indexOf(parseInt(openLevel)) === -1) {
// //               return str; // Skip if the heading level is not in the specified list
// //           }

// //           var anchor = titleText.replace(/\s+/g, "_");
// //           toc += `<li class="toc-list-${openLevel}"><a href="#${anchor}">${titleText}</a>`;

// //           // Close previous list items based on the difference in heading levels
// //           if (parseInt(closeLevel) < parseInt(openLevel)) {
// //               toc += new Array(parseInt(openLevel) - parseInt(closeLevel) + 1).join("</li></ul>");
// //           }

// //           return `<h${openLevel}><a href="#${anchor}" id="${anchor}">${titleText}</a></h${closeLevel}>`;
// //       }
// //   );

// //   toc += "</ul>";
// //   tocContainer.innerHTML += toc;
// // }

// var customCSS = `
// .toc a {
//   color: inherit;
// }
// .regular-rich-text a[href^="#"] {
// color: black!important;
// text-decoration: none;
// cursor: default;
// top: -3rem;
// margin-top: 3rem;
// position: relative;
// display: block;
// }
// `;

// // Create a style element and append it to the head
// var styleElement = $('<style>').attr('type', 'text/css').html(customCSS);
// $('head').append(styleElement);