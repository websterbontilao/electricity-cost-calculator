import React from 'react';
import style from './styles/button.module.css';

type ButtonProps = {
    value: any,
    onClick?: (param:any) => void,
    type?: string,
    btnClass?: string
}

function Button({value, onClick, type="button", btnClass="normal" }: ButtonProps) {

    let btnStyle = style.normal;

    switch (btnClass) {

        case 'submit':
            btnStyle = style.primary
            break;
    }

    return (

        <input 
            className={`${style.btn} ${btnStyle} ${style.container} mt-2`}
            type={type}
            value={value}
            onClick={onClick}
        />
    )
}

export default Button