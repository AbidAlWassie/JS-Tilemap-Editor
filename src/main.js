const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Set the canvas size to match the browser window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Redraw the grid when the window size changes
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  drawGrid();
});

function drawGrid() {

  // Set the width and height of each cell
  const cellWidth = 50;
  const cellHeight = 50;

  // Calculate the number of rows and columns based on the canvas size
  const numRows = Math.floor(canvas.height / cellHeight);
  const numCols = Math.floor(canvas.width / cellWidth);

  // Loop through each cell in the grid and draw a rectangle
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      // Calculate the x and y coordinates of the cell
      const x = col * cellWidth;
      const y = row * cellHeight;

      // Draw a rectangle at the current cell position
      ctx.strokeRect(x, y, cellWidth, cellHeight);
    }
  }
}

drawGrid();