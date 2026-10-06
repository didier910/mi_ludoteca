import './glosario.css';
import { useState } from 'react';
import { concepts } from '../../data/concepts';
import { useNavigate } from 'react-router-dom';

function Concept({ titulo, verConcepto }) {
  return (
    <div className='concept-card' onClick={verConcepto}>
      <h4 className='concept-card-titulo'>{titulo}</h4>
    </div>
  );
}

export const Glosario = () => {
  const [newConcepts] = useState(concepts);
  const navigate = useNavigate();
  const verConcepto = (concept) => navigate(`/glosario/${concept.id}`);

  return (
    <>
      <h3 className='seccion-titulo'>Glosario</h3>
      <p className='seccion-desc'>
        ¿Te has topado con términos que no entiendes en los juegos de mesa? Este glosario te ayudará a comprender el vocabulario más común. Ya sea que estés leyendo un reglamento o viendo una reseña, aquí encontrarás pequeños artículos con definiciones claras y concisas.
      </p>

      <section className='concept-container'>
        {newConcepts.map(concept => (
          <Concept
            {...concept}
            key={concept.id}
            verConcepto={() => verConcepto(concept)}
          />
        ))}
      </section>
    </>
  );
};