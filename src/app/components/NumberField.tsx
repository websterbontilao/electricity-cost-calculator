import React, { useId } from 'react';
import fieldStyles from '@styles/fields.module.css';
import styles from '@styles/number.module.css';

interface NumberProps {
  label: string;
  value: number;
  onChange?: (value: number) => void;
  floatingPoint?: number;
  disabled?: boolean;
  errorMessage?: string;
  isError?: boolean;
}

function Number({ label, value, onChange, floatingPoint = 2, disabled = false, isError = false, errorMessage = '' }: NumberProps) {

  const id = useId();

  function validateNumber(value: any, floatingPoint?: number): boolean {

    let ret = false;

    if (!isNaN(value)) {

      ret = true;

      if (floatingPoint && floatingPoint > 0) {

        ret = ((value + "").split(".")[1]?.length || 0) <= floatingPoint;
      }
    }

    return ret;
  }

  function onNumberChange(event: any) {

    if (!validateNumber(event?.target?.value, floatingPoint)) return;

    let value = (event?.target?.value);

    if (parseFloat(value) !== 0 && parseFloat(value) > 1) {

      value = value.replace(/^0+/, '');
    }

    if (onChange) {

      onChange(value);
    }
  }

  return (
    <>
      <div className="relative">
        <input
          id={id}
          type="text"
          className={`${fieldStyles.container} ${isError ? fieldStyles['error-field'] : ''}`}
          onChange={(e) => onNumberChange(e)}
          value={value}
          disabled={disabled}
        />

        <label htmlFor={id} className={fieldStyles["field-label"]}>
          {label}
        </label>
        { isError && errorMessage && <span className={fieldStyles['error-msg']}>{errorMessage}</span>}
      </div>
    </>
  )
}

export default Number