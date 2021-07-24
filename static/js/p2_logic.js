// Filter the data for movies with an IMDb rating greater than 8.9
//  and then graph each title on the x-axis and the respective metascore on the y-axis.

// Save the json dat (rendered to front end) into a variable
var sfdata = "/api/sql_data";

// use d3 to fetch the data served at the front end
d3.json(sfdata).then(function (sfbus) {
  // console.log(data.filter(item=>item["Ownership Name"]==="Merrill Lynch Pierce Etal Inc"))
  //console.log(sfbus)
  // Once we get a response, send the data.features object to the createFeatures function
  createHistogram(sfbus);

});

function createHistogram(sfData) {
  //console.log(sfData)

  // Create an object to store all the categories and numbers of business
  var data = {};
  // FOr loop to go through each business
  for (const b of sfData) {


    var category = b["NAICS Code Description"];

    console.log(category);

    // if category not in data
    if (!(category in data)) {
      data[category] = 0;
    }
    data[category]++;
    // console.log(data)

  }

// Split data into x and y  
var x = [];
var y = [];

for (var category in data){
x.push(category)
y.push(data[category])
}

 // Create your trace.
var trace = {
  x: y,
  y: x,
  type: "bar",
  // horizontal bar chart
  orientation: "h"
};

// Create the data array for our plot
var datatoplot = [trace]; 

// Define our plot layout
var layout = {
  title: "Business Categories Histogram",
  xaxis: { title: "Number of Businesses"},
  //yaxis: { title: "Categories" },

  margin: {l:300}
};

Plotly.newPlot("bar-plot", datatoplot, layout);


}

