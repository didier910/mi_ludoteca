import { useState } from "react"


export const ContadorCubosAkropolis = ({onSuma}) => {

    const [numCubos, setNumCubos] = useState('');

    const handleNumCubos = (event) => {
        setNumCubos(event.target.value);
        let valor = parseInt(event.target.value);
        if (isNaN(valor)) {
            valor = 0;
        }
        onSuma(valor);
    };

    return (
            <p>
                <img 
                    src={`../images/elementos/akropolis-cubo.png`} alt="" 
                    className="img-loseta" 
                />
                <span>{' '}</span>
                <input 
                    type="number" 
                    className="input-number" 
                    onChange={handleNumCubos}
                    value={numCubos}
                /> 
                <span>{' '}={' '}</span>
                <span className="negrita">{numCubos}</span>
            </p>
    )
}

ContadorCubosAkropolis.propTypes = {
    onSuma: () => {},
} 
