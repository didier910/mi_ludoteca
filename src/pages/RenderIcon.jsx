import { useMemo } from 'react';
import { 
    BlueCircle,
    ButtonHoles, Cat, Cat2, DiceBlack, DiceWhite, 
    GlassBall, GrayCircle, GreenCircle, Hexagon, HexagonBlack, Lion, Meeple, 
    MinusTiles, NumberOne, NumberThree, NumberTwo, 
    Paw, 
    Pudin, RedCircle, Sushi, 
    YellowCircle
} from "./Icons";

const iconMap = {
    'loseta': Hexagon,
    'gato': Cat,
    'boton': ButtonHoles,
    'gato2': Cat2,
    'meeple': Meeple,
    'dado-negro': DiceBlack,
    'dado-blanco': DiceWhite,
    'glass-ball': GlassBall,
    'number-one': NumberOne,
    'number-two': NumberTwo,
    'number-three': NumberThree,
    'minus-tiles': MinusTiles,
    'hexagon-black': HexagonBlack,
    'sushi': Sushi,
    'pudin': Pudin,
    'green-circle': GreenCircle,
    'gray-circle': GrayCircle,
    'yellow-circle': YellowCircle,
    'red-circle': RedCircle,
    'blue-circle': BlueCircle,
    'paw': Paw,
    'lion': Lion
};

export const RenderIcon = ({ tipo }) => {
    const IconComponent = useMemo(() => iconMap[tipo], [tipo]);
    
    if (!IconComponent) {
        return null;
    }

    return <IconComponent />;
};

