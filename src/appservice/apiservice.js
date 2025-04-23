import axios from "axios";

/*passando configurações para o exios*/
const httpCliente = axios.create({
    baseURL: 'http://localhost:8080/',
})
/*responsável por fazer requisições para toda a api*/
const ApiService = (apiurl) => {
    const constructor = (url) => `${apiurl}${url}`;

    return {
        post: (url, objeto) =>
            httpCliente.post(constructor(url), objeto),

        put: (url, objeto) =>
            httpCliente.put(constructor(url), objeto),

        delete: (url) =>
            httpCliente.delete(constructor(url)),

        get: (url) =>
            httpCliente.delete(constructor(url)),
    };
};
export default ApiService;

