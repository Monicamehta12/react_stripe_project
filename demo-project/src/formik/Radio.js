import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'

function Radio(props) {
    const { label, name, options, ...rest} = props
    return (
        <div className='form-controls'>
            <label>{label}</label>
            <Field name={name}>
                {
                    ({ field }) => {
                        return(
                            options.map(option => {
                                return(
                                <React.Fragment key={option.key}>
                                    <input type='radio' 
                                        id={option.value} 
                                        {...field} 
                                        {...rest}
                                        value={option.value} 
                                        checked={field.value === option.value}
                                    />
                                    <label htmlFor={option.value}>{option.key}</label>
                                </React.Fragment>
                                )
                            })
                        )
                    }
                }
            </Field>
            <ErrorMessage name={name} component={TextError}></ErrorMessage>
        </div>
    )
}

export default Radio
