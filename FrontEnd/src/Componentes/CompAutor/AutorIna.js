import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class AutorIna extends Component {
  constructor(props) {
    super(props);
    this.state = {
      autores: [],
    };
  }

  componentDidMount() {
    this.obtenerAutores();
  }

  obtenerAutores() {
    // Realizar la solicitud GET a la API
    fetch("http://localhost:8090/xlib/autor/inactivo")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ autores: data });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  DeleteAutor = async (codigo) => {
    try {
      const response = await fetch(
        `http://localhost:8090/xlib/autor/${codigo}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Error al borrar el autor");
      }
      const updatedAutores = this.state.autores.filter(
        (autor) => autor.codigo !== codigo
      );
      this.setState({ autores: updatedAutores });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <div id="layoutSidenav_content">
        <main>
          <div className="container-fluid px-4">
            <h1 className="mt-4">Registro de Autores</h1>
            <form className="mt-4" action="/generatePdfReport" method="get">
              <Link to="/Autores" className="btn btn-warning mb-2">
                Ver Inactivos
              </Link>
            </form>
            <div className="card mb-4">
              <div className="card-header">
                <i className="fas fa-table me-1" />
                Tabla de Autores
              </div>
              <div className="card-body">
                <table id="datatablesSimple" className="table">
                  <thead className="thead-light">
                    <tr>
                      <th>N°</th>
                      <th>Nombre</th>
                      <th>Nacionalidad</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.autores.map((autor, index) => (
                      <tr key={autor.codigo}>
                        <td>{index + 1}</td>
                        <td>{autor.nombre}</td>
                        <td>{autor.pais}</td>
                        <td>{autor.estado ? "Activo" : "Inactivo"}</td>
                        <td>
                          <button className="btn btn-success btn-sm"
                          onClick={() => this.DeleteAutor(autor.codigo)}>
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
