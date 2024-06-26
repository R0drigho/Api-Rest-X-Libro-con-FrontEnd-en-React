import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

export default class CategoAct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categorias: [],
      modalAgregar: false,
      modalEditar: false,
      nuevaCategoria: {
        codigo: null,
        nombre: ''
      }
    };
  }
  componentDidMount() {
    this.obtenerCategorias();
  }
  obtenerCategorias() {
    fetch("http://localhost:8090/xlib/categoria/activo")
      .then((respuesta) => respuesta.json())
      .then((data) => {
        this.setState({ categorias: data });
      })
      .catch((error) => {
        console.error("Error al obtener data", error);
      });
  }

  agregarCategoria = async () => {
    const {nuevaCategoria} = this.state;
    if(nuevaCategoria.nombre.trim() === '' ){
        alert("Debe agregar información");
        return;
    }
    try{
        const nuevaCategoriaConEstado = {
            ...nuevaCategoria,
            estado: true//definimos como activo al agregar
        };
        const respuesta = await fetch("http://localhost:8090/xlib/categoria",{
            method: "POST",
            headers:{ "Content-Type" : "application/json", },
            body: JSON.stringify(nuevaCategoriaConEstado),
        });
        if(!respuesta.ok){ throw new Error("Error al Agregar")}

        const data = await respuesta.json();
        this.setState(prevState => ({
            categorias: [...prevState.categorias, data],
            modalAgregar: false,
            nuevaCategoria:{
                nombre: ''
            }
        }));
    }catch(error){
        console.error(error);
    }
  }

  editarCategoria = async () => {
    const { nuevaCategoria } = this.state;
    if(nuevaCategoria.nombre.trim() === ''){
        alert("Complete campos ps por la conche de..");
        return;
    }
    try{
        const respuesta = await fetch(`http://localhost:8090/xlib/categoria/${nuevaCategoria.codigo}`,{
            method: "PUT",
            headers: {"Content-Type": "application/json",},
            body: JSON.stringify(nuevaCategoria),
        });
        if(!respuesta.ok){
            throw new Error("Error al Editar")
        }
        const data = await respuesta.json();
        const updateCategorias = this.state.categorias.map(categoria =>
            categoria.codigo === data.codigo ? data : categoria
        );
        this.setState({
            categorias: updateCategorias,
            modalEditar: false,
            nuevaCategoria: { codigo: null, nombre: ''}
        });
    }catch (error) {console.error(error);}
  }

  EliminarCategoria = async (codigo) => {
    try{
        const respuesta = await fetch(
            `http://localhost:8090/xlib/categoria/${codigo}`,
        {
            method:"DELETE",
        });
        if(!respuesta.ok){
            throw new Error("Error al borrar el autor");
        }
        const updateCategorias = this.state.categorias.filter(
            (categoria) => categoria.codigo !== codigo
        );
        this.setState({categorias: updateCategorias});
    }catch (error) {
        console.error(error);
    }
  };

  toggleModalAgregar = () => {
    this.setState(prevState => ({
        modalAgregar: !prevState.modalAgregar,
        nuevaCategoria: { codigo: null, nombre: ''}
    }));
  };

  toggleModalEditar = (categoria = null) => {
    this.setState(prevState => ({
        modalEditar: !prevState.modalEditar,
        nuevaCategoria: categoria ? {...categoria} : { codigo: null, nombre: ''}
    }));
  };
  // permite el ingreso de texto
  handleInputChange = event => {
    const {name, value} = event.target;
    this.setState(prevState => ({
        nuevaCategoria:{
            ...prevState.nuevaCategoria,
            [name]: value
        }
    }))
  }

  render() {
    const { categorias, modalAgregar, modalEditar, nuevaCategoria } = this.state;

    return (
      <div id="layoutSidenav_content">
        <main>
          <div className="container-fluid px-4">
            <h1 className="mt-4">Registro de Categorias</h1>
            <div className="row mt-4">
              <div className="col-md-6">
                <Link to="/Categoria-Ina" className="btn btn-warning mb-2">
                  Ver Inactivos
                </Link>
              </div>
              <div className="col-md-6 text-end">
                <button className="btnAgre btn-secondary btn-sm"
                    onClick={this.toggleModalAgregar}>
                  + Agregar
                </button>
              </div>
            </div>
            <div className="card mb-4">
              <div className="card-header">
                <i className="fas fa-table me-2" />
                Tabla Categorias
              </div>
              <div className="card-body">
              <table id="datatablesSimple" className="table">
                <thead className="thead-light">
                  <tr>
                    <th>N°</th>
                    <th>Nombre</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {categorias.map((categoria, index) => (
                    <tr key={categoria.codigo}>
                      <td>{index + 1}</td>
                      <td>{categoria.nombre}</td>
                      <td>{categoria.estado ? "Activo" : "Inactivo"}</td>
                      <td>
                        <button className="btn btn-secondary btn-sm"
                            onClick={() => this.toggleModalEditar(categoria)}>
                          Editar
                        </button>
                        &nbsp;
                        <button className="btn btn-danger btn-sm"
                            onClick={()=> this.EliminarCategoria(categoria.codigo)}>
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
        <Modal isOpen={modalAgregar} toggle={this.toggleModalAgregar}>
            <ModalHeader toggle={this.toggleModalAgregar}>Agregar Categoria</ModalHeader>
            <ModalBody>
                <div className="form-group">
                    <label htmlFor="nombre">Nombre:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nombre"
                        name="nombre"
                        value={nuevaCategoria.nombre}
                        onChange={this.handleInputChange}
                    />
                </div>
            </ModalBody>
            <ModalFooter>
                <button className="btn btn-primary" onClick={this.agregarCategoria}>Agregar</button>
                <button className="btn btn-secondary" onClick={this.toggleModalAgregar}>Cancelar</button>
            </ModalFooter>
        </Modal>
        {/* Ventana modal para editar */}
        <Modal isOpen={modalEditar} toggle={this.toggleModalEditar}>
            <ModalHeader toggle={this.toggleModalEditar}>Editar Categoria</ModalHeader>
            <ModalBody>
                <div className="form-group">
                    <label htmlFor="nombre">Nombre:</label>
                    <input 
                        type="text"
                        className="form-control"
                        id="nombre"
                        name="nombre"
                        value={nuevaCategoria.nombre}
                        onChange={this.handleInputChange}
                    />
                </div>
            </ModalBody>
            <ModalFooter>
                <button className="btn btn-primary" onClick={this.editarCategoria}>Guardar</button>
                <button className="btn btn-secondary" onClick={this.toggleModalEditar}>Cancelar</button>
            </ModalFooter>
        </Modal>
      </div>
    );
  }
}
