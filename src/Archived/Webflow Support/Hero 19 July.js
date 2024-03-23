document.querySelectorAll('h2').forEach(secondHeading=>{
    var hStrong = secondHeading.querySelector('strong')
    if(!!hStrong) {
        secondHeading.innerHTML = secondHeading.innerText
    }
})
document.addEventListener("DOMContentLoaded", function () {
    var content = document.querySelector(".w-richtext");
 var tagNameH2 = content.querySelector("h2");
 if (tagNameH2) {
   TableOfContents(".w-richtext", "#toc", 1);
 } else {
   TableOfContents(".w-richtext", "#toc", 2);
 }
});

function TableOfContents(container, output, level) {
 var toc = "";
 var container =
   document.querySelector(container) || document.querySelector(".w-richtext");
 var output = output || "#toc";

 container.innerHTML = container.innerHTML.replace(
   /<h([\d])>([^<]+)<\/h([\d])>/gi,
   function (str, openLevel, titleText, closeLevel) {
     if (openLevel != closeLevel) {
       return str;
     }

     if (openLevel > level) {
       toc += new Array(openLevel - level + 1).join("<ol>");
     } else if (openLevel < level) {
       toc += new Array(level - openLevel + 1).join("</li></ol>");
     } else {
       toc += new Array(level + 1).join("</li>");
     }

     level = parseInt(openLevel);

      var anchor = titleText.replace(/ /g, "_");

     toc += '<li class="toc_list"><a href="#' + anchor + '">' + titleText + "</a>";

     return (
       "<h" +
       openLevel +
       '><a href="#' +
       anchor +
       '" id="' + 
       anchor +
       '">' +
       titleText +
       "</a></h" +
       closeLevel +
       ">"
     );
   }
 );

 if (level) {
   toc += new Array(level + 1).join("</ul>");
 }
 document.querySelector(output).innerHTML += toc;
}