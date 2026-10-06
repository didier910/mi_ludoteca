import React from "react";


export const RenderText = React.memo(({ tipo, contenido }) => {
  const renderList = (items, isOrdered) => {
    const ListTag = isOrdered ? 'ol' : 'ul'; // Determina si es una lista ordenada o desordenada

    return (
      <ListTag className='justificado'>
        {items.map((item, index) => {
          // Si el elemento contiene una sublista, renderízala directamente
          if (item.elemento) {
            return (
              <React.Fragment key={index}>
                <RenderText
                  tipo={item.elemento.tipo}
                  contenido={item.elemento.contenido}
                />
              </React.Fragment>
            );
          }

          // Si no contiene una sublista, renderiza el elemento como un <li>
          return (
            <li key={index}>
              {item.link ? (
                <a className="link-award" href={item.link}>{item.item}</a>
              ) : (
                item.item
              )}
            </li>
          );
        })}
      </ListTag>
    );
  };

  const renderMap = {
    'parrafo': () => <p className='justificado'>{contenido}</p>,
    'lista': () => renderList(contenido, false), // Lista desordenada
    'listanum': () => renderList(contenido, true), // Lista ordenada
    'subtitulo': () => <p className='negrita'>{contenido}</p>,
    'video': () => (
      <div className="contenedor-video"> 
        <iframe 
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            border: 0 
          }} 
          src={contenido} 
          title={tipo} 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowFullScreen 
        />
      </div>
    )
  };

  return renderMap[tipo] ? renderMap[tipo]() : null;
});


