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
var map = L.map('map',{layers: [osmMap]}).setView([-25.753889, 28.231111], 16);

//Reset view
!function(t,e){
	"function"==typeof define&&define.amd?define(["leaflet"],t):"object"==typeof exports&&(module.exports=t(require("leaflet"))),void 0!==e&&e.L&&(e.L.Control.ResetView=t(L))
}
(function(e){return ResetView=e.Control.extend({
	options:{position:"topleft",title:"Reset view",	latlng:null,zoom:null},
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
	position: "topleft",
	title: "Reset view",
	latlng: L.latLng([-25.753889, 28.231111]),
	zoom: 16,
}).addTo(map);

//Find current location
L.control.locate().addTo(map);

//WFS
//Group layers for search function
let markersLayer = new L.LayerGroup();

// specify your root URL...
var owsrootUrl = "http://localhost:8080/geoserver/GMT320/ows";

// Defining gates parameters
var defaultGates = {
  service: "WFS",
  version: "1.0.0",
  request: "GetFeature",
  typeName: "GMT320:gates",
  outputFormat: "application/json",//"text/javascript",
  format_options: "callback:getJson",
  SrsName: "EPSG:4326",
};
var parameters_gates = L.Util.extend(defaultGates);
var URL_gates = owsrootUrl + L.Util.getParamString(parameters_gates);

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

// Defining building parameters
var defaultBuildings = {
	service: "WFS",
	version: "1.0.0",
	request: "GetFeature",
	typeName: "GMT320:cleanbuildings",
	outputFormat: "application/json",
	format_options: "callback:getJson",
	SrsName: "EPSG:4326",
};
var parameters_buildings = L.Util.extend(defaultBuildings);
var URL_buildings = owsrootUrl + L.Util.getParamString(parameters_buildings);

// Create an empty layer for gates
var gatesLayer = null;
let gatesLayerGroup = new L.LayerGroup().addTo(map);

// Create an empty layer for bike racks
var bikeracksLayer = null;
let bikeracksLayerGroup = new L.LayerGroup().addTo(map);

// Create an empty layer for buildings
var buildingsLayer = null;
let buildingsLayerGroup = new L.LayerGroup().addTo(map);

// WFS Ajax requests
// this is the ajax request, we are using the jsonp option. --> GATES
$.ajax({
	url: URL_gates,
	dataType: "json",
	jsonpCallback: "getJson",

	//In the event of success...
	success: function (response) {
		console.log(response);
		gatesLayer = L.geoJson(response, {
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
				gatesLayerGroup.addLayer(marker);
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

// this is the ajax request, we are using the jsonp option. --> BUILDINGS
$.ajax({
	url: URL_buildings,
	dataType: "json",
	jsonpCallback: "getJson",

	//In the event of success...
	success: function (response) {
		console.log(response);

		buildingsLayer = L.geoJson(response, {
			style: function (feature) {
				return {
					stroke: '#232323',
                    fillColor: '#fff7b7',
					color: '#252525',
					weight: 1,
                    fillOpacity: 1,
				};
			},
			onEachFeature: function (feature, marker) {
				var popupText = "<b>Building name: </b>" + feature.properties.name;
				marker.bindPopup(popupText);
				//marker.bindPopup('<b>Building name: </b>${feature.properties.name}');
			},
		});
		buildingsLayerGroup.addLayer(buildingsLayer);
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
	"Gates": gatesLayerGroup,
	"Buildings": buildingsLayerGroup,
	"Bike Racks": bikeracksLayerGroup
};

var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);

// Add a scale bar to the map.
var scaleBar = L.control.scale({position: 'bottomleft'});
map.addControl(scaleBar);

// Style the scale bar using CSS
scaleBar.getContainer().style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
scaleBar.getContainer().style.color = 'black';
scaleBar.getContainer().style.fontSize = '14px';
scaleBar.getContainer().style.fontWeight = 'bold';

// Add a north arrow to the map
var northArrow = L.control({position: 'bottomleft'});
northArrow.onAdd = function(map) {
    var div = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
    div.style.backgroundColor = 'white';
    div.style.border = 'solid black 1px';
    div.style.borderRadius = '50%';
	div.style.width = '60px';
    div.style.height = '60px';
    div.style.cursor = 'pointer';
    div.onclick = function() {
        map.setView([-25.753889, 28.231111], 16);
    };
    var arrow = document.createElement('img');
    arrow.src = 'northarrow_image.jpeg';
    arrow.style.width = '45px';
    arrow.style.height = '45px';
    arrow.style.margin = '5px';
    div.appendChild(arrow);
    return div;
};
northArrow.addTo(map);

//Search bar
var controlSearch = new L.Control.Search({
	position: "topleft",
	layer: markersLayer,
	initial: false,
	zoom: 20,
	marker: false,
});
map.addControl(controlSearch);

// Create an HTML element for the legend
var legend = L.control({
	position: 'topright',
	width: 200,
 });

// Define the legend content and style
legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend');
    var labels = [];
    var categories = ['Gate', 'Building', 'Bike Rack'];

    // Add legend labels and corresponding colors
    for (var i = 0; i < categories.length; i++) {
        div.innerHTML +=
			'<div class="legend-item">' +
				'<img class="legend-image" src="' + getImageSource(categories[i]) + '">' +
				'<span class="legend-label">' + categories[i] + '</span>' +
			'</div>';
    }

    return div;
};

// Function to set the color for legend items
function getImageSource(category) {
    // Define colors for each category
    switch (category) {
        case 'Gate':
            return 'gates_legend2.png';
        case 'Building':
            return 'building_legend.png';
        case 'Bike Rack':
            return 'bikeracks_legend2.png';
        default:
            return 'company_logo.png';
    }
}

// Add the legend to the map
legend.addTo(map);
