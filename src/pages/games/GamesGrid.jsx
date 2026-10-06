import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import './gamesGrid.css';
import { games } from '../../data/games';
import { Buscador } from '../buscador/Buscador';
import { getGameByName, getGameByType, getGameByMechanics } from '../../helpers';
import { useState, useEffect } from 'react';

const TIPO_COLORES = {
  'Party': '#FF6B6B',
  'Filler': '#FF9F43',
  'Cooperativo': '#17A89E',
  'Abstracto': '#1A1A2E',
  'Estratégico': '#7B42B8',
  'Puzzle': '#2196F3',
  'Roles ocultos': '#C0392B',
  'Narrativo': '#E67E22',
  'Tiempo real': '#E84393',
  'Cartas': '#27AE60',
  'Clásico': '#D4881A',
  'Trivia': '#00B4D8',
};

function Juego({ id, nombre, imagen, complejidad, jugadores, tipos, verJuego }) {
  // tipos viene como string "Cooperativo, Tiempo real" → convertir a array
  const tiposArray = tipos ? tipos.split(', ').map(t => t.trim()) : [];

  return (
    <div className='game-card' onClick={verJuego}>

      {/* Área de imagen */}
      <div className='container-img'>
        <img
          src={`../images/games/${imagen}`}
          alt={nombre}
          className='game-imagen'
        />

        {/* Badge complejidad — arriba derecha */}
        <div className="etiqueta-complejidad">
          ⭐ {complejidad}
        </div>

        {/* Jugadores — abajo izquierda */}
        <div className="etiqueta-jugadores">
          👥 {jugadores}
        </div>
      </div>

      {/* Nombre */}
      <div className='container-title'>
        <p className='game-titulo'>
          <span>{nombre}</span>
        </p>
      </div>

      {/* Chips de tipos */}
      <div className="game-tipos">
        {tiposArray.map(tipo => (
          <span
            key={tipo}
            className="game-tipo-chip"
            style={{ background: TIPO_COLORES[tipo] || '#8A7AAA' }}
          >
            {tipo}
          </span>
        ))}
      </div>

    </div>
  );
}

export const GamesGrid = () => {
  const [newGames, setNewGames] = useState(games.sort((a, b) => a.nombre.localeCompare(b.nombre)));

  const navigate = useNavigate();
  const location = useLocation();
  const { q = '' } = queryString.parse(location.search);
  const [searchText, setSearchText] = useState(q);

  const verJuego = (juego) => navigate(`/game/${juego.id}`);

  useEffect(() => {
    setNewGames(getGameByName(searchText));
  }, [searchText]);

  const handleInputChange = (e) => setSearchText(e.target.value);
  const onSearchSubmit = (e) => { e.preventDefault(); navigate(`?q=${searchText}`); };

  const handleTypeChange = (type) => {
    setNewGames(getGameByType(type));
    navigate(`?q=${searchText}&type=${type}`);
  };

  const handleMechanicChange = (mechanic) => {
    setNewGames(getGameByMechanics(mechanic));
    navigate(`?q=${searchText}&mechanics=${mechanic}`);
  };

  const [isAscending, setIsAscending] = useState(false);
  const handleSort = () => {
    setIsAscending(prev => !prev);
    setNewGames(prev => [...prev].sort((a, b) => {
      const cmp = a.nombre.localeCompare(b.nombre);
      return isAscending ? cmp : -cmp;
    }));
  };

  const [isAscendingComplex, setIsAscendingComplex] = useState(true);
  const handleSortComplex = () => {
    setIsAscendingComplex(prev => !prev);
    setNewGames(prev => [...prev].sort((a, b) => {
      const cmp = a.complejidad.localeCompare(b.complejidad);
      return isAscendingComplex ? cmp : -cmp;
    }));
  };

  return (
    <>
      <Buscador
        searchText={searchText}
        onInputChange={handleInputChange}
        onSearchSubmit={onSearchSubmit}
        onSort={handleSort}
        isAscending={isAscending}
        onSortComplex={handleSortComplex}
        isAscendingComplex={isAscendingComplex}
        onTypeChange={handleTypeChange}
        onMechanicChange={handleMechanicChange}
      />

      {/* Contador de juegos */}
      <div className="game-counter">
        <span className="game-counter-title">
          {newGames.length !== games.length ? 'Resultados' : 'Todos los juegos'}
        </span>
        <span className="game-counter-badge">
          {newGames.length !== games.length
            ? `${newGames.length} de ${games.length} juegos`
            : `${games.length} juegos`}
        </span>
      </div>

      <section className='game-container'>
        {newGames.map(juego => (
          <Juego
            {...juego}
            key={juego.id}
            verJuego={() => verJuego(juego)}
          />
        ))}
      </section>
    </>
  );
};