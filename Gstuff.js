// Add event listener to the search button
document.getElementById('search-button').addEventListener('click', function() {
    performSearch(); // Perform the search
    displayResultsPanel();
});
// Function to perform the search and display results
function performSearch() {
    const searchTerm = document.getElementById('search-input').value;
    
    // Replace this with your code to search the GeoServer database
    // Example: You can make an AJAX request to the GeoServer API

    // Display search results in the search-results panel
    function displayResultsPanel() {
        const searchResultsPanel = document.getElementById('search-results-panel');
        searchResultsPanel.style.display = 'block';
        
    }
}
// Close the search results panel when clicking outside of it
document.addEventListener('click', function(event) {
    const searchResultsPanel = document.getElementById('search-results-panel');
    if (event.target !== searchResultsPanel && event.target !== document.getElementById('search-input')) {
        searchResultsPanel.style.display = 'none';
    }
});





