import React, {useEffect} from 'react';
import {useForm, } from "react-hook-form";
import {useNavigate} from "react-router-dom";
import Astered from "../../css/astered";
import FormLayout from "../../components/form/form-layout";
import {InputText} from "primereact/inputtext";
import {Dropdown} from "primereact/dropdown";
import {Calendar} from "primereact/calendar";
import {Button} from "primereact/button";

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
            <FormLayout>
                <div>
                    <div className="row">
                        <div className="col-sm-8 col-md-7 col-lg-6 mx-auto">
                            <div className="card border-0 bg-black text-secondary shadow rounded-3 my-1">
                                <div className="card-body p-4 p-sm-5">

                                    <h3 className="text-secondary my-1 text-center mb-3">Escola</h3> {/*card-title text-center mb-1 fw-light fs-6*/}

                                    <form onSubmit={handleSubmit(handleAvancar)}>
                                        <FormLayout>
                                            <div className="p-fluid grid formgrid ">
                                                {/* Nome */}
                                                <div className="field col-12 md:col-6">
                                                    <label htmlFor="nome">Nome</label>
                                                    <InputText id="nome" />
                                                </div>

                                                {/* Sobrenome */}
                                                <div className="field col-12 md:col-6">
                                                    <label htmlFor="sobrenome">Sobrenome</label>
                                                    <InputText id="sobrenome" />
                                                </div>

                                                {/* E-mail */}
                                                <div className="field col-12 md:col-6">
                                                    <label htmlFor="email">Email</label>
                                                    <InputText id="email" type="email" />
                                                </div>

                                                {/* Telefone */}
                                                <div className="field col-12 md:col-6">
                                                    <label htmlFor="telefone">Telefone</label>
                                                    <InputText id="telefone" />
                                                </div>

                                                {/* Endereço */}
                                                <div className="field col-12">
                                                    <label htmlFor="endereco">Endereço</label>
                                                    <InputText id="endereco" />
                                                </div>

                                                {/* Cidade */}
                                                <div className="field col-12 md:col-4">
                                                    <label htmlFor="cidade">Cidade</label>
                                                    <InputText id="cidade" />
                                                </div>

                                                {/* Estado */}
                                                <div className="field col-12 md:col-4">
                                                    <label htmlFor="estado">Estado</label>
                                                    <Dropdown id="estado" options={estados} placeholder="Selecione" />
                                                </div>

                                                {/* CEP */}
                                                <div className="field col-12 md:col-4">
                                                    <label htmlFor="cep">CEP</label>
                                                    <InputText id="cep" />
                                                </div>

                                                {/* Data de nascimento */}
                                                <div className="field col-12 md:col-6">
                                                    <label htmlFor="dataNascimento">Data de Nascimento</label>
                                                    <Calendar id="dataNascimento" showIcon dateFormat="dd/mm/yy" />
                                                </div>

                                                {/* CPF */}
                                                <div className="field col-12 md:col-6">
                                                    <label htmlFor="cpf">CPF</label>
                                                    <InputText id="cpf" />
                                                </div>

                                                {/* Botão Enviar */}
                                                <div className="field col-12">
                                                    <Button label="Enviar" icon="pi pi-check" className="w-full" />
                                                </div>
                                            </div>
                                        </FormLayout>














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
            </FormLayout>
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

/**
 * {/*campo endereco
}
*
<div className="form-floating mb-2">
    * <input
    * {...register("logradouro", {required: "Rua ou avenida, o endereço é obrigatório"},)}
    * type="text"
    * className="form-control"
    * id="floatingInputLogradouro"
    * placeholder="Logradouro"
    * />
    * <label className="floatingInput">Logradouro: <Astered>*</Astered></label>
    * {errors.logradouro && <span className="error">{errors.logradouro.message}</span>}
    * </div>
 *
 * */
