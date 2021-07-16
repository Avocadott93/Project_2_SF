// from data.js
var tableData = data;

// YOUR CODE HERE!

// Select the input


// Select the button
var button = d3.select("#filter-btn");

// Create event handlers 
button.on("click", runEnter);

// Complete the event handler function for the form
function runEnter() {

    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Select the input element and get the raw HTML node
    var input_date = d3.select("#datetime");

    // Get the value property of the input element
    var inputValue = input_date.property("value");

    
    // Search for data, use Date.parse()to convert 

    var result = tableData.filter(ufo => Date.parse(tableData.datetime) >= Date.parse(inputValue));

    // Put result into the table

    d3.select('tbody').html("");
    result.forEach((single) => {

     var row = d3.select('tbody').append("tr");   
     Object.entries(single).forEach(([key,value]) => {row.append("td").text(value)});


    });

}