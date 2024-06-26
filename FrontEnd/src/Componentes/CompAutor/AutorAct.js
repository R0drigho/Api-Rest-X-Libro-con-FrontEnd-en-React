import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

export default class AutorAct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      autores: [],
      nacionalidades: [],
      modalAgregar: false,
      modalEditar: false,
      nuevoAutor: {
        codigo: null,
        nombre: '',
        pais: ''
      }
    };
  }

  componentDidMount() {
    this.obtenerAutores();
    this.obtenerPaises();
  }

  obtenerAutores() {
    fetch("http://localhost:8090/xlib/autor/activo")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ autores: data });
        this.extraerNacionalidades(data);
      })
      .catch((error) => {
        console.error("Error al obtener data:", error);
      });
  }

  obtenerPaises() {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const nacionalidades = data.map(pais => pais.name.common).sort();
        this.setState({ nacionalidades });
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }

  extraerNacionalidades(autores) {
    const nacionalidades = [...new Set(autores.map(autor => autor.pais))];
    this.setState({ nacionalidades: [...this.state.nacionalidades, ...nacionalidades] });
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
      this.extraerNacionalidades(updatedAutores);
    } catch (error) {
      console.error(error);
    }
  };

  toggleModalAgregar = () => {
    this.setState(prevState => ({
      modalAgregar: !prevState.modalAgregar,
      nuevoAutor: { codigo: null, nombre: '', pais: '' }
    }));
  };

  toggleModalEditar = (autor = null) => {
    this.setState(prevState => ({
      modalEditar: !prevState.modalEditar,
      nuevoAutor: autor ? { ...autor } : { codigo: null, nombre: '', pais: '' }
    }));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState(prevState => ({
      nuevoAutor: {
        ...prevState.nuevoAutor,
        [name]: value
      }
    }));
  };

  handleAgregarAutor = async () => {
    const { nuevoAutor } = this.state;
    if (nuevoAutor.nombre.trim() === '' || nuevoAutor.pais.trim() === '') {
      alert("Por favor, complete todos los campos.");
      return;
    }

    try {
      const nuevoAutorConEstado = {
        ...nuevoAutor,
        estado: true
      };

      const response = await fetch("http://localhost:8090/xlib/autor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoAutorConEstado),
      });
      if (!response.ok) {
        throw new Error("Error al agregar el autor");
      }
      const data = await response.json();
      this.setState(prevState => ({
        autores: [...prevState.autores, data],
        modalAgregar: false,
        nuevoAutor: {
          nombre: '',
          pais: ''
        }
      }));
      this.extraerNacionalidades([...this.state.autores, data]);
    } catch (error) {
      console.error(error);
    }
  };

  handleEditarAutor = async () => {
    const { nuevoAutor } = this.state;
    if (nuevoAutor.nombre.trim() === '' || nuevoAutor.pais.trim() === '') {
      alert("Por favor, complete todos los campos.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8090/xlib/autor/${nuevoAutor.codigo}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoAutor),
      });
      if (!response.ok) {
        throw new Error("Error al editar el autor");
      }
      const data = await response.json();
      const updatedAutores = this.state.autores.map(autor =>
        autor.codigo === data.codigo ? data : autor
      );
      this.setState({
        autores: updatedAutores,
        modalEditar: false,
        nuevoAutor: { codigo: null, nombre: '', pais: '' }
      });
      this.extraerNacionalidades(updatedAutores);
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { autores, nacionalidades, modalAgregar, modalEditar, nuevoAutor } = this.state;

    return (
      <div id="layoutSidenav_content">
        <main>
          <div className="container-fluid px-4">
            <h1 className="mt-4">Registro de Autores</h1>
            <div className="row mt-4">
              <div className="col-md-6">
                <Link to="/AutoresInactivos" className="btn btn-warning mb-2">
                  Ver Inactivos
                </Link>
              </div>
              <div className="col-md-6 text-end">
                <button className="btnAgre btn-secondary btn-sm" onClick={this.toggleModalAgregar}>
                  + Agregar
                </button>
              </div>
            </div>
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
                      <th>País</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {autores.map((autor, index) => (
                      <tr key={autor.codigo}>
                        <td>{index + 1}</td>
                        <td>{autor.nombre}</td>
                        <td>{autor.pais}</td>
                        <td>{autor.estado ? "Activo" : "Inactivo"}</td>
                        <td>
                          <button className="btn btn-secondary btn-sm" onClick={() => this.toggleModalEditar(autor)}>
                            Editar
                          </button>
                          &nbsp;
                          <button className="btn btn-danger btn-sm" onClick={() => this.DeleteAutor(autor.codigo)}>
                            Borrar
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

        {/* Ventana modal para agregar */}
        <Modal isOpen={modalAgregar} toggle={this.toggleModalAgregar}>
          <ModalHeader toggle={this.toggleModalAgregar}>Agregar Autor</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label htmlFor="nombre">Nombre:</label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                name="nombre"
                value={nuevoAutor.nombre}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="pais">País:</label>
              <select
                className="form-control"
                id="pais"
                name="pais"
                value={nuevoAutor.pais}
                onChange={this.handleInputChange}
              >
                <option value="">Seleccione un país</option>
                {nacionalidades.map((nacionalidad, index) => (
                  <option key={index} value={nacionalidad}>
                    {nacionalidad}
                  </option>
                ))}
              </select>
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" onClick={this.handleAgregarAutor}>Agregar</button>
            <button className="btn btn-secondary" onClick={this.toggleModalAgregar}>Cancelar</button>
          </ModalFooter>
        </Modal>

        {/* Ventana modal para editar */}
        <Modal isOpen={modalEditar} toggle={this.toggleModalEditar}>
          <ModalHeader toggle={this.toggleModalEditar}>Editar Autor</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label htmlFor="nombre">Nombre:</label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                name="nombre"
                value={nuevoAutor.nombre}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="pais">País:</label>
              <select
                className="form-control"
                id="pais"
                name="pais"
                value={nuevoAutor.pais}
                onChange={this.handleInputChange}
              >
                <option value="">Seleccione un país</option>
                {nacionalidades.map((nacionalidad, index) => (
                  <option key={index} value={nacionalidad}>
                    {nacionalidad}
                  </option>
                ))}
              </select>
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" onClick={this.handleEditarAutor}>Guardar</button>
            <button className="btn btn-secondary" onClick={this.toggleModalEditar}>Cancelar</button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
