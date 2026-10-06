import { games } from "../data/games";

export const getHeroById = ( id ) => {

    return games.find( game => game.id === id);

}