import { ButtonX, Player } from "../Icons";

export const InputPlayers = ({ players, agregarPlayer, eliminarPlayer, handleChange }) => {
    return (
        <div className="input-players-wrap">
            <p className="input-players-titulo">Ingresa Jugadores</p>

            {players.map((player, index) =>
                <div className="input-player-row" key={player.id}>
                    <span className="input-player-icon svg-theme">
                        <Player />
                    </span>
                    <input
                        type="text"
                        placeholder={`Jugador ${index + 1}`}
                        className="input-player-field"
                        onChange={(event) => handleChange(index, event)}
                        value={player.name}
                    />
                    <button
                        className="input-player-delete"
                        onClick={() => eliminarPlayer(index)}
                    >
                        <ButtonX />
                    </button>
                </div>
            )}

            <div className="input-players-agregar">
                <button className="btn-marcador-accion" onClick={agregarPlayer}>
                    + Agregar jugador
                </button>
            </div>
        </div>
    );
};