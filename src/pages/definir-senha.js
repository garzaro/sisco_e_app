import {useState} from "react";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Card from "../components/card/card";
import FormGroup from "../components/form/form-group";

const DefinirSenha = () => {
    const [email, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm();
    const [backendError, setBackendError] = useState(null);
    const [isServerOffline, setIsServerOffline] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const fazerLogin = async (data) => {
        setIsLoading(true);
        setBackendError(null);
        setIsServerOffline(false);

        try {
            await axios.post("http://localhost:8000/api/autenticar", {
                email: data.email,
                senha: data.senha,
            });
            setTimeout(() => navigate("/home"), 2000);
        } catch (err) {
            if (err.response) {
                /*email e senha incorretos*/
                setBackendError(err.response.data.message || err.response.data);
            } else {
                setIsServerOffline(true);
                navigate("/erro-conexao");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6" style={{marginTop: '-30px'}}> {/*style={{ marginTop: '-120px' }}*/}
                    <div className="bs-docs-section">
                        {/*erro do backend*/}
                        {backendError && <div className="alert alert-danger">{backendError}</div>}
                        <Card title="Login">
                            <div className="row justify-content-center align-items-center">
                                <div className="col-md-10">
                                    <div className="bs-component">
                                        <form onSubmit={handleSubmit(fazerLogin)}>
                                            <fieldset className="fieldset-sm">
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
                                                    {errors.email &&
                                                        <span className="error">{errors.email.message}</span>}
                                                </FormGroup>
                                                <FormGroup label={
                                                    <span>
                                                        Senha:<span className="asterisco-vermelho">*</span>
                                                    </span>
                                                } name={"senha"}
                                                >
                                                    {/* Campo E-mail */}
                                                    <input
                                                        type="password"
                                                        {...register("senha", {required: "A senha é obrigatório"})}
                                                        className="form-control form-control-sm inputPlaceholder"
                                                        placeholder="Digite sua senha"
                                                        id="senha"
                                                    />
                                                    {errors.email &&
                                                        <span className="error">{errors.senha.message}</span>}
                                                </FormGroup>

                                                {/* Botão de Login */}
                                                <button type="submit" disabled={isLoading}
                                                        className="btn btn-success btn-sm mt-3 ">
                                                    {isLoading ? "Carregando..." : "Enviar"}
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
export default DefinirSenha;