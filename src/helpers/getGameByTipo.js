import { games } from "../data/games";

export const getGameByType = (type = '') => {
    type = type.toLowerCase().trim();

    if (type.length === 0 || type === '') return games;

    return games.filter(
        game => 
            game.tipos.toLowerCase().includes(type)
    );
};