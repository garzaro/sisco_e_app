import React, { useEffect } from 'react';
import {useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import Layout from "../../components/layout/layout";
import {handleCpfChange} from "../../components/utils/utils";
import {carregarDadosFormulario, salvarDadosFormulario} from "../../components/utils/storageUtils";

function Register () {
    const { register, handleSubmit, setValue, watch, formState: { errors }} = useForm({
        defaultValues: {
            nome: '', cpf: '', usuario: '', email: '',
        }
    });

    const navigate = useNavigate();

    /**
     * ao montar o componente recupera se houver dados salvo
     * fazendo uso de localstorage em dadosSalvos
     * */
    useEffect(() => {
        const dadosSalvos = carregarDadosFormulario();
        if(dadosSalvos){
            Object.entries(dadosSalvos).forEach(([key, value]) => {
                setValue(key, value);
            });
        }
    }, [setValue]);

    /**
     * os dados do formulario serão salvos no localstorage
     * e recuperados na tela de definicao de senha
     * */
    const handleAvancar = (data) => {
        console.log("   VERIFICAR O ESTADO QUE VAI SER RECUPERADO ", data);
        salvarDadosFormulario(data);
        navigate('/definirsenha', {state: data});
    }
    /*comparacao de email*/
    const confirmarEmail = watch('email');
    const handleCpfMask = (e) => {
        const mascaraCpf = handleCpfChange(e.target.value);
        setValue('cpf', mascaraCpf);
    }
    return (
        <Layout>
        <div className="row">
                <div className="col-sm-8 col-md-7 col-lg-6 mx-auto ">
                    <div className="card border-0 bg-black text-secondary shadow rounded-3 my-1">
                        <div className="card-body p-4 p-sm-5">
                            <h3 className="card-title text-center mb-1 fw-light fs-6">Criar nova conta</h3>
                            <form onSubmit={handleSubmit(handleAvancar)}>
                                {/*campo nome completo*/}
                                <div className="form-floating mb-2">
                                    <input
                                        {...register("nome", {required: "O nome completo é obrigatório"},)}
                                        type="text"
                                        className="form-control"
                                        id="floatingInputNome"
                                        placeholder="Nome Completo"
                                    />
                                    <label className="floatingInput">Nome completo<span className="asterisco-vermelho">*</span></label>
                                    {errors.nome && <span className="error">{errors.nome.message}</span>}
                                </div>
                                {/*campo cpf*/}
                                <div className="form-floating mb-2">
                                    <input
                                        type="text"
                                        className={`form-control ${errors.cpf ? 'is-invalid' : ''}`}
                                        placeholder="000.000.000-00"
                                        id="floatingInputCpf"
                                        {...register("cpf", {required: "O CPF é obrigatório",
                                            onChange: (e)=> {handleCpfMask(e);} /* ✅ */
                                        })}
                                    />
                                    <label className="floatingInputCpf">
                                        Cadastro Pessoa Física<span className="asterisco-vermelho">*</span>
                                    </label>
                                    {errors.cpf && ( <span className="error">{errors.cpf.message}</span>
                                    )}
                                </div>
                                {/*campo nome de usuario*/}
                                <div className="form-floating">
                                    <input
                                        {...register("usuario", {required: "O nome de usuario é obrigatório"})}
                                        type="text"
                                        className="form-control"
                                        id="floatingInputUsuario"
                                        placeholder="Nome de usuario"
                                    />
                                    <label className="floatingInput">
                                        Nome de usuario<span className="asterisco-vermelho">*</span></label>
                                    {errors.usuario && <span className="error">{errors.usuario.message}</span>}
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
                                            <label className="floatingInput">
                                                Digite o email<span className="asterisco-vermelho">*</span></label>
                                            {errors.email && <span className="error">{errors.email.message}</span>}
                                        </div>
                                    </div>
                                    {/*campo confirmar email*/}
                                    <div className="col-md-6 mb-1">
                                        <div className="form-floating ">
                                            <input
                                                {...register("emailConfirmacao",
                                                {validate: (value) => value === confirmarEmail || "Os emails não conferem"})}
                                                type="email"
                                                className="form-control"
                                                id="floatingInputConfirmacaoEmail"
                                                placeholder="Confirmar email"
                                            />
                                            <label className="floatingInput">
                                                Confirmar email<span className="asterisco-vermelho">*</span></label>
                                            {errors.emailConfirmacao && <span className="error">{errors.emailConfirmacao.message}</span>}
                                        </div>
                                    </div>
                                </div>
                                <hr className="my-4"></hr>
                                {/*botão*/}
                                <div className="d-grid">
                                    <button
                                        className="btn btn-primary btn-login text-uppercase fw-bold"
                                        type="submit">
                                        Avançar
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
        </Layout>
    );
};
export default Register;






/**
 * /*ao montar o componente recupera se houver dados salvo*
*
useEffect(() => {
*
    const dadosSalvos = carregarDadosFormulario();
*
    if (dadosSalvos) {
    *
        Object.entries(JSON.parse(dadosSalvos)).forEach(([key, value]) => {
        *
            setValue(key, value);
        *
        });
    *
    }
*
}, [setValue]);
 * */