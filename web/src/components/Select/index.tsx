import React, { SelectHTMLAttributes } from 'react';

import './styles.css'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    name: string,
    label: string,
    options: Array<{
        value: string,
        label: string
    }>;
}

const Select: React.FC<SelectProps> = ({ label, name, options, ...rest }) => {
    return (
        <div className="select-block">
            <label htmlFor={name}>{label}</label>
            <select
                value=""
                id={name}
                {...rest}
            >
                <option
                    value=""
                    disabled
                    selected
                    hidden
                >Selecione uma opção</option>

                {
                    options.map((option, index) => {
                        return (
                            <option
                                value={option.value}
                                key={index}
                            >
                                {option.label}
                            </option>
                        )
                    })
                }
            </select>
        </div>
    )
}

export default Select;