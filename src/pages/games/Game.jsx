import './game.css';
import { Link, Navigate, useParams } from "react-router-dom"
import { getHeroById } from "../../helpers";
import { Reglas, Tool } from '../Icons';
import { RenderText } from '../RenderText';
import { useState } from 'react';
import { getImageUrl } from '../../utils/getImageUrl';

export const Game = () => {

  const [activeSection, setActiveSection] = useState('descripcion');

  const { id } = useParams();

  const game = getHeroById(id);

  if (!game) {
    return <Navigate to="/games" />
  }

  const showPdf = ((game.pdf).length > 0);

  return (
    <>
      {/* ── Hero del juego ── */}
      <section className="game-hero">
        <div className="game-hero-dots" />

        <div className="game-hero-content">
          <div className="game-hero-img-wrap">
            <img
              src={getImageUrl('games', game.imagen)}
              alt={game.nombre}
              className="game-img"
            />
          </div>

          <div className="game-hero-info">
            <h3 className="game-hero-titulo">{game.nombre}</h3>

            <div className="game-ficha">
              <div className="game-ficha-item">
                <span className="game-ficha-label">Jugadores</span>
                <span className="game-ficha-value">{game.jugadores}</span>
              </div>
              <div className="game-ficha-item">
                <span className="game-ficha-label">Mejor con</span>
                <span className="game-ficha-value">{game.mejor}</span>
              </div>
              <div className="game-ficha-item">
                <span className="game-ficha-label">Tiempo</span>
                <span className="game-ficha-value">{game.tiempo}</span>
              </div>
              <div className="game-ficha-item">
                <span className="game-ficha-label">Edad</span>
                <span className="game-ficha-value">{game.edad}</span>
              </div>
              <div className="game-ficha-item">
                <span className="game-ficha-label">Año</span>
                <span className="game-ficha-value">{game.year}</span>
              </div>
              <div className="game-ficha-item">
                <span className="game-ficha-label">Autor</span>
                <span className="game-ficha-value">{game.autor}</span>
              </div>
              <div className="game-ficha-item">
                <span className="game-ficha-label">Complejidad</span>
                <span className="game-ficha-value">⭐ {game.complejidad}</span>
              </div>
              <div className="game-ficha-item">
                <span className="game-ficha-label">Dependencia del idioma</span>
                <span className="game-ficha-value">{game.dependencia || 'No'}</span>
              </div>
              <div className="game-ficha-item">
                <span className="game-ficha-label">Tipo</span>
                <span className="game-ficha-value">{game.tipos}</span>
              </div>
              <div className="game-ficha-item game-ficha-item--wide">
                <span className="game-ficha-label">Mecánicas</span>
                <span className="game-ficha-value">{game.mecanicas}</span>
              </div>
            </div>

            {showPdf && (
              <a href={game.pdf} target="_blank" rel="noreferrer" className="game-reglamento-btn">
                <Reglas /> Reglamento
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ── Tabs Descripción / Guía rápida ── */}
      <section className="game-tabs">
        <button
          className={`game-tab ${activeSection === 'descripcion' ? 'active' : ''}`}
          onClick={() => setActiveSection('descripcion')}
        >
          Descripción
        </button>
        <button
          className={`game-tab ${activeSection === 'guia' ? 'active' : ''}`}
          onClick={() => setActiveSection('guia')}
        >
          Guía rápida
        </button>
      </section>

      <section className="game-content">
        {activeSection === 'descripcion' && (
          <>
            {game.descripcion ? (
              game.descripcion.map((elemento, index) => (
                <RenderText
                  key={index}
                  tipo={elemento.elemento.tipo}
                  contenido={elemento.elemento.contenido}
                />
              ))
            ) : (
              <section className='game-empty'>
                <span className='svg_size'>
                  <Tool /> Descripción en proceso
                </span>
              </section>
            )}

            {game.video && game.video.map((elemento, index) => (
              <RenderText
                key={index}
                tipo={elemento.elemento.tipo}
                contenido={elemento.elemento.contenido}
              />
            ))}
          </>
        )}

        {activeSection === 'guia' && (
          <>
            {game.guia ? (
              game.guia.map((elemento, index) => (
                <RenderText
                  key={index}
                  tipo={elemento.elemento.tipo}
                  contenido={elemento.elemento.contenido}
                />
              ))
            ) : (
              <section className='game-empty'>
                <span className='svg_size'>
                  <Tool /> Guía rápida en proceso
                </span>
              </section>
            )}
          </>
        )}
      </section>
    </>
  )
}