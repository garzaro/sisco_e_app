import Apiservice from "../apiservice";

const usuarioApi = Apiservice('/api/usuarios');

const ServiceUsuario = () =>{
    return{
        autenticar: (credenciais) => {
            return usuarioApi.post('/autenticar', credenciais);
        },
        salvar: (usuario) => {
            return usuarioApi.post('', usuario);
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