import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import instance from '../../axios';
import requests from '../../requests'
import { errorToaster, successToaster } from "../../common/common-validation/common";
// import { GET_EMPLOYEES, GET_USERS } from '../../../redux/actions/actions';

const initialState = {
    id: "",
    productName: "",
    description: "",
    image: "",
    price: "",
};

const Addproduct = () => {
    const history = useHistory()
    const [productData, setProductData] = useState(initialState);
    // const [image, setImage] = useState({
    //     file: [],
    // })

    const [image, setImage] = useState('')

    const onInputChange = (event) => {
        const { name, value } = event.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleImageUpload = (e) => {
        // setImage({
        //     file: e.target.files[0],
        // })
        setImage(e.target.files[0])
    }

    const onSubmitProduct = async (e) => {
        e.preventDefault()
        console.log("===", image )
        const data = new FormData()
        data.append('productName', productData.productName)
        data.append('description', productData.description)
        data.append('image', image)
        data.append('price', productData.price)
        // const config = {
        //     headers : {
        //         'Content-Type': 'multipart/form-data'
        //     }
        // }
        //  {
        //     productName: productData.productName,
        //     description: productData.description,
        //     image: image,
        //     price: productData.price,
        // }

        const response = await instance
            .post(requests.fetchAddProduct, data)
            .catch((error) => {
                console.log(error)
                if (error) {
                    errorToaster("Unauthorized to access this route")
                }
            });
        if (response) {
            console.log("product", response.data)
            successToaster("Product Added successfully!")
            history.push("/product/Viewproduct");
        }
    }

    return (
        <div className='main-content bg-light px-3 pb-5 h-100 overflow-auto'>
            <div className='d-flex align-items-center justify-content-between border-bottom py-3'>
                <h4 className='text-dark mb-0'>Add Product</h4>
                <Link to='/user/Viewproject'>
                    <button className='btn btn-primary shadow'>Back</button>
                </Link>
            </div>
            <form className='p-3 mb-5' onSubmit={onSubmitProduct}>
                <div className="mb-3">
                    <label htmlFor="productName" className="form-label">Product Name</label>
                    <input type="text"
                        name='productName'
                        className="form-control"
                        id="productName"
                        onChange={onInputChange}
                        required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control"
                        id="description"
                        name='description'
                        rows="3"
                        onChange={onInputChange}
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="imageUrl" className="form-label">Product Image</label>
                    <input type="file"
                        name='image'
                        className="form-control-file"
                        onChange={handleImageUpload}
                        id="image" />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input type="text"
                        name='price'
                        className="form-control"
                        id="price"
                        onChange={onInputChange}
                        required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Addproduct