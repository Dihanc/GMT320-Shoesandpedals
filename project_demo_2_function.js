/// TEMP
document.getElementById("building_selector").addEventListener("change", function() {
//console.log("HERE!!");
	var selectedBuilding_e= document.getElementById("building_selector");
	var selectedBuilding = selectedBuilding_e.options[selectedBuilding_e.selectedIndex].value;
	//console.log(selectedBuilding);

	var  building_lookup = {"AE Auditorium And Annex":"/img/AE Auditorium And Annex - Copy-1 - Copy.png",
		"Administration": "/img/Administration-1.png",
		"Amphitheatre And Musaion":"/img/Amphitheater And Musaion-1 - Copy.png",
		"Aula And Rautenbach Hall":"/img/Aula And Rautenbach Hall-1.png",
		"Bateman Building":"/img/Bateman Building-1.png",
		"Botany Building":"/img/Botany-1.png",
		"Building 5":"/img/Building 5-1.png",
		"Building 70":"/img/Building 70-1.png",
		"Building 71":"/img/Building 71-1.png",
		"Building 72":"/img/Building 72-1.png",
		"Building 73":"/img/Building 73-1.png",
		"Building 75":"/img/Building 74-1.png",
		"Building 75B":"/img/Building 75-1.png",
		"Building 76":"/img/Building 76-1.png",
		"Building 77":"/img/Building 77-1.png",
		"Building 78":"/img/Building 78-1.png",
		"CEFIM":"/img/CEFIM-1.png",
		"Centenary Building":"img/Centenary Building-1.png",
		"Chancellors":"/img/Chancellor-1.png",
		"Chapel":"/img/Chapel-1.png",
		"Chemistry Building":"/img/Chemistry building-1.png",
		"Club Hall":"/img/Club hall-1.png",
		"Communication Pathology Building":"/img/Communications pathology-1.png",
		"Conference Centre":"img/Conference centre-1.png",
		//"Department of Architecture":"/img/Building science-1.png",
		"Drama Building":"/img/Drama-1.png",
		"Economics And Management Science Building":"/img/Economics mangmnt-1.png",
		"Engineering 1":"/img/Engineering 1-1.png",
		"Engineering 2": "/img/Engineering 2.png",
		"Engineering 3":"/img/Engineering 3 Building.png",
		"FABI 1":"/img/FABI 1.png",
		"FABI 2":"/img/FABI 1.png",
		"Geography Building":"/img/Geography Building-1.png",
		"Graduate centre":"/img/Graduate centre-1.png",
		"Heavy Machine Labs":"/img/Heavy Machine Labs-1.png",
		"Humanities Building":"/img/Humanities Building.png",
		"Information Technology Building":"/img/Information Technology Building.png",
		"JJ Theron-Lesingsaal":"/img/JJ Theron-Lesingsaal.png",
		"Kya Rosa":"/img/Kya Rosa.png",
		"Landbou-Anneks":"/img/Landbou-Anneks.png",
		"Law Building:":"/img/Law Building.png",
		"Lier Theatre":"/img/Lier Theatre.png",
		"Marketing Services Building":"/img/Marketing Services Building.png",
		"Maskerteater":"/img/Maskerteater.png",
		"Mathematics Building":"/img/Mathematics Building.png",
		"Mineral Sciences":"/img/Mineral sciences-1.png/",
		"Monastery Hall":"/img/Monastery Hall-1.png",
		"Music Building":"/img/Music Building-1.png",
		"Natural Sciences Building 2":"/img/Natural Sciences Building 2-1.png",
		"Natural Sciences 1 Building":"/img/Natural Sciences 1 Building-1.png",
		"Natural And Agricultural Sciences Building":"/img/Natural And Agricultural Sciences Building.png",
		"Old Agriculture Building":"/img/Old Agricultural building.png",
		"Old Arts Building":"/img/Old Arts Building.png",
		"Old Chemistry Building":"/img/Old Chemistry Building.png",
		"Old Merensky Building": "/img/Old Merensky Building.png",
		"Plant Sciences Complex":"/img/Plant science-1.png",
		"Roosmaryn":"/img/Roosmaryn-1.png",
		"Sanlam Auditorium":"/img/Sanlam Auditorium-1.png",
		"Sci-Enza":"img/SCIENZA-1.png",
		"Stoneman Building":"/img/STONEMAN-1.png",
		"Student Centre Building":"/img/Student centre-1.png",
		"Student Health Services":"/img/Student health-1.png",
		"Student Service Center Building":"/img/Student Service Center Building-1.png",
		"Technical Services Building":"/img/Technical services-1.png/",
		"Theology Building":"/img/Theology-1.png",
		"Thuto":"/img/Thuto-1.png",
		"Tukkiewerf":"/img/TUKKIEWERF-1.png",
		"UP Shop And Vida Cafe":"/img/UP Shop and Vida cafe-1.png",
		"Vetman Building":"/img/Vetman building-1.png",
		"Visitors Reception":"/img/Visitors reception-1.png",
		"Visual Arts":"/img/Visual arts-1.png",
		"zoology Building":"/img/Zoology-1.png" 
	};
	// Get the corresponding image path
	var imagePath = building_lookup[selectedBuilding];
	//var imagePath = building_lookup["zoology Building"];
	//console.log(imagePath);
	// Update the image source in the div
	document.getElementById("buildingImage").src = imagePath});
