import { useState } from "react";


export const useSumaPuntos = (numValores, sumaPuntos, posicion) => {

    const [resultado, setResultado] = useState(0);
    const [valores, setValores] = useState(() => Array.from({ length: numValores }, () => 0));

    const handleSuma = (index, value) => {
        const newValues = [...valores];
        newValues[index] = value;
        setValores(newValues);
        const suma = newValues.reduce((a, b) => a + b, 0);
        setResultado(suma);
        sumaPuntos(posicion, suma);
    }

  return {
    resultado,
    handleSuma,
  }
}
