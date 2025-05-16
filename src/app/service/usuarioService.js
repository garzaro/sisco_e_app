import Apiservice from "../apiservice";

const usuarioApi = Apiservice('/api/usuarios/');

const ServiceUsuario = (credentials) =>{
    return{
        autenticar: (credentials) => {
            return usuarioApi.post('autenticar', credentials);
        },
        salvarUsuario: (usuarios) => {
            return usuarioApi.post('/', usuarios);
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