// ---------------------




//OSM tiles attribution and URL
var osmLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
var osmURL = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osmAttrib = '&copy; ' + osmLink;

//ESRI World Imagery tiles attribution and URL
var cartoLink = '<a href="http://cartodb.com/attributions">EsriWorldImagery</a>';
var cartoURL = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
var cartoAttrib = ' &copy; ' + cartoLink + ' &copy; ' + osmLink;

//Create map tiles
var osmMap = L.tileLayer(osmURL, {attribution: osmAttrib});
var cartoMap = L.tileLayer(cartoURL, {attribution: cartoAttrib});
var darkMap = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 20
});	

//Create map
var map = L.map('map',{layers: [osmMap]}).setView([-25.754344, 28.227778], 16);

//Building selector
var geoList = L.control.geoJsonSelector(null, {
	zoomToLayer: true
}).addTo(map);

geoList.on('selector:change', function(e) {
	var jsonObj = $.parseJSON( JSON.stringify(e.layers[0].feature.properties) );
	var html = 'Selection:<br /><table border="1">';
	$.each(jsonObj, function(key, value){
			html += '<tr>';
			html += '<td>' + key.replace(":", " ") + '</td>';
			html += '<td>' + value + '</td>';
			html += '</tr>';
	});
	html += '</table>';

	$('.selection').html(html);
});

map.addControl(function() {
	var c = new L.Control({position:'bottomright'});
	c.onAdd = function(map) {
			return L.DomUtil.create('pre','selection');
		};
	return c;
}());
$.getJSON('cleanbuildings.geojson', function (json) {
  geoList.reload(L.geoJson(json));
});

//WFS
//Group layers for search function
let markersLayer = new L.LayerGroup();

// specify your root URL...
var owsrootUrl = "http://localhost:8080/geoserver/GMT320/ows";

// Defining cycling gates parameters
var defaultGates1 = {
  service: "WFS",
  version: "1.0.0",
  request: "GetFeature",
  typeName: "GMT320:cyclinggates",
  outputFormat: "application/json",//"text/javascript",
  format_options: "callback:getJson",
  SrsName: "EPSG:4326",
};
var parameters_gates1 = L.Util.extend(defaultGates1);
var URL_gates1 = owsrootUrl + L.Util.getParamString(parameters_gates1);

// Defining walking gates parameters
var defaultGates2 = {
	service: "WFS",
	version: "1.0.0",
	request: "GetFeature",
	typeName: "GMT320:walkinggates",
	outputFormat: "application/json",//"text/javascript",
	format_options: "callback:getJson",
	SrsName: "EPSG:4326",
  };
  var parameters_gates2 = L.Util.extend(defaultGates2);
  var URL_gates2 = owsrootUrl + L.Util.getParamString(parameters_gates2);

// Defining bike racks parameters
var defaultBikeracks = {
	service: "WFS",
	version: "1.0.0",
	request: "GetFeature",
	typeName: "GMT320:bikeracks",
	outputFormat: "application/json",
	format_options: "callback:getJson",
	SrsName: "EPSG:4326",
};
var parameters_bikeracks = L.Util.extend(defaultBikeracks);
var URL_bikeracks = owsrootUrl + L.Util.getParamString(parameters_bikeracks);

// Create an empty layer for cycling gates
var gatesLayer1 = null;
let gatesLayerGroup1 = new L.LayerGroup().addTo(map);

