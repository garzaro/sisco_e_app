import React, {useState} from 'react';
import Card from '../components/card/card';
import FormGroup from "../components/form/form-group";
import UsuarioService from "../app/service/usuarioService";
import {mensagemDeErro, mensagemDeSucesso} from '../components/toastr';
import Astered from "../css/astered";
import {useNavigate} from "react-router-dom";

function Register () {
    const [dadosDoUsuario, setDadosDoUsuario] = useState({
        nome:'', cpf:'', usuario:'', email:'',
    });
    const navigate = useNavigate();
    const usuarioService = UsuarioService();

    const cadastrarUsuario = (data) => {
        usuarioService.cadastrar({

        }).then(response => {
            mensagemDeSucesso(response.data.message);
            setTimeout(() => navigate("/login"), 2000);
        }).catch(err => {
            mensagemDeErro(err.response.data);
        });
    }
    function handleAvancar() {
        navigate('/definirsenha');
    }

    function handleCancelar() {
        navigate('/Login');
    }
    return (
        <div className="container-fluid mt-5 style={{minHeight: '0vh', display: 'flex', alignItems: 'center'">
            <div className="row justify-content-center w-100">
                <div className="col-md-6" style={{ marginTop: '-30px' }}> {/*style={{ marginTop: '-120px' }}*/}
                    <div className="bs-docs-section">
                        <Card title="Cadastro de Usuário">
                            <div className="row justify-content-center align-items-center">
                                <div className="col-md-10">
                                    <div className="bs-component">
                                        <fieldset className="fieldset-sm">
                                            <FormGroup label={
                                                <span>
                                                Nome Completo: <Astered>*</Astered>
                                                </span>
                                            } name="nome-completo">
                                                <input type="text"
                                                       className="form-control form-control-sm inputPlaceholder"
                                                       id="nome-completo"
                                                       placeholder="Digite seu nome"
                                                />
                                            </FormGroup>

                                            <FormGroup label={
                                                <span>
                                                Cadastro Pessoa Física: <Astered>*</Astered>
                                            </span>
                                            } name="cpf">
                                                <input type="text"
                                                       className="form-control form-control-sm inputPlaceholder"
                                                       id="cpf"
                                                       placeholder="Digite seu nome cpf"
                                                />
                                            </FormGroup>

                                            <FormGroup label={
                                                <span>
                                                Nome de Usuário: <Astered>*</Astered>
                                            </span>
                                            } name="nome-usuario">
                                                <input type="text"
                                                       className="form-control form-control-sm inputPlaceholder"
                                                       id="nome-usuario"
                                                       placeholder="Nome de usuário"
                                                />
                                            </FormGroup>

                                            <FormGroup label={
                                                <span>
                                                Email: <Astered>*</Astered>
                                            </span>
                                            } name="email">
                                                <input type="email"
                                                       className="form-control form-control-sm inputPlaceholder"
                                                       id="email"
                                                       placeholder="Digite o email"
                                                />
                                            </FormGroup>

                                            {/*repetir*/}
                                            <FormGroup label={
                                                <span>
                                                Confirmar Email: <Astered>*</Astered>
                                            </span>
                                            } name="confirmar-email">
                                                <input type="email"
                                                       className="form-control form-control-sm inputPlaceholder"
                                                       id="repetir-email"
                                                       placeholder="Confirme o email"
                                                />
                                            </FormGroup>
                                            <button type="submit" className="btn btn-success mt-3" onClick={handleAvancar}>Avançar</button>
                                            &nbsp;&nbsp;
                                            <button type="button" className="btn btn-danger mt-3" onClick={handleCancelar}>Cancelar</button>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Register;






