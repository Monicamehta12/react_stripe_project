import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'

function Select(props) {
    const { label, name, options, ...rest} = props
    return (
        <div className = 'form-controls w-100 d-flex'>
            <label className='m-2' htmlFor={name}>{label}</label>
            <Field as='select' id={name} name={name} {...rest} className='w-100 p-1'>
                {options.map(option => {
                    return(
                        <option key={option.key} value={option.value}>{option.key}</option>
                    )
                })}
            </Field>
            <ErrorMessage name={name} component={TextError}/>
        </div>
    )
}

export default Select
