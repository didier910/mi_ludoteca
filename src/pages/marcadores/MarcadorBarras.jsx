import './marcadorBarras.css';

import { RenderIcon } from '../RenderIcon';



export const MarcadorBarras = ({ nombre, resultado, getHighestScore, color, img }) => {
    
    const highestScore = getHighestScore() || 1; // Evita división por cero
    const anchoBarra = (resultado * 100) / highestScore;
    

    const estiloGato = {
        position: 'absolute',
        top: 0, // Pegado a la parte superior
        bottom: 0, // Pegado a la parte inferior
        margin: 'auto 0', // Centra verticalmente
        left: `calc(${anchoBarra}% + 5px)`,
        zIndex: 2,

    };

    return (
        
            <div className='estiloContenedor'> 
            <span className='estiloNombre'>{nombre}</span> 
            <div style={{position: 'relative', width: '100%', height: '100%'}} className='svg-theme'>
                <div className="estiloBarra" style={{width: `${anchoBarra}%`, backgroundColor: color}}>
                    <span style={{position: 'absolute', right: '5px', color: 'white', fontWeight: 'bold', top: '50%', transform: 'translateY(-50%)'}}>{resultado}</span>
                </div>
                <span className="svg_size_bar" style={estiloGato}><RenderIcon tipo={img} /></span>
            </div>
        </div>
        
    );
}
