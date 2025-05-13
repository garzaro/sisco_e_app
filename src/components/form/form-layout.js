import React from "react";

const FormLayout = ({htmlFor, label, children}) =>{
    return (
        <div className="form-floating mb-3 text-success">
            <label htmlFor={htmlFor} className="text-success">{label}</label>
            {children}
        </div>
    );
}
export default FormLayout;

