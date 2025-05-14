import React, {useState} from 'react';
import Card from '../components/card/card';
import FormGroup from "../components/form/form-group";
import Astered from "../css/astered";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";

function Register () {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, watch, getValues } = useForm({
        nome: '', cpf: '', usuario: '', email: '', emailNovamente:'',
    });

    const validarEmailRepetido = (valor) => {
        const { email } = getValues();
        return valor === email;
    }

    const validarPadraoCpf = (cpf) => {
        const cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
        return cpfRegex.test(cpf) || 'CPF inválido (use o formato 00.000.000-00)';
    }
    /*avançar levando os dados do campo modificado*/
    const handleAvancar = (data) => {
        console.log('Dados do usuario antes de ser enviado para tela de senha', data);
        sessionStorage.setItem('dadosDoUsuario', JSON.stringify(data));
        navigate('/definirsenha' , { state: { dadosDoUsuario: data } });

    }
    /*volat para tela de login*/
    function handleCancelar() {
        navigate('/Login');
    }

    return (
        <div className="container-fluid mt-5 style={{minHeight: '0vh', display: 'flex', alignItems: 'center'">
            <div className="row justify-content-center w-100">
                <div className="col-md-6" style={{marginTop: '-30px'}}> {/*style={{ marginTop: '-120px' }}*/}
                    <div className="bs-docs-section">
                        <Card title="Cadastro">
                            <div className="row justify-content-center align-items-center">
                                <div className="col-md-10">
                                    <div className="bs-component">
                                        <form onSubmit={handleSubmit(handleAvancar)}>
                                            <FormGroup label={
                                                <span>
                                                    Nome Completo:<span className="asterisco-vermelho">*</span>
                                                </span>
                                                } name={"email"}>
                                                {/* Campo nome completo */}
                                                <input
                                                    type="text"
                                                    {...register("nomeCompleto", {required: "Nome completo é obrigatório"})}
                                                    className="form-control form-control-sm inputPlaceholder"
                                                    placeholder="Digite seu nome completo"
                                                    id="nomeCompleto"
                                                />
                                                {errors.nomeCompleto &&
                                                    <span className="error">{errors.nomeCompleto.message}</span>}
                                            </FormGroup>
                                            <FormGroup label={
                                                <span>
                                                    CPF:<span className="asterisco-vermelho">*</span>
                                                </span>
                                                } name={"cpf"}>
                                                {/* Campo CPF */}
                                                <input
                                                    type="text"
                                                    {...register("cpf", {required: "CPF é obrigatório"})}
                                                    className="form-control form-control-sm inputPlaceholder"
                                                    placeholder="Digite seu cpf"
                                                    id="cpf"
                                                />
                                                {errors.cpf && <span className="error">{errors.cpf.message}</span>}
                                            </FormGroup>
                                            <FormGroup label={
                                                <span>
                                                    Nome de Usuário:<span className="asterisco-vermelho">*</span>
                                                </span>
                                                } name={"nomeUsuario"}>
                                                {/* Campo nome de usuário */}
                                                <input
                                                    type="text"
                                                    {...register("nomeUsuario", {required: "Nome de usuário é obrigatório"})}
                                                    className="form-control form-control-sm inputPlaceholder"
                                                    placeholder="Digite seu nome de usuario"
                                                    id="nomeUsuario"
                                                />
                                                {errors.nomeUsuario &&
                                                    <span className="error">{errors.nomeUsuario.message}</span>}
                                            </FormGroup>
                                            <FormGroup label={
                                                <span>
                                                    Email:<span className="asterisco-vermelho">*</span>
                                                </span>
                                                } name={"email"}>
                                                {/* Campo E-mail */}
                                                <input
                                                    type="email"
                                                    {...register("email", {required: "E-mail é obrigatório"})}
                                                    className="form-control form-control-sm inputPlaceholder"
                                                    placeholder="Digite seu email"
                                                    id="email"
                                                />
                                                {errors.email && <span className="error">{errors.email.message}</span>}
                                            </FormGroup>
                                            <FormGroup label={
                                                <span>
                                                    Repetir Email:<span className="asterisco-vermelho">*</span>
                                                </span>
                                            }>
                                                {/* Campo E-mail */}
                                                <input
                                                    type="email"
                                                    {...register("confirmarEmail", {required: "Confirmar e-mail é obrigatório"})}
                                                    className="form-control form-control-sm inputPlaceholder"
                                                    placeholder="Digite seu email"
                                                    id="confirmar-email"
                                                />
                                                {errors.confirmarEmail && <span className="error">{errors.confirmarEmail.message}</span>}
                                            </FormGroup>
                                            {/* Botão de Login */}
                                            <button type="submit" className="btn btn-success btn-sm mt-3 ">
                                                Enviar
                                            </button>
                                        </form>
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








