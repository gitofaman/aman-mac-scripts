$(document).ready(function() {
    var mapActiveElSelector = "[affected-on-map-active]";
    var mapViewActiveClass = "map-view-active";
    var mapActive = false;
    
    var updateMapState = (toggleState, givenState, updateScreenPosition = true) => {
        if (toggleState) {
            if (!mapActive) {
                mapActive = true;
                $(mapActiveElSelector).addClass(mapViewActiveClass);
            } else {
                mapActive = false;
                $(mapActiveElSelector).removeClass(mapViewActiveClass);
            }
        } else {
            mapActive = givenState;
            $(mapActiveElSelector).toggleClass(mapViewActiveClass, mapActive);
        }
        if(mapActive) {
            $(".acc-main-all").css('height', $("#bikemorzine-map").height())
        } else {
            $(".acc-main-all").css('height', "")
        }
        if(updateScreenPosition) {
            $('html, body').animate({
                scrollTop: $(".acc-tiles").offset().top
            }, 600);
        }
    };
    
    // Define the function you're referencing
    var toggleMapState = () => {
        updateMapState(true);
    };
    
    // Attach click handler
    $(".toggle-map-view-parent").on("click", toggleMapState);
    
    // start map state
    updateMapState(false, false, false);
})

// Starting variables
var classes = {
    mapNumberLabel: "para-1em", // the number we're using to show group size or beds, the class for that label
    mapItemTitle: "para-1_2em"
}



// Step 1: Define initMap globally
let markers = []; // Store all markers globally
let infoWindowOpenMarker = null;
window.initMap = function () {

    //SCRIPT TITLE: Map Error If
    if (!accMapPoints || accMapPoints.length === 0) {
        console.error("Map points not loaded yet.");
        return;
    }
    //SCRIPT TITLE: Map Error If Ends

    // SCRIPT TITLE: Google Map Initiation
    const map = new google.maps.Map(document.getElementById("bikemorzine-map"), {
        zoom: 5,
        center: {
            lat: accMapPoints[0].coordinates.lat,
            lng: accMapPoints[0].coordinates.lng
        },
        // mapId: "ca89799623bac3d2", // Required for Advanced Markers
        styles: [{
                featureType: "poi",
                elementType: "all",
                stylers: [{
                    visibility: "off"
                }]
            }, // Hide all POIs
            {
                featureType: "poi.business",
                elementType: "all",
                stylers: [{
                    visibility: "off"
                }]
            }, // Hide all business locations
            {
                featureType: "poi.attraction",
                elementType: "all",
                stylers: [{
                    visibility: "off"
                }]
            }, // Hide tourist attractions
            {
                featureType: "poi.government",
                elementType: "all",
                stylers: [{
                    visibility: "off"
                }]
            }, // Hide government buildings
            {
                featureType: "poi.medical",
                elementType: "all",
                stylers: [{
                    visibility: "off"
                }]
            }, // Hide hospitals & medical places
            {
                featureType: "poi.park",
                elementType: "all",
                stylers: [{
                    visibility: "off"
                }]
            }, // Hide parks
            {
                featureType: "poi.place_of_worship",
                elementType: "all",
                stylers: [{
                    visibility: "off"
                }]
            }, // Hide religious places
            {
                featureType: "poi.school",
                elementType: "all",
                stylers: [{
                    visibility: "off"
                }]
            }, // Hide schools
            {
                featureType: "poi.sports_complex",
                elementType: "all",
                stylers: [{
                    visibility: "off"
                }]
            }, // Hide sports places
            {
                featureType: "road",
                elementType: "labels",
                stylers: [{
                    visibility: "off"
                }]
            }, // Hide road names
            {
                featureType: "transit",
                elementType: "all",
                stylers: [{
                    visibility: "off"
                }]
            }, // Hide transit stops
            {
                featureType: "administrative",
                elementType: "labels",
                stylers: [{
                    visibility: "off"
                }]
            }, // Hide city/country names
            {
                featureType: "water",
                elementType: "labels",
                stylers: [{
                    visibility: "off"
                }]
            }, // Hide water labels
            {
                featureType: "landscape",
                elementType: "labels",
                stylers: [{
                    visibility: "off"
                }]
            }, // Hide mountain/forest/park names
        ],
    });
    // SCRIPT TITLE: Google Map Initiation Ends

    // SCRIPT TITLE: Google Map Click
    map.addListener("click", () => {
        infoWindow.close();
        infoWindowOpenMarker = null; // Reset tracking variable when clicking outside
    });
    // SCRIPT TITLE: Google Map Click Ends


    // SCRIPT TITLE: Some Varaibles Starts
    const bounds = new google.maps.LatLngBounds();
    // Store the currently open main info window marker

    let activeInfoWindow = null;
    let infoWindowHovered = false; // Track if user is hovering over the info window
    
    accMapPoints.forEach((point) => {
        const marker = new google.maps.Marker({
            position: point.coordinates,
            map: map,
            title: point.title,
            icon: {
                url: point.mapMarkerImageURL,
                scaledSize: new google.maps.Size(32, 32) // Adjust size as needed
            },
            filterTags: point.filterTags
        });
    
        let content;
        
        if (point && point.imageUrl) {
            // Dynamically generate the grid content only if values exist
            let gridContent = "";
            if (point.bedsNumber) {
                gridContent += `
                    <div class="flex-map-info">
                        <div class="icon-in-map beds"></div>
                        <div class="${classes.mapNumberLabel}" >${point.bedsNumber}</div>
                    </div>
                `;
            }
            if (point.groupSize) {
                gridContent += `
                    <div class="flex-map-info">
                        <div class="icon-in-map group-size"></div>
                        <div class="${classes.mapNumberLabel}">${point.groupSize}</div>
                    </div>
                `;
            }
    
            // Descriptive marker content with conditionally included elements
            content = `
                <div class="map-info-window w-richtext" style="max-width: 150px">
                    <div class="map-small-image">
                        <img src="${point.imageUrl}" alt="${point.title}" class="full-image"/>
                    </div>
                    <div style="height: 5px"></div>
                    <h3 class="${classes.mapItemTitle}" style="margin-top: 0rem; margin-bottom: 0rem; line-height: 1.1em;">${point.title}</h3>
                    <div style="height: 10px"></div>
                    ${gridContent ? `<div class="grid-map-info">${gridContent}</div>` : ""}
                    <div style="height: 10px"></div>
                    ${point.linkUrl ? `<a href="${point.linkUrl}" target="_blank" class="btn is-accomodation is-map-btn">Explore Now</a>` : ""}
                </div>
            `;
        } else {
            // Non-descriptive marker content
            let ndContent = `<strong class="${classes.mapItemTitle}">${marker.getTitle()}</strong>`;
            if (point.markerType === "Lifts") {
                ndContent = `<a href="/morzine-information" class="para--link ${classes.mapNumberLabel}">${marker.getTitle()}</a>`;
            }
            content = `
                <div class="map-info-window" style="font-size:12px; padding:5px; background:white; border-radius:3px;">
                    ${ndContent}
                </div>
            `;
        }
    
        let infoWindow = new google.maps.InfoWindow({
            content: content
        });
    
        function showInfoWindow(map, marker, infoWindow) {
            if (activeInfoWindow) {
                activeInfoWindow.close();
            }
            infoWindow.open(map, marker);
            activeInfoWindow = infoWindow;
        
            google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
                const infoWindowElement = document.querySelector(".gm-style-iw");
                if (infoWindowElement) {
                    infoWindowElement.addEventListener("mouseenter", () => {
                        infoWindowHovered = true;
                    });
                    infoWindowElement.addEventListener("mouseleave", () => {
                        infoWindowHovered = false;
                        setTimeout(() => {
                            if (!infoWindowHovered) {
                                infoWindow.close();
                                activeInfoWindow = null;
                            }
                        }, 200);
                    });
                }
            });
        }
        
        function closeInfoWindow() {
            if (!infoWindowHovered) {
                if (activeInfoWindow) activeInfoWindow.close();
                activeInfoWindow = null;
            }
        }
        
        // Add interaction based on screen width
        if (window.innerWidth >= 991) {
            // Desktop (hover)
            marker.addListener("mouseover", () => {
                showInfoWindow(map, marker, infoWindow);
            });
        
            marker.addListener("mouseout", () => {
                setTimeout(() => {
                    closeInfoWindow();
                }, 200);
            });
        } else {
            // Mobile/Tablet (click)
            marker.addListener("click", () => {
                showInfoWindow(map, marker, infoWindow);
            });
        }
        
    
        bounds.extend(marker.position);
        markers.push(marker);
    });
    
    
    if (accMapPoints.length > 1) {
        map.fitBounds(bounds);
    }
    // SCRIPT TITLE: Map Points Loop and Bounds Ends



    map.addListener("dragstart", () => infoWindow.close());


    // SCRIPT TITLE: Attach filtering functionality
    document.querySelectorAll("[map-filter-checkbox]").forEach(checkbox => {
        checkbox.addEventListener("change", () => filterMarkers(map));
    });
    // SCRIPT TITLE: Attach filtering functionality Ends
};