// Create an empty layer for walking gates
var gatesLayer2 = null;
let gatesLayerGroup2 = new L.LayerGroup().addTo(map);

// Create an empty layer for bike racks
var bikeracksLayer = null;
let bikeracksLayerGroup = new L.LayerGroup().addTo(map);

// WFS Ajax requests
// this is the ajax request, we are using the jsonp option. --> CYCLING GATES
$.ajax({
	url: URL_gates2,
	dataType: "json",
	jsonpCallback: "getJson",

	//In the event of success...
	success: function (response) {
		console.log(response);
		gatesLayer2 = L.geoJson(response, {
			style: function (feature) {
				return {
					stroke: false,
                    fillColor: '#36ff46',
                    fillOpacity: 50
				};
			},
			pointToLayer: function (feature, latlng) {

				//console.log(feature.properties);

				const popupInfo = `
					<b>Gate name: </b>${feature.properties.gate_number_or_name} <br>
					<b>Accessible on foot: </b>${feature.properties.walking_student_accessible} <br>
					<b>Accessible on bicycle: </b>${feature.properties.cycling_student_accessible} <br>
				`;

				const imageIcon = new L.Icon({
					iconUrl: 'http://127.0.0.1:5500/gates_legend2.png',
					iconSize: [22,22],
					iconAnchor: [11, 5],
				});

				let marker = new L.marker(latlng, {
					icon: imageIcon,
					title: feature.properties.gate_number_or_name,
				})
				.bindPopup(popupInfo)
				.openPopup();

				markersLayer.addLayer(marker);
				gatesLayerGroup2.addLayer(marker);
				// return marker;
			},
			onEachFeature: function (feature, featureLayer) {
				featureLayer.bindPopup(feature.properties.gate_number_or_name);
			},
		});
	},
	error: function(xhr){
        console.log('Request Status: ' + xhr.status + ' Status Text: ' + xhr.statusText + ' ' + xhr.responseText);
    }
});

// this is the ajax request, we are using the jsonp option. --> WALKING GATES
$.ajax({
	url: URL_gates1,
	dataType: "json",
	jsonpCallback: "getJson",

	//In the event of success...
	success: function (response) {
		console.log(response);
		gatesLayer1 = L.geoJson(response, {
			style: function (feature) {
				return {
					stroke: false,
                    fillColor: '#36ff46',
                    fillOpacity: 50
				};
			},
			pointToLayer: function (feature, latlng) {

				//console.log(feature.properties);

				const popupInfo = `
					<b>Gate name: </b>${feature.properties.gate_number_or_name} <br>
					<b>Accessible on foot: </b>${feature.properties.walking_student_accessible} <br>
					<b>Accessible on bicycle: </b>${feature.properties.cycling_student_accessible} <br>
				`;

				const imageIcon = new L.Icon({
					iconUrl: 'http://127.0.0.1:5500/gates_legend2.png',
					iconSize: [22,22],
					iconAnchor: [11, 5],
				});

				let marker = new L.marker(latlng, {
					icon: imageIcon,
					title: feature.properties.gate_number_or_name,
				})
				.bindPopup(popupInfo)
				.openPopup();

				markersLayer.addLayer(marker);
				gatesLayerGroup1.addLayer(marker);
				// return marker;
			},
			onEachFeature: function (feature, featureLayer) {
				featureLayer.bindPopup(feature.properties.gate_number_or_name);
			},
		});
	},
	error: function(xhr){
        console.log('Request Status: ' + xhr.status + ' Status Text: ' + xhr.statusText + ' ' + xhr.responseText);
    }
});

// this is the ajax request, we are using the jsonp option. --> BIKE RACKS
$.ajax({
	url: URL_bikeracks,
	dataType: "json",
	jsonpCallback: "getJson",

	//In the event of success...
	success: function (response) {
		console.log(response);
		bikeracksLayer = L.geoJson(response, {
			pointToLayer: function (feature, latlng) {

				//console.log(feature.properties);

				const popupInfo = `
					<b>Bike rack name: </b>${feature.properties.Name} <br>
				`;

				const imageIcon = new L.Icon({
					iconUrl: 'http://127.0.0.1:5500/bikeracks_legend2.png',
					iconSize: [22,22],
					iconAnchor: [11, 5],
				});

				let marker = new L.marker(latlng, {
					icon: imageIcon,
					title: feature.properties.Name,
				})
				.bindPopup(popupInfo)
				.openPopup();

				markersLayer.addLayer(marker);
				bikeracksLayerGroup.addLayer(marker);
				// return marker;
			},
			onEachFeature: function (feature, featureLayer) {
				featureLayer.bindPopup(feature.properties.Name);
			},
		});
	},
	error: function(xhr){
        console.log('Request Status: ' + xhr.status + ' Status Text: ' + xhr.statusText + ' ' + xhr.responseText);
    }
});
              
