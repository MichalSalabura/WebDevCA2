/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
document.addEventListener("DOMContentLoaded", () => {
let materialsArr = [];
let order = ["none", 0];
let types = [];
let accepted = [];
let nonAccepted = [];

    // Fetch JSON data
    fetch('recycling.json')
        .then(response => response.json())
        .then(data => {
            materialsArr, order, types, accepted, nonAccepted = data.materials; // Store materials data
        })
        .catch(error => console.error('Error loading JSON:', error));

    // Search function
    function searchRecycling() {
        const query = document.getElementById("search").value.toLowerCase();
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = '';

        if (!query) return; // Don't show anything if the search bar is empty

        let results = [];

        // Search through materials and their categories
        recyclingData.forEach(material => {
            material.categories.forEach(category => {
                if (
                    material.type.toLowerCase().includes(query) || 
                    category.name.toLowerCase().includes(query) || 
                    category.recycling_code.includes(query) || 
                    category.accepted_items.some(item => item.toLowerCase().includes(query))
                ) {
                    results.push({
                        material: material.type,
                        name: category.name,
                        code: category.recycling_code,
                        accepted_items: category.accepted_items.join(', '),
                        process: category.recycling_process,
                        recyclability: category.recyclability
                    });
                }
            });
        });

        if (results.length === 0) {
            resultsDiv.innerHTML = '<p>No matching items found.</p>';
            return;
        }

        // Display search results
        results.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.classList.add('result-item');
            resultItem.innerHTML = `
                <strong>${result.name} (Code: ${result.code})</strong><br>
                <em>Material:</em> ${result.material}<br>
                <em>Accepted Items:</em> ${result.accepted_items}<br>
                <em>Recycling Process:</em> ${result.process}<br>
                <em>Recyclability:</em> ${result.recyclability}
            `;
            resultsDiv.appendChild(resultItem);
        });
    }

    // Attach event listener to search bar
    document.getElementById('searchBar').addEventListener('input', searchRecycling);
});
