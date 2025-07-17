import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "../components/navbar/navbar";
import Home from '../pages/home';
import Login from '../pages/login';
import Register from '../pages/cadastro/register';
import DefinirSenha from "../pages/senha/definir-senha";
import ConsultarEscola from "../pages/consultarEscola/consultar-escola";
import InfoBasicasEscola from "../pages/cadastro/info-basicas-escola";
import Infraestrutura from "../pages/cadastro/infraestrutura";

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootswatch/dist/flatly/bootstrap.min.css'
import 'toastr/build/toastr.css'
import 'toastr/build/toastr.min.js'
import '../css/App.css'
import '../css/custom.css'
//import 'primereact/resources/themes/lara-light-indigo/theme.css'
//import 'primereact/resources/primereact.min.css'
//import 'primeicons/primeicons.css'
//import 'primeflex/primeflex.css'


const Rotas = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/definirsenha" element={<DefinirSenha />} />
                <Route path="/consultar-escola" element={<ConsultarEscola />} />
                <Route path="/register-escola" element={<InfoBasicasEscola />} />
                <Route path="/infraestrutura" element={<Infraestrutura />} />
            </Routes>
        </Router>
    );
};

export default Rotas;