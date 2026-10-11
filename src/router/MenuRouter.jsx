import { Routes, Route, useLocation } from 'react-router-dom';
import { GamesPage, Game } from '../pages/games';
import { Glosario, Item, Premios } from '../pages/glosario_premios';
import { Marcador, Marcadores } from '../pages/marcadores';
import { useEffect } from 'react';


export const MenuRouter = () => {

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); 
  }, [location]);

  return (
        <Routes>
            <Route path="/games" element={<GamesPage />} />
            <Route path="/glosario" element={<Glosario />} />
            <Route path="/premios" element={<Premios />} />
            <Route path="/marcadores" element={<Marcadores />} />
            <Route path="/game/:id" element={<Game />} />
            <Route path="/glosario/:id" element={<Item />} />
            <Route path="/premios/:id" element={<Item />} />
            <Route path="/marcadores/:id" element={<Marcador />} />
            <Route path="/" element={<GamesPage />} />
        </Routes>
  )
}