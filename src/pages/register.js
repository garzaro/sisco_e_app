import React, {useState} from 'react';
import {Controller, useForm} from "react-hook-form";
import InputMask from "react-input-mask-next";
import Card from "../components/card/card";
import FormGroup from "../components/form/form-group";
import UsuarioService from "../app/service/usuarioService";
import {mensagemDeErro, mensagemDeErroCadastro, mensagemDeSucesso} from '../components/utils/toastr';
import Astered from "../css/astered";
import {Link, useNavigate} from "react-router-dom";
import Layout from "../components/layout/layout";
import FormLayout from "../components/form/form-layout";
import axios from "axios";

function Register () {
    const [senhaConfirmacao, setSenhaConfirmacao] = useState('');
    const { control, register, handleSubmit, setValue, watch, formState: { errors }} = useForm({
        mode: 'onChange',
        defaultValues:{
            nomeCompleto: '',
            cadastroPessoaFisica: '',
            nomeUsuario: '',
            email: '',
            emailConfirmacao: '',
            senha: '',
            senhaConfirmacao: ''
        }
    });
    /*comparacao de senha*/
    const senha = watch('senha');
    /*comparacao de email*/
    const email = watch('email');
    const navigate = useNavigate();
    const usuarioService = UsuarioService();

    const cadastrarUsuario = (data) => {
        const dadosUsuario = {
            nomeCompleto: data.nomeCompleto,
            cadastroPessoaFisica: data.cadastroPessoaFisica,
            nomeUsuario: data.nomeUsuario,
            email: data.email,
            senha: data.senha,
        };
        usuarioService.salvar(dadosUsuario)
        .then((response) => {
            /*fallback*/
            mensagemDeSucesso('Usuário cadastrado com sucesso! Agora você pode fazer login.');
            setTimeout(() => navigate("/login"), 2000);
        }).catch((err) => {
            const msg = err.response?.data || "Erro inesperado ao cadastrar usuário";
            mensagemDeErroCadastro(msg);
        });
    }
    const handleCpfChange = (e) => {
        /*remove os pontos na base de dados*/
        let value = e.target.value.replace(/\D/g, '');
        /*11 digitos*/
        value = value.slice(0, 11);
        /*primeiro ponto*/
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        /*segundo ponto*/
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        /*hifen*/
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        /*define o valor no useForm*/
        setValue('cadastroPessoaFisica', value);
        console.log('mudou', e.target.value)
    };
    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="col-sm-8 col-md-7 col-lg-6 mx-auto ">
                        <div className="card border-0 shadow rounded-3 my-1">
                            <div className="card-body p-4 p-sm-5">
                                <h3 className="card-title text-center mb-1 fw-light fs-6">Criar nova conta</h3>
                                <form onSubmit={handleSubmit(cadastrarUsuario)}>
                                    {/*campo nome completo*/}
                                    <div className="form-floating mb-2">
                                        <input
                                            {...register("nomeCompleto", {required: "O nome completo é obrigatório"})}
                                            type="text"
                                            className="form-control"
                                            id="floatingInputNome"
                                            placeholder="Nome Completo"
                                        />
                                        <label className="floatingInput">Nome completo<span className="asterisco-vermelho">*</span></label>
                                        {errors.nomeCompleto && <span className="error">{errors.nomeCompleto.message}</span>}
                                    </div>
                                    {/*campo cpf*
                                    <div className="form-floating mb-2">
                                        <Controller
                                            name="cadastroPessoaFisica"
                                            control={control}
                                            rules={{ required: "O CPF é obrigatório" }}
                                            render={({ field }) => (
                                            <InputMask
                                                mask="999.999.999-99"
                                                value={field.value || ""}
                                                onChange={field.onChange}
                                                onBlur={field.onBlur}
                                                disabled={field.disabled}
                                                as="input"
                                                type="text"
                                                className={`form-control ${errors.cadastroPessoaFisica ? "is-invalid" : ""}`}
                                                id="floatingInputCpf"
                                                placeholder="000.000.000-00"
                                            />
                                        )}
                                        />
                                        <label className="floatingInput">Cadastro Pessoa Física<span className="asterisco-vermelho">*</span></label>
                                        {errors.cadastroPessoaFisica && (<span className="error">{errors.cadastroPessoaFisica.message}</span>)}
                                    </div>*/}

                                    {/*campo cpf*/}
                                    <div className="form-floating mb-2">
                                        <input
                                            type="text"
                                            className={`form-control ${errors.cadastroPessoaFisica ? 'is-invalid' : ''}`}
                                            placeholder="000.000.000-00"
                                            id="floatingInputCpf"
                                            {...register("cadastroPessoaFisica", {
                                                required: "O CPF é obrigatório",
                                                onChange: handleCpfChange, /* ✅ */
                                            })}
                                        />
                                        <label htmlFor="floatingInputCpf">Cadastro Pessoa Física<span className="asterisco-vermelho">*</span></label>
                                        {errors.cadastroPessoaFisica && (
                                            <span className="error">{errors.cadastroPessoaFisica.message}</span>
                                        )}
                                    </div>

                                    {/*campo nome de usuario*/}
                                    <div className="form-floating">
                                        <input
                                            {...register("nomeUsuario", {required: "O nome de usuario é obrigatório"})}
                                            type="r"
                                            className="form-control"
                                            id="floatingInputUsuario"
                                            placeholder="Nome de usuario"
                                        />
                                        <label className="floatingInput">Nome de usuario<span className="asterisco-vermelho">*</span></label>
                                        {errors.nomeUsuario && <span className="error">{errors.nomeUsuario.message}</span>}
                                    </div>
                                    <hr className="my-4"></hr>
                                    {/*campo email*/}
                                    <div className="row">
                                        <div className="col-md-6 mb-1">
                                            <div className="form-floating">
                                                <input
                                                    {...register("email", {required: "O email é obrigatório"})}
                                                    type="email"
                                                    className="form-control"
                                                    id="floatingInputEmail"
                                                    placeholder="Digite o email"
                                                />
                                                <label className="floatingInput">Digite o email<span className="asterisco-vermelho">*</span></label>
                                                {errors.nomeUsuario && <span className="error">{errors.nomeUsuario.message}</span>}
                                            </div>
                                        </div>
                                        {/*campo confirmar email*/}
                                        <div className="col-md-6 mb-1">
                                            <div className="form-floating ">
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
                                        <div className="col-md-6 mb-2">
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
                                        <div className="col-md-6 mb-1">
                                            <div className="form-floating">
                                                <input
                                                    {...register("senhaConfirmacao",
                                                    {validate: value => value === senha || "As senhas nao conferem"})}
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
                                            className="btn btn-primary btn-login text-uppercase fw-bold">
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






