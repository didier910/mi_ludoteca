import { games } from "../data/games";

export const getGameByMechanics = (mechanic = '') => {
    mechanic = mechanic.toLowerCase().trim();

    if (mechanic.length === 0 || mechanic === '') return games;

    return games.filter(
        game => 
            game.mecanicas.toLowerCase().includes(mechanic)
    );
};