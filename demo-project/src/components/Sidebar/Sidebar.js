import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <>
            <div className='sidebar collapse collapse-horizontal h-100' id='collapseWidthExample'>
                <nav className="nav flex-column h-100 p-3 fs-5">
                    <Link to='/user/dashboard' className="nav-link text-light"><i className="uil uil-dashboard me-2"></i>Dashboard</Link>
                    <Link to='/user/Viewproject' className="nav-link text-light"><i className="uil uil-apps me-2"></i>Projects</Link>
                    <Link to='/user/Addproject' className="nav-link text-light"><i className="uil uil-create-dashboard me-2"></i>Add Project</Link>
                    <div className="dropdown-toggle text-light py-2 px-3" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="uil uil-cube me-2"></i>Products
                    </div>
                    <ul className="dropdown-menu dropdown-menu-right p-3 mx-2" aria-labelledby="dropdownMenuButton1">
                        <Link to='/product/Addproduct' className='dropdown-item'><i className="uil uil-user me-2"></i>Add Product</Link>
                        <Link to='/product/Viewproduct' className='dropdown-item'><i className="uil uil-setting me-2"></i>View Products</Link>
                    </ul>
                </nav>
            </div>
            <div className='sidebar d-none d-md-block'>
                <nav className="nav flex-column h-100 p-3 fs-5">
                    <Link to='/user/dashboard' className="nav-link text-light"><i className="uil uil-dashboard me-2"></i>Dashboard</Link>
                    <Link to='/user/Viewproject' className="nav-link text-light"><i className="uil uil-apps me-2"></i>Projects</Link>
                    <Link to='/user/Addproject' className="nav-link text-light"><i className="uil uil-create-dashboard me-2"></i>Add Project</Link>
                    <div className="dropdown-toggle text-light py-2 px-3" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="uil uil-cube me-2"></i>Products
                    </div>
                    <ul className="dropdown-menu dropdown-menu-right p-3 mx-2" aria-labelledby="dropdownMenuButton1">
                        <Link to='/product/Addproduct' className='dropdown-item'><i className="uil uil-user me-2"></i>Add Product</Link>
                        <Link to='/product/Viewproduct' className='dropdown-item'><i className="uil uil-setting me-2"></i>View Products</Link>
                    </ul>
                </nav>
            </div>
        </>

    )
}

export default Sidebar
