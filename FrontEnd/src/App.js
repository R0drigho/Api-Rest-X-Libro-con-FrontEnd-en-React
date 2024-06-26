import React, {Component} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cabecera from './Componentes/Cabecera';
import LibrosAct from './Componentes/CompLibro/LibrosAct';
import Principal from './Componentes/Principal';
import LibrosIna from './Componentes/CompLibro/LibrosIna';
import AutorAct from './Componentes/CompAutor/AutorAct';
import AutorIna from './Componentes/CompAutor/AutorIna';
import CategoAct from './Componentes/CompCategoria/CategoAct';
import CategoIna from './Componentes/CompCategoria/CategoIna';

class App extends Component {
  
    render(){
        return(
            <BrowserRouter>
                <Cabecera/>
                <Routes>
                    <Route path='/' element={<Principal/>}/>
                    <Route path='/LibActivos' element={<LibrosAct/>}/>
                    <Route path='/LibInactivos' element={<LibrosIna/>}/>
                    <Route path='/Autores' element={<AutorAct/>}/>
                    <Route path='/AutoresInactivos' element={<AutorIna/>}/>
                    <Route path='/Categorias' element={<CategoAct/>}/>
                    <Route path='/Categoria-Ina' element={<CategoIna/>}/>
                </Routes>
            </BrowserRouter>     
        );
    }
}
export default App