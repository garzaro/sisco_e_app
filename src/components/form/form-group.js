import React from 'react';

function FormGroup({htmlFor, label, children}) {
    return (
        <>
            <div className="form-group" >
                <label htmlFor={htmlFor} className="text-success" style={{ marginTop: '-15px' }}>
                    <br/>
                    {label}
                </label>
                {children}
            </div>
        </>
    );
}
export default FormGroup;