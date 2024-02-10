// Your JavaScript code goes here
const apiUrl = "https://my.api.mockaroo.com/flight_logs.json?key=5776e910";

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
  // Implement the fetch logic here using the apiUrl
  // You can use either async/await or fetch().then().then()

  try {
    const response = await fetch(
      `${apiUrl}&airline=${airline}&flight_number=${flightNumber}&departure_airport=${airport}&departure_date=${departureDate}&arrival_date=${arrivalDate}&departure_time=${departureTime}&arrival_time=${arrivalTime}`
    );
    const data = await response.json();
    // Display the flight information or handle errors
    displayFlightInformation(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Function to display flight information
function displayFlightInformation(data) {
  // Implement how you want to display the information on the page
  console.log("Flight Information:", data);

  // For demonstration purposes, you can append the information to a div
  const flightInfoContainer = document.getElementById("flightInfoContainer");
  const flightInfoElement = document.createElement("div");
  flightInfoElement.innerHTML = `
        <p>Flight Number: ${data.flight_number}</p>
        <p>Departure Airport: ${data.departure_airport}</p>
        <p>Arrival Airport: ${data.arrival_airport}</p>
        <!-- Add more information as needed -->
    `;
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