// SCRIPT TITLE: Step 2
// Step 2: Dynamically load Google Maps API once accMapPoints is ready
function loadGoogleMapsAPI() {
    if (document.getElementById("google-maps-script")) return; // Prevent duplicate loading
    var API_KEY = ""
    var MAP_ID = ""
    const script = document.createElement("script");
    script.id = "google-maps-script";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=initMap&loading=async&libraries=marker&map_ids=${MAP_ID}`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
}

// SCRIPT TITLE: Step 2 Ends

// SCRIPT TITLE: Step 3
// Step 3: Wait for accMapPoints to be ready before loading API
document.addEventListener("DOMContentLoaded", function () {
    loadGoogleMapsAPI(); // Now load the API
});
// SCRIPT TITLE: Step 3 Ends 

// SCRIPT TITLE: Filter Markers
// Function to filter markers
function filterMarkers(map) {
    const selectedTags = Array.from(document.querySelectorAll("[map-filter-checkbox]:checked"))
        .map(cb => cb.getAttribute('map-filter-checkbox'));
    console.log(selectedTags)
    const bounds = new google.maps.LatLngBounds();
    let anyVisible = false;

    markers.forEach(marker => {
        const hasMatchingTag = selectedTags.some(tag => (marker.filterTags || []).includes(tag));

        if (selectedTags.length === 0 || hasMatchingTag) {
            marker.setMap(map); // Show marker
            bounds.extend(marker.position);
            anyVisible = true;
        } else {
            marker.setMap(null); // Hide marker
        }
    });

    if (anyVisible) {
        map.fitBounds(bounds);
    }
}
// SCRIPT TITLE: Filter Markers Ends