import React from 'react';
import style from './button.module.css';

function Button() {

    return (

        <input 
            className={style.btn}
            type="button" 
            value="Test" 
            onClick={e => console.log('hello')}
        />
    )
}

export default Button