import React, { useRef } from 'react';
import './Canvas.css'
const Canvas = () => {
  const canvasRef = useRef(null);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height).data;

    let pixelColors = '';

    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        const i = (y * canvas.width + x) * 4;
        const r = imageData[i];
        const g = imageData[i + 1];
        const b = imageData[i + 2];
        const hexColor = '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');

        pixelColors += hexColor + ' ';
      }

      pixelColors += '\n';
    }

    const blob = new Blob([pixelColors], { type: 'text/plain;charset=utf-8' });
    const downloadLink = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadLink;
    link.download = 'canvas-pixel-colors.txt';
    link.click();
  };

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Set up canvas size
    canvas.width = 16;
    canvas.height = 34;

    // Draw a character in the center
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const char = 'A';
    const font = 'Arial';
    const fontSize = 24;
    const fontColor = 'red';

    context.font = `${fontSize}px ${font}`;
    context.fillStyle = fontColor;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(char, centerX, centerY);
  }, []);

  return (
    <div>
      <canvas ref={canvasRef}></canvas>
      <button onClick={handleDownload}>Download</button>
    </div>
  );
};

export default Canvas;
