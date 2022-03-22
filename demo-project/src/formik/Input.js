import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'

function Input(props) {
    const { label, name, ...rest} = props
    return (
        <div className='form-controls w-100 d-flex'>
            <label className='m-2' htmlFor={name}>{label}</label>
            <Field id={name} name = {name} {...rest} className='w-100 p-1'></Field>
            <ErrorMessage name={name} component={TextError}></ErrorMessage>
        </div>
    )
}

export default Input
