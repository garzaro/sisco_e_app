import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import Layout from "../../components/form/layout";
import {handleCpfChange} from "../../components/utils/utils";

/**
 * To-do
 * [] Service de usuario - persistencia
 * [x] Validar confirmação de email
 * [] Input confirmacao de email nao aceitar colagem
 * [] Mostrar senha - visualizacao
 * [] Mostrar senha - confirmação - visualizacao
 * [x] Navegacao entre pages
 * [x] Alerts - mensagem de erro no inputs
 * [x] Recuperacao de dados na tela de senha
 *
 * **/

function Register () {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState:
            { errors }} =
        useForm({
        defaultValues: {
            nome: '',
            cpf: '',
            usuario: '',
            email: '',
            senha: '',
            confirmarEmail: '',
            confirmarSenha: '',
        }
    });
    const [senha, setSenha] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [isValid, setValid] = useState(true);
    const navigate = useNavigate();


    const handleAvancar = (data) => {
        console.log("Dados recuperados", data);
        navigate('/definirsenha', {state: data});
    }

    /**
     * existe coisa melhor mas fiz assim a mascara do cpf
     * */
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
                            <h3 className="text-center fw-light fs-6">
                              Criar nova conta
                            </h3>
                            <form onSubmit={handleSubmit(handleAvancar)}>
                            {/*
                            campo nome completo
                            */}
                            <div className="form-floating mb-2">
                                <input
                                    {...register("nome", {required: "O nome completo é obrigatório"},)}
                                    type="text"
                                    className="form-control"
                                    id="floatingInputNome"
                                    placeholder="Nome Completo"
                                />
                                <label className="floatingInput">
                                    Nome completo
                                    <span className="asterisco-vermelho">
                                        *
                                    </span>
                                </label>
                                {errors.nome && <span className="error">{errors.nome.message}</span>}
                            </div>
                            {/*
                            campo cpf
                            */}
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
                                    Cadastro Pessoa Física
                                    <span className="asterisco-vermelho">
                                        *
                                    </span>
                                </label>
                                {errors.cpf && <span className="error">{errors.cpf.message}</span>}
                            </div>
                            {/*
                            campo nome de usuario
                            */}
                            <div className="form-floating">
                                <input
                                    {...register("usuario", {required: "O nome de usuario é obrigatório"})}
                                    type="text"
                                    className="form-control"
                                    id="floatingInputUsuario"
                                    placeholder="Nome de usuario"
                                />
                                <label className="floatingInput">
                                    Nome de usuario
                                    <span className="asterisco-vermelho">
                                        *
                                    </span>
                                </label>
                                {errors.usuario && <span className="error">{errors.usuario.message}</span>}
                            </div>

                            <hr className="my-4"></hr>
                            {/*
                            campo email
                            */}
                            <div className="form-floating mb-2">
                                <input
                                    {...register("email", {required: "O email é obrigatório"})}
                                    type="email"
                                    className="form-control"
                                    id="floatingInputEmail"
                                    placeholder="Digite o email"
                                />
                                <label className="floatingInput">
                                    Digite o email
                                    <span className="asterisco-vermelho">
                                        *
                                    </span>
                                </label>
                                {errors.email && <span className="error">{errors.email.message}</span>}
                            </div>
                            {/*
                            campo confirmar email
                            */}
                            <div className="form-floating">
                                <input
                                    {...register("emailConfirmacao", {
                                        required: "A confirmação do email é obrigatória",
                                        validate: (value) =>
                                        value === watch("email") || "Os emails não conferem"
                                })}
                                    type="email"
                                    className="form-control"
                                    id="floatingInputConfirmacaoEmail"
                                    placeholder="Confirmar email"
                                />
                                <label className="floatingInput">
                                    Confirmar email
                                    <span className="asterisco-vermelho">
                                        *
                                    </span>
                                </label>
                                {errors.emailConfirmacao && <span className="error">{errors.emailConfirmacao.message}</span>}
                            </div>

                            {/*
                            botão
                            */}
                            <div className="d-grid mt-4">
                                <button
                                    className="btn btn-primary btn-login text-uppercase fw-bold"
                                    type="submit">
                                    Avançar
                                </button>
                            </div>

                            <hr className="my-4"></hr>

                            {/*
                            Botão de Login
                            */}
                            <div className="d-grid">
                                <Link className="btn btn-outline-primary btn-login text-uppercase"
                                      to="/login">
                                    Log in
                                </Link>
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