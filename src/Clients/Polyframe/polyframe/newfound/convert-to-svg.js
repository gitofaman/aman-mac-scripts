// function addBackground($el, bgPosX, bgPosY, imgUrl) {
//     // Get the current background properties
//     const currentBackgroundImage = $el.css("background-image") || "none";
//     const currentBackgroundPosition = $el.css("background-position") || "0% 50%";
//     const currentBackgroundSize = $el.css("background-size") || "200px";
//     const currentBackgroundRepeat = $el.css("background-repeat") || "repeat-x";

//     // Prepare the new layer properties
//     const newBackgroundImage = `url(${imgUrl})`;
//     const newBackgroundPosition = `0% 50%`; // Starting position for animation
//     const newBackgroundSize = `200px`;
//     const newBackgroundRepeat = `repeat-x`;

//     // Combine the new layer with the existing layers
//     const updatedBackgroundImage = `${newBackgroundImage}, ${currentBackgroundImage}`;
//     const updatedBackgroundPosition = `${newBackgroundPosition}, ${currentBackgroundPosition}`;
//     const updatedBackgroundSize = `${newBackgroundSize}, ${currentBackgroundSize}`;
//     const updatedBackgroundRepeat = `${newBackgroundRepeat}, ${currentBackgroundRepeat}`;

//     // Apply the combined layers to the element
//     $el.css({
//         "background-image": updatedBackgroundImage,
//         "background-position": updatedBackgroundPosition,
//         "background-size": updatedBackgroundSize,
//         "background-repeat": updatedBackgroundRepeat,
//     });

//     // Animate the position of the new layer
//     const targetBackgroundPosition = `${bgPosX}% ${bgPosY}%`;
//     const finalBackgroundPosition = `${targetBackgroundPosition}, ${currentBackgroundPosition}`;

//     // Animate with GSAP
//     gsap.to($el, {
//         duration: 2, // Animation duration
//         ease: "power2.inOut",
//         css: {
//             backgroundPosition: finalBackgroundPosition,
//         },
//     });
// }

// for(i=0; i<=10;i++) {
//     addBackground($('.is-experimental'), -i*3, i*10, "https://cdn.prod.website-files.com/66e7f3c7c910d6c36de416aa/66e9be1bc31654c494f28a17_Seb%201.png")
// }

function convertToSvg($el) {
    if (!$el.length) {
      console.error("convertToSvg: Element not found.");
      return;
    }
  
    // Get the text content of the element
    const text = $el.text().trim();
    if (!text) {
      console.error("convertToSvg: Element has no text content.");
      return;
    }
  
    // Extract styles
    const fontSize = $el.css('font-size') || '16px';
    const fontFamily = $el.css('font-family') || 'Arial, sans-serif';
    const color = $el.css('color') || 'black';
  
    // Create SVG and text element
    const svgNamespace = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNamespace, "svg");
    const textElement = document.createElementNS(svgNamespace, "text");
  
    // Set attributes for the text element
    textElement.setAttribute("x", "0");
    textElement.setAttribute("y", "40"); // Offset to avoid clipping
    textElement.setAttribute("font-size", fontSize);
    textElement.setAttribute("font-family", fontFamily);
    textElement.setAttribute("fill", color);
    textElement.textContent = text;
  
    // Append the text element to the SVG
    svg.appendChild(textElement);
    document.body.appendChild(svg); // Temporarily add to DOM to calculate metrics
  
    try {
      // Calculate the bounding box
      const bbox = textElement.getBBox();
      svg.setAttribute("width", bbox.width);
      svg.setAttribute("height", bbox.height);
  
      // Convert text to path
      const pathData = textToPathData(textElement);
      const path = document.createElementNS(svgNamespace, "path");
      path.setAttribute("d", pathData);
      path.setAttribute("fill", color);
        console.log
      // Replace original element with SVG
      const $svg = $(svg);
      $svg.empty().append(path); // Clear text and append path
      $el.replaceWith($svg);
    } catch (error) {
      console.error("convertToSvg: Error during conversion.", error);
    } finally {
      svg.remove(); // Cleanup temporary SVG
    }
  }
  
  // Helper: Converts text element to path data
  function textToPathData(textElement) {
    const numChars = textElement.textContent.length;
    const pathData = [];
    for (let i = 0; i < numChars; i++) {
      const point = textElement.getStartPositionOfChar(i);
      const nextPoint = textElement.getEndPositionOfChar(i);
      pathData.push(`M${point.x},${point.y} L${nextPoint.x},${nextPoint.y}`);
    }
    return pathData.join(" ");
  }
  
  convertToSvg($('.text-size-xmlarge'))