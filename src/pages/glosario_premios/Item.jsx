import './glosario.css';
import { useLocation, useParams } from 'react-router-dom';
import { getArticuloById } from '../../helpers';
import { Tool } from '../Icons';
import { RenderText } from '../RenderText';

export const Item = () => {
  const { id } = useParams();
  const location = useLocation();
  const path = location.pathname.split('/')[1];
  const concept = getArticuloById(id, path);

  return (
    <>
      <h3 className='seccion-titulo'>{concept.titulo}</h3>

      <div className='item-content'>
        {concept.descripcion ? (
          concept.descripcion.map((elemento, index) => (
            <RenderText
              key={index}
              tipo={elemento.elemento.tipo}
              contenido={elemento.elemento.contenido}
            />
          ))
        ) : (
          <section className='centrado'>
            <span className='svg_size'>
              <Tool /> Contenido en proceso
            </span>
          </section>
        )}
      </div>
    </>
  );
};