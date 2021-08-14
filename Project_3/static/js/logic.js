// Dropdown function options
function optionChanged(selectedYear) {

   //  Temporary holder for json file
   var geoURL = "https://raw.githubusercontent.com/i-am-phoenix/project3/main/top_fires_acres.json";
   console.log(selectedYear);
   console.log(geoURL)
   d3.json(geoURL).then(function(data) {

      d3.select('#selDataset').html('');

      data.properties.forEach(item => {
         d3.select('#selDataset').append('option').attr('value', item.archiveyear).text(item.archiveyear);
   });


// SECTION TO DETERMINE INFO OUTPUT BASED ON YEAR
d3.select('#selDataset').node().value = selectedYear;

const idYear = data.properties.filter(item => (item.archiveyear == selectedYear));
  // {
       //    console.log("------------------------")
       //    console.log(item);
       //    console.log(item.id);
          
       // });
    // Check the metadata loaded for the selected ID
    console.log(idYear);
    
    const panelDisplay = d3.select("#features-properties");
    panelDisplay.html("");
    Object.entries(idYear[0]).forEach(item=> 
       {
          // console.log(item);
          panelDisplay.append("p").text(`${item[0]}: ${item[1]}`)
       });
 
    // BAR CHART FOR TOP FIRES DURATION
 
    // Filter sample array data for the selected ID
    const idInitial = data.properties.filter(item => parseInt(item.archiveyear) == selectedYear);
    
    // // Check values
    // console.log(typeof parseInt(item.id));
    // console.log(idSample[0].sample_values);  
    // console.log(idSample[0].otu_ids);  
    // console.log(idSample[0].otu_labels);  
    
    // Slice top 10 wildfires by acres burned
    var arces_burned = idInitial[0].sample_values.slice(0,10);
    arces_burned= arces_burned.reverse();
    var fireNames = idInitial[0].otu_ids.slice(0,10);
    fireNames = fireNames.reverse();
    var fire_labels = idInitial[0].fire_labels
    fire_labels = fire_labels.reverse();
 
    // // Check values
     console.log(arces_burned);
     console.log(fireNames);
     console.log(fire_labels);
 
    // Y axis of bar chart
    const yAxis = otuID.map(item => 'OTU' + " " + item);
       // console.log(yAxis);
    
    // Define the layout and trace object, edit color and orientation
       const trace = {
       y: yAxis,
       x: arces_burned,
       type: 'bar',
       orientation: "h",
       text:  fire_labels,
       marker: {
          color: 'rgb(154, 140, 152)',
          line: {
             width: 3
         }
        }
       },
       layout = {
       title: 'Top California Wildfires by Acres Burned',
       xaxis: {title: 'Acres Burned'},
       yaxis: {title: 'Wildfires'}
       };
 
       // Plot using Plotly
       Plotly.newPlot('bar', [trace], layout,  {responsive: true});    
       
 // LEAFLET MAP
 
 // Remove Sample value and otuID from individual
 var sampleValue1 =idSample[0].sample_values;
 var otuID1= idSample[0].otu_ids;
 
 // Define the layout and trace object, edit color and orientation
 const trace1 = {
    x: otuID1,
    y: sampleValue1,
    mode: 'markers',
    marker: {
      color: otuID1,
      
      size: sampleValue1
    }
  },
 
  layout1 = {
    title: '<b>Bubble Chart For Each Sample</b>',
    xaxis: {title: 'OTU ID'},
    yaxis: {title: 'Number of Samples Collected'},
    showlegend: false,
    height: 800,
    width: 1800
    };
    
 // Plot using Plotly
 Plotly.newPlot('bubble', [trace1], layout1);
 
 // THIRD CHART ON THE RIGHT

//  BONUS FROM THE HW LOOK LATER
 // TOP FIRES BY ACRES 
 const guageDisplay = d3.select("#gauge");
 guageDisplay.html(""); 
 const washFreq = idMetadata[0].wfreq;
 
 const guageData = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: washFreq,
      title: { text: "<b>Belly Button Washing Frequency </b><br> (Scrubs Per Week)" },
      type: "indicator",
      mode: "gauge+number",     
       gauge: {
       axis: { range: [0,9] },
       bar: { color: "#f2e9e4" },
       steps: [
          { range: [0, 1], color: "#e5d5d0" },
          { range: [1, 2], color: "#dbc7c2" },
          { range: [2, 3], color: "#d2b9b4" },
          { range: [3, 4], color: "#c9ada7" },
          { range: [4, 5], color: "#ac9899" },
          { range: [5, 6], color: "#8a7e88" },
          { range: [6, 7], color: "#7d7482" },
          { range: [7, 8], color: "#706a7b" },
          { range: [8, 9], color: "#4a4e69" }
                
        ],
       threshold: {
          value: washFreq
        }
      }
    }
  ]; 
  const gaugeLayout = {  width: 600, 
                   height: 400, 
                   margin: { t: 0, b: 0 }, 
                    };
 
 // Plot using Plotly
  Plotly.newPlot('gauge', guageData, gaugeLayout); 
 
 });
}
// Initial viewing starts at the year 2013
function init() {
   // Grab a reference to the dropdown select element
   var selector = d3.select("#selDataset");
 
   // Use the list of sample names to populate the select options
   d3.json("samples.json").then((data) => {
     var sampleNames = data.names;
 
     sampleNames.forEach((sample) => {
       selector
         .append("option")
         .text(sample)
         .property("value", sample);
     });
 
     // Use the first sample from the list to build the initial plots
     var firstSample = sampleNames[0];
     buildCharts(firstSample);
     buildMetadata(firstSample);
   });
 }
 
 
optionChanged(2013);

// Event on change takes value and calls the function during dropdown selection
d3.select('#selDataset').optionChanged('change',() => {
   optionChanged(d3.event.target.value);
})
