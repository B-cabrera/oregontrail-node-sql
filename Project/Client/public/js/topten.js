

window.addEventListener('load', displayScores)

function displayScores() {  
    
    // Get top ten
    fetch('/api/topTen').then((res) => {
        return res.json();
    }).then((data) => {
        // DATA IS TOP TEN ARRAY
        data.topScores.forEach(element => {
            
            // Create table row element
            var currentrow = document.createElement('tr');

            // Create table data element for name, point, and date
            var nameElement = document.createElement('td');
            var pointsElement = document.createElement('td');
            var dateElement = document.createElement('td');

            // Append elements to row 
            currentrow.appendChild(nameElement);
            currentrow.appendChild(pointsElement);
            currentrow.appendChild(dateElement);

            // Add info to the elements
            nameElement.textContent = element.name;
            pointsElement.textContent = element.score;
            dateElement.textContent = element.date;

            // Append row to table
            document.getElementById('scores').appendChild(currentrow);

        });
    })

}