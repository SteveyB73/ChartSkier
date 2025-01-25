// Grab references to the DOM elements
const form = document.getElementById('dataForm'); // The form where users input data
const canvas = document.getElementById('graphCanvas'); // The canvas where the graph is drawn
const skier = document.getElementById('skier'); // The skier image element
const ctx = canvas.getContext('2d'); // The 2D drawing context for the canvas

// Set the size of the canvas
canvas.width = 600; // Canvas width in pixels
canvas.height = 400; // Canvas height in pixels



function setInitialCanvasSize() {
  // Define the size of the container
  const containerWidth = Math.min(window.innerWidth * 0.9, 600); // Max width of 600px
  const containerHeight = Math.min(window.innerHeight * 0.5, 400); // Max height of 400px

  // Set the intrinsic size of the canvas
  canvas.width = containerWidth;
  canvas.height = containerHeight;

  // Set the display size of the canvas to match the intrinsic size
  canvas.style.width = `${containerWidth}px`;
  canvas.style.height = `${containerHeight}px`;

  // Update the displayed canvas size
  //updateCanvasSize();
}

// Add a lkistener to resize rhe canvas
document.addEventListener('DOMContentLoaded', () => {
    setInitialCanvasSize();
})


// Add an event listener to the form to handle user submissions
form.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent the form from reloading the page on submission

  // Clear the canvas to prepare for a new graph
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Retrieve the user input from the text field
  const dataInput = document.getElementById('dataInput').value;
  const data = dataInput.split(',').map(Number); // Convert the comma-separated values into an array of numbers

  // Validate the user input to ensure all entries are valid numbers
  if (data.some(isNaN)) {
    alert('Please enter valid numbers separated by commas.'); // Show an error message if the input is invalid
    return; // Stop further execution if the input is invalid
  }

  // Draw the graph on the canvas based on the input data
  drawGraph(data);

  // Start the skier animation along the graph
  animateSkier(data);
});

// Function to draw the line graph on the canvas
function drawGraph(data) {
  const maxData = Math.max(...data); // Find the maximum value in the data to scale the graph
  const stepX = canvas.width / (data.length - 1); // Calculate the horizontal spacing between data points
  const stepY = canvas.height / maxData; // Calculate the vertical scale for the data points

  ctx.beginPath(); // Start a new path for the graph line
  ctx.moveTo(0, canvas.height - data[0] * stepY); // Move to the starting point of the graph

  // Loop through the data points and draw lines between them
  data.forEach((point, index) => {
    const x = index * stepX; // Calculate the x-coordinate for the current point
    const y = canvas.height - point * stepY; // Calculate the y-coordinate for the current point
    ctx.lineTo(x, y); // Draw a line to the current point
  });

  // Style and render the graph line
  ctx.strokeStyle = '#1e90ff'; // Set the line colour (icy blue)
  ctx.lineWidth = 2; // Set the line thickness
  ctx.stroke(); // Render the line on the canvas
}

// Function to animate the skier along the graph line
function animateSkier(data) {
  const maxData = Math.max(...data); // Find the maximum value in the data
  const stepX = canvas.width / (data.length - 1); // Horizontal spacing between data points
  const stepY = (canvas.height - 20) / maxData; // Vertical scale for data points, with padding for aesthetics

  let index = 0; // Current index in the data array
  let skierX = 0; // Initial horizontal position of the skier
  let skierY = canvas.height - skier.offsetHeight - data[0] * stepY; // Initial vertical position of the skier relative to the graph

  // Position the skier at the starting point of the graph
  skier.style.left = `${canvas.offsetLeft + skierX}px`; // Align the skier horizontally
  skier.style.top = `${canvas.offsetTop + skierY - skier.offsetHeight}px`; // Align the skier vertically and centre it
  skier.style.display = 'block'; // Make the skier visible

  // Function to move the skier along the graph line
  function moveSkier() {
    if (index >= data.length - 1) return; // Stop the animation when the skier reaches the end of the graph

    // Calculate the next target position on the graph
    const nextX = (index + 1) * stepX - skier.offsetWidth/2; // Next x-coordinate
    const nextY = canvas.height - skier.offsetHeight - data[index + 1] * stepY; // Next y-coordinate

    // Smoothly move the skier towards the target position
    skierX += (nextX - skierX) * 0.05; // Adjust the skier's horizontal position
    skierY += (nextY - skierY) * 0.05; // Adjust the skier's vertical position

    // Update the skier's position on the page
    skier.style.left = `${canvas.offsetLeft + skierX}px`; // Update horizontal position
    skier.style.top = `${canvas.offsetTop + skierY - skier.offsetHeight/2}px`; // Update vertical position

    // Check if the skier has reached the current target point
    if (Math.abs(nextX - skierX) < 1 && Math.abs(nextY - skierY) < 1) {
      index++; // Move to the next point
    }

    // Continue the animation
    requestAnimationFrame(moveSkier);
  }

  moveSkier(); // Start the skier animation
}

//function updateCanvasSize() {
//  const canvasSizeElement = document.getElementById('canvasSize');
//  canvasSizeElement.textContent = `Canvas Size: ${canvas.width}px x ${canvas.height}px and ${window.innerWidth}px x ${window.innerHeight}px`;
//}
