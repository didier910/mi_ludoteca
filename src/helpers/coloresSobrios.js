export const generarColorHSLSobrio = () => {
    const h = Math.floor(Math.random() * 360);
    const s = Math.floor(Math.random() * 30) + 40; // Saturación entre 40% y 70%
    const l = Math.floor(Math.random() * 20) + 60;
    return `hsl(${h}, ${s}%, ${l}%)`;
  };