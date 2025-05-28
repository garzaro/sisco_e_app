import {useState} from "react";
import {useForm} from "react-hook-form";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {mensagemDeErroCadastro,mensagemDeErro, mensagemDeSucesso} from '../utils/toastr'
import Layout from "../components/layout/layout";
import UsuarioService from "../app/service/usuarioService";
import Swal from "sweetalert2";

/*definir a senha e finalizar o cadastro*/
const Definirsenha = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const usuarioService = UsuarioService();

    const { register, handleSubmit, watch, formState: { errors }} = useForm({
        defaultValues: {senha: '', senhaConfirmacao: ''}});
    const dadosUsuario = location.state || {};

    const cadastrarUsuario = (data) => {
        if (data.senha === data.confirmarSenha) {
            mensagemDeErroCadastro("As senhas não coincidem!");
            return;
        }

        const usuario = { ...dadosUsuario, senha: data.senha };

        usuarioService.salvar(usuario)
            .then(() => {
                localStorage.removeItem('dadosCadastro');
                Swal.fire({
                    icon: 'success',
                    title: 'Cadastro realizado com sucesso!',
                    text: 'Agora você pode fazer login.',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading()
                        Swal.getHtmlContainer().querySelector('.swal2-progress-bar')
                        const barraDeProgresso = Swal.getHtmlContainer().querySelector('.swal2-progress-bar')
                        if (barraDeProgresso){
                            barraDeProgresso.style.backgroundColor = '#3498db'
                        }
                    }
                });
                navigate("/login");
            }).catch((err) => {
            const msg = err.response?.data || "Erro inesperado ao cadastrar usuário";
            Swal.fire({
                icon: 'error',
                title: 'Erro ao finalizar o cadastro',
                html: `<pre style={text-align: left; white-space: pre-wrap}>${msg}</pre>`,
                showConfirmButton: false,
                timer: 5000,
                scrollbarPadding: false,
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
        });
    };

    const confirmarSenha = watch("senha");

    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="col-sm-8 col-md-7 col-lg-6 mx-auto ">
                        <div className="card border-0 bg-black text-secondary shadow rounded-3 my-1">
                            <div className="card-body p-4 p-sm-5">
                                <h3 className="card-title text-center mb-1 fw-light fs-6">Criar nova conta</h3>
                                <form onSubmit={handleSubmit(cadastrarUsuario)}>
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
                                                {errors.confirmarSenha && <span className="error">{errors.confirmarSenha.message}</span>}
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="my-4"></hr>
                                    {/*botão*/}
                                    <div className="d-grid">
                                        <button
                                            className="btn btn-primary btn-login text-uppercase fw-bold"
                                            type="submit">
                                            Finalizar Cadastro
                                        </button>
                                    </div>
                                    <hr className="my-4"></hr>
                                    {/* Botão de voltar para tela de cadastro */}
                                    <div className="d-grid">
                                        <Link className="btn btn-outline-primary btn-login text-uppercase" to="/register">Voltar</Link>
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

export default Definirsenha;