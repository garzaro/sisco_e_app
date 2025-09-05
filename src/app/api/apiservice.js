import axios from "axios";

console.log("API BAse URL: ", process.env.REACT_APP_API_URL);

export const httpClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});
const ApiService = (apiurl) => {
    return {

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
        },
    }
}
export default ApiService;

