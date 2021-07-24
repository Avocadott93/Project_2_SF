// Store our API endpoint inside queryUrl
var queryUrl = "/api/sql_data";


// Create a tile layer
var graymap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/light-v10",
    accessToken: API_KEY
});


// Perform a GET request to the query URL
d3.json(queryUrl).then(function(data){
    // console.log(data.filter(item=>item["Ownership Name"]==="Merrill Lynch Pierce Etal Inc"))
    console.log(data)
    // Once we get a response, send the data.features object to the createFeatures function
    createFeatures(data);
});
const mappedBusinesses = [];
function createFeatures(sfData) {

   

    // Create a GeoJSON layer containing the features array on the earthquakeData object
    // Create a constant marker to store the businesses we want
    const categories = [];
    sfData.forEach(business => {
        const marker = L.marker([business.lat, business.long], {
            color: 'red',
            alt: business['NAICS Code Description'],
            opacity: 1
        })

        // Loop through each json object to get categories

        const foundCategory = categories.findIndex(c => c.category === business['NAICS Code Description']);
        if(foundCategory === -1){
            categories.push({
                category:business['NAICS Code Description'], 
                count: 1
            })
        } else {
            categories[foundCategory].count++
        }
        // Bind popup windows to markers
        marker.bindPopup(`<h3>${business['Ownership Name']}</h3><p>${business['Mail Address']}</p>`)
        mappedBusinesses.push(marker);
    })

    // Sort categories
    categories.sort((a,b) => {
        if(a.count>b.count){
            return -1
        } else if(b.count>a.count){
            return 1
        } else {
            return 0;
        }
    })
    
    // get first 5 categories
    // add reset (all)
    const finalCategories = []
    for(let i = 1; i < 5; i++){
        finalCategories.push(categories[i])
    }
    
    console.log(finalCategories)
    renderLegend(finalCategories, mappedBusinesses)

    // Sending our earthquakes layer to the createMap function
    createMap(mappedBusinesses);
}

function renderLegend(categories, mappedBusinesses){
    const legendContainer = document.querySelector('#legend');
    
    categories.forEach(category => {
        const button = document.createElement('button')
        button.className = "btn btn-primary"
        button.style.margin = "2px 7px 2px 0";
        
        button.addEventListener('click', ev => {
            console.log(mappedBusinesses[0])
            mappedBusinesses.forEach(marker => {
                if(marker.options.alt === category.category){
                    marker.setOpacity(1);
                } else {
                    marker.setOpacity(0);
                }
            })
        })
        button.innerText = category.category + ' (' + category.count + ')';
        legendContainer.appendChild(button)
    })
}

// Define function to create a map
function createMap(sfbusiness) {

    // Define streetmap and darkmap layers
    var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v1/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.streets",
        accessToken: API_KEY
    });


    var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "dark-v10",
        accessToken: API_KEY
    });

    // Define a baseMaps object to hold our base layers
    var baseMaps = {
        "Street Map": streetmap,
        "Dark Map": darkmap
    };

    

    // Create our map, giving it the streetmap and earthquakes layers to display on load
    // insert this map into the id = "map" tags
    var myMap = L.map("map", {
        center: [
            37.7749, -122.4194
        ],
        zoom: 15,
        layers: [graymap]
    });
    sfbusiness.forEach(business => business.addTo(myMap))

    // Create a layer control
    // Pass in our baseMaps and overlayMaps
    // Add the layer control to the map
    L.control.layers(baseMaps, {
        collapsed: false
    }).addTo(myMap);


    // Create the legend
    var legend = L.control({
        position: "bottomright"
    });


    legend.onAdd = function (myMap) {
        var legend_loc = L.DomUtil.create("div", "info legend"),
            levels = [0, 1, 2, 3, 4, 5]

        // Loop through magnitude intervals and generate a label with a colored square for each interval
        for (var i = 0; i < levels.length; i++) {
            legend_loc.innerHTML += '<i style="background:' + colorRange(levels[i]) + '"></i> ' + [i] + (levels[i + 1] ? '&ndash;' +
                levels[i + 1] + '<br>' : '+');
        }
        return legend_loc;
    };

    // Add legend to the map
    legend.addTo(myMap);
}


// Define colors depending on the magnituge of the earthquake
function colorRange(magnituge) {

    switch (true) {
        case magnituge >= 5.0:
            return 'red';
            break;

        case magnituge >= 4.0:
            return 'orangered';
            break;

        case magnituge >= 3.0:
            return 'orange';
            break;

        case magnituge >= 2.0:
            return 'gold';
            break;

        case magnituge >= 1.0:
            return 'yellow';
            break;

        default:
            return 'greenyellow';
    };
};

// Reflect the earthquake magnitude
function markerSize(magnituge) {
    return magnituge * 6;
};