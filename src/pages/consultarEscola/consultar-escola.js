import React from "react";
import {useForm} from "react-hook-form";
import Layout from "../../components/layout/layout";
import FormLayout from "../../components/form/form-layout";

const ConsultarEscola = () => {
    const { register, handleSubmit, formState: { errors }} = useForm({
        defaultValues: {
            municipio:'', codigo:'',
        }
    });
    const consultar = () => {

    }
    return(
        <Layout>
            <div className="container">
                <div className="row">
                    <h1 className="text-danger my-4">Consultar Escolas</h1>
                    <div className="col-sm-9 col-md-7 col-lg-2">
                        <div className="card border-0 bg-black text-danger shadow rounded-3 my-2">
                            <div className="card-body p-4 p-sm-3">
                                <form onSubmit={handleSubmit(consultar)}>
                                    <FormLayout>
                                        <input
                                            type="text"
                                            {...register("municipio", {
                                                required: "O campo município é obrigatório",
                                            })}
                                            className="form-control"
                                            id="floatingInputMunicipio"
                                            placeholder="Digite o município"
                                        />
                                        <label className="floatingInput">
                                            Digite o município <span className="asterisco-vermelho">*</span>
                                        </label>
                                        {errors.municipio && <span className="error">{errors.ano.message}</span>}
                                    </FormLayout>
                                    <FormLayout>
                                        <input
                                            type="text"
                                            {...register("escola", {
                                                required: "O campo escola é obrigatório",
                                                minLength: {
                                                    value: 5,
                                                    message: "O nome da escola deve ter ao menos 5 caracteres"
                                                }
                                            })}
                                            className="form-control"
                                            id="floatingInputMes"
                                            placeholder="Digite o mês"
                                        />
                                        <label className="floatingInput">
                                            Digite o mês <span className="asterisco-vermelho">*</span>
                                        </label>
                                        {errors.senha && <span className="error">{errors.senha.message}</span>}
                                    </FormLayout>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
export default ConsultarEscola;

/*https://www.ibm.com/docs/pt-br/order-management?topic=screens-address-lookup*/