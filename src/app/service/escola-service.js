import ApiService from "../api/apiservice";

const escolaApi = ApiService('/api/escolas');

const EscolaService = () => {
    return{
        salvar: (escolas) => {
            return escolaApi.post('', escolas);
        }
    }
};
export default EscolaService;