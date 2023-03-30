const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

// Get the new dimensions of the browser window
const newWidth = window.innerWidth - 50;
const newHeight = window.innerHeight - 80;
// Set the initial number of rows and columns based on the canvas size
canvas.width = newWidth;
canvas.height = newHeight;
let numRows = Math.floor(canvas.height / 50);
let numCols = Math.floor(canvas.width / 50);

// Set the initial cell size
let cellSize = 50;

// Set up the initial grid with all cells white
const grid = [];
for (let row = 0; row < numRows; row++) {
  grid.push([]);
  for (let col = 0; col < numCols; col++) {
    grid[row][col] = "#282e33";
  }
}


// Draw the initial grid
drawGrid();


// Add an event listener to the canvas element for mouse clicks
canvas.addEventListener("mousedown", (event) => {
  // Get the mouse click coordinates relative to the canvas
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  // Calculate the row and column of the clicked cell
  const row = Math.floor(y / cellSize);
  const col = Math.floor(x / cellSize);

  // Set the color of the clicked cell to red
  grid[row][col] = "Red";

  // Redraw the grid with the updated cell color
  drawGrid();
});

function drawGrid() {
  
  // Calculate the new cell size based on the canvas dimensions
  cellSize = Math.min(canvas.width / numCols, canvas.height / numRows);

  // Loop through each cell in the grid and draw a rectangle
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      // Calculate the x and y coordinates of the cell
      const x = col * cellSize;
      const y = row * cellSize;

      // Set the fill color of the cell based on the grid array
      ctx.fillStyle = grid[row][col];

      // Draw a rectangle at the current cell position
      ctx.strokeRect(x, y, cellSize, cellSize);
      ctx.strokeStyle = "Dodgerblue";
      ctx.fillRect(x, y, cellSize, cellSize);
    }
  }
}


function debug() {
  console.log(grid);
}

function saveGrid() {
  const json = JSON.stringify(grid);
  const blob = new Blob([json], {type: 'application/json'});
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'grid.json';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

const gridFile = document.getElementById('gridUpload');
gridFile.addEventListener('change', (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.readAsText(file);
  reader.onload = () => {
    const json = reader.result;
    const uploadedGrid = JSON.parse(json);
    console.log(uploadedGrid);

    // Replace the existing grid with the uploaded grid
    numRows = uploadedGrid.length;
    numCols = uploadedGrid[0].length;
    grid.splice(0, grid.length, ...uploadedGrid);
    drawGrid();
  };
});
