import "./styles.css";
console.log('Happy developing ✨')
async function fetchWeatherData(city) {
    const apiKey = 'SDRG7F4L9BSMN3GTENDM9ZX7Y'; // Tu API Key
    const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${apiKey}`;
    const errorMessageElement = document.getElementById('errorMessage');

    // Clear previous error messages
    errorMessageElement.textContent = '';

    try {
        const response = await fetch(apiUrl, { mode: 'cors' });
        if (!response.ok) {
            // Check for specific error status codes
            if (response.status === 400) {
                throw new Error('Ciudad no encontrada o solicitud inválida. Por favor, verifica el nombre.');
            } else if (response.status === 401 || response.status === 403) {
                throw new Error('Problema de autenticación con la API. Verifica tu clave.');
            } else {
                throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
            }
        }
        const data = await response.json();

        // Update the DOM with the fetched data
        document.getElementById('currentCityName').textContent = data.resolvedAddress.split(',')[0].trim(); // Display only the city name
        document.getElementById('fullAddress').textContent = data.resolvedAddress;
        document.getElementById('description').textContent = data.description;
        document.getElementById('currentCondition').textContent = data.currentConditions.conditions;

    } catch (error) {
        console.error('Error al obtener los datos del clima:', error);
        errorMessageElement.textContent = `Error: ${error.message}`;
        // Clear displayed weather data on error
        document.getElementById('currentCityName').textContent = 'Error al cargar el clima';
        document.getElementById('fullAddress').textContent = '';
        document.getElementById('description').textContent = '';
        document.getElementById('currentCondition').textContent = '';
    }
}

// Get the form and input elements
const weatherForm = document.getElementById('weatherForm');
const cityNameInput = document.getElementById('cityNameInput');

// Add an event listener to the form for submission
weatherForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission (page reload)

    const selectedCity = cityNameInput.value.trim(); // Get the trimmed value from the input

    if (selectedCity) { // Only fetch if the input is not empty
        fetchWeatherData(selectedCity);
    } else {
        document.getElementById('errorMessage').textContent = 'Por favor, introduce el nombre de una ciudad.';
    }
});

// Initial load: Fetch weather for Caracas when the page loads
document.addEventListener('DOMContentLoaded', () => {
    fetchWeatherData('Caracas');
});