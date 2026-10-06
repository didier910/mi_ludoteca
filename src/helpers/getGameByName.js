import { games } from "../data/games"


export const getGameByName = ( name = '' ) => {

    name = name.toLowerCase().trim();
    
    if ( name.length === 0 || name==='') return games;
    
    return games.filter(
        game => 
            game.nombre.toLowerCase().includes( name )
            

    )

}