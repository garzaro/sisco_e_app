import React, {useEffect} from 'react';
import {useForm, } from "react-hook-form";
import {useNavigate} from "react-router-dom";
import Layout from "../../components/layout/layout";
import Astered from "../../css/astered";

function InfoBasicasEscola() {
    const { register, handleSubmit, setValue, formState: { errors }} = useForm({
        defaultValues: {
            nome: '',
            codigo: '',
            email: '',
            estado: '',
            municipio: '',
            bairro: '',
            endereco: '',
            telefone: '',
        }
    });
    const navigate = useNavigate();

    useEffect(() =>{
        const dadosEscolaSalvo = localStorage.getItem('dadosEscola');
        if(dadosEscolaSalvo){
            Object.entries(JSON.parse(dadosEscolaSalvo)).forEach(([key, value]) => {
                setValue(key, value);
            });
        }
    }, [setValue]);

    const handleAvancar = (data) => {
        localStorage.setItem('dadosEscola', JSON.stringify(data));
        navigate('infraestrutura', {state: data});
    }

    function handleCancelar(){
        navigate('/home')
    }

    return (
        <>
            <Layout>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-8 col-md-7 col-lg-6 mx-auto">
                            <div className="card border-0 bg-black text-secondary shadow rounded-3 my-1">
                                <div className="card-body p-4 p-sm-5">

                                    <h3 className="text-secondary my-1 text-center mb-3">Escola</h3> {/*card-title text-center mb-1 fw-light fs-6*/}

                                    <form onSubmit={handleSubmit(handleAvancar)}>

                                        {/*campo nome escola*/}
                                        <div className="form-floating mb-2">
                                            <input
                                                {...register("nome", {required: "O nome da escola é obrigatório"},)}
                                                type="text"
                                                className="form-control"
                                                id="floatingInputNome"
                                                placeholder="Nome da Escola"
                                            />
                                            <label className="floatingInput">Nome da escola: <Astered>*</Astered></label>
                                            {errors.nome && <span className="error">{errors.nome.message}</span>}
                                        </div>

                                        {/*campo codigo escola*/}
                                        <div className="form-floating mb-2">
                                            <input
                                                {...register("codigo", {required: "O código da escola é obrigatório"},)}
                                                type="text"
                                                className="form-control"
                                                id="floatingInputCodigo"
                                                placeholder="Codigo da escola"
                                            />
                                            <label className="floatingInput">Código: <Astered>*</Astered></label>
                                            {errors.codigo && <span className="error">{errors.codigo.message}</span>}
                                        </div>

                                        {/*campo email escola*/}
                                        <div className="form-floating mb-2">
                                            <input
                                                {...register("email", {required: "O email institucional da escola é obrigatório"},)}
                                                type="text"
                                                className="form-control"
                                                id="floatingInputEmail"
                                                placeholder="Email da Escola"
                                            />
                                            <label className="floatingInput">Email institucional: <Astered>*</Astered></label>
                                            {errors.email && <span className="error">{errors.email.message}</span>}
                                        </div>

                                        {/*campo telefone escola*/}
                                        <div className="form-floating mb-2">
                                            <input
                                                {...register("telefone", {required: "O telefone da escola é obrigatório"},)}
                                                type="text"
                                                className="form-control"
                                                id="floatingInputTelefone"
                                                placeholder="Telefone da Escola"
                                            />
                                            <label className="floatingInput">Telefone: <Astered>*</Astered></label>
                                            {errors.telefone && <span className="error">{errors.telefone.message}</span>}
                                        </div>

                                        {/*campo estado*/}
                                        <div className="form-floating mb-2">
                                            <input
                                                {...register("estado", {required: "O Estado é obrigatório"},)}
                                                type="text"
                                                className="form-control"
                                                id="floatingInputEstado"
                                                placeholder="uf"
                                            />
                                            <label className="floatingInPut">Estado: <Astered>*</Astered></label>
                                            {errors.estado && <span className="error">{errors.estado.message}</span>}
                                        </div>

                                        {/*campo municipio*/}
                                        <div className="form-floating mb-2">
                                            <input
                                                {...register("municipio", {required: "O município é obrigatório"},)}
                                                type="text"
                                                className="form-control"
                                                id="floatingInputMunicipio"
                                                placeholder="municipio"
                                            />
                                            <label className="floatingInput">Município: <Astered>*</Astered></label>
                                            {errors.municipio && <span className="error">{errors.municipio.message}</span>}
                                        </div>

                                        {/*campo bairro*/}
                                        <div className="form-floating mb-2">
                                            <input
                                                {...register("bairro", {required: "O bairro é obrigatório"},)}
                                                type="text"
                                                className="form-control"
                                                id="floatingInputBairro"
                                                placeholder="bairro"
                                            />
                                            <label className="floatingInput">Bairro: <Astered>*</Astered></label>
                                            {errors.bairro && <span className="error">{errors.bairro.message}</span>}
                                        </div>

                                        {/*campo endereco*/}
                                        <div className="form-floating mb-2">
                                            <input
                                                {...register("logradouro", {required: "Rua ou avenida, o endereço é obrigatório"},)}
                                                type="text"
                                                className="form-control"
                                                id="floatingInputLogradouro"
                                                placeholder="Logradouro"
                                            />
                                            <label className="floatingInput">Logradouro: <Astered>*</Astered></label>
                                            {errors.logradouro && <span className="error">{errors.logradouro.message}</span>}
                                        </div>

                                        {/*campo complemento*/}
                                        <div className="form-floating mb-2">
                                            <input
                                                {...register("complemento", {required: null},)}
                                                type="text"
                                                className="form-control"
                                                id="floatingInputComplemento"
                                                placeholder="complemento"
                                            />
                                            <label className="floatingInput">Complemento:</label>
                                            {errors.complemento && <span className="error">{errors.complemento.message}</span>}
                                        </div>

                                        {/*botoes*/}
                                        <hr className="my-4"></hr>
                                        <div className="d-grid">
                                            <button
                                                className="btn btn-primary btn-login text-uppercase fw-bold" type="submit"
                                            >
                                                Avançar
                                            </button>
                                        <hr className="my-4"></hr>
                                            <button
                                                className="btn btn-outline-primary text-uppercase fw-bold"
                                                onClick={handleCancelar}
                                            >
                                                Cancelar
                                            </button>
                                        </div>

                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}
export default InfoBasicasEscola;

/*
* const escolaService = EscolaService();

    const salvarEscola = (data) => {
        const dadosEscola = {
            nome: data.nome,
            codigo: data.codigo,
            email: data.email,
            estado: data.estado,
            municipio: data.municipio,
            bairro: data.bairro,
            endereco: data.endereco,
            telefone: data.telefone,
        };
        escolaService.salvar(dadosEscola)
            .then(response => {
                console.log("dados recuperados ", response)
                mensagemDeSucesso("Escola salva com sucesso!")
            })
            .catch(err => {
                console.log("Monitorar o erro ao salvar", err)
                mensagemDeAlerta(
                    err.response.data?.message ||
                    err.response.data ||
                    "Erro ao salvar escola"
                )
           });
    }
* */
