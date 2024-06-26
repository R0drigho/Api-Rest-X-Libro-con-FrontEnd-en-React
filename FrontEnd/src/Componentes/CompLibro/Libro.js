import React from 'react';

const Libro = ({ libro }) => {
  return (
    <div className="libro">
      <img src={libro.imagen} alt={libro.nombre} />
      {/* <img src={`path/to/images/${libro.imagen}`} alt={libro.nombre} /> */}
      <h3>{libro.nombre}</h3>
      <p>Autor: {libro.autor.nombre}</p>
      <p>Año: {libro.anio}</p>
      <p>Precio: S/.{libro.precio}</p>
    </div>
  );
};

export default Libro;
