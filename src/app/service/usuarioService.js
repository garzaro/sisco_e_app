import Apiservice from "../apiservice";

const usuarioApi = Apiservice('/api/usuarios/');

const ServiceUsuario = () =>{
    return{
        autenticar: (credenciais) => {
            return usuarioApi.post('autenticar', credenciais);
        },
        salvarUsuario: (usuarios) => {
            return usuarioApi.post(`/`, usuarios);
        }
    };
};
export default ServiceUsuario;