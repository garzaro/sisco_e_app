module.exports = {
    resolve: {
        alias: {
            yarn: false, // Ignora qualquer importação do Yarn
        },
    },
    externals: {
        'yarn/lib/cli': 'commonjs yarn/lib/cli', // Trata como módulo externo
    },
};
// webpack.config.js
module.exports = {
    resolve: {
        alias: {
            'yarn': false,  // Ignora completamente o Yarn
        },
        fallback: {
            // Evita que Webpack tente resolver módulos do Node.js
            'path': false,
            'fs': false,
            'child_process': false,
        }
    }
};