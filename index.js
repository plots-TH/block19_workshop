// === State ===
// Here, we define variables for the data that our program needs to remember.
// We call this data "state" because it represents the state of our program.
// This is also where we define functions to modify the state.

// TODO: Add support for more names and job titles

const names = [
    "Alice", "Bob", "Charlie", "Diana", "Ethan", "Fiona", "George", "Hannah", "Isaac", "Jasmine",
    "Kyle", "Laura", "Mason", "Nina", "Oliver", "Paula", "Quinn", "Rachel", "Sam", "Tina"
];
  
const occupations = [
    "Teacher", "Doctor", "Engineer", "Artist", "Chef", "Farmer", "Pilot", "Dentist", "Architect", 
    "Scientist", "Musician", "Accountant", "Journalist", "Librarian", "Electrician", "Photographer", 
    "Software Developer", "Paramedic", "Lawyer", "Mechanic"
];
  
// Maximum number of freelancers to add
const maxFreelancers = 10;
  
// Array to store the default freelancers
const freelancers = [
    { name: "John", occupation: "Gardener", price: 20 },
    { name: "Jane", occupation: "Mechanic", price: 40 },
    { name: "Kevin", occupation: "Writer", price: 30 },
];
  
/** Adds a random freelancer to the freelancers array */
function addFreelancer() {
    const name = names[Math.floor(Math.random() * names.length)];
    const occupation = occupations[Math.floor(Math.random() * occupations.length)];
    const price = Math.floor(Math.random() * 150) + 15; // Random price between 15 and 165
  
    freelancers.push({ name, occupation, price });
}

/** Calculates the average price of freelancers */
function calculateAveragePrice() {
    const total = freelancers.reduce((sum, freelancer) => sum + freelancer.price, 0);
    const avg = Math.round((total / freelancers.length));
    return avg; // Returns the average price rounded to two decimal places
}

// === Render ===
// To "render" is to update the DOM to reflect the current state.
// In this section, we define the functions to render state.

/** Updates the DOM to reflect the current state. */
function renderFreelancers() {
    // Render the rows
    const freelancersContainer = document.querySelector(`#freelancers`);
  
    // Create a list of elements for each freelancer and apply the freelancer class to them
    const freelancerElements = freelancers.map(freelancer => {
        const freelancerElement = document.createElement(`div`);
        freelancerElement.classList.add(`freelancer`);
      
        // Create the individual cells that store data (names, occupation, and price)
        const nameCell = document.createElement(`div`);
        nameCell.classList.add(`cell`);
        nameCell.innerText = freelancer.name;
  
        const occupationCell = document.createElement(`div`);
        occupationCell.classList.add(`cell`);
        occupationCell.innerText = freelancer.occupation;
  
        const priceCell = document.createElement(`div`);
        priceCell.classList.add(`cell`);
        priceCell.innerText = `$${freelancer.price}/hr`;
  
        // Append the cells to the freelancer element
        freelancerElement.appendChild(nameCell);
        freelancerElement.appendChild(occupationCell);
        freelancerElement.appendChild(priceCell);
  
        return freelancerElement;
    });
  
    // Replace the children of the freelancers container with the updated freelancer elements
    freelancersContainer.replaceChildren(...freelancerElements);

    // Update and display the average price dynamically
    const avgPriceElement = document.querySelector('.avgPriceSentence');
    avgPriceElement.innerText = `The average starting price is about $${calculateAveragePrice()}/hr`;
}
  
// === Script ===
// In this section, we call the functions that we've defined above.

// `setInterval` will call the callback function every 3000 milliseconds (3 seconds)
// and return an interval ID that we can use to stop the interval later.
// Calling `clearInterval(addShapeIntervalId)` will stop the interval.
const addFreelancerIntervalId = setInterval(() => {
    addFreelancer(); 
    // Render the updated list of freelancers
    renderFreelancers(); 
  // TODO: Stop adding freelancers if we've reached the maximum number of freelancers(10)
    if (freelancers.length >= maxFreelancers) {
        clearInterval(addFreelancerIntervalId);
    }
}, 3000);
  
// We call this function once to render the initial state
renderFreelancers();
