
import { useState } from "react";
import { generarColorHSLSobrio } from "../helpers/coloresSobrios";

export const useNumPlayers = (numPlayers) => {
  const [players, setPlayers] = useState([]);

  
  const agregarPlayer = () => {
    if (players.length < numPlayers) {
      setPlayers((prevPlayers) => [...prevPlayers, { id: prevPlayers.length, name: `Player ${prevPlayers.length + 1}`, score: 0, color: generarColorHSLSobrio() }]);
    }
  };

  const eliminarPlayer = (index) => {
    setPlayers((prevPlayers) => {
      const newPlayers = [...prevPlayers];
      newPlayers.splice(index, 1);
      return newPlayers.map((player, newIndex) => ({ ...player, id: newIndex }));
    });
  };

  const sumaPuntos = (index, valor) => {
    setPlayers((prevPlayers) => {
      const newPlayers = [...prevPlayers];
      newPlayers[index] = { ...newPlayers[index], score: valor };
      return newPlayers;
    });
  };

  const handleChange = (index, event) => {
    setPlayers((prevPlayers) => {
      const newPlayers = [...prevPlayers];
      newPlayers[index] = { ...newPlayers[index], name: event.target.value };
      return newPlayers;
    });
  };

  const getHighestScore = () => {
    if (players.length === 0) {
      return 0;
    }

    const highestScore = players.reduce((maxScore, player) => {
      return Math.max(maxScore, player.score);
    }, 0);

    return highestScore;
  };

  const reiniciarPlayers = () => {
    setPlayers([]); 
  };

  return {
    players,
    agregarPlayer,
    eliminarPlayer,
    handleChange,
    sumaPuntos,
    getHighestScore,
    reiniciarPlayers
  };
};


