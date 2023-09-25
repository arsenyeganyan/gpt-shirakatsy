import '../styles/Chat.css';
import React, { useEffect, useRef } from 'react';

const CanvasLoader = () => {
  const canvasRef = useRef(null);
  let ctx;
  let count = 75;
  let rotation = 270 * (Math.PI / 180);
  let speed = 6;

  const updateLoader = () => {
    rotation += speed / 100;
  };

  const renderLoader = () => {
    ctx.save();
    ctx.globalCompositeOperation = 'source-over';
    ctx.translate(125, 125);
    ctx.rotate(rotation);
    let i = count;
    while (i--) {
      ctx.beginPath();
      ctx.arc(0, 0, i + Math.random() * 35, Math.random(), Math.PI / 3 + Math.random() / 12, false);
      ctx.stroke();
    }
    ctx.restore();
  };

  const canvasLoop = () => {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = 'rgba(0,0,0,.03)';
    ctx.fillRect(0, 0, 250, 250);
    updateLoader();
    renderLoader();
    requestAnimationFrame(canvasLoop);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      ctx = canvas.getContext('2d');
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = 'rgba(0,0,0,.75)';
      canvasLoop();
    }
  }, []);

  return <canvas ref={canvasRef} width={250} height={250} id="canvas" />;
};

export default CanvasLoader;