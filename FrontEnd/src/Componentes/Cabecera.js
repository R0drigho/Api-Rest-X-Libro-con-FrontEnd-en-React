import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Cabecera extends Component {
    render() {
        return (
            <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            <Link className="navbar-brand ps-3" to="/">
              X-Libros
            </Link>
            <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
              <div className="input-group">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Buscar por..."
                  aria-label="Search for..."
                  aria-describedby="btnNavbarSearch"
                />
                <button
                  className="btn btn-primary"
                  id="btnNavbarSearch"
                  type="button"
                >
                  <i className="fas fa-search" />
                </button>
              </div>
            </form>
            <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fas fa-user fa-table" />
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navbarDropdown"
                >
                  <li>
                    <p className="dropdown-item" >
                      Gestión
                    </p>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/LibActivos">
                      Libros
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/Autores">
                      Autores
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/Editoriales">
                      Editoriales
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/Categorias">
                      Categorias
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        );
    }
}
