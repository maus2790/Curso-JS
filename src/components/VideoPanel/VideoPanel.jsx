import React from 'react';
import './VideoPanel.css';

const VideoPanel = ({ temaActual, altura }) => {
  return (
    <div 
      className="panel panel-video" 
      style={{ height: altura }}
    >
      <div className="encabezado-panel">
        <h3>🎥 {temaActual?.nombre}</h3>
      </div>
      <div className="contenido-panel">
        <div className="contenedor-video">
          {temaActual && (
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${temaActual.videoId}`}
              title={`Video tutorial - ${temaActual.nombre}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPanel;