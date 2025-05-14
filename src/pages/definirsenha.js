import {useState} from "react";
import {useForm} from "react-hook-form";
import {Link, useLocation, useNavigate} from "react-router-dom";
import Card from "../components/card/card";
import FormGroup from "../components/form/form-group";
import ServiceUsuario from "../app/service/usuarioService";
import {mensagemDeErro, mensagemDeSucesso} from '../components/utils/toastr'
import usuarioService from "../app/service/usuarioService";
/*definir a senha e finalizar o cadastro*/
function Definirsenha () {
    const { register, handleSubmit, formState: {errors}, watch, getValues} = useForm({
        mode: 'onChange',
        defaultValues:{
            senha: '',
            confirmacaoSenha: ''
        }
    });
    const navigate = useNavigate();
    const usuarioService = ServiceUsuario();

    const concluirCadastro = (data) => {
        const dadosRecuperadosDoUsuario = (sessionStorage.getItem('dadosDoUsuario'));
        const dadoDoUsuario = JSON.parse(dadosRecuperadosDoUsuario);
        const dadosCompleto =  {
            ...dadoDoUsuario,
            senha: data.senha
            // ...data
        }
        usuarioService.cadastrar({
            dadosCompleto,
        }).then(response => {
            sessionStorage.removeItem('dadosDoUsuario');
            mensagemDeSucesso('Cadastro realizado com sucesso!');
            navigate('/login');
        }).catch(err => {
            mensagemDeErro(err.response?.data);
        });

        // Validador customizado para a senha
        const validarSenha = (value) => {
            const regexSenha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            return regexSenha.test(value) ||
                'A senha deve ter 8+ caracteres, incluindo maiúsculas, minúsculas, números e especiais';
        };

    };
    function handleCancelar() {
        navigate('/login');
    }

    return (
        <div className="container-fluid mt-5 style={{minHeight: '0vh', display: 'flex', alignItems: 'center'">
            <div className="row justify-content-center w-100">
                <div className="col-md-6" style={{marginTop: '-30px'}}> {/*style={{ marginTop: '-120px' }}*/}
                    <div className="bs-docs-section">
                        <Card title="Definir a senha">
                            <div className="row justify-content-center align-items-center">
                                <div className="col-md-10">
                                    <div className="bs-component">
                                        <form onSubmit={handleSubmit(concluirCadastro)}>
                                            <fieldset className="fieldset-sm">
                                                <FormGroup label={
                                                    <span>
                                                        Senha:<span className="asterisco-vermelho">*</span>
                                                    </span>
                                                } name={"senha"}
                                                >
                                                    {/* Campo senha */}
                                                    <input
                                                        type="password"
                                                        {...register("senha", {required: "Digite sua senha"})}
                                                        className="form-control form-control-sm inputPlaceholder"
                                                        placeholder="Digite a senha"
                                                        id="senha-id"
                                                    />
                                                    {errors.senha &&
                                                        <span className="error">{errors.senha.message}</span>}
                                                </FormGroup>
                                                <FormGroup label={
                                                    <span>
                                                        Confirme sua senha:<span className="asterisco-vermelho">*</span>
                                                    </span>
                                                } name={"confirmarsenha"}
                                                >
                                                    {/* Campo repetir senha */}
                                                    <input
                                                        type="password"
                                                        {...register("confirmarsenha", {required: "Confirme sua senha",
                                                        validar: value =>
                                                            value === watch('senha') || 'As senhas não conferem'
                                                        })}
                                                        onChange={(e) => {
                                                            const { confirmarsenha } = getValues();
                                                            if (confirmarsenha !== e.target.value) {
                                                                errors.confirmarsenha = {
                                                                    message: 'As senhas não conferem',
                                                                };
                                                            } else {
                                                                errors.confirmarsenha = undefined;
                                                            }
                                                        }}
                                                        className="form-control form-control-sm inputPlaceholder"
                                                        placeholder="repetir sua senha"
                                                        id="senhaconfirmacao-id"
                                                    />
                                                    {errors.confirmarsenha &&
                                                        <span className="error">{errors.confirmarsenha.message}</span>}
                                                </FormGroup>

                                                {/* Botão de Login */}
                                                <button type="submit"
                                                        className="btn btn-success btn-sm mt-3 text-uppercase fw-bold">
                                                    Cadastrar
                                                </button>
                                                {/* Botão de Login */}
                                                <button
                                                    type="submit" className="btn btn-success btn-sm mt-3 text-uppercase fw-bold"
                                                    onClick={handleCancelar}>Cancelar
                                                </button>
                                            </fieldset>
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
}
export default Definirsenha;