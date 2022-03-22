import React from 'react'
import { Formik, Form } from 'formik'
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import instance from '../../axios'
import requests from '../../requests'
import FormicControls from '../../formik/FormicControls'
import { errorToaster, successToaster } from "../../common/common-validation/common";
import axios from 'axios'

const Register = () => {
    const history = useHistory();

    const dropdownOptions = [
        { key: 'Select Category', value: '' },
        { key: 'Mentor', value: 'mentor' },
        { key: 'Employee', value: 'employee' },
    ]

    const initialValues = {
        category: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: ''
    }

    const errorMessages = (message) => {
        if(message.category){
            errorToaster(message.category);
        }
        if(message.username){
            errorToaster(message.username);
        }
        if(message.email){
            errorToaster(message.email);
        }
        if(message.password){
            errorToaster(message.password);
        }
        if(message.confirmPassword){
            errorToaster(message.confirmPassword);
        }
        if(message.firstName){
            errorToaster(message.firstName);
        }
        if(message.lastName){
            errorToaster(message.lastName);
        }
    }    

    // const validationSchema = Yup.object({
    //     category: Yup.string().required('!Required'),
    //     email: Yup.string().email('Invalid email format').required('!Required'),
    //     name: Yup.string().required('!Required'),
    //     password: Yup.string().required('!Required')
    // })

    const onSubmit = async (values) => {
        console.log(values)
        if (values.password.length > 7 || values.confirmPassword.length > 7) {
            if (values.password === values.confirmPassword) {
                if (values) {
                    const APIBody = values;
                    console.log("APIBODY", APIBody)
                    const response = await instance
                        .post(requests.fetchUserRegister, APIBody)
                        .catch((error) => {
                            console.log("error:", error)
                            let errorMessage = error.response.data.error.message;
                            console.log("error:", errorMessage)
                            errorToaster(errorMessage)
                            const message = errorMessage[0]
                            errorMessages(message)    
                        });
                    if (response) {
                        console.log("response", response.data)
                        successToaster("User registered successfully!")
                        history.push("auth/login");
                    }
                }
            } else {
                errorToaster("Confirm Password should match Password");
            }
        }else {
            errorToaster("Password Length must be atleast 8 Character !");
        }
    }

        return (
            <>
                <div className='mt-4 col-md-7 col-lg-8'>
                    <div className='card shadow border-0 p-3'>
                        <div className='card-body p-3'>
                            <h5 className="card-title text-center">Sign up with credentials</h5>
                            <Formik initialValues={initialValues}
                                // validationSchema={validationSchema}
                                onSubmit={onSubmit}>
                                {
                                    formik => {
                                        return <Form className='p-2 mx-md-4'>
                                            <div className='d-flex my-2 w-100'>
                                                <i className="uil uil-envelope fs-5 text-primary"></i>
                                                <FormicControls
                                                    control='select'
                                                    name='category'
                                                    options={dropdownOptions}
                                                />
                                            </div>

                                            <div className='d-flex my-2 w-100'>
                                                <i className="uil uil-graduation-cap fs-5 text-primary"></i>
                                                <FormicControls control='input'
                                                    type='text'
                                                    name='username'
                                                    placeholder='User Name'
                                                />
                                            </div>

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
                                                    placeholder='Password' />
                                            </div>
                                            <div className='d-flex my-2'>
                                                <i className="uil uil-lock-alt fs-5 text-primary"></i>
                                                <FormicControls control='input'
                                                    type='password'
                                                    name='confirmPassword'
                                                    placeholder='Confirm Password' />
                                            </div>
                                            <div className='d-flex my-2 w-100'>
                                                <i className="uil uil-graduation-cap fs-5 text-primary"></i>
                                                <FormicControls control='input'
                                                    type='text'
                                                    name='firstName'
                                                    placeholder='First Name'
                                                />
                                            </div>
                                            <div className='d-flex my-2 w-100'>
                                                <i className="uil uil-graduation-cap fs-5 text-primary"></i>
                                                <FormicControls control='input'
                                                    type='text'
                                                    name='lastName'
                                                    placeholder='Last Name'
                                                />
                                            </div>

                                            <div className='w-100 mx-auto'>
                                                <button className='btn btn-primary mt-3 ml-auto' type='submit' disabled={!formik.isValid}>Create Account</button>
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

    export default Register
