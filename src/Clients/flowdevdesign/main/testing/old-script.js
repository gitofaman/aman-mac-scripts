// let activeBlocks = [];
// let coordinates = [];
// let lastTime = 0;
// let movementTimeout = null;
// const minIntervalMs = 140; // Minimum time between points (ms)
// const workItemWidth = 220;
// let usageCounts = []; // To track appearances of each item

// function getBalancedRandomIndex(totalItems) {
//     if (usageCounts.length !== totalItems) {
//         usageCounts = Array(totalItems).fill(0);
//     }

//     const minUsage = Math.min(...usageCounts);
//     const eligibleIndices = usageCounts
//         .map((count, index) => ({ count, index }))
//         .filter(item => item.count === minUsage)
//         .map(item => item.index);

//     const randomIndex = eligibleIndices[Math.floor(Math.random() * eligibleIndices.length)];
//     usageCounts[randomIndex]++;
//     return randomIndex;
// }

// function addBlocks(coords) {
//     const $items = $(".work-items-for-hero");
//     const totalItems = $items.length;

//     if (totalItems === 0) return;

//     coords.forEach((point) => {
//         if (activeBlocks.length >= 4) return;
//         const randomIndex = getBalancedRandomIndex(totalItems);
//         const $randomItem = $items.eq(randomIndex).clone();

//         $randomItem.css({
//             position: "absolute",
//             top: point.y,
//             left: point.x,
//             transform: "translate(-50%, -50%)",
//             zIndex: 9999,
//             opacity: 0,
//             pointerEvents: "none",
//             width: workItemWidth,
//             pointerEvents: 'none',
//             border: "1px solid whitesmoke",
//             borderRadius: '4px',
//             overflow: 'hidden',
//             zIndex: '0'
//         }).appendTo("body");

//         activeBlocks.push($randomItem);

//         // Calculate directional offset if there are at least 2 points
//         let dx = 0, dy = 0;
//         if (coords.length >= 2) {
//             dx = coords[coords.length - 1].x - coords[coords.length - 2].x;
//             dy = coords[coords.length - 1].y - coords[coords.length - 2].y;
//         }

//         gsap.timeline({
//             onComplete: function () {
//                 $randomItem.remove();
//                 const index = activeBlocks.indexOf($randomItem);
//                 if (index > -1) activeBlocks.splice(index, 1);
//             }
//         })
//         .fromTo($randomItem, {
//             scale: 0.8,
//             x: 0,
//             y: 0,
//             opacity: 0
//         }, {
//             scale: 1,
//             x: dx * 0.5,
//             y: dy * 0.5,
//             opacity: 1,
//             duration: 0.3,
//             ease: "power2.out"
//         })
//         .to($randomItem, {
//             scale: 0.7,
//             opacity: 0,
//             duration: 0.5,
//             delay: 0.2,
//             ease: "power2.in"
//         });
//     });
// } 


// $(document).ready(function () {
//     $(".hero-items-shower").on("mousemove", function (e) {
        
//         const currentTime = Date.now();

//         if (currentTime - lastTime >= minIntervalMs) {
//             const pos = {
//                 x: e.clientX,
//                 y: e.clientY
//             };
//             coordinates.push(pos);
//             if (coordinates.length > 4) coordinates.shift();
//             lastTime = currentTime;

//             // Avoid triggering addBlocks if hovering over .heading-hero
//             if (!$(e.target).closest('.heading-hero').length) {
//                 addBlocks([...coordinates]); // Pass a copy
//             }
//         }

//         // Reset movement flag if mouse stops for 100ms (optional, can be removed if unused)
//         clearTimeout(movementTimeout);
//         movementTimeout = setTimeout(() => {
//             coordinates = []; // Optional: clear on stop
//         }, 100);
//     });
// });