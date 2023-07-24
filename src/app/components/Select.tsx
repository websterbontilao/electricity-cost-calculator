import { useId, useState } from "react";
import styles from "./styles/select.module.css";
import fieldStyles from "./styles/fields.module.css"

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

type SelectOption = {

    label: string,
    value: any
}

type SelectProps = {

    label: string,
    value?: SelectOption,
    options: SelectOption[],
    onChange: (value: SelectOption | undefined) => void,
    allowClear?: boolean
}

const Select = ({ label, value, onChange, options, allowClear = true  }: SelectProps) => {

    const id = useId();

    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(0);

    function clearOptions() {

        onChange(undefined);
    }

    function selectOption(option: SelectOption) {

        onChange(option);
    }

    function isOptionSelected(option: SelectOption) {

        return option === value;
    }

    return (
        <div className="relative">
            <div
                onBlur={ () => setIsOpen(false) }
                onClick={ () => setIsOpen(prev => !prev) }
                tabIndex={0} 
                className={`${fieldStyles.container} ${styles.select}`}
            >
                <span className={styles.value}>{value?.label}</span>

                {
                    allowClear ?
                        <button 
                            onClick={ e => {

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

                <div className={styles.caret}>
                    {isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                </div>

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

            </div>
            <label htmlFor={id} className={fieldStyles["field-label"]}>
                {label}
            </label>
        </div>
    );
}


export default Select;