d3.csv("songs.csv").then(data => {
    // Limit to the first 20 songs
    const limitedData = data.slice(0, 20);
    
    // Prepare the data for the bar chart
    const plotData = [{
        x: limitedData.map(row => row.Song),  // Extract songs for x-axis
        y: limitedData.map(row => +row.Count), // Extract counts for y-axis (converted to numbers)
        type: 'bar' // Specify the type as 'bar'
    }];


    // Create the layout without the x-axis title
    const layout = {
        title: '',
        xaxis: { title: '' }, // Set to an empty string to disable the x-axis title
        yaxis: { title: 'Veces' }
    };

    // Plot the chart
    Plotly.newPlot('myDiv', plotData, layout);
}).catch(error => {
    console.error('Error loading the CSV file:', error);
});

// Array of song titles
const titles = [
    "Genesis",
    "Oblivion",
    "Be",
    "Realiti",
    "Go",
    "Venus",
    "Kill",
    "Scream",
    "Laughing",
    "Symphonia"
];

// Construct songs and images arrays dynamically
const songs = titles.map(title => `songs/${title}.m4a`);
const images = titles.map(title => `pics/${title}.webp`);

const buttonContainer = document.getElementById('button-container');
const pauseButton = document.getElementById('pause-button');

// Array to hold player instances
const players = [];
let currentPlayer = null; // To keep track of the currently playing player

// Function to create buttons
function createButtons() {
    titles.forEach((title, index) => {
        const buttonWrapper = document.createElement('div'); // Create a wrapper for the button and title

        const button = document.createElement('button');
        button.classList.add('image-button');
        button.innerHTML = `<img src="${images[index]}" alt="Play ${title}" width="100">`;
        
        // Create a Tone.Player for each song
        const player = new Tone.Player(songs[index]).toDestination();
        player.autostart = false;
        players.push(player); // Add player to the array

        // Attach event listener to the button
        button.addEventListener('click', async () => {
            await Tone.start(); // Start Tone.js context

            // Stop the currently playing player if it exists
            if (currentPlayer) {
                currentPlayer.stop(); // Stop the currently playing song
            }

            // Start the new player
            player.start(); 
            currentPlayer = player; // Update the current player
            console.log(`${title} played!`);
        });

        buttonWrapper.appendChild(button); // Add button to the wrapper

        // Create and append the title
        const titleDiv = document.createElement('div'); // Create a div for the title
        titleDiv.innerText = title; // Set the title text
        titleDiv.classList.add('song-title'); // Optionally add a class for styling
        buttonWrapper.appendChild(titleDiv); // Add the title to the wrapper

        buttonContainer.appendChild(buttonWrapper); // Add the wrapper to the container
    });
}

// Pause all songs
pauseButton.addEventListener('click', () => {
    if (currentPlayer) {
        currentPlayer.stop(); // Stop the currently playing player
        currentPlayer = null; // Reset current player
        console.log("All sounds paused!");
    }
});

createButtons(); // Call the function to create buttons
