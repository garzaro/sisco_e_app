import Apiservice from "../apiservice";

const usuarioApi = Apiservice('/api/usuarios/');

const ServiceUsuario = () =>{
    return{
        autenticar: (credenciais) => {
            return usuarioApi.post('autenticar', credenciais);
        },
    };
};
export default ServiceUsuario;