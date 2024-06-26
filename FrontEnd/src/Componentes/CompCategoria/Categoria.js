import React from 'react';

const Categoria = ({ categorias, onSelectCategoria }) => {
  return (
    <div className="categoria">
      <h2>Categorías</h2>
      <ul>
        {categorias.map(categoria => (
          <li key={categoria.codigo} onClick={() => onSelectCategoria(categoria.codigo)}>
            {categoria.nombre}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categoria;
