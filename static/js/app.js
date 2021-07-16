

// YOUR CODE HERE!
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
    console.log("runEnter begin");
    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Select the input element and get the raw HTML node
    var input_date = d3.select("#datetime");

    // Get the value property of the input element
    var inputValue = input_date.property("value");

    // check city
    var input_city = d3.select("#cityname");

    // Get the value property of the input element
    var inputCity = input_city.property("value");

    // check state
    var input_state = d3.select("#statename");

    // Get the value property of the input element
    var inputState = input_state.property("value");

    // check country
    var input_country = d3.select("#countryname");

    // Get the value property of the input element
    var inputCountry = input_country.property("value");

    // check country
    var input_shape = d3.select("#shapename");

    // Get the value property of the input element
    var inputShape = input_shape.property("value");

    console.log(inputValue);

    // Search for data, use Date.parse()to convert 

    var result = tableData.filter(ufo => ((Date.parse(ufo.datetime)) >= (Date.parse(inputValue)) && ufo.city == inputCity 
    && ufo.state == inputState && ufo.country == inputCountry && ufo.shape == inputShape));

    console.log(result);

    // Put result into the table

    d3.select('tbody').html("");
    result.forEach((single) => {

     var row = d3.select('tbody').append("tr");   
     Object.entries(single).forEach(([key,value]) => {row.append("td").text(value)});


    });

}