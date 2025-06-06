import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "../components/navbar/navbar";
import Home from '../pages/home';
import Login from '../pages/login';
import Register from '../pages/register';
import Definirsenha from "../pages/definirsenha";

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootswatch/dist/flatly/bootstrap.min.css'
import 'toastr/build/toastr.css'
import 'toastr/build/toastr.min.js'
import '../css/App.css'
import '../css/custom.css'

const Rotas = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/definirsenha" element={<Definirsenha />} />
            </Routes>
        </Router>
    );
};

export default Rotas;