import { useSumaPuntos } from "../../../hooks/useSumaPuntos";
import { ContadorItemAsc } from "./ContadorItemAsc";

export const TableroCarcassonne = ({ name = '', sumaPuntos, posicion }) => {

    const { handleSuma } = useSumaPuntos(4, sumaPuntos, posicion);

    return (
        <div className="tablero-carcassonne">
            <p className="negrita">{name}</p>
            <ContadorItemAsc onSuma={(value) => handleSuma(0, value)} imagen="carcassonne-ciudades.png" min="0" />
            <ContadorItemAsc onSuma={(value) => handleSuma(1, value)} imagen="carcassonne-caminos.png" min="0" />
            <ContadorItemAsc onSuma={(value) => handleSuma(2, value)} imagen="carcassonne-monasterios.png" min="0" />
            <ContadorItemAsc onSuma={(value) => handleSuma(3, value)} imagen="carcassonne-campos.png" min="0" />
        </div>
    );
};