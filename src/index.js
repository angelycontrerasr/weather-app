import "./styles.css";
console.log('Happy developing ✨')
let city = 'Caracas'
fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/' +city+'?key=SDRG7F4L9BSMN3GTENDM9ZX7Y', {mode: 'cors'})
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        console.log(response);
        document.getElementById('fullAddress').textContent=response.resolvedAddress
        document.getElementById('description').textContent=response.description
        document.getElementById('currentCondition').textContent = response.currentConditions.conditions
    })
;

document.getElementById('city').textContent=city