import {useMemo, useState} from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Card from "../components/card/card";
import FormGroup from "../components/form/form-group";
import UsuarioService from "../app/service/usuarioService";
import {toast} from "react-toastify";

const LoginForm = () => {
    const { register, handleSubmit, formState: { errors }} = useForm();
    const [errorLogin, setErrorLogin] = useState(null);
    const navigate = useNavigate();
    const usuarioService = UsuarioService();

    const fazerLogin = (data) => {
        usuarioService.autenticar({
            email: data.email,
            senha: data.senha,
        })
          .then(response => {
              setTimeout(() => navigate("/home"), 2000);
        })
          .catch(erro => {
              setErrorLogin(erro.response?.data || erro.response?.message);
        });
    };

    /*const fazerLogim = async (dadosLogin) => {
        try{
            await axios.post("http://localhost:8080/api/usuarios/autenticar",{
                email: dadosLogin.email,
                senha: dadosLogin.senha,
            });
            setTimeout(() => navigate("/home"), 2000);
        }catch (erro) {
            setErrorLogin(erro.response.data.message || erro.response.message);
        }
    }*/
    toast.error("Erro pra tudo que é canto")
    return (
        <div className="container-fluid mt-5 style={{minHeight: '0vh', display: 'flex', flexDirection: 'column', alignItens:'center'}}>}}" >
            <div className="row justify-content-center w-100" >
                <div className="col-md-6">
                    <div className="bs-docs-section">
                        {/* Erros do Backend */}
                        {errorLogin && <div className=" alert alert-danger">{errorLogin}</div>}
                        <Card title="Login">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="bs-component">
                                        <form onSubmit={handleSubmit(fazerLogin)}>

                                            <FormGroup label={
                                                <span>
                                                    Email:<span className="asterisco-vermelho">*</span>
                                                </span>
                                            } name={"email"}
                                            >
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
                                                    Senha:<span className="asterisco-vermelho">*</span>
                                                </span>
                                            } name={"senha"}
                                            >
                                                {/* Campo Senha */}
                                                <input
                                                    type="password"
                                                    {...register("senha", {required: "Senha é obrigatória"})}
                                                    className="form-control form-control-sm inputPlaceholder"
                                                    placeholder="Digite sua senha"
                                                />
                                                {errors.senha && <span className="error">{errors.senha.message}</span>}
                                            </FormGroup>

                                            {/*esqueceu a senha*/}
                                            <div className="nav-signin-tooltip-footer ">Esqueceu a senha?
                                                <a href="/register"
                                                   className="nav-a"
                                                   aria-label="Esqueceu a senha? Clique aqui para criar uma nova.">&nbsp;
                                                    Clique aqui.</a>
                                            </div>

                                            {/* Botão de Login */}
                                            <button type="submit" className="btn btn-success btn-sm mt-3 ">
                                                Entrar
                                            </button>

                                        </form>
                                    </div>
                                </div>
                            </div>
                        </Card>
                        {/*cadastro*/}
                        <Card title="Seja bem vindo!">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="bs-component">
                                        <div className="card-body">
                                            <div className="m-sm-4">
                                                <h2 className="text-center">Primeiro acesso?</h2>
                                                <p className="text-center mb-3">
                                                    Se ainda não possui acesso forneça seus dados, clique no
                                                    botão abaixo e crie sua conta e obtenha acesso ao Financas Pessoais.</p>
                                                <div className="text-center">
                                                    <a href="/register" className="btn btn-sm btn-warning"
                                                       title="Não tem uma conta? Crie sua conta!">Criar conta</a>
                                                </div>
                                            </div>
                                        </div>
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

export default LoginForm;
