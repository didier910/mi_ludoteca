import { useState } from "react";
import { RenderIcon } from "../RenderIcon";

export const ContadorItem = ({ onSuma, img, min, max, svg_size = "svg_size_gen" }) => {
    const [numItem, setnumItem] = useState();

    const handleNumItem = (event) => {
        setnumItem(event.target.value);
        let valor = parseInt(event.target.value);
        if (isNaN(valor)) {
            valor = 0;
        }
        onSuma(valor);
    };

    return (
        <div className="contador-item-row">
            <span className={svg_size}><RenderIcon tipo={img} /></span>
            <input
                type="number"
                className="input-number"
                onChange={handleNumItem}
                value={numItem}
                min={min}
                max={max}
            />
        </div>
    );
};