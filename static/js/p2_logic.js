// Filter the data for movies with an IMDb rating greater than 8.9
//  and then graph each title on the x-axis and the respective metascore on the y-axis.

// Save the json dat (rendered to front end) into a variable
var sfdata = "/api/sql_data";

// use d3 to fetch the data served at the front end
d3.json(sfdata).then(function(sfbus){
  // console.log(data.filter(item=>item["Ownership Name"]==="Merrill Lynch Pierce Etal Inc"))
  console.log(sfbus)
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(sfbus);
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