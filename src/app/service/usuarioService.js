import Apiservice from "../apiservice";

const usuarioApi = Apiservice('/api/usuarios');

const ServiceUsuario = () =>{
    return{
        autenticar: (credenciais) => {
            return usuarioApi.post('/autenticar', credenciais);
        },
        cadastrar: (usuarios) => {
            return usuarioApi.post('', usuarios);
        },
        atualizar: (usuarios) => {
            return usuarioApi.put('/atualizar', usuarios);
        },
        deletar: (id) => {
            return usuarioApi.delete(`/deletar/${id}`);
        },
    };
};
export default ServiceUsuario;