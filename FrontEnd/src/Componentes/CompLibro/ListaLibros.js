import React from 'react';
import Libro from './Libro';

const ListaLibros = ({ libros }) => {
  return (
    <div className="lista-libros">
      {libros.map(libro => (
        <Libro key={libro.codigo} libro={libro} />
      ))}
    </div>
  );
};

export default ListaLibros;