//Base layer definition
var baseMaps = {
	"OpenStreetMap": osmMap,
	"Esri World Imagery": cartoMap,
	"Carto Dark Matter": darkMap
};

var overlayMaps = {
	'<div class="overlay-map-entry"><img src="http://127.0.0.1:5500/gates_legend2.png" class="overlay-map-image" /> Cycling Gate</div>': gatesLayerGroup1,
	'<div class="overlay-map-entry"><img src="http://127.0.0.1:5500/gates_legend2.png" class="overlay-map-image" /> Walking Gate</div>': gatesLayerGroup2,
	'<div class="overlay-map-entry"><img src="http://127.0.0.1:5500/bikeracks_legend2.png" class="overlay-map-image" /> Bike Rack</div>': bikeracksLayerGroup
};

L.control.layers(baseMaps, overlayMaps).addTo(map);

map.addControl(L.control.zoom({position:'topright'}));

//Reset view
!function(t,e){
	"function"==typeof define&&define.amd?define(["leaflet"],t):"object"==typeof exports&&(module.exports=t(require("leaflet"))),void 0!==e&&e.L&&(e.L.Control.ResetView=t(L))
}
(function(e){return ResetView=e.Control.extend({
	options:{position:"topright",title:"Reset view",	latlng:null,zoom:null},
	onAdd:function(t){
		const image = document.createElement('img');
        image.src = './home_icon.png';

		return this._map=t,
		this._container=e.DomUtil.create("div","leaflet-control-resetview leaflet-bar leaflet-control"),
		this._link=e.DomUtil.create("a","leaflet-bar-part leaflet-bar-part-single",this._container),

		this._link.appendChild(e.DomUtil.create('span', 'leaflet-control-resetview-image')),


        // Add a CSS class to the _link element to style the image
        this._link.classList.add('leaflet-control-resetview-image'),

		this._link.title=this.options.title,this._link.href="#",this._link.setAttribute("role","button"),
		this._icon=e.DomUtil.create("span","leaflet-control-resetview-icon",this._link),
		e.DomEvent.on(this._link,"click",this._resetView,this),
		this._container
	},
		onRemove:function(t){e.DomEvent.off(this._link,"click",this._resetView,this)},
		_resetView:function(t){this._map.setView(this.options.latlng,this.options.zoom)}
}),
e.control.resetView=function(t){return new ResetView(t)},ResetView},window
);
L.control.resetView({
	position: "topright",
	title: "Reset view",
	latlng: L.latLng([-25.754344, 28.227778]),
	zoom: 16,
}).addTo(map);

//Find current location
L.control.locate({
	position: 'topright',
}).addTo(map);

// Add a scale bar to the map.
var scaleBar = L.control.scale({position: 'bottomright'});
map.addControl(scaleBar);

// Style the scale bar using CSS
scaleBar.getContainer().style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
scaleBar.getContainer().style.color = 'black';
scaleBar.getContainer().style.fontSize = '10px';

// Add a north arrow to the map
var northArrow = L.control({position: 'bottomright'});
northArrow.onAdd = function(map) {
    var div = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
    div.style.backgroundColor = 'white';
    div.style.border = 'solid black 1px';
    div.style.borderRadius = '50%';
	div.style.width = '50px';
    div.style.height = '50px';
    div.style.cursor = 'pointer';
    div.onclick = function() {
        map.setView([-25.753889, 28.231111], 16);
    };
    var arrow = document.createElement('img');
    arrow.src = 'northarrow_image.jpeg';
    arrow.style.width = '35px';
    arrow.style.height = '35px';
    arrow.style.margin = '5px';
	arrow.style.borderRadius = '10%';
    div.appendChild(arrow);
    return div;
};
northArrow.addTo(map);

//Search bar
var controlSearch = new L.Control.Search({
	position: "topright",
	layer: markersLayer,
	initial: false,
	zoom: 20,
	marker: false,
});
map.addControl(controlSearch);
