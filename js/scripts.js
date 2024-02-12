const apiUrl = "https://my.api.mockaroo.com/flight_logs.json?key=5776e910";

// Define mockData in the global scope
const mockData = {
  airline: "Delta",
  arrival_airport: "KBM",
  arrival_date: "11/17/2022",
  arrival_time: "5:00 PM",
  departure_airport: "VRB",
  departure_date: "8/7/2022",
  departure_time: "1:57 AM",
  flight_duration: 15.67,
  flight_number: 8915,
  passenger_count: 189,
};

// Function to fetch flight data based on user input
async function fetchFlightData(
  airline,
  flightNumber,
  airport,
  departureDate,
  arrivalDate,
  departureTime,
  arrivalTime
) {
  try {
    const response = await fetch(
      `${apiUrl}&airline=${airline}&flight_number=${flightNumber}&departure_airport=${airport}&departure_date=${departureDate}&arrival_date=${arrivalDate}&departure_time=${departureTime}&arrival_time=${arrivalTime}`
    );
    const data = await response.json();

    console.log("API Response:", data);

    // Display the flight information or handle errors
    displayFlightInformation(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function displayFlightInformation(data) {
  console.log("Received Data:", data);

  const flightInfoContainer = document.getElementById("flightInfoContainer");
  const flightInfoElement = document.createElement("div");

  // Check if the data object exists in the API response
  if (data) {
    flightInfoElement.innerHTML = `
      <p>Flight Number: ${data.flight_number || "N/A"}</p>
      <p>Airline: ${data.airline || "N/A"}</p>
      <p>Departure Airport: ${data.departure_airport || "N/A"}</p>
      <p>Arrival Airport: ${data.arrival_airport || "N/A"}</p>
      <p>Departure Date: ${data.departure_date || "N/A"}</p>
      <p>Arrival Date: ${data.arrival_date || "N/A"}</p>
      <p>Departure Time: ${data.departure_time || "N/A"}</p>
      <p>Arrival Time: ${data.arrival_time || "N/A"}</p>
      <!-- Add more information as needed -->
    `;
  } else {
    // Handle the case where data object is undefined
    flightInfoElement.innerHTML = "<p>Flight information not available.</p>";
  }

  flightInfoContainer.appendChild(flightInfoElement);
}

// Function to switch between Arrival and Departure boards
function switchBoards() {
  const arrivalBoard = document.getElementById("arrivalBoard");
  const departureBoard = document.getElementById("departureBoard");

  // Toggle the visibility of boards
  arrivalBoard.classList.toggle("hidden");
  departureBoard.classList.toggle("hidden");
}

// Function to update Arrival and Departure boards periodically (level 9000)
function updateBoardsPeriodically() {
  setInterval(switchBoards, 5000); // Switch boards every 5 seconds (adjust as needed)
}

// Event listener for form submission
document
  .getElementById("flightForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Get user input values
    const airline = document.getElementById("airline").value;
    const flightNumber = document.getElementById("flightNumber").value;
    const airport = document.getElementById("airport").value;
    const departureDate = document.getElementById("departureDate").value;
    const arrivalDate = document.getElementById("arrivalDate").value;
    const departureTime = document.getElementById("departureTime").value;
    const arrivalTime = document.getElementById("arrivalTime").value;

    // Call the function to fetch flight data
    fetchFlightData(
      airline,
      flightNumber,
      airport,
      departureDate,
      arrivalDate,
      departureTime,
      arrivalTime
    );

    // Clear the form
    document.getElementById("flightForm").reset();
  });

// Call the function to update boards periodically (level 9000)
updateBoardsPeriodically();
