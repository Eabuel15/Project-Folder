d3.json("http://127.0.0.1:5000/largest_fires").then(function(data){
    // d3.json("http://127.0.0.1:5000/longest_fires").then(function(data){ 
    var uniqueYears = [];
 
    // Function to add year selections as HTML element
    function addSelection(individualYear) {
        var selection = d3.select("#selYearAcres");//document.getElementById("selYear");
        var option = selection.append("option").text(individualYear).property("value",individualYear)//document.createElement("option");
        // option.appendChild(document.createTextNode(individualYear));
        // selection.appendChild(option);
    } ;

    function createDropDownMenu(input) {
        // Read in sample ids and create drop-down selector
        for (i=0; i<input.length; i++) {
            // console.log(`year: ${input[i]}`)
            let individualYear = input[i];
            addSelection(individualYear);
        };
    };

    // Call when change takes place to the DOM
    d3.select("#selYearAcres").on("change", updateBarChart);
 
    var myAcreChart;

    uniqueYears = listYears(data);
    createDropDownMenu(uniqueYears);
    createBarChart();

    function listYears(data) {
        for (i=0; i < data.features.length; i++) {
            var year   = data.features[i].properties.archiveyear;
            var flag = uniqueYears.includes(parseInt(year));

            if (flag ===  false) {
                uniqueYears.push(parseInt(year));
            }
        };
        console.log(`Array of unique years by size: ${uniqueYears.sort()}`);
        return uniqueYears.sort();
    };

    function createBarChart() {

        // var dropdownMenu = d3.select("#selYear");
  
        // // Assign the value of the dropdown menu option to a variable
        // var selectedYear = dropdownMenu.node().value//property("value");
        // console.log(`Year selected is >>>> ${selectedYear}`)
        
        var labels = [];
        var values = [];
        var selectedYear = 2017

        for (i=0; i < data.features.length; i++) {

            // extracting data for magnitude and depth of the recordered earthquake
            var label  = data.features[i].properties.firename;    
            var value  = data.features[i].properties.acresburned;
            var year   = data.features[i].properties.archiveyear;
            // var county = data.features[i].properties.county;
            // console.log(`${i}   ${year} >>> ${label} >>> ${parseInt(value)}`)
        
            if (parseInt(year) === parseInt(selectedYear)) {
                labels.push(`${label}`) // labels.push(`${year} | ${label}`)
                values.push(parseFloat(value).toFixed(2))
                // console.log(`labels: ${labels}`)
                // console.log(`values: ${values}`)
            };
        
        };

        // console.log(`labels: ${labels}`)
        // console.log(`values: ${values}`)

        var ctx = document.getElementById('myAcreChart');
        myAcreChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: `Acres burned in ${selectedYear}, days`,
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
    };

    function updateBarChart() {

        var dropdownMenu = d3.select("#selYearAcres");
  
        // Assign the value of the dropdown menu option to a variable
        var selectedYear = dropdownMenu.node().value//property("value");
        console.log(`Year selected is >>>> ${selectedYear}`)
        
        var labels = [];
        var values = [];
        // var selectedYear = 2013

        for (i=0; i < data.features.length; i++) {

            // extracting data for magnitude and depth of the recordered earthquake
            var label  = data.features[i].properties.firename;    
            var value  = data.features[i].properties.acresburned;
            var year   = data.features[i].properties.archiveyear;
            // var county = data.features[i].properties.county;
            // console.log(`${i}   ${year} >>> ${label} >>> ${parseInt(value)}`)
        
            if (parseInt(year) === parseInt(selectedYear)) {
                labels.push(`${label}`) // labels.push(`${year} | ${label}`)
                values.push(parseFloat(value).toFixed(2))
            };
        
        };


        myAcreChart.data.labels = labels;
        myAcreChart.data.datasets[0].data = values;
        myAcreChart.data.datasets[0].label = `Acres burned in ${selectedYear}, acres:`;
        myAcreChart.update()
    };
})