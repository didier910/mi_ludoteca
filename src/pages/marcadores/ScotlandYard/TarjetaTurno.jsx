import { useEffect, useState } from 'react';
import './tarjetaturno.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faTaxi, faBus, faSubway, faPersonRunning } from '@fortawesome/free-solid-svg-icons';

const colores = ['#f1c40f', '#3498db', '#e63946', 'gray'];
const iconos = [faTaxi, faBus, faSubway, faPersonRunning];

export const TarjetaTurno = ({ pos, resetSignal }) => {
  const [oculto, setOculto] = useState(false);
  const [colorIndex, setColorIndex] = useState(0);
  const [texto, setTexto] = useState('');

  const toggleOculto = () => setOculto(!oculto);
  const cambiarColor = () => setColorIndex((prevIndex) => (prevIndex + 1) % colores.length);

  const numerosBlanco = [3, 8, 13, 18, 24];
  const bordeClase = numerosBlanco.includes(pos) ? 'circulo-blanco' : 'circulo-negro';


  // Reset cuando cambia el resetSignal
  useEffect(() => {
    setTexto('');
    setOculto(false);
    setColorIndex(0);
  }, [resetSignal]);


  return (
    <div className="tarjeta">
      <div className={`etiqueta-num ${bordeClase}`}>
        <label>{pos}</label>
      </div>
      <div className="contenedor-input">
        <input
          type="number"
          className="caja-texto"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />
        <div
          className={`cortina ${oculto ? 'cerrado' : ''}`}
          style={{ backgroundColor: colores[colorIndex] }}
        >
          {oculto && <FontAwesomeIcon icon={iconos[colorIndex]} className="icono-cortina" />}
        </div>
      </div>
      <div className="botones">
        <button className="boton" onClick={toggleOculto}>
          <FontAwesomeIcon icon={oculto ? faEye : faEyeSlash} />
        </button>
        <div className="boton-circular" onClick={cambiarColor} />
      </div>
    </div>
  );
};
