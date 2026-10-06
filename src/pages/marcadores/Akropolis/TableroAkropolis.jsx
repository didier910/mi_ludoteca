
import { useSumaPuntos } from "../../../hooks/useSumaPuntos";
import { ContadorAkropolis } from "./ContadorAkropolis";
import { ContadorCubosAkropolis } from "./ContadorCubosAkropolis";
import PropTypes from 'prop-types';

// Configuration object for Akropolis counters
const AKROPOLIS_COUNTERS = [
  { id: 0, type: 'ciudad', imagen: 'akropolis-ciudad.png' },
  { id: 1, type: 'mercado', imagen: 'akropolis-mercado.png' },
  { id: 2, type: 'cuartel', imagen: 'akropolis-cuartel.png' },
  { id: 3, type: 'monasterio', imagen: 'akropolis-monasterio.png' },
  { id: 4, type: 'parque', imagen: 'akropolis-parque.png' }
];

export const TableroAkropolis = ({ 
  name = '', 
  sumaPuntos, 
  posicion 
}) => {
  const { handleSuma } = useSumaPuntos(6, sumaPuntos, posicion);

  const renderContadores = () => (
    AKROPOLIS_COUNTERS.map(({ id, imagen }) => (
      <ContadorAkropolis
        key={id}
        imagen={imagen}
        onSuma={(value) => handleSuma(id, value)}
      />
    ))
  );

  return (
    <div className="tablero-akropolis">
      {name && <p className="negrita">{name}</p>}
      {renderContadores()}
      <ContadorCubosAkropolis 
        onSuma={(value) => handleSuma(5, value)}
      />
    </div>
  );
};



 