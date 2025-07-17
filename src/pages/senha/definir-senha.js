import {useState} from "react";
import {useForm} from "react-hook-form";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {mensagemDeErroCadastro} from '../../components/utils/toastr'
import Layout from "../../components/layout/layout";
import UsuarioService from "../../app/service/usuario-service";
import Swal from "sweetalert2";
import AlterarVisualizarSenha from "../../components/utils/visualizarSenhaUtils";
import {validacaoSenhaTrim} from "../../components/utils/utils";
import ReactPasswordChecklist from "react-password-checklist";

/*definir a senha e finalizar o cadastro*/
const DefinirSenha = () => {

    const [mostrarSenhaTexto, setMostrarSenhaTexto] = useState(false);
    const [confirmarMostrarSenhaTexto, setConfirmarMostrarSenhaTexto] = useState(false);
    const [isValid, setIsValid] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const usuarioService = UsuarioService();

    const { register, handleSubmit, watch, formState: { errors }} = useForm({
        defaultValues: {
            senha: '', confirmarSenha: '',
        }});
    const dadosUsuario = location.state || {};

    const cadastrarUsuario = (data) => {
        if (data.senha === data.senhaConfirmacao) {
            mensagemDeErroCadastro("As senhas não coincidem!");
            return;
        }

        const usuario = { ...dadosUsuario, senha: data.senha };

        usuarioService.salvar(usuario)
            .then(() => {
                console.log("VERIFICAR SE A SENHA ESTÁ SENDO MOSTRADA AQUI", usuario);
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

    const confirmarSenha = watch('senha');
    const visualizarSenha = () =>
    { setMostrarSenhaTexto(!mostrarSenhaTexto);}

    const confirmarVisualizarSenha = () =>
    { setConfirmarMostrarSenhaTexto(!confirmarMostrarSenhaTexto)}

    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="col-sm-8 col-md-7 col-lg-6 mx-auto ">
                        <div className="card border-0 bg-black text-secondary shadow rounded-3 my-1">
                            <div className="card-body p-4 p-sm-5">
                                <h3 className="card-title text-center mb-1 fw-light fs-3">Escola uma senha</h3>
                                <h6 className="text-center mb-5 fs-6">(Evite senhas como: nome próprio, data de aniversário, sequência numérica)</h6>
                                <form onSubmit={handleSubmit(cadastrarUsuario)}>
                                    {/*campo senha*/}
                                    <div className="row">
                                        <div className="col-md-6 mb-2">
                                            <div className="form-floating">
                                                <input
                                                    type={ mostrarSenhaTexto ? "text" : "password"}
                                                    {...register("senha", {
                                                        required: "A senha é obrigatória",
                                                        minLength: {
                                                            value: 6,
                                                            message: "A senha deve er no mínimo 6 caracteres"
                                                        },
                                                        validate: validacaoSenhaTrim,
                                                    })}
                                                    className="form-control"
                                                    id="floatingInputSenha"
                                                    placeholder="Digite a senha"
                                                />
                                                <label className="floatingInput">
                                                    Digite a senha <span className="asterisco-vermelho">*</span>
                                                </label>
                                                <AlterarVisualizarSenha
                                                senhaTexto={mostrarSenhaTexto}
                                                onClick={visualizarSenha}
                                                />
                                                {errors.senha && <span className="error">{errors.senha.message}</span>}
                                            </div>
                                        </div>
                                        {/*campo confirmar senha*/}
                                        <div className="col-md-6 mb-1">
                                            <div className="form-floating">
                                                <input
                                                    type={confirmarMostrarSenhaTexto ? "text" : "password"}
                                                    {...register("confirmarSenha", {required: "Confirmar a senha",

                                                        validate: (value) =>
                                                            value === confirmarSenha || "As senhas nao conferem"})}
                                                    className="form-control"
                                                    id="floatingInputConfirmacaoSenha"
                                                    placeholder="Confirmar a senha"
                                                />
                                                <label className="floatingInput">
                                                    Confirmar a senha <span className="asterisco-vermelho">*</span>
                                                </label>
                                                <AlterarVisualizarSenha
                                                    confirmarSenhaTexto={confirmarMostrarSenhaTexto}
                                                    onClick={confirmarVisualizarSenha}
                                                />
                                                {errors.confirmarSenha && <span className="error">{errors.confirmarSenha.message}</span>}
                                            </div>
                                        </div>
                                        {/*checklist de senha*/}
                                        {(watch("senha")?.length > 0 || watch("confirmarSenha")?.length > 0) && (
                                            <ReactPasswordChecklist
                                                rules={[
                                                    "minLength",
                                                    "specialChar",
                                                    "number",
                                                    "capital",
                                                    "lowercase",
                                                    "noSpaces",
                                                    "match",
                                                ]}
                                                minLength={6}
                                                value={watch("senha")}
                                                valueAgain={watch("confirmarSenha")}
                                                className="password-checklist check-icon cross-icon"
                                                messages={{
                                                    minLength: "A senha deve ter no mínimo 6 caracteres",
                                                    specialChar: "Deve conter caractere especial - !@#$%+",
                                                    number: "Deve conter número",
                                                    capital: "Deve conter letra maiúscula",
                                                    lowercase: "Deve conter letra minúscula",
                                                    noSpaces: "Não deve conter espaços",
                                                    match: "As senhas coincidem",
                                            }}
                                            onChange={(isValid) => setIsValid(isValid)}
                                        />
                                    )}
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

export default DefinirSenha;