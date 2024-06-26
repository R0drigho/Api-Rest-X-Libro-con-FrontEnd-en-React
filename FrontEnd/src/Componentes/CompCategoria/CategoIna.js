import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class CategoIna extends Component{
    constructor(props) {
        super(props);
        this.state = {
          categorias: [],
        };
      }
      componentDidMount() {
        this.obtenerCategorias();
      }
      obtenerCategorias() {
        fetch("http://localhost:8090/xlib/categoria/inactivo")
          .then((respuesta) => respuesta.json())
          .then((data) => {
            this.setState({ categorias: data });
          })
          .catch((error) => {
            console.error("Error al obtener data", error);
          });
      }
    
      HabilitarCategoria = async (codigo) => {
        try{
            const respuesta = await fetch(`http://localhost:8090/xlib/categoria/${codigo}`,
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
    render(){
        const {categorias} = this.state;

        return(
            <div id="layoutSidenav_content">
        <main>
          <div className="container-fluid px-4">
            <h1 className="mt-4">Registro de Categorias</h1>
            <div className="row mt-4">
              <div className="col-md-6">
                <Link to="/Categorias" className="btn btn-warning mb-2">
                  Activas
                </Link>
              </div>
              <div className="col-md-6 text-end">
                <button className="btnAgre btn-secondary btn-sm">
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
                        <button className="btn btn-success btn-sm"
                            onClick={()=> this.HabilitarCategoria(categoria.codigo)}>
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