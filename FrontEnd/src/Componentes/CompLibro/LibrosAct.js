import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export default class LibrosAct extends Component {
  state = {
    libros: [],
    autores: [],
    categorias: [],
    editoriales: [],
    modalAgregar: false,
    formularioLibro: {
      codigo: "",
      nombre: "",
      autor: "",
      editorial: "",
      categoria: "",
      informacion: "",
      pagina: "",
      anio: "",
      stock: "",
      precio: "",
      imagen: "",
    },
    modoEdicion: false,
  };

  componentDidMount() {
    this.obtenerLibros();
    this.obtenerAutores();
    this.obtenerCategorias();
    this.obtenerEditoriales();
  }

  obtenerLibros = () => {
    fetch("http://localhost:8090/xlib/libros/activo")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ libros: data });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  obtenerAutores = () => {
    fetch("http://localhost:8090/xlib/autor/activo")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ autores: data });
      })
      .catch((error) => {
        console.error("Error fetching autores:", error);
      });
  };

  obtenerCategorias = () => {
    fetch("http://localhost:8090/xlib/categoria/activo")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ categorias: data });
      })
      .catch((error) => {
        console.error("Error fetching categorias:", error);
      });
  };

  obtenerEditoriales = () => {
    fetch("http://localhost:8090/xlib/editorial/activo")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ editoriales: data });
      })
      .catch((error) => {
        console.error("Error fetching editoriales:", error);
      });
  };

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

  toggleModalAgregar = () => {
    this.setState((prevState) => ({
      modalAgregar: !prevState.modalAgregar,
      modoEdicion: false,
      formularioLibro: {
        ...prevState.formularioLibro,
        codigo: "",
        nombre: "",
        autor: "",
        editorial: "",
        categoria: "",
        informacion: "",
        pagina: "",
        anio: "",
        stock: "",
        precio: "",
        imagen: "",
      },
    }));
  };

  toggleModalEditar = (libro) => {
    this.setState({
      modalAgregar: true,
      modoEdicion: true,
      formularioLibro: {
        codigo: libro.codigo,
        nombre: libro.nombre,
        autor: libro.autor.codigo,
        editorial: libro.editorial.codigo,
        categoria: libro.categoria.codigo,
        informacion: libro.informacion,
        pagina: libro.pagina,
        anio: libro.anio,
        stock: libro.stock,
        precio: libro.precio,
        imagen: libro.imagen,
      },
    });
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      formularioLibro: {
        ...prevState.formularioLibro,
        [name]: value,
      },
    }));
  };

  handleSelectChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      formularioLibro: {
        ...prevState.formularioLibro,
        [name]: value,
      },
    }));
  };

  handleSubmitLibro = async () => {
    const { formularioLibro, modoEdicion } = this.state;

    const url = modoEdicion
      ? `http://localhost:8090/xlib/libros/${formularioLibro.codigo}`
      : "http://localhost:8090/xlib/libros";

    const method = modoEdicion ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formularioLibro),
      });

      if (!response.ok) {
        throw new Error(
          `Error al ${modoEdicion ? "actualizar" : "agregar"} el libro`
        );
      }

      const data = await response.json();

      if (modoEdicion) {
        const updatedLibros = this.state.libros.map((libro) =>
          libro.codigo === data.codigo ? data : libro
        );
        this.setState({
          libros: updatedLibros,
          modalAgregar: false,
        });
      } else {
        this.setState((prevState) => ({
          libros: [...prevState.libros, data],
          modalAgregar: false,
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const {
      libros,
      autores,
      categorias,
      editoriales,
      modalAgregar,
      formularioLibro,
      modoEdicion,
    } = this.state;

    return (
      <div id="layoutSidenav_content">
        <main>
          <div className="container-fluid px-4">
            <h1 className="mt-4">Registro de Libros</h1>
            <div className="row mt-4">
              <div className="col-md-6">
                <Link to="/LibInactivos" className="btn btn-warning mb-2">
                  Ver Inactivos
                </Link>
              </div>
              <div className="col-md-6 text-end">
                <button
                  className="btnAgre btn-secondary btn-sm"
                  onClick={this.toggleModalAgregar}
                >
                  + Agregar
                </button>
              </div>
            </div>
            <div className="card mb-4">
              <div className="card-header">
                <i className="fas fa-table me-1" />
                Tabla de Libros
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table
                    id="datatablesSimple"
                    className="table table-striped table-sm"
                  >
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
                      {libros.map((libro, index) => (
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
                            <a
                              href="#"
                              className="btn btn-secondary btn-sm"
                              onClick={() => this.toggleModalEditar(libro)}
                            >
                              Editar
                            </a>
                            &nbsp;
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() =>
                                this.handleDeleteLibro(libro.codigo)
                              }
                            >
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
          </div>
        </main>

        {/* Ventana modal para agregar/editar */}
        <Modal
          isOpen={modalAgregar}
          toggle={this.toggleModalAgregar}
          className="modal-dialog-centered"
        >
          <ModalHeader toggle={this.toggleModalAgregar}>
            {modoEdicion ? "Editar Libro" : "Agregar Libro"}
          </ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label htmlFor="nombre">Nombre:</label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                name="nombre"
                value={formularioLibro.nombre}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="autor">Autor:</label>
              <select
                className="form-control"
                id="autor"
                name="autor"
                value={formularioLibro.autor}
                onChange={this.handleSelectChange}
              >
                <option value="">Seleccione un autor</option>
                {autores.map((autor) => (
                  <option key={autor.codigo} value={autor.codigo}>
                    {autor.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="editorial">Editorial:</label>
              <select
                className="form-control"
                id="editorial"
                name="editorial"
                value={formularioLibro.editorial}
                onChange={this.handleSelectChange}
              >
                <option value="">Seleccione una editorial</option>
                {editoriales.map((editorial) => (
                  <option key={editorial.codigo} value={editorial.codigo}>
                    {editorial.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="categoria">Categoría:</label>
              <select
                className="form-control"
                id="categoria"
                name="categoria"
                value={formularioLibro.categoria}
                onChange={this.handleSelectChange}
              >
                <option value="">Seleccione una categoría</option>
                {categorias.map((categoria) => (
                  <option key={categoria.codigo} value={categoria.codigo}>
                    {categoria.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="informacion">Descripción:</label>
              <textarea
                className="form-control"
                id="informacion"
                name="informacion"
                value={formularioLibro.informacion}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="pagina">Páginas:</label>
              <input
                type="number"
                className="form-control"
                id="pagina"
                name="pagina"
                value={formularioLibro.pagina}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="anio">Año:</label>
              <input
                type="number"
                className="form-control"
                id="anio"
                name="anio"
                value={formularioLibro.anio}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="stock">Cantidad:</label>
              <input
                type="number"
                className="form-control"
                id="stock"
                name="stock"
                value={formularioLibro.stock}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="precio">Precio:</label>
              <input
                type="number"
                className="form-control"
                id="precio"
                name="precio"
                value={formularioLibro.precio}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="imagen">URL de la Imagen:</label>
              <input
                type="text"
                className="form-control"
                id="imagen"
                name="imagen"
                value={formularioLibro.imagen}
                onChange={this.handleInputChange}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              className="btn btn-primary"
              onClick={this.handleSubmitLibro}
            >
              {modoEdicion ? "Guardar Cambios" : "Agregar"}
            </button>
            <button
              className="btn btn-secondary"
              onClick={this.toggleModalAgregar}
            >
              Cancelar
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
