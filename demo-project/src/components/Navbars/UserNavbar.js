import React from 'react'
import { Link } from 'react-router-dom'

const UserNavbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-lg">
            <div className="container-fluid px-4">
                <div>
                    <button className="btn d-inline d-md-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample" aria-expanded="false" aria-controls="collapseWidthExample">
                        <i className="uil uil-align text-light fs-5 "></i>
                    </button>
                    <Link to='/' className="navbar-brand text-light fs-3"><img
                        alt="..."
                        src={
                            require("../../assets/images/logoicon.png")
                        } /><span className='d-none d-md-inline'>Ipangram</span></Link>
                </div>
                <div>
                    <div className="dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        <img className='rounded-circle img-fluid border border-2 p-1' height='50' width='50'
                            alt="..."
                            src={
                                require("../../assets/images/p-img (2).jpg")
                            } />
                    </div>
                    <ul className="dropdown-menu dropdown-menu-end p-3" aria-labelledby="dropdownMenuButton1">
                        <h6>Welcome!</h6>
                        <Link to='/' className='dropdown-item'><i className="uil uil-user me-2"></i>My Profile</Link>
                        <Link to='/' className='dropdown-item'><i className="uil uil-setting me-2"></i>Settings</Link>
                        <Link to='/auth/login' className='dropdown-item'><i className="uil uil-signout me-2"></i>Logout</Link>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default UserNavbar
