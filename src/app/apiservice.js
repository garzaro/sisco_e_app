import axios from "axios";

/*passando configurações para o exios*/
export const httpClient = axios.create({
    baseURL: 'http://localhost:8080/',
    withCredentials: true
})
/*responsável por fazer requisições para toda a api*/
const ApiService = (apiurl) => {
    return {
        apiurl: apiurl,
        /*metodos*/
        post: (url, objeto) => {
            const requestUrl = `${apiurl}${url}`;
            return httpClient.post(requestUrl, objeto);
        },
        put: (url, objeto) => {
            const requestUrl = `${apiurl}${url}`;
            return httpClient.put(requestUrl, objeto);
        },
        get: (url) => {
            const requestUrl = `${apiurl}${url}`;
            return httpClient.get(requestUrl);
        },
        delete: (url) => {
            const requestUrl = `${apiurl}${url}`;
            return httpClient.delete(requestUrl);
        }
    }
}
export default ApiService;
