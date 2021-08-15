// for proj3 cal fire data display

// Add a tile layer.
var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'

});

// read from json and manipulate.
var fire_data = "http://127.0.0.1:5000/all_fires"


// d3.json(fire_data).then(function() {
  

// d3.csv(fire_csv).then(function(data) {
d3.json(fire_data).then(function(data) {
// var lend = data.features.length;
    console.log("logic_gjs");
//     console.log(`${lend}`);
    console.log(data);

  // for marker size use acresburned
  function markerSize(AcresBurned) {
    return Math.sqrt(AcresBurned) * 100 ;
  }

  // dropdown selection

  d3.selectAll("#selectYear").on("change", updateMap);

  //use selection to update map

   function updateMap() {
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selectYear");
    // Assign the value of the dropdown menu option to a variable
    var yearset = dropdownMenu.property("value");

    // console.log(yearset);
    //variable for refresh
    let yearlist = [] ;

    for (var i = 0; i < data.features.length; i++) {
     if (data.features[i].properties.archiveyear == yearset) {
       // push to a layer to draw
       let fire = L.circle([data.features[i].geometry.coordinates[1], data.features[i].geometry.coordinates[0]], {
         fillOpacity: 0.4,
         color: "turquoise",
         fillColor: "turquoise",
       // Setting our circle's radius to equal the output of our markerSize() function:
         radius: markerSize(data.features[i].properties.acresburned)
       }).bindPopup(`<h4>Name: ${data.features[i].properties.firename}</h4><h5>Duration: ${data.features[i].properties.duration}</h5>`)
       //push to make a layer for display
       yearlist.push(fire);
       }
     else {
     };
    };
    // refresh with new selection
    myMap.removeLayer(blanky);
    blanky=L.layerGroup(yearlist);
    blanky.addTo(myMap);
  }; 

// end of pull down options

  // write data to console
//   console.log(data);

  // set variables
  var AllFires = [];
  var yearfires = [];
  var marker1 = [];
  var dixie = [];
  var blank = [];

  // loop through data
  for (var i = 0; i < data.features.length; i++) {

    // layer for all fires with marker size acrage burned
    AllFires.push(L.circle([data.features[i].geometry.coordinates[1], data.features[i].geometry.coordinates[0]], {
        fillOpacity: 0.5,
        color: "red",
        fillColor: "orange",
      // Setting our circle's radius to equal the output of our markerSize() function:
        radius: markerSize(data.features[i].properties.acresburned)
      }).bindPopup(`<h4>Name: ${data.features[i].properties.firename}</h4><h5>Duration: ${data.features[i].properties.duration}</h5>`)
    //   .addTo(myMap)
    );

    // make layer colored by year 
     if (data.features[i].properties.archiveyear == "2013") {
         colory = "red"
     } else if (data.features[i].properties.archiveyear == "2014"){
         colory = "yellow"
     } else if (data.features[i].properties.archiveyear == "2015"){
      colory = "green"
     } else if (data.features[i].properties.archiveyear == "2016"){
      colory = "lightblue"
     } else if (data.features[i].properties.archiveyear == "2017"){
      colory = "violet"
     } else if (data.features[i].properties.archiveyear == "2018"){
      colory = "purple"
     } else if (data.features[i].properties.archiveyear == "2019"){
      colory = "orange"
     } else {
      colory = "white"
     };

    yearfires.push(L.circle([data.features[i].geometry.coordinates[1], data.features[i].geometry.coordinates[0]], {
      fillOpacity: 0.5,
      color: colory ,
      fillColor: colory ,
     // Setting our circle's radius to equal the output of our markerSize() function:
      radius: 1000
     }).bindPopup(`<h4>Name: ${data.features[i].properties.firename}</h4> <h5>Year: ${data.features[i].properties.archiveyear}<br>Acres Burnt: ${data.features[i].properties.acresburned}</h5>`)
     //  .addTo(myMap)
    );
  //end i loop
  };
  
  // marker near Fresno
  marker1.push(L.marker([36.7542022991528, -119.8095611131692]).bindPopup(`Near Fresno`));
  dixie.push(L.marker([40.07173560759751, -121.20983910716066]).bindPopup(`Dixie Fire`));


  // create overlays.
  var mark = L.layerGroup(marker1);
  var fires = L.layerGroup(AllFires);
  var firesy = L.layerGroup(yearfires);
  var dixief = L.layerGroup(dixie);
  var blanky = L.layerGroup(blank);

  var overlayMaps = {
  "Near Fresno": mark,
  "Dixie Fire": dixief,
  "All Fires with Acrerage": fires,
  "All Fires by year": firesy,
  };

 // Create basemap selections
 var baseMaps = {
   "Street Map": street,
   "Satellite": Esri_WorldImagery
 };

 // Create a map object.
 var myMap = L.map("map", {
   center: [37.420258, -120.622549],
   zoom: 6,
   layers: [street, mark]
 });

 // controls open
 L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
 }).addTo(myMap);

// end of then
});

