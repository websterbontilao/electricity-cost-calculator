import { useId, useState } from "react";
import styles from "@styles/select.module.css";
import fieldStyles from "@styles/fields.module.css"

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

export interface SelectOptionType {
  label: string;
  value: any;
}
interface SelectProps {
  label: string;
  value?: SelectOptionType;
  options: SelectOptionType[];
  onChange: (value: SelectOptionType | undefined) => void;
  allowClear?: boolean;
  disabled?: boolean;
}

interface JsonOptions {
  [key: string]: {
    label: string;
    value: number;
  };
}

export function jsonToSelectOptions(jsonData: JsonOptions) {

  const options: SelectOptionType[] = [];

  for (const index in jsonData) {

    const {label, value} = jsonData[index];

    options.push({label, value});
  }

  return options;
}

const Select = ({ label, value, onChange, options, allowClear = true, disabled = false }: SelectProps) => {

  const id = useId();

  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  function clearOptions() {

    onChange(undefined);
  }

  function selectOption(option: SelectOptionType) {

    onChange(option);
  }

  function isOptionSelected(option: SelectOptionType) {

    return option === value;
  }

  return (
    <div className={`relative ${disabled ? styles.disabled : ''}`}>
      <div
        onBlur={() => setIsOpen(false)}
        onClick={() => setIsOpen(prev => !prev)}
        tabIndex={0}
        className={fieldStyles.container}
      >
        <span className={styles.value}>{value?.label}</span>

        {
          allowClear ?
            <button
              onClick={e => {

                e.stopPropagation();
                clearOptions();
              }}
              className={styles["clear-btn"]}
            >
              &times;
            </button>
            : ""
        }

        <div className={styles.divider}></div>

        <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
          {options.map((option, index) => (
            <li
              onClick={e => {

                e.stopPropagation();
                selectOption(option);
                setIsOpen(false);
              }}
              onMouseEnter={() => setHighlightedIndex(index)}
              key={option.label}
              className={`
                ${styles.option} 
                ${isOptionSelected(option) ? styles.selected : ""}
                ${index === highlightedIndex ? styles.highlighted : ""}
              `}
            >
              {option.label}
            </li>
          ))}
        </ul>
        <div className={styles.caret}>
            {isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </div>

      </div>
      <label htmlFor={id} className={fieldStyles["field-label"]}>
        {label}
      </label>
    </div>
  );
}


export default Select;