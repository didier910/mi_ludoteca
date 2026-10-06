import { useSumaPuntos } from "../../../hooks/useSumaPuntos";
import { ContadorItem } from "../ContadorItem";


export const TableroCalico = ({ name = '', sumaPuntos, posicion }) => {

    const { handleSuma } = useSumaPuntos(3, sumaPuntos, posicion);

    return (
        <div className="svg-theme">
            <p className="negrita">{name}</p>
            <ContadorItem onSuma={(value) => handleSuma(0, value)} img='loseta' min="0"/>
            <ContadorItem onSuma={(value) => handleSuma(1, value)} img='gato' min="0"/>
            <ContadorItem onSuma={(value) => handleSuma(2, value)} img='boton' min="0"/>
        </div>

    )
}
