/**
* Utilitários para manipulação de dados no localStorage
*/

/**
 * Salva os dados do formulário no localStorage
 * @param {Object} data - Dados do formulário a serem salvos
 * @param {string} [key='dadosCadastro'] - Chave para armazenamento (opcional)
 */

export const salvarDadosFormulario = (data, key = 'dadosCadastro') => {
    localStorage.setItem(key, JSON.stringify(data));
};

/**
 * Carrega os dados do formulário do localStorage
 * @param {string} [key='dadosCadastro'] - Chave para recuperação (opcional)
 * @returns {Object|null} Dados recuperados ou null se não existirem
 */
export const carregarDadosFormulario = (key = 'dadosCadastro') => {
    const dadosSalvo = localStorage.getItem(key);
    return dadosSalvo ? JSON.parse(dadosSalvo) : []; /*null*/
}

/**
 * Remove os dados do formulário do localStorage
 * @param {string} [key='dadosCadastro'] - Chave para remoção (opcional)
 */
export const limparDadosFormulario = (key = 'dadosCadastro') => {
    localStorage.removeItem(key);
}

/**
 * Atualiza dados específicos no localStorage preservando o restante
 * @param {Object} updates - Dados a serem atualizados
 * @param {string} [key='dadosCadastro'] - Chave para atualização (opcional)
 */
export const atualizarDadosFormulario = (updates, key='dadosCadastro') => {
    const dadosAtual = carregarDadosFormulario(key) || {};
    const dadosAtualizado = {...dadosAtual, ...updates};
    salvarDadosFormulario(dadosAtualizado, key);
    return dadosAtualizado;
};