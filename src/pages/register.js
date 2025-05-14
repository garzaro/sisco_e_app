import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import FormGroup from "../components/form/form-group";
import UsuarioService from "../app/service/usuarioService";
import {mensagemDeErro, mensagemDeSucesso} from '../components/utils/toastr';
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
                    <div className="col-sm-8 col-md-7 col-lg-6 mx-auto ">
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
                                            id="floatingInputNome"
                                            placeholder="Nome Completo"
                                        />
                                        <label className="">Nome completo<span className="asterisco-vermelho">*</span></label>
                                    </div>
                                    {/*campo cpf*/}
                                    <div className="form-floating mb-3">
                                        <input
                                            {...register("cpf", {required: "O cpf é obrigatório"})}
                                            type="number"
                                            className="form-control"
                                            id="floatingInputCpf"
                                            placeholder="CPF"
                                        />
                                        <label className="floatingInput">Cadastro Pessoa Física<span className="asterisco-vermelho">*</span></label>
                                    </div>
                                    {/*campo nome de usuario*/}
                                    <div className="form-floating mb-3">
                                        <input
                                            {...register("nomeUsuario", {required: "O nome de usuario é obrigatório"})}
                                            type="r"
                                            className="form-control"
                                            id="floatingInputUsuario"
                                            placeholder="Nome de usuario"
                                        />
                                        <label className="floatingInput">Nome de usuario<span className="asterisco-vermelho">*</span></label>
                                    </div>
                                    <hr className="my-4"></hr>
                                    {/*campo email*/}
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <div className="form-floating">
                                                <input
                                                    {...register("email", {required: "O email é obrigatório"})}
                                                    type="email"
                                                    className="form-control"
                                                    id="floatingInputEmail"
                                                    placeholder="Digite o email"
                                                />
                                                <label className="floatingInput">Digite o email<span className="asterisco-vermelho">*</span></label>
                                            </div>
                                        </div>
                                        {/*campo confirmar email*/}
                                        <div className="col-md-6 mb-3">
                                            <div className="form-floating mb-3">
                                                <input
                                                    {...register("emailConfirmacao", {required: "Confirmação de email é obrigatório"})}
                                                    type="email"
                                                    className="form-control"
                                                    id="floatingInputConfirmacaoEmail"
                                                    placeholder="Confirmar email"
                                                />
                                                <label className="floatingInput">Confirmar email<span className="asterisco-vermelho">*</span></label>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="my-4"></hr>
                                    {/*campo senha*/}
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <div className="form-floating">
                                                <input
                                                    {...register("senha", {required: "A senha é obrigatória"})}
                                                    type="password"
                                                    className="form-control"
                                                    id="floatingInputSenha"
                                                    placeholder="Digite a senha"
                                                />
                                                <label className="floatingInput">Digite a senha<span className="asterisco-vermelho">*</span></label>
                                            </div>
                                        </div>
                                        {/*campo confirmar senha*/}
                                        <div className="col-md-6 mb-3">
                                            <div className="form-floating mb-3">
                                                <input
                                                    {...register("senhaConfirmacao", {required: "Confirmação de senha é obrigatório"})}
                                                    type="password"
                                                    className="form-control"
                                                    id="floatingInputConfirmacaoSenha"
                                                    placeholder="Confirmar a senha"
                                                />
                                                <label className="floatingInput">Confirmar a senha<span className="asterisco-vermelho">*</span></label>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="my-4"></hr>
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






