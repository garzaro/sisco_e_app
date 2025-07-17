import React, {useEffect} from 'react';
import {useForm, } from "react-hook-form";
import {useNavigate} from "react-router-dom";
import Layout from "../../components/layout/layout";
import Astered from "../../css/astered";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';


function Infraestrutura() {
    const { register, handleSubmit, setValue, formState: { errors }} = useForm({
        defaultValues: {
            provedor: '',
            ip: '',
            mascara: '',
            gateway: '',
            dnsUm:'',
            dnsDois:'',
            velocidade:'',
            statusLink:'',
            checkpoint:'',
            mac:'',
            serial:'',
        }
    });
    const estados = [
        { label: 'São Paulo', value: 'SP' },
        { label: 'Rio de Janeiro', value: 'RJ' },
        { label: 'Minas Gerais', value: 'MG' }
    ];
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
        <Layout>
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
        </Layout>
    );
}
export default Infraestrutura;


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


