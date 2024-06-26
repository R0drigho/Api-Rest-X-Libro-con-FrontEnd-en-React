import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class LibrosIna extends Component {
  constructor(props) {
    super(props);
    this.state = {
      libros: [],
    };
  }

  componentDidMount() {
    // Realizar la solicitud GET a la API
    fetch("http://localhost:8090/xlib/libros/inactivo")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ libros: data });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  handleDeleteLibro = async (codigo) => {
    try {
      const response = await fetch(
        `http://localhost:8090/xlib/libros/${codigo}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Error al borrar el libro");
      }
      const updatedLibros = this.state.libros.filter(
        (libro) => libro.codigo !== codigo
      );
      this.setState({ libros: updatedLibros });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <div id="layoutSidenav_content">
        <main>
          <div className="container-fluid px-4">
            <h1 className="mt-4">Registro de Libros</h1>
            <form className="mt-4" action="/generatePdfReport" method="get">
              <Link to="/LibActivos" className="btn btn-primary mb-2">
                Ver Activos
              </Link>
            </form>
            <div className="card mb-4">
              <div className="card-header">
                <i className="fas fa-table me-1" />
                Tabla de Libros
              </div>
              <div className="card-body">
                <table id="datatablesSimple" className="table">
                  <thead className="thead-light">
                    <tr>
                      <th>N°</th>
                      <th>Nombre</th>
                      <th>Autor</th>
                      <th>Editorial</th>
                      <th>Categoría</th>
                      <th>Descripción</th>
                      <th>Páginas</th>
                      <th>Año</th>
                      <th>Cantidad</th>
                      <th>Precio</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.libros.map((libro, index) => (
                      <tr key={libro.codigo}>
                        <td>{index + 1}</td>
                        <td>{libro.nombre}</td>
                        <td>{libro.autor.nombre}</td>
                        <td>{libro.editorial.nombre}</td>
                        <td>{libro.categoria.nombre}</td>
                        <td>{libro.informacion}</td>
                        <td>{libro.pagina}</td>
                        <td>{libro.anio}</td>
                        <td>{libro.stock}</td>
                        <td>S/.{libro.precio}</td>
                        <td>{libro.estado ? "Activo" : "Inactivo"}</td>
                        <td>
                          <button className="btn btn-success btn-sm"
                          onClick={() => this.handleDeleteLibro(libro.codigo)}>
                            Habilitar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}
