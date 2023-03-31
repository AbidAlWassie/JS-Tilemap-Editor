const canvas = document.getElementById('spriteCanvas');
canvas.style.imageRendering = "pixelated";
const ctx = canvas.getContext('2d');
const imageUpload = document.getElementById('imageUpload');
const tileWidth = 16;
const tileHeight = 16;

const container = document.getElementById('imgContainer');

// function to scale canvas to fit screen
function scaleCanvas() {
  const scaleFactor = Math.min(window.innerWidth / canvas.width, window.innerHeight / canvas.height);
  canvas.style.width = canvas.width * scaleFactor + 'px';
  canvas.style.height = canvas.height * scaleFactor + 'px';
}

window.addEventListener('resize', scaleCanvas);

imageUpload.addEventListener('change', (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    const img = new Image();
    img.src = reader.result;
    
    img.onload = () => {
      ctx.imageSmoothingEnabled = false;
      const numRows = Math.ceil(img.height / tileHeight);
      const numCols = Math.ceil(img.width / tileWidth);
      canvas.width = numCols * tileWidth;
      canvas.height = numRows * tileHeight;
      for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
          const x = col * tileWidth;
          const y = row * tileHeight;
          ctx.drawImage(img, col * tileWidth, row * tileHeight, tileWidth, tileHeight, x, y, tileWidth, tileHeight);
          // ctx.strokeStyle = 'black';
          // ctx.lineWidth = 1;
          // ctx.strokeRect(x, y, tileWidth, tileHeight);
        }
      }
      scaleCanvas(); // call function to scale canvas to fit screen
      console.log(`The canvas has ${numCols} columns and ${numRows} rows.`);
      console.log(`There are ${numCols * numRows} tiles in total.`);
    };
  };
});
