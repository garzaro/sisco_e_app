export const tratamentoErro = (erro)=>{
    if (!erro.response) {
        return "Não um erro de conexão com o servidor";
    }
    const status = erro.response.status;
    const mensagemDeErro = erro.response.data?.message;

    const mensagens = {
        400: mensagemDeErro || "Requisição inválida.",
        401:"Usuário ou senha incorretos.",
        403:"Acesso negado.",
        404:"Recusronão encontrado.",
        500:"Erro interno no servidor. Tente novamente mais tarde.",
    };
    return mensagens[status] || mensagemDeErro || "Erro inesperado.";
}