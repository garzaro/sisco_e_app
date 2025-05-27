import React from 'react';
import {useForm} from "react-hook-form";
import UsuarioService from "../app/service/usuarioService";
import {Link, useNavigate} from "react-router-dom";
import Layout from "../components/layout/layout";
import {handleCpfChange, validateTrim, validarTrim} from "../utils/utils";
import Swal from "sweetalert2";


function Register () {
    const { register, handleSubmit, setValue, watch, formState: { errors }} = useForm({
        defaultValues: {
            nome: '', cpf: '', usuario: '', email: '', senha: '',
            emailConfirmacao: '', senhaConfirmacao: ''
        }
    });
    const navigate = useNavigate();
    const usuarioService = UsuarioService();

    const cadastrarUsuario = (data) => {
        const usuario = {
            nome: data.nome, cpf: data.cpf, usuario: data.usuario,
            email: data.email, senha: data.senha,
        }
        usuarioService.salvar(usuario)
        .then(function (response) {
            Swal.fire({
                title: 'Cadastro realizado com sucesso!',
                text: 'Agora você pode fazer login.',
                icon: 'success',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading()
                    Swal.getHtmlContainer().querySelector('.swal2-progress-bar')
                    const barraDeProgresso = Swal.getHtmlContainer().querySelector('.swal2-progress-bar')
                    if (barraDeProgresso){
                        barraDeProgresso.style.backgroundColor = '#3498db'
                    }
                }
            })
            /*fallback*/
            navigate("/login");
        }).catch((err) => {
            const erroCadastro = err.response?.data;
            Swal.fire({
                icon: 'error',
                title: '<span style="color: rgba(65,38,44,0.49);">Erro ao cadastrar</span>',
                html: `<div style="text-align: center; color: #f11c05">${erroCadastro}</div>`,
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                footer: '<a href>Reportar erro</a>',
                didOpen: () => {
                    Swal.showLoading()
                    Swal.getHtmlContainer().querySelector('.swal2-progress-bar')
                }
            })
        });
    }
    /*comparacao de senha*/
    const confirmarSenha = watch('senha');
    /*comparacao de email*/
    const confirmarEmail = watch('email');
    const handleCpfMask = (e) => {
        const mascaraCpf = handleCpfChange(e.target.value);
        setValue('cpf', mascaraCpf);
    }
    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="col-sm-8 col-md-7 col-lg-6 mx-auto ">
                        <div className="card border-0 bg-black text-secondary shadow rounded-3 my-1">
                            <div className="card-body p-4 p-sm-5">
                                <h3 className="card-title text-center mb-1 fw-light fs-6">Criar nova conta</h3>
                                <form onSubmit={handleSubmit(cadastrarUsuario)}>
                                    {/*campo nome completo*/}
                                    <div className="form-floating mb-2">
                                        <input
                                            {...register("nome", {required: "O nome completo é obrigatório",
                                            setValueAs: (value) => value.trim(),
                                            })}
                                            type="text"
                                            className="form-control"
                                            id="floatingInputNome"
                                            placeholder="Nome Completo"
                                            onChange={(e) => e.target.value = e.target.value.toUpperCase().trimStart()}
                                        />
                                        <label className="floatingInput">Nome completo<span className="asterisco-vermelho">*</span></label>
                                        {errors.nome && <span className="error">{errors.nome.message}</span>}
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
                                            {...register("usuario", {required: "O nome de usuario é obrigatório",
                                            setValueAs: (value) => value.trim(),
                                            })}
                                            type="text"
                                            className="form-control"
                                            id="floatingInputUsuario"
                                            placeholder="Nome de usuario"
                                            onChange={(e) => e.target.value = e.target.value.toUpperCase().trimStart()}
                                        />
                                        <label className="floatingInput">
                                            Nome de usuario<span className="asterisco-vermelho">*</span>
                                        </label>
                                        {errors.usuario && <span className="error">{errors.usuario.message}</span>}
                                    </div>
                                    <hr className="my-4"></hr>
                                    {/*campo email*/}
                                    <div className="row">
                                        <div className="col-md-6 mb-1">
                                            <div className="form-floating">
                                                <input
                                                    {...register("email", {required: "O email é obrigatório",
                                                    setValueAs: (value) => value.trim(),
                                                    validate: validarTrim
                                                    })}
                                                    type="email"
                                                    className="form-control"
                                                    id="floatingInputEmail"
                                                    placeholder="Digite o email"
                                                    onChange={(e) => e.target.value = e.target.value.trimStart().trimEnd()}
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
                                                    onChange={(e) => e.target.value = e.target.value.trimStart()}
                                                />
                                                <label className="floatingInput">
                                                    Confirmar email<span className="asterisco-vermelho">*</span></label>
                                                {errors.emailConfirmacao && <span className="error">{errors.emailConfirmacao.message}</span>}
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="my-4"></hr>
                                    {/*campo senha*/}
                                    <div className="row">
                                        <div className="col-md-6 mb-2">
                                            <div className="form-floating">
                                                <input
                                                    {...register("senha", {required: "A senha é obrigatória",
                                                    minLength:{value: 6, message: "A senha deve ter no minimo 6 caracteres"},
                                                    setValueAs: (value) => value.trim(),
                                                    validate: validateTrim})}
                                                    type="password"
                                                    className="form-control"
                                                    id="floatingInputSenha"
                                                    placeholder="Digite a senha"
                                                />
                                                <label className="floatingInput">
                                                    Digite a senha<span className="asterisco-vermelho">*</span></label>
                                                {errors.senha && <span className="error">{errors.senha.message}</span>}
                                            </div>
                                        </div>
                                        {/*campo confirmar senha*/}
                                        <div className="col-md-6 mb-1">
                                            <div className="form-floating">
                                                <input
                                                    {...register("senhaConfirmacao",
                                                    {validate: (value) => value === confirmarSenha || "As senhas nao conferem"})}
                                                    type="password"
                                                    className="form-control"
                                                    id="floatingInputConfirmacaoSenha"
                                                    placeholder="Confirmar a senha"
                                                />
                                                <label className="floatingInput">
                                                    Confirmar a senha<span className="asterisco-vermelho">*</span></label>
                                                {errors.senhaConfirmacao && <span className="error">{errors.senhaConfirmacao.message}</span>}
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="my-4"></hr>
                                    {/*botão*/}
                                    <div className="d-grid">
                                        <button
                                            className="btn btn-primary btn-login text-uppercase fw-bold"
                                            onClick={handleSubmit(cadastrarUsuario)}>
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






