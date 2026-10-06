import './glosario.css';
import { useState } from 'react';
import { awards } from '../../data/awards';
import { useNavigate } from 'react-router-dom';

function Award({ titulo, verAward }) {
  return (
    <div className='concept-card' onClick={verAward}>
      <h4 className='concept-card-titulo'>{titulo}</h4>
    </div>
  );
}

export const Premios = () => {
  const [newAwards] = useState(awards);
  const navigate = useNavigate();
  const verAward = (award) => navigate(`/premios/${award.id}`);

  return (
    <>
      <h3 className='seccion-titulo'>Premios</h3>
      <p className='seccion-desc'>
        Descubre los juegos de mesa que han sido reconocidos con los premios más importantes de la industria. Una selección de lo mejor del mundo lúdico.
      </p>

      <section className='concept-container'>
        {newAwards.map(award => (
          <Award
            {...award}
            key={award.id}
            verAward={() => verAward(award)}
          />
        ))}
      </section>
    </>
  );
};