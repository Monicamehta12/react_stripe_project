import React from 'react'

function TextError(props) {
    return (
        <div className='text-danger d-block'>
            {props.children}
        </div>
    )
}

export default TextError
