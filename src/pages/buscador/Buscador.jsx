import { useState } from 'react';
import './buscador.css';
import { tipos } from '../../data/tipos';
import { mecanicas } from '../../data/mecanicas';

export const Buscador = ({ searchText, onInputChange, onSearchSubmit, onSort, isAscending, onSortComplex, isAscendingComplex, onTypeChange, onMechanicChange }) => {
  const [selectedTipo, setSelectedTipo] = useState('');
  const [selectedMecanica, setSelectedMecanica] = useState('');

  const handleTipoChange = (event) => {
    const tipo = event.target.value;
    setSelectedTipo(tipo);
    setSelectedMecanica('');
    onTypeChange(tipo);
  };

  const handleMecanicaChange = (event) => {
    const mecanica = event.target.value;
    setSelectedMecanica(mecanica);
    setSelectedTipo('');
    onMechanicChange(mecanica);
  };

  const handleSort = () => {
    onSort();
    setSelectedTipo('');
    setSelectedMecanica('');
  };

  const handleSortComplex = () => {
    onSortComplex();
    setSelectedTipo('');
    setSelectedMecanica('');
  };

  const handleClean = () => {
    setSelectedTipo('');
    setSelectedMecanica('');
    onTypeChange('');
    onMechanicChange('');
  }

  return (
    <section className="buscador-hero">
      <div className="buscador-dots" />

      <h3 className="buscador-titulo">
        Encuentra tu <span className="titulo-accent">juego favorito</span>
      </h3>

      <form className="container-buscar" onSubmit={onSearchSubmit}>
        <div className="input-wrap">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Encuentra un juego"
            className="input-buscar"
            name="searchText"
            value={searchText}
            onChange={onInputChange}
          />
        </div>
      </form>

      <div className="fila-controles">
        <button className="btn-control" onClick={handleSort}>
          ↕ Nombre {isAscending ? 'A-Z' : 'Z-A'}
        </button>
        <button className="btn-control" onClick={handleSortComplex}>
          📈 Complejidad {isAscendingComplex ? 'Asc' : 'Des'}
        </button>
      </div>

      <div className="fila-controles">
        <select
          id="game-category"
          className="dropdown"
          value={selectedTipo}
          onChange={handleTipoChange}
        >
          <option value="">Filtra por tipo</option>
          {tipos.map((tipo) => (
            <option key={tipo.id} value={tipo.name}>
              {tipo.name}
            </option>
          ))}
        </select>
      </div>

      <div className="fila-controles">
        <select
          id="game-mechanics"
          className="dropdown"
          value={selectedMecanica}
          onChange={handleMecanicaChange}
        >
          <option value="">Filtra por mecánica</option>
          {mecanicas.map((mecanica) => (
            <option key={mecanica.id} value={mecanica.name}>
              {mecanica.name}
            </option>
          ))}
        </select>
      </div>

      <div className="fila-controles">
        <button className="btn-clean" onClick={handleClean}>
          ✕ Limpiar
        </button>
      </div>
    </section>
  );
};