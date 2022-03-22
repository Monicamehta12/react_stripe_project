import React, { Suspense, useState } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import routes from '../routes'
import UserNavbar from '../components/Navbars/UserNavbar'
import Sidebar from '../components/Sidebar/Sidebar'
import Addproject from '../Views/projects/addProject/Addproject'
import Viewproject from '../Views/projects/viewProject/Viewproject'

const UserLayout = (props) => {
    const getRoutes = (routes) => {
        return routes.map((prop, key) => {
            if (prop.layout === "/user") {
                return (
                    <Route
                        path={prop.layout + prop.path}
                        component={prop.component}
                        key={key}
                    />
                );
            } else {
                return null;
            }
        });
    };

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
                        {getRoutes(routes)}
                        <Suspense fallback={<Loading />}>
                            <Route exact path="/user/Addproject" component={Addproject} />
                            <Route exact path="/user/Addproject/:id" component={Addproject} />
                            <Route exact path="/user/Viewproject" component={Viewproject} />
                            <Route exact path="/user/Viewproject/:id" component={Viewproject} />
                        </Suspense>
                        <Redirect from="*" to="/auth/login" />
                    </Switch>
                </div>
            </div>
        </>
    )
}

export default UserLayout

