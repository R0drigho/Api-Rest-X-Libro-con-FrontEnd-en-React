import React, { Component } from 'react';
import Categoria from '../Componentes/CompCategoria/Categoria';
import ListaLibros from '../Componentes/CompLibro/ListaLibros';
import './Styles/Syless.css';

class Principal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categorias: [],
      libros: [],
      librosFiltrados: []
    };
  }

  componentDidMount() {
    this.obtenerCategorias();
    this.obtenerLibros();
  }

  obtenerCategorias() {
    fetch('http://localhost:8090/xlib/categoria/activo')
      .then(response => response.json())
      .then(data => this.setState({ categorias: data }))
      .catch(error => console.error('Error fetching categories:', error));
  }

  obtenerLibros() {
    fetch('http://localhost:8090/xlib/libros/activo')
      .then(response => response.json())
      .then(data => this.setState({ libros: data, librosFiltrados: data }))
      .catch(error => console.error('Error fetching books:', error));
  }

  filtrarLibrosPorCategoria = (codigoCategoria) => {
    const librosFiltrados = this.state.libros.filter(libro => libro.categoria.codigo === codigoCategoria);
    this.setState({ librosFiltrados });
  };

  render() {
    const { categorias, librosFiltrados } = this.state;

    return (
      <div className="layout">
        <Categoria categorias={categorias} onSelectCategoria={this.filtrarLibrosPorCategoria} />
        <ListaLibros libros={librosFiltrados} />
      </div>
    );
  }
}

export default Principal;
