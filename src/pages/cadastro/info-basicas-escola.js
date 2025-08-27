import React, {useEffect, useState} from 'react';
import Layout from "../../components/form/layout";
import FormGroup from "../../components/form/form-group";
import {useForm} from "react-hook-form";
import {Dropdown} from "primereact/dropdown";
import {Card} from "primereact/card";
import {Mention} from "primereact/mention";
import {Link, useNavigate} from "react-router-dom";
import {setDados} from "../../components/utils/storageUtils";
import DropdownEstados from "../../components/select/selectEstados";

function InfoBasicasEscola() {
    const { register, handleSubmit, watch, setValue, formState: { errors }} = useForm({
        initialValues: {
            escola: '',
        }
    });
    const [estado, setEstado] = useState('')
    const navigate = useNavigate();

    /**
     * os dados do formulario serão salvos no localstorage
     * e recuperados na tela de definicao de senha
     * */
    const handleAvancarEstrutura = (data) => {

        console.log("VERIFICAR O ESTADO QUE VAI SER RECUPERADO ", data);
        setDados(data);
        navigate('/definirsenha', {state: data});
    }

/*dropdown - primereact usar em cmpos de estado e municipio*/
    return (
        <>
        <Layout>
            <div className="p-2"></div>
            {/*col-12 md:col-6*/}
            <form onSubmit={handleSubmit(handleAvancarEstrutura)}>
                <fieldset className="border-5 shadow-5 rounded-1 p-4  ">
                    <legend className="text-lg font-semibold px-4">Escola</legend>
                    <div className="grid p-4 "> {/*flex flex-wrap - tailwind*/}
                        {/*campo - nome da escola - primereact*/}
                        <div className="col-12 md:col-6 md:w-30rem ">
                            <FormGroup
                                id="escola"
                                name="escola"
                                label="Escola"
                                register={register}
                                errors={errors}
                                rules={{required: "Nome da escola é obrigatório" }}
                                showAsterisk={true}
                            />
                        </div>

                        {/*campo - codigo da escola*/}
                        <div className="col-12 md:col-6 md:w-18rem">
                            <FormGroup
                                name="codigo"
                                label="Código"
                                register={register}
                                errors={errors}
                                rules={{required: 'Código é obrigatório'}}
                                showAsterisk={true}
                            />
                        </div>

                        {/*campo - email da escola*/}
                        <div className="col-12 md:col-6 md:w-20rem">
                            <FormGroup
                                name="email"
                                label="e-mail"
                                register={register}
                                errors={errors}
                                rules={{
                                    required: 'E-mail é obrigatório',
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: 'E-mail inválido'
                                    }
                                }}
                                showAsterisk={true}
                                className="w-full"
                            />
                        </div>

                        {/*campo - telefone*/}
                        <div className="col-12 md:col-6 md:w-12rem">
                            <FormGroup
                                name="telefone"
                                label="Telefone"
                                register={register}
                                errors={errors}
                                rules={{required: 'Código é obrigatório'}}
                                showAsterisk={true}
                                className="w-full"
                            />
                        </div>

                        {/*****************endereço****************/}

                        <div className="col-12 md:col-12 " style={{ marginTop: '-22px' }}>
                            <hr className="my-4"></hr>
                            <div>
                                <legend className="text-lg font-semibold ">Endereço</legend>
                            </div>
                        </div>

                        {/**campos de endereço */}
                        <div className="col-12 md:col-6">
                            <DropdownEstados
                              setValue={setValue}
                              watch={watch}
                              register={register}
                              errors={errors}
                              class
                            />
                        </div>

                        <div className="col-12 md:col-6">
                            <span className="p-float-label p-float-label-active">
                                <Mention rows={4} cols={59}/>
                                <label className="text-danger">Observações</label>
                            </span>
                        </div>
                    </div>

                    {/*
                    botao avancar
                    */}
                    <div className="grid m-3 mt-3" style={{ marginTop: '-25px' }}>
                      <button type="submit" className="btn btn-primary text-bg-light-alpha-50 text-uppercase" >
                        Avançar
                      </button>
                      {/*
                      botao cancelar
                      */}
                      <Link
                        className="btn btn-danger text-bg-light-alpha-50 text-uppercase" to="/home">
                          Cancelar
                      </Link>
                    </div>
                </fieldset>
            </form>
        </Layout>

            <hr className="my-4"></hr>
            <Card title="Título" footer={<span>Rodapé do Card</span>}>
                <p>Conteúdo do card</p>
            </Card>

        </>

    );
}

export default InfoBasicasEscola;

/*
InfoBasicasEscola
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
 * <form className="formgrid grid gap-3 grid-cols">
 *                 <FormGroup
 *                     name="escola"
 *                     label="Escola"
 *                     register={register}
 *                     errors={errors}
 *                     rules={{ required: 'Campo obrigatório' }}
 *                     showAsterisk={true}
 *                     className="col-12 md:col-6"
 *                 />
 *
 *
 *
 *
 *             </form>
 *
 *
 *
 *
 * */