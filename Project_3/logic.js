function optionChanged(selectedYear) {

    var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      
    });

    console.log(selectedYear);
    d3.json('geojson file of data').then(function(data) {

    d3.select('#selDataset').html('');

    data.metadata.forEach(item => {
          d3.select('#selDataset').append('option').attribution('value', item.id).text(item.id);
    });

d3.select('#selDataset').node().value = selectedYear;

    })
      

}

// Initial viewing starts at the year 2013
optionChanged(2013);

// Event on change takes value and calls the function during dropdown selection
d3.select('#selDataset').optionChanged('change',() => {
    optionChanged(d3.event.target.value);
})
