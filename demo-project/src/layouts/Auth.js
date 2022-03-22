import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import HomeNavbar from '../components/Navbars/Navbar'
import routes from '../routes'

const AuthLayout = (props) => {
    const getRoutes = (routes) => {
        return routes.map((prop, key) => {
            if (prop.layout === "/auth") {
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

    return (
        <>
            <HomeNavbar />
            <div className="container ">
                <div className="row justify-content-center align-items-center">
                    <Switch>
                    {getRoutes(routes)}
                        <Redirect from="*" to="/auth/login" />
                    </Switch>
                </div>
            </div>
        </>
    )
}

export default AuthLayout
