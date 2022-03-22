import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import instance from '../../axios'
import requests from '../../requests'
import { errorToaster, successToaster } from "../../common/common-validation/common";
import StripeContainer from '../../Stripe/StripeContainer';
import { ADD_TO_CART, GET_PRODUCTS } from '../../redux/actions/actions';


const Viewproduct = () => {
    const dispatch = useDispatch();
    const [viewDescription, setViewDescription] = useState(true)
    const [cartModel, setCartModel] = useState(false)
    const [product, setProduct] = useState([])
    const [productData, setProductData] = useState({});
    const [filter, setFilter] = useState("Filter By Size");
    const [search, setSearch] = useState("")
    const [showItem, setShowItem] = useState(false)
    const [imagePath, setImagePath] = useState()
    const { id } = useParams();
    const products = useSelector((state) => state.products)
    const cartData = useSelector((state) => state.cart)

    console.log("cartdata", cartData)

    useEffect(() => {
        getProducts()
        if (id) {
            getProductbyId();
            setViewDescription(false)
        }
        else {
            setViewDescription(true)
        }
    }, [id])

    const handleSelectChange = () => {

    }

    const getProducts = async () => {
        const response = await instance
            .get(requests.fetchProducts)
            .catch((error) => {
                let errorMessage = error.response;
                errorToaster(errorMessage);
            });
        if (response) {
            console.log("products", response.data)
            setProduct(response.data)
            setFilter("Filter By Status")
            dispatch(GET_PRODUCTS(response.data))
        }
    }

    const configureImage = image => {
        const result = process.env.REACT_APP_IMAGE_URL + image
        console.log("result", result)
        return result
    }

    const getProductbyId = async () => {
        const productID = id;
        console.log("productID", productID)
        const response = await instance
            .get(requests.fetchProductbyId + "/" + productID)
            .catch((error) => {
                let errorMessage = error.response;
                errorToaster(errorMessage);
            });
        if (response) {
            console.log(response.data)
            setProductData(response.data)
            setImagePath(process.env.REACT_APP_IMAGE_URL + response.data.image)
            console.log("imagepath", imagePath)
            setViewDescription(false)
        }
    }

    const handleAddToCart = (id) => {
        // const cartproduct = cartData
        dispatch(ADD_TO_CART(id))
        successToaster("Item added to cart")
        // console.log("cartproduct", productData)
        // setCartModel(true)
    }

    const getSearchData = (search) => {

    }

    const handlecheckout = () => {
        console.log("hello")
    }

    const handleSearch = (e) => {
        const searchValue = e.target.value
        setSearch(searchValue)
    }

    const options = ["XS", "S", "M", "L", "XL", "XXL"];

    return (
        <div className='main-content h-100 bg-light p-3 pb-5 overflow-auto'>
            <div className='d-flex align-items-center justify-content-between border-bottom py-1'>
                <h4 className='text-dark'>Products List</h4>
                <div>
                    <Link to="/checkout/cart-summary">
                        <button className='btn position-relative'><i className="uil uil-shopping-cart-alt fs-2 text-primary"></i>
                            {cartData && cartData.length > 0 ?
                                <span className="badge cart-badge">{cartData.length}</span>
                                : " "}
                        </button>
                    </Link>
                    <Link to='/user/Viewproject'>
                        <button className='btn bg-primary-icon text-light'>Back</button>
                    </Link>
                </div>
            </div>

            {viewDescription ? (
                <div className='product-view'>
                    <div className='product-view-header d-flex justify-content-between my-2'>
                        <div>
                            <select className="custom-select custom-select-lg p-2" onChange={handleSelectChange} value={filter}>
                                <option>{filter}</option>
                                {options.map((data, index) => (
                                    <option
                                        value={data}
                                        key={index}>{data}</option>
                                ))}

                            </select>
                            {filter !== "Filter By Status" ? (
                                <button onClick={() => getProducts()} className='btn btn-primary ms-2'>
                                    Show All
                                </button>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>

                    {product ? (
                        <div className='project-list-container d-flex flex-wrap justify-content-center justify-content-md-start pb-5'>
                            {product
                                .map((data, index) => (
                                    <div className="card card-container me-3 border-0 shadow mb-2" key={data.id}>
                                        <img crossOrigin="anonymous" src={configureImage(data.image)} className="card-img-top img-fluid h-75" alt="..." />
                                        <div className="card-body p-3 d-flex flex-column justify-content-between">
                                            <div className="card-title d-flex justify-content-between align-items-center">
                                                <h5 className='mb-0'>
                                                    {data.productName}
                                                </h5>
                                            </div>
                                            <div>
                                                <p className="card-text fs-6 mb-0">Price: {data.price}</p>
                                                <div className='d-flex justify-content-between mt-3'>
                                                    <Link to={`/product/Viewproduct/${data.id}`}><button className='btn btn-primary mx-auto'>Details</button></Link>
                                                    <button className='btn btn-primary' onClick={() => handleAddToCart(data.id)}>Add to cart</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    ) : (
                        "Loading..."
                    )}
                </div>
            ) : (
                <div className='detail-page'>
                    {showItem ?
                        <StripeContainer />
                        :

                        <div className='detail-page-container'>
                            <div className='detail-page-header d-flex align-items-center justify-content-between py-2'>
                                <h2 className='fw-bold'>{productData.productName}</h2>
                            </div>
                            <div className='detail-page-content mb-5'>
                                <div className='d-flex justify-content-center my-3'>
                                    <img crossOrigin="anonymous" src={imagePath} className="card-img w-50" alt="..." />
                                </div>
                                <h4 className='text-center'>Price : <span className='text-primary'>Rs. {productData.price}</span></h4>

                                <div className='mt-2'><h5>Description: </h5>{productData.description}</div>
                                <div className='d-flex justify-content-center my-4'>
                                    <button className='btn btn-primary me-3' onClick={() => handleAddToCart(productData.id)}>Add to cart</button>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            )}


        </div>
    )
}

export default Viewproduct