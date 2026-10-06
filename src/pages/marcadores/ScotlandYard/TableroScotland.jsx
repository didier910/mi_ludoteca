import { useState, useEffect } from "react";
import { TarjetaTurno } from "./TarjetaTurno";
import './tableroScotland.css';

export const TableroScotland = () => {
  const total = 24;
  const [columnas, setColumnas] = useState(3);
  const [resetSignal, setResetSignal] = useState(0);

  useEffect(() => {
    const handleResize = () => setColumnas(window.innerWidth < 768 ? 1 : 3);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filas = Math.ceil(total / columnas);
  const handleNuevaPartida = () => setResetSignal(prev => prev + 1);

  const columnasVerticales = Array.from({ length: columnas }, (_, colIndex) =>
    Array.from({ length: filas }, (_, rowIndex) => {
      const pos = colIndex * filas + rowIndex + 1;
      if (pos > total) return null;
      return <TarjetaTurno key={pos} pos={pos} resetSignal={resetSignal} />;
    }).filter(Boolean)
  );

  return (
    <>
      <div className="tablero-scotland">
        {columnasVerticales.map((columna, index) => (
          <div key={index} className="columna">{columna}</div>
        ))}
      </div>
      <div>
        <button className="btn-marcador-nueva" onClick={handleNuevaPartida}>
          🎲 Nueva partida
        </button>
      </div>
    </>
  );
};