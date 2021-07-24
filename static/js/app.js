//fetch("/api/sql_data").then(j=>j.json()).then(res=>{
//  console.log(res)
//})

// from data.js
// var tableData = data;


// Select the input


// Save the json data into a new variable sfbuz
var sfbuz = "/api/sql_data_0";
console.log("sfbuz")

d3.json(sfbuz).then(function (sfbus) {
  displayData(sfbus);

});

// Make the table show
// select tbody
tbody = d3.select("tbody");

// Loop through the table
function displayData(content) {
  tbody.text("")
  content.forEach(function (sfbusiness) {
    new_tr = tbody.append("tr")
    Object.entries(sfbusiness).forEach(function ([key, value]) {
      new_td = new_tr.append("td").text(value)
    })
  })
}

// displayData(sfbuz);
console.log("hello2");

// Select the button in index.html
var button = d3.select("#filter-btn");

// Create event handlers 

button.on("click", runEnter);

// Complete the event handler function for the form
function runEnter() {
  console.log("runEnter begin");
  // Prevent the page from refreshing
  d3.event.preventDefault();
  // Select the input element and get the raw HTML node by finding the id=categoryname
  var input_cat = d3.select("#categoryname");

  // Get the value property of the input element
  var inputValue = input_cat.property("value");

  console.log(inputValue);

  // Search for data, use Date.parse()to convert 

  var result = sfbuz.filter(row => row["Category Name"] == inputValue);

  console.log(result);

  // Put result into the table

  d3.select('tbody').html("");
  result.forEach((single) => {

    var row = d3.select('tbody').append("tr");
    Object.entries(single).forEach(([key, value]) => { row.append("td").text(value) });


  });

};

var filterInputs = d3.selectAll('.form-control');

// Clears input fields and input object
function clearEntries() {
  filters = {};

  //Set every input field to empty
  filterInputs._groups[0].forEach(entry => {
    if (entry.value != 0) {
      d3.select('#' + entry.id).node().value = ""
    };
  });
};