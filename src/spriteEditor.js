const canvas = document.getElementById('canvas');
canvas.style.imageRendering = "pixelated";
const ctx = canvas.getContext('2d');
const imageUpload = document.getElementById('imageUpload');
const tileWidth = 16;
const tileHeight = 16;

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
        }
      }
    };
  };
});

