import React from "react";
import styled from "styled-components";
{/*addBreak = true* opcional = <br>*/}
function FormGroup({htmlFor, label, children, addBreak = false}){
    return (
        <div className="form-group text-success" style={{ marginTop: '5px' }}>
            <label htmlFor={htmlFor} className="text-success">{label}</label>
            {children}
            {addBreak && <br/>}
        </div>
    );
}
export default FormGroup;