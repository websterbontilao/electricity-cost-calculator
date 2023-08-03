import React, { useId, InputHTMLAttributes  } from 'react'
import fieldStyles from '@styles/fields.module.css'


interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  value: string;
}

function TextField({label, value, ...props}: TextFieldProps) {

  const id = useId();

  return (
    <div className='relative'>
      <input
        id={id}
        type='text'
        className={fieldStyles.container}
        value={value}
        {...props}
      />
      <label htmlFor={id} className={fieldStyles["field-label"]}>
          {label}
      </label>
    </div>
  )
}

export default TextField