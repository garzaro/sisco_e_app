import React from "react";

const AlterarVisualizarSenha = ({senhaTexto, confirmarSenhaTexto, onClick}) => {
    return (
        <span
            className="position-absolute top-50 translate-middle-y end-0 pe-3"
            onClick={onClick}
            style={{ cursor: 'pointer' }}
            aria-label={senhaTexto ? "Ocultar senha" : "Mostrar senha"}
        >
            {senhaTexto ? (
                <i className="bi bi-eye-slash-fill"></i>
            ):(
                <i className="bi bi-eye-fill"></i>)}
        </span>
    );
}
export default AlterarVisualizarSenha;