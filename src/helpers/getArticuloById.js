import { concepts } from "../data/concepts";
import { awards } from "../data/awards";
import { scores } from "../data/scores";

export const getArticuloById = ( id, path ) => {

    switch (path) {
        case 'premios':
            return awards.find( award => award.id === id);
        case 'glosario':
            return concepts.find( concept => concept.id === id);
        case 'marcadores':
            return scores.find( score => score.id === id);
        default:
            return null;
    }

}