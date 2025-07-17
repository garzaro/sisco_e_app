import React from "react";

const FormLayout = ({htmlFor, label, children}) =>{
    return (
        <div className="mb-3 text-success"> {/*form-floating*/}
            <label htmlFor={htmlFor} className="text-success">{label}</label>
            {children}
        </div>
    );
}
export default FormLayout;

