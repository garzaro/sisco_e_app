import React, {useState} from 'react';
import Card from "../card/card";
import FormGroup from "../form/form-group";

function CadastroUsuario() {

    const [nomeCompleto, setNomeCompleto] = useState("");
    const [nomeUsuario, setNomeUsuario] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [repetirSenha, setRepetirSenha] = useState("");
{/*style={{position: 'relative', left: '300px'} style={{margin-top: '-50px'}}*/}
    return (
        <>
            <div className="container" style={{ paddingTop: '50px' }}>
                <div className="row justify-content-center ">
                    <div className="col-md-6">
                        <div className="bs-docs-section">

                            <Card title="Cadastrar Usuário">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="bs-component">
                                            <fieldset >
                                                {/*nome completo*/}
                                                <FormGroup label="Nome Completo: *" htmlFor="inputNomeCompleto">
                                                    <input type="text"

                                                           value={nomeCompleto}
                                                           onChange={(e) => setNomeCompleto(e.target.value)}

                                                           className="form-control" id="inputNomeCompleto"
                                                           aria-describedby="NomeCompletolHelp"
                                                           placeholder="Digite o nome"
                                                           required
                                                    />
                                                </FormGroup>

                                                {/*nome de usuario*/}
                                                <FormGroup label="Nome Usuário: *" htmlFor="inputNomeUsuario">
                                                    <input type="text"

                                                           value={nomeUsuario}
                                                           onChange={(e) => setNomeUsuario(e.target.value)}

                                                           className="form-control" id="inputNomeUsuario"
                                                           aria-describedby="nomeUsuarioHelp"
                                                           placeholder="Digite um nome de usuario"
                                                    />
                                                </FormGroup>

                                                {/*cpf*/}
                                                <FormGroup label="Cadastro de Pessoa Física: *" htmlFor="inputCpf">
                                                    <input type="text"

                                                           value={cpf}
                                                           onChange={(e) => setCpf(e.target.value)}

                                                           className="form-control" id="inputCpf"
                                                           aria-describedby="cpfHelp"
                                                           placeholder="Digite seu cpf"
                                                    />
                                                </FormGroup>

                                                {/*email*/}
                                                <FormGroup label="Email: *" htmlFor="inputEmail">
                                                    <input type="text"

                                                           value={email}
                                                           onChange={(e) => setEmail(e.target.value)}

                                                           className="form-control" id="inputEmail"
                                                           aria-describedby="emailHelp"
                                                           placeholder="Digite o email"
                                                    />
                                                </FormGroup>

                                                {/*senha*/}
                                                <FormGroup label="Senha: *" htmlFor="inputSenha">
                                                    <input type="password"

                                                           value={senha}
                                                           onChange={(e) => setSenha(e.target.value)}

                                                           className="form-control" id="inputSenha"
                                                           aria-describedby="senhaHelp"
                                                           placeholder="Digite a senha"
                                                    />
                                                </FormGroup>

                                                {/*redigitar a senha*/}
                                                <FormGroup label="Repitir a Senha: *" htmlFor="inputRepetirSenha">
                                                    <input type="password"

                                                           value={repetirSenha}
                                                           onChange={(e) => setRepetirSenha(e.target.value)}

                                                           className="form-control" id="inputRepetirSenha"
                                                           aria-describedby="inputRepetirSenhaHelp"
                                                           placeholder="Repetir a senha"
                                                    />
                                                </FormGroup>
                                                <br/>
                                                <button onClick="window.location.href='usuarios.html'" type="button"
                                                        className="btn btn-success">Cadastrar
                                                </button>

                                            </fieldset>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default CadastroUsuario;