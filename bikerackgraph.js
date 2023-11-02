// Bike rack data
const bikeRacks = [
    "Engineering 1",
    "Engineering 2",
    "Engineering 3",
    "Natural Sciences/Aula",
    "Accelerator",
    "AE Du Toit",
    "Botany",
    "IT Labs",
    "Thuto(East)",
    "Thuto(West)",
    "Chemistry",
    "Zoology",
    "Student Centre",
    "Centenary",
    "Cafeteria",
    "Law",
    "Plant Sciences",
    "Bioinformatics",
    "FABI Square",
    "NAS Lawn",
    "NAS Building",
    "Lier Theatre",
    "IT",
    "Informatorium",
    "Theology",
    "Musaion",
    "Engineering 3/Park",
    "Admin"
];

// Max Capacity data
const maxCapacity = [
    63, 40, 30, 210, 8, 18, 8, 21, 21, 77, 21, 14, 28, 28, 20, 28, 7, 20, 26, 68, 28, 21, 28, 14, 0, 28, 48, 14
];

// Usual Occupancy data
const usualOccupancy = [
    23, 25, 19, 53, 2, 2, 1, 4, 7, 62, 6, 5, 7, 5, 14, 8, 1, 4, 11, 17, 1, 2, 7, 8, 0, 9, 29, 1
];

// Create traces for Max Capacity and Usual Occupancy with filled areas
const maxCapacityTrace = {
    x: bikeRacks,
    y: maxCapacity,
    fill: 'tozeroy', // Fill below the line
    mode: 'lines',
    name: 'Max Capacity',
};

const usualOccupancyTrace = {
    x: bikeRacks,
    y: usualOccupancy,
    fill: 'tozeroy', // Fill below the line
    mode: 'lines',
    name: 'Usual Occupancy',
};

// Chart layout
const layout = {
    title: {
        text: 'Bike Rack Max Capacity(MC) vs Usual Occupancy(UO)',
        textdecoration: 'underline',
        font: {
            family: 'arial',
            size: 18,
            weight: 'bold',
        },
    },
    xaxis: { title: 'Bike Rack Name', tickfont: {size: 9} },
    yaxis: { title: 'Count' },
    legend: { x: 0, y: 1.1, orientation: 'h' },
};

// Data for the chart
const data = [maxCapacityTrace, usualOccupancyTrace];

// Create the chart
Plotly.newPlot('bikeRackChart', data, layout);
