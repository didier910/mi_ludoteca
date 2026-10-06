import { useState } from "react";


export const ContadorItemAsc = ({imagen, onSuma}) => {

    const [count, setCount] = useState(0);

    const increment = () => {
        setCount(count + 1);
        onSuma(count + 1);
    };

    const decrement = () => {
        if (count > 0) {
            setCount(count - 1);
            onSuma(count - 1);
          }        
    };

    return (
        <div>
            <img src={`../images/elementos/${imagen}`} alt="" className="img-loseta" />
            <button onClick={decrement} className="botonmenos">-</button>
            <span>{count}</span>
            <button onClick={increment} className="botonmas">+</button>
        </div>
    )
}
