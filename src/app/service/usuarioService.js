import Apiservice from "../apiservice";

const usuarioApi = Apiservice('/api/usuarios/');

const ServiceUsuario = () =>{
    return{
        autenticar: (credenciais) => {
            return usuarioApi.post('autenticar', credenciais);
        },
        cadastrar: (usuario) => {
            return usuarioApi.post('/', usuario);
        },
        atualizar: (usuario) => {
            return usuarioApi.put('atualizar', usuario);
        },
        deletar: (id) => {
            return usuarioApi.delete(`deletar/${id}`);
        },
    };
};
export default ServiceUsuario;