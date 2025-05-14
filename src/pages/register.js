import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import FormGroup from "../components/form/form-group";
import UsuarioService from "../app/service/usuarioService";
import {mensagemDeErro, mensagemDeSucesso} from '../components/toastr';
import Astered from "../css/astered";
import {Link, useNavigate} from "react-router-dom";
import Layout from "../components/layout/layout";
import FormLayout from "../components/form/form-layout";
import {ConfirmaEmail} from "../components/utils/validacao";

function Register () {
    const [name, setName] = useState('');
    const [cpf, setCPF] = useState('');
    const [usuario, setUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [emailConfirmacao, setEmailConfirmacao] = useState('');
    const {validarEmail} = ConfirmaEmail();
    const [isSaving, setIsSaving] = useState(false)
    const { register, handleSubmit, watch, formState: { errors }} = useForm();
    const navigate = useNavigate();
    const usuarioService = UsuarioService();

    const cadastrarUsuario = (data) => {
        /*para validação de confirmação de email*/
        const email = watch("email");
        usuarioService.cadastrar({

        }).then(response => {
            mensagemDeSucesso(response.data.message);
            setTimeout(() => navigate("/login"), 2000);
        }).catch(err => {
            mensagemDeErro(err.response?.data);
        });
    }
    function handleAvancar() {
        navigate('/definirsenha');
    }

    function handleCancelar() {
        navigate('/Login');
    }
    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card border-0 shadow rounded-3 my-5">
                            <div className="card-body p-4 p-sm-5">
                                <h5 className="card-title text-center mb-5 fw-light fs-5">Criar nova conta</h5>
                                <form>
                                    {/*campo nome completo*/}
                                    <div className="form-floating mb-3">
                                        <input
                                            {...register("nomeCompleto", {required: "O nome completo é obrigatório"})}
                                            type="text"
                                            className="form-control "
                                            id="floatingInput"
                                            placeholder="Nome Completo"
                                        />
                                        <label htmlFor="floatingInput">Nome completo<span className="asterisco-vermelho">*</span></label>
                                    </div>
                                    {/*campo cpf*/}
                                    <div className="form-floating mb-3">
                                        <input
                                            {...register("cpf", {required: "O cpf é obrigatório"})}
                                            type="number"
                                            className="form-control"
                                            id="floatingInput"
                                            placeholder="CPF"
                                        />
                                        <label htmlFor="floatingInput">Cadastro Pessoa Física<span className="asterisco-vermelho">*</span></label>
                                    </div>
                                    {/*campo nome de usuario*/}
                                    <div className="form-floating mb-3">
                                        <input
                                            {...register("nomeUsuario", {required: "O nome de usuario é obrigatório"})}
                                            type="r"
                                            className="form-control"
                                            id="floatingInput"
                                            placeholder="Nome de usuario"
                                        />
                                        <label htmlFor="floatingInput">Nome de usuario<span className="asterisco-vermelho">*</span></label>
                                    </div>
                                    {/*campo email*/}
                                    <div className="form-floating mb-3">
                                        <input
                                            {...register("email", {required: "O email é obrigatório"})}
                                            type="r"
                                            className="form-control"
                                            id="floatingInput"
                                            placeholder="Email"
                                        />
                                        <label htmlFor="floatingInput">Email<span className="asterisco-vermelho">*</span></label>
                                    </div>
                                    {/*campo confirmar email*/}
                                    <div className="form-floating mb-3">
                                        <input
                                            {...register("emailConfirmacao", {required: "Confirmação de email é obrigatório"})}
                                            type="email"
                                            className="form-control"
                                            id="floatingInput"
                                            placeholder="Email"
                                        />
                                        <label htmlFor="floatingInput">Email<span className="asterisco-vermelho">*</span></label>
                                    </div>
                                    {/*botão*/}
                                    <div className="d-grid">
                                        <button
                                            className="btn btn-primary btn-login text-uppercase fw-bold"                                            onClick={cadastrarUsuario}>
                                            Cadastrar
                                        </button>
                                    </div>
                                    <hr className="my-4"></hr>
                                    {/* Botão de Login */}
                                    <div className="d-grid">
                                        <Link className="btn btn-outline-primary btn-login text-uppercase" to="/login">Log in</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
export default Register;






