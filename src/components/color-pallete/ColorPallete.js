import { useEffect, useRef } from 'react';

const ColorPallete = () => {
/* eslint no-bitwise: ["error", { "allow": ["&", ">>"] }] */
  const canvas = useRef(null);
  function byte2Hex(n) {
    const nybHexString = '0123456789ABCDEF';
    return String(nybHexString.substr((n >> 4) & 0x0F, 1)) + nybHexString.substr(n & 0x0F, 1);
  }

  function RGB2Color(r, g, b) {
    return `#${byte2Hex(r)}${byte2Hex(g)}${byte2Hex(b)}`;
  }

  function getColor(item, maxitem) {
    const phase = 0;
    const center = 128;
    const width = 127;
    const frequency = Math.PI * 2 / maxitem;

    const red = Math.sin(frequency * item + 2 + phase) * width + center;
    const green = Math.sin(frequency * item + 0 + phase) * width + center;
    const blue = Math.sin(frequency * item + 4 + phase) * width + center;

    return RGB2Color(red, green, blue);
  }

  const drawRouletteWheel = () => {
    if (canvas.current.getContext) {
      const w = canvas.current.width;
      const outsideRadius = w / 2.5;
      const textRadius = w / 3.125;
      const insideRadius = w / 4;
      const arc = Math.PI / 9;

      const ctx = canvas.current.getContext('2d');
      ctx.clearRect(0, 0, w, w);

      ctx.strokeStyle = 'black';
      ctx.lineWidth = 2;

      ctx.font = 'bold 12px Helvetica, Arial';

      for (let i = 0; i < 18; i++) {
        const angle = 0 + i * arc;
        // ctx.fillStyle = colors[i];
        ctx.fillStyle = getColor(i, 18);

        ctx.beginPath();
        ctx.arc(w / 2, w / 2, outsideRadius, angle, angle + arc, false);
        ctx.arc(w / 2, w / 2, insideRadius, angle + arc, angle, true);
        ctx.stroke();
        ctx.fill();

        ctx.save();
        ctx.shadowOffsetX = -1;
        ctx.shadowOffsetY = -1;
        ctx.shadowBlur = 0;
        ctx.shadowColor = 'rgb(220,220,220)';
        ctx.fillStyle = 'black';
        ctx.translate(w / 2 + Math.cos(angle + arc / 2) * textRadius,
          w / 2 + Math.sin(angle + arc / 2) * textRadius);
        ctx.rotate(angle + arc / 2 + Math.PI / 2);
        ctx.restore();
      }
    }
  };
  useEffect(() => {
    drawRouletteWheel();
  }, []);
  return (
    <canvas ref={canvas} width="150" height="150" />
  );
};

export default ColorPallete;
