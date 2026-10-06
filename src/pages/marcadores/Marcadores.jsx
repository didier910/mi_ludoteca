import { useNavigate } from 'react-router-dom';
import './marcadores.css';
import '../glosario_premios/glosario.css';
import { useState } from 'react';
import { scores } from '../../data/scores';

function Score({ name, logo, verScore }) {
  return (
    <div className='score-card' onClick={verScore}>
      <img
        src={`../images/logos/${logo}`}
        alt={name}
        className='img-game-title'
      />
    </div>
  );
}

export const Marcadores = () => {
  const [newScores] = useState(scores);
  const navigate = useNavigate();
  const verScore = (score) => navigate(`/marcadores/${score.id}`);

  return (
    <>
      <h3 className='seccion-titulo'>Marcadores</h3>
      <p className='seccion-desc'>
        ¡Nunca más pierdas la cuenta! En esta sección encontrarás algunos marcadores digitales que te permitan llevar un registro preciso de tus partidas sin necesidad de utilizar papel.
      </p>

      <section className='score-container'>
        {newScores.map(score => (
          <Score
            {...score}
            key={score.id}
            verScore={() => verScore(score)}
          />
        ))}
      </section>
    </>
  );
};