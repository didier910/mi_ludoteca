import { useState } from "react"
import { Star } from "../../Icons"


export const ContadorAkropolis = ({ imagen, onSuma }) => {

    const [starNum, setStarNum] = useState('');
    const [losetaNum, setLosetaNum] = useState('');
    const [total, setTotal] = useState(0);

    const handleStarNum = (event) => {
        setStarNum(event.target.value);
        calcularResultado(event.target.value, losetaNum);
    }

    const handleLosetaNum = (event) => {
        setLosetaNum(event.target.value);
        calcularResultado(starNum, event.target.value);
    }

    const calcularResultado = (starNum, losetaNum) => {
        const resultado = starNum * losetaNum;
        setTotal(resultado);
        onSuma(resultado);

    }


    return (
        <div className="svg-theme">
            <p>
                <span className="img-star"><Star /> </span>
                <input
                    type="number"
                    className="input-number"
                    onChange={handleStarNum}
                    min="0"
                />{' '}x{' '}
                <img src={`../images/elementos/${imagen}`} alt="" className="img-loseta" />
                <input
                    type="number"
                    className="input-number"
                    onChange={handleLosetaNum}
                    min="0"
                />{' '}={' '}
                <span className="negrita">{total}</span>
            </p>
        </div>


    )
}
