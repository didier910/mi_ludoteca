import { useSumaPuntos } from "../../../hooks/useSumaPuntos";
import { ContadorItem } from "../ContadorItem";



export const TableroSagrada = ({ name = '', sumaPuntos, posicion }) => {

    const { handleSuma } = useSumaPuntos(6, sumaPuntos, posicion);

    return (
        <div className="svg-theme">
            <p className="negrita">{name}</p>
            <ContadorItem onSuma={(value) => handleSuma(0, value)} img='dado-blanco' min="0"/>
            <ContadorItem onSuma={(value) => handleSuma(1, value)} img='number-one' min="0"/>
            <ContadorItem onSuma={(value) => handleSuma(2, value)} img='number-two' min="0"/>
            <ContadorItem onSuma={(value) => handleSuma(3, value)} img='number-three' min="0"/>
            <ContadorItem onSuma={(value) => handleSuma(4, value)} img='glass-ball' min="0"/>
            <ContadorItem onSuma={(value) => handleSuma(5, value)} img='minus-tiles' max="0"/>
        </div>

    )
}