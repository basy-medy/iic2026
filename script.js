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

const player = new Tone.Player("songs/Genesis.m4a").toDestination();

// Ensure the sound is loaded before using it
player.autostart = false;

// Attach event listener to the button
document.querySelector('.image-button').addEventListener('click', async () => {
    // Tone.js requires user interaction to start the AudioContext
    await Tone.start(); 

    // Play the sound
    player.start();
    console.log("Sound played!");
});
