import React, { Suspense, useState } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import routes from '../routes'
import UserNavbar from '../components/Navbars/UserNavbar'
import Sidebar from '../components/Sidebar/Sidebar'
import Addproduct from '../Views/products/Addproduct';
import Viewproduct from '../Views/products/Viewproduct';

const Product = () => {
    const Loading = () => (
        <div className='d-flex align-items-center justify-content-center'>
            <h1>Loading...</h1>
        </div>
    );

  return (
    <>
            <UserNavbar />
            <div className='d-flex w-100 h-100'>
                <Sidebar />
                <div className='container w-100 overflow-auto px-0'>
                    <Switch>
                        <Suspense fallback={<Loading />}>
                            <Route exact path="/product/Addproduct" component={Addproduct} />
                            <Route exact path="/product/Addproduct/:id" component={Addproduct} />
                            <Route exact path="/product/Viewproduct" component={Viewproduct} />
                            <Route exact path="/product/Viewproduct/:id" component={Viewproduct} />
                        </Suspense>
                        <Redirect from="*" to="/auth/login" />
                    </Switch>
                </div>
            </div>
        </>
  )
}

export default Product