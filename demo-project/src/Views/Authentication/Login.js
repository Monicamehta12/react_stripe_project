import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormicControls from '../../formik/FormicControls'
import instance from '../../axios'
import requests from '../../requests'
import { errorToaster, successToaster } from "../../common/common-validation/common";
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { TOKEN_KEY, USER_ID } from '../../redux/actions/actions'

const Login = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const initialValues = {
        email: '',
        password: ''
    }

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid format').required('!Required'),
        password: Yup.string().required('!Required')
    })

    const loginHandler = async (values) =>{
        console.log("values", values)
        if(values.email && values.password !== null){
            const response = await instance
                .post(requests.fetchLogin, values)
                .catch((error) => {
                    console.log(error)
                errorToaster("Invalid email and password");
            })
            if (response) {
                console.log("response", response.data)
                const userToken = response.data.data.token;
                const userId = response.data.data.user.id;
                console.log("id", userId)
                console.log("token", userToken);
                dispatch(USER_ID(userId))
                dispatch(TOKEN_KEY(userToken));
                successToaster("Login Successfully!")
                history.push("/user/dashboard");
            }
        }else {
            errorToaster("Please enter valid email and password");
        }  
    }

    return (
        <>
            <div className='mt-4 col-md-7 col-lg-8'>
                <div className='card shadow border-0 p-3'>
                    <div className='card-body p-3'>
                        <h5 className="card-title text-center">Sign in with credentials</h5>
                        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={loginHandler}>
                            {
                                formik => {
                                    return <Form className='p-2 mx-md-4'>
                                        <div className='d-flex my-2 w-100'>
                                            <i className="uil uil-envelope fs-5 text-primary"></i>
                                            <FormicControls control='input'
                                                type='email'
                                                name='email'
                                                placeholder='Email'
                                               
                                            />
                                        </div>
                                        <div className='d-flex my-2'>
                                            <i className="uil uil-lock-alt fs-5 text-primary"></i>
                                            <FormicControls control='input'
                                                type='password'
                                                name='password'
                                                placeholder='Password'
                                                />
                                        </div>
                                        <div className='w-100 mx-auto'>
                                        <button className='btn btn-primary mt-3 ml-auto' type='submit' disabled={!formik.isValid}>Submit</button>
                                        </div>
                                    </Form>
                                }
                            }
                        </Formik>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
