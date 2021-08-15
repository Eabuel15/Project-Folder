function buildMetadata(year) {
    console.log('Testing')
    d3.json("../../fires4plotting.json").then(function(data) {
        var properties = [];
        properties = data.features.properties;
        console.log(`Properties: ${properties}`)

        var resultArray = properties.filter(yearObj => yearObj.archiveyear == year);
        var result = resultArray[0];
        // Use d3 to select panel with id of `$features-properties`
        var PANEL = d3.select('features-properties')

        PANEL.html('');

        console.log(result);
    })
    console.log('Testing done')
}

function buildCharts(year) {
    d3.json("../../fires4plotting.json").then(function(data){
        var properties = data.features.properties;
        var resultArray = properties.filter(yearObj => yearObj.archiveyear == year);
        var result = resultArray[0];

    })
    d3.json("../../deadliest_fires.json").then(function(data){
        // d3.json("../../fires4plotting.json").then(function(data){ 
        var labels = [];
        var values = [];
        
          for (i=0; i < data.features.length; i++) {
        
            // extracting data for magnitude and depth of the recordered earthquake
            var label  = data.features[i].properties.firename;    
            var value  = data.features[i].properties.fatalities;
            var year   = data.features[i].properties.archiveyear;
            var county = data.features[i].properties.county;
            console.log(`${i}   ${year} >>> ${label} >>> ${value}`)
        
            labels.push(`${year} | ${label}`)
            values.push(value)
          };
        
        var ctx = document.getElementById('myChart');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Number of fatalities',
                    data: values,
                    backgroundColor: "#d62728",
                    borderWidth: 1
                }]
            },
            options: {
                indexAxis: 'y',
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    })

}

function init() {
    console.log('Init testing')
    var selector = d3.select("#selDataset");
    // Use the list of fire years to populate select options
    d3.json("../../fires4plotting.json").then(function(data) {
        console.log(data);
        var fireYears = []
        for (i=0; i <= data.features.length; i++) {
            
            fireYears[i] = data.features[i].properties.archiveyear;
            
            fireYears.forEach((year) =>{
                selector
                .append("option")
                .text(year)
                ,property('value', year);
            });

            var firstYear = fireYears[0];
            buildCharts(firstYear);
            buildMetadata(firstYear);

            optionChanged(firstYear);  
              
        }
    });
    optionChanged(firstYear);
    console.log('Init testing done')
}


function optionChanged(newYear) {
    buildMetadata(newYear);
    buildCharts(newYear);
}

init();
    