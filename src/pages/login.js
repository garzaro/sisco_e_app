import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import {mensagemDeErro} from '../utils/toastr'
import UsuarioService from "../app/service/usuarioService";
import FormLayout from "../components/form/form-layout";
import Layout from "../components/layout/layout";
import Swal from "sweetalert2";
import SenhaVisibilidadeToggle from "../components/senhaVisibilidadeToggle";
import senhaVisibilidadeToggle from "../components/senhaVisibilidadeToggle";

function LoginForm () {
    const { register, handleSubmit, formState: { errors }} = useForm();
    const navigate = useNavigate();
    const [mostrarSenhaLogin, setMostrarSenhaLogin] = useState(false);
    const usuarioService = UsuarioService();

    const fazerLogin = (data) => {
        usuarioService.autenticar({
            email:data.email,
            senha:data.senha,
        }).then(response => {
            /*fallback*/
            Swal.fire({
                title: 'Login realizado com sucesso!',
                text: 'Agora você pode fazer login.',
                icon: 'success',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading()
                    Swal.getHtmlContainer().querySelector('.swal2-progress-bar')
                    //const barraDeProgresso = Swal.getHtmlContainer().querySelector('.swal2-progress-bar')
                    //barraDeProgresso.style.backgroundColor = '#3498db'
                }
            })
            setTimeout(navigate("/home"), 2000);
        }).catch(err => {
            mensagemDeErro(err.response?.data);
        });
    };
    const toggleVisibilidadeSenha = () => {
       setMostrarSenhaLogin(!mostrarSenhaLogin);
    }

    return (
        <>
            <Layout>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                            <div className="card border-0 bg-black text-secondary shadow rounded-3 my-2">
                                <div className="card-body p-4 p-sm-5">
                                    <h5 className="card-title text-center mb-5 fw-light fs-5">Login</h5>
                                    <form onSubmit={handleSubmit(fazerLogin)}>
                                        {/* Campo E-mail */}
                                        <FormLayout>
                                            <input
                                                {...register("email", {required: "O e-mail é obrigatório"})}
                                                type="email"
                                                className="form-control"
                                                id="floatingInputEmail"
                                                placeholder="Digite o email"
                                            />
                                            <label className="floatingInput">Digite o e-mail <span className="asterisco-vermelho">*</span></label>
                                            {errors.email && <span className="error">{errors.email.message}</span>}
                                        </FormLayout>
                                        {/*campo de senha*/}
                                        <FormLayout>
                                            <input
                                                {...register("senha", {required: "A senha é obrigatória"})}
                                                type={mostrarSenhaLogin ? "text" : "password"}
                                                className="form-control"
                                                id="floatingInputSenha"
                                                placeholder="Digite a senha"
                                            />
                                            <label className="floatingInput">Digite a senha <span className="asterisco-vermelho">*</span></label>
                                            <SenhaVisibilidadeToggle
                                                mostrarSenha={ mostrarSenhaLogin }
                                                onClick={ toggleVisibilidadeSenha }
                                            />
                                            {errors.senha && <span className="error">{errors.senha.message}</span>}
                                        </FormLayout>
                                        {/*esqueceu a senha*/}
                                        <div className="nav-signin-tooltip-footer link-info">Esqueceu a senha?
                                            <a href="/register"
                                               className="nav-a link-info"
                                               aria-label="Esqueceu a senha? Clique aqui para criar uma nova.">&nbsp;
                                                Clique aqui.</a>
                                        </div>
                                        {/* Botão de Login */}
                                        <div className="d-grid">
                                            <button type="submit"
                                                    className="btn btn-primary btn-sm mt-3 text-uppercase fw-bold">
                                                Entrar
                                            </button>
                                        </div>
                                        <hr className="my-4"></hr>
                                        <div className="">
                                            <h5 className="text-center">Primeiro acesso?</h5>
                                            <p className="text-center mb-3">
                                                Se ainda não possui acesso, clique no
                                                botão abaixo, crie sua conta e obtenha acesso ao Sistema de
                                                Consulta Escolar.
                                            </p>
                                            {/* Botão de Login */}
                                            <div className="d-grid">
                                                <Link
                                                    className="btn btn-outline-primary btn-login text-uppercase"
                                                    to="/register">Criar conta
                                                </Link>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
            {/*cadastro*/}
        </>
    );
};
export default LoginForm;