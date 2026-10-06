import { useSumaPuntos } from "../../../hooks/useSumaPuntos";
import { ContadorItem } from "../ContadorItem";


export const TableroSushi = ({ name = '', sumaPuntos, posicion }) => {

    const { handleSuma } = useSumaPuntos(4, sumaPuntos, posicion);

    return (
        <div className="svg-theme">
            <p className="negrita">{name}</p>
            <ContadorItem onSuma={(value) => handleSuma(0, value)} img='number-one' min="0"/>
            <ContadorItem onSuma={(value) => handleSuma(1, value)} img='number-two' min="0"/>
            <ContadorItem onSuma={(value) => handleSuma(2, value)} img='number-three' min="0"/>
            <ContadorItem onSuma={(value) => handleSuma(3, value)} img='pudin'/>
        </div>

    )
}