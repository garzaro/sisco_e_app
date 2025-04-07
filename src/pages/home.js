import React, {useEffect, useState} from 'react';
import axios from "axios";

/*pagina inicial*/
function Home () {
    const [saldo, setSaldo] = useState('');

    /*ciclo de vida*/
    useEffect(() => {
        axios.get('http://localhost:8080/api/usuarios/4/saldo')
            /*res*/
            .then(retornoSaldo => {
                setSaldo(retornoSaldo.data);
            }).catch(error =>{

        });
        return () => {
            console.log("componente sera desmontado");
        }
    },[]);

    return (
        <div className="container ">
            <div className="jumbotron ">
                <h1 className="display-5">Bem-vindo à Página Inicial!!!</h1>
                <p className="lead">Este é o seu sistema de finanças pessoais.</p>
                <p className="lead">Seu saldo para o mes atual é de R$ {saldo}.</p>
                <hr className="my-4"/>
                <p>Essa é a sua área administrativa.</p>
                <p className="lead">
                    <a className="btn btn-primary btn-lg "
                       href="https://www.geeksforgeeks.org/reactjs-usenavigate-hook/"
                       role="button"><i className="fa fa-users"></i>Cadastrar Usuário</a>
                    <a className="btn btn-danger btn-lg " href="https://bootswatch.com/flatly/#" role="button"><i
                        className="fa fa-users"></i> Cadastrar Lançamento</a>
                </p>
            </div>
        </div>
    );
};
export default Home;

