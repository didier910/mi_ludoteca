import { useSumaPuntos } from "../../../hooks/useSumaPuntos";
import { ContadorItem } from "../ContadorItem";

export const TableroHarmonies = ({ name = '', sumaPuntos, posicion }) => {

    const { handleSuma } = useSumaPuntos(15, sumaPuntos, posicion);

    return (
        <>
            <p className="negrita">{name}</p>
            <div className="container-columns">
                <div>
                    <ContadorItem onSuma={(value) => handleSuma(0, value)} img='green-circle' min="0" />
                    <ContadorItem onSuma={(value) => handleSuma(1, value)} img='gray-circle' min="0" />
                    <ContadorItem onSuma={(value) => handleSuma(2, value)} img='yellow-circle' min="0" />
                    <ContadorItem onSuma={(value) => handleSuma(3, value)} img='red-circle' min="0" />
                    <ContadorItem onSuma={(value) => handleSuma(4, value)} img='blue-circle' min="0" />
                </div>
                <div className="svg-theme">
                    <ContadorItem onSuma={(value) => handleSuma(5, value)} img='paw' svg_size="svg_size_small" min="0" />
                    <ContadorItem onSuma={(value) => handleSuma(6, value)} img='paw' svg_size="svg_size_small" min="0" />
                    <ContadorItem onSuma={(value) => handleSuma(7, value)} img='paw' svg_size="svg_size_small" min="0" />
                    <ContadorItem onSuma={(value) => handleSuma(8, value)} img='paw' svg_size="svg_size_small" min="0" />
                    <ContadorItem onSuma={(value) => handleSuma(9, value)} img='paw' svg_size="svg_size_small" min="0" />
                    <ContadorItem onSuma={(value) => handleSuma(10, value)} img='paw' svg_size="svg_size_small" min="0" />
                    <ContadorItem onSuma={(value) => handleSuma(11, value)} img='paw' svg_size="svg_size_small" min="0" />
                    <ContadorItem onSuma={(value) => handleSuma(12, value)} img='paw' svg_size="svg_size_small" min="0" />
                    <ContadorItem onSuma={(value) => handleSuma(13, value)} img='paw' svg_size="svg_size_small" min="0" />
                    <ContadorItem onSuma={(value) => handleSuma(14, value)} img='paw' svg_size="svg_size_small" min="0" />
                </div>
            </div>

        </>
    )
}
