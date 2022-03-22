import React from 'react'
import { Link } from 'react-router-dom';
import '../../App.css'

const HomeNavbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid px-4">
            <Link to='/' className="navbar-brand text-light fs-4"><img
                    alt="..."
                    src={
                        require("../../assets/images/logoicon.png")
                    } />Ipangram</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse pt-2 pb-0" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-lg-0">
                        <li className="nav-item">
                            <Link to='/auth/register' className="nav-link">
                                <i className="uil uil-user-circle me-2"></i>Register</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/auth/login' className="nav-link">
                                <i className="uil uil-key-skeleton-alt me-1"></i>Login</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default HomeNavbar;