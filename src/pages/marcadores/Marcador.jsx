import { useLocation, useParams } from 'react-router-dom';
import { getArticuloById } from '../../helpers';
import { RenderScore } from './RenderScore';
import { useNumPlayers } from '../../hooks';
import { MarcadorBarras } from './MarcadorBarras';
import { InputPlayers } from './InputPlayers';
import { TableroBasta } from './Basta/TableroBasta';
import { TableroScotland } from './ScotlandYard/TableroScotland';
import { getImageUrl } from '../../utils/getImageUrl';

export const Marcador = () => {

    const { id } = useParams();
    const location = useLocation();
    let path = location.pathname.split('/')[1];

    const score = getArticuloById(id, path);

    const { players, agregarPlayer, eliminarPlayer, handleChange, sumaPuntos, getHighestScore, reiniciarPlayers } = useNumPlayers(score.players);

    return (
        <>
            <h3 className="seccion-titulo">
                <img src={getImageUrl('logos', score.logo)} alt={score.name} className='img-game-title' />
            </h3>

            <div>
                {id === '6' ? <TableroBasta /> :
                    id === '8' ? <TableroScotland /> :

                        <div>
                            <InputPlayers
                                players={players}
                                agregarPlayer={agregarPlayer}
                                eliminarPlayer={eliminarPlayer}
                                handleChange={handleChange}
                            />

                            <div className="tablero-card-grid">
                                {players.map((player, index) => (
                                    player ? (
                                        <span className={score.tableroancho ? "tablero-card" : "tablero-card-think"} key={player.id}>
                                            <RenderScore id={id} name={player.name} sumaPuntos={sumaPuntos} posicion={index} />
                                        </span>
                                    ) : null
                                ))}
                            </div>

                            <div>
                                {players.map((player) => (
                                    player ? (
                                        <span className="tablero-card" key={player.id}>
                                            <MarcadorBarras nombre={player.name} resultado={player.score} getHighestScore={getHighestScore} color={player.color} img={score.token} />
                                        </span>
                                    ) : null
                                ))}
                            </div>

                            <div>
                                <button className="btn-marcador-nueva" onClick={reiniciarPlayers}>
                                    🎲 Nueva partida
                                </button>
                            </div>
                        </div>
                }
            </div>
        </>
    );
};