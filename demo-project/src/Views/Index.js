import React from 'react'

const Index = () => {
    return (
        <div className='main-content bg-dark p-3 pb-5'>
            <div className='page-title border-bottom'>
                <h4 className='text-light'>Dashboard</h4>
            </div>
            <div className='row mt-4 no-gutter'>
                <div className=' col-lg-6 col-xl-3 px-2 mb-3 '>
                    <div className='card bg-card text-light'>
                        <div className='card-body'>
                            <div className='row'>
                                <div className='col-5'>
                                    <div className='info-icon bg-primary-icon d-flex align-items-center justify-content-center rounded-circle'>
                                        <i className="uil uil-comments fs-4 text-white"></i>
                                    </div>
                                </div>
                                <div className='col-7'>
                                    <div className='numbers text-end'>
                                        <p className='Number mb-0'>Number</p>
                                        <h5 className='card-title'>150GB</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='card-footer'>
                            <div className='stats'>
                                <i className="uil uil-redo me-2"></i>Update Now
                            </div>
                        </div>
                    </div>
                </div>
                <div className=' col-lg-6 col-xl-3 px-2 mb-3'>
                    <div className='card  bg-card text-light'>
                        <div className='card-body'>
                            <div className='row'>
                                <div className='col-5'>
                                    <div className='info-icon bg-secondary-icon d-flex align-items-center justify-content-center rounded-circle'>
                                        <i className="uil uil-star fs-4  text-white"></i>
                                    </div>
                                </div>
                                <div className='col-7'>
                                    <div className='numbers text-end'>
                                        <p className='Number mb-0'>Followers</p>
                                        <h5 className='card-title'>+45k</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='card-footer'>
                            <div className='stats'>
                                <i className="uil uil-heart-rate me-2"></i>Last Research
                            </div>
                        </div>
                    </div>
                </div>
                <div className=' col-lg-6 col-xl-3 px-2 mb-3'>
                    <div className='card bg-card text-light'>
                        <div className='card-body'>
                            <div className='row'>
                                <div className='col-5'>
                                    <div className='info-icon bg-info-icon d-flex align-items-center justify-content-center rounded-circle'>
                                        <i className="uil uil-user fs-4 text-white"></i>
                                    </div>
                                </div>
                                <div className='col-7'>
                                    <div className='numbers text-end'>
                                        <p className='Number mb-0'>Users</p>
                                        <h5 className='card-title'>1,50,000</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='card-footer'>
                            <div className='stats'>
                                <i className="uil uil-trophy me-2"></i>Customers Feedback
                            </div>
                        </div>
                    </div>
                </div>
                <div className=' col-lg-6 col-xl-3 px-2 mb-3'>
                    <div className='card bg-card text-light'>
                        <div className='card-body'>
                            <div className='row'>
                                <div className='col-5'>
                                    <div className='info-icon bg-danger-icon d-flex align-items-center justify-content-center rounded-circle'>
                                        <i className="uil uil-exclamation-octagon fs-4 text-white"></i>
                                    </div>
                                </div>
                                <div className='col-7'>
                                    <div className='numbers text-end'>
                                        <p className='Number mb-0'>Errors</p>
                                        <h5 className='card-title'>12</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='card-footer'>
                            <div className='stats'>
                                <i className="uil uil-stopwatch me-2"></i>In the last hours
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row my-2'>
                <div className='col-xl-8 mb-3'>
                    <div className='card bg-card shadow text-light'>
                        <div className='card-header'>
                            <div className='row align-items-center'>
                                <div className='col'>
                                    <h4 className='mb-0'>Page visits</h4>
                                </div>
                                <div className='col  text-end'>
                                    <button className='btn bg-info-icon text-light'>See all</button>
                                </div>
                            </div>
                        </div>
                        <div className='table-responsive'>
                            <table className='table bg-card text-light fw-light'>
                                <thead>
                                    <tr>
                                        <th scope="col" className='fw-light'>Page name</th>
                                        <th scope="col" className='fw-light'>Visitors</th>
                                        <th scope="col" className='fw-light'>Unique users</th>
                                        <th scope="col" className='fw-light'>Bounce rate</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row" className='fw-light'>/argon/</th>
                                        <td>4,569</td>
                                        <td>340</td>
                                        <td>
                                            <i className="uil uil-arrow-up text-success mr-3" /> 46,53%
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className='fw-light'>/argon/index.html</th>
                                        <td>3,985</td>
                                        <td>319</td>
                                        <td>
                                            <i className="uil uil-arrow-down text-warning mr-3" />{" "}
                                            46,53%
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className='fw-light'>/argon/charts.html</th>
                                        <td>3,513</td>
                                        <td>294</td>
                                        <td>
                                            <i className="uil uil-arrow-down text-warning mr-3" />{" "}
                                            36,49%
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className='fw-light'>/argon/tables.html</th>
                                        <td>2,050</td>
                                        <td>147</td>
                                        <td>
                                            <i className="uil uil-arrow-up text-success mr-3" /> 50,87%
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className='fw-light'>/argon/profile.html</th>
                                        <td>1,795</td>
                                        <td>190</td>
                                        <td>
                                            <i className="uil uil-arrow-down text-danger mr-3" />{" "}
                                            46,53%
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className='col-xl-4 mb-3'>
                    <div className='card bg-card shadow text-light'>
                        <div className='card-header'>
                            <div className='row align-items-center'>
                                <div className='col'>
                                    <h5 className='mb-0'>Social Traffic</h5>
                                </div>
                                <div className='col text-end'>
                                    <button className='btn bg-info-icon text-light'>See all</button>
                                </div>
                            </div>
                        </div>
                        <div className='table-responsive'>
                            <table className='table bg-card text-light fw-light'>
                                <thead>
                                    <tr>
                                        <th scope="col" className='fw-light'>Referral</th>
                                        <th scope="col" className='fw-light'>Visitors</th>
                                        <th scope="col" />
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row" className='fw-light'>Facebook</th>
                                        <td>1,480</td>
                                        <td className='text-end'>
                                            <div className="d-flex align-items-center justify-content-between">
                                                <span>100%</span>
                                                <div className="progress">
                                                    <div className="progress-bar bg-success w-100" role="progressbar"
                                                     aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"> </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className='fw-light'>Facebook</th>
                                        <td>5,480</td>
                                        <td>
                                            <div className="d-flex align-items-center justify-content-between">
                                                <span>100%</span>
                                                <div className="progress">
                                                    <div className="progress-bar bg-success w-100" role="progressbar"
                                                     aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className='fw-light'>Google</th>
                                        <td>4,807</td>
                                        <td>
                                            <div className="d-flex align-items-center justify-content-between">
                                                <span>75%</span>
                                                <div className="progress">
                                                    <div className="progress-bar bg-warning w-75" role="progressbar"
                                                     aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className='fw-light'>Instagram</th>
                                        <td>3,678</td>
                                        <td>
                                            <div className="d-flex align-items-center justify-content-between">
                                                <span>25%</span>
                                                <div className="progress">
                                                    <div className="progress-bar bg-danger w-25" role="progressbar"
                                                     aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className='fw-light'>twitter</th>
                                        <td>2,645</td>
                                        <td>
                                            <div className="d-flex align-items-center justify-content-between">
                                                <span>50%</span>
                                                <div className="progress">
                                                    <div className="progress-bar bg- w-50" role="progressbar"
                                                     aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row my-2 mb-4'>
                <div className='col-xl-8 mb-4'>
                    <div className='card bg-card shadow text-light'>
                        <div className='card-header'>
                            <div className='row align-items-center'>
                                <div className='col'>
                                    <h4 className='mb-0'>Page visits</h4>
                                </div>
                                <div className='col  text-end'>
                                    <button className='btn bg-info-icon text-light'>See all</button>
                                </div>
                            </div>
                        </div>
                        <div className='table-responsive'>
                            <table className='table bg-card text-light fw-light'>
                                <thead>
                                    <tr>
                                        <th scope="col" className='fw-light'>Page name</th>
                                        <th scope="col" className='fw-light'>Visitors</th>
                                        <th scope="col" className='fw-light'>Unique users</th>
                                        <th scope="col" className='fw-light'>Bounce rate</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row" className='fw-light'>/argon/</th>
                                        <td>4,569</td>
                                        <td>340</td>
                                        <td>
                                            <i className="uil uil-arrow-up text-success mr-3" /> 46,53%
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className='fw-light'>/argon/index.html</th>
                                        <td>3,985</td>
                                        <td>319</td>
                                        <td>
                                            <i className="uil uil-arrow-down text-warning mr-3" />{" "}
                                            46,53%
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className='fw-light'>/argon/charts.html</th>
                                        <td>3,513</td>
                                        <td>294</td>
                                        <td>
                                            <i className="uil uil-arrow-down text-warning mr-3" />{" "}
                                            36,49%
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className='fw-light'>/argon/tables.html</th>
                                        <td>2,050</td>
                                        <td>147</td>
                                        <td>
                                            <i className="uil uil-arrow-up text-success mr-3" /> 50,87%
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className='fw-light'>/argon/profile.html</th>
                                        <td>1,795</td>
                                        <td>190</td>
                                        <td>
                                            <i className="uil uil-arrow-down text-danger mr-3" />{" "}
                                            46,53%
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className='col-xl-4 mb-4'>
                    <div className='card bg-card shadow text-light'>
                        <div className='card-header'>
                            <div className='row align-items-center'>
                                <div className='col'>
                                    <h5 className='mb-0'>Social Traffic</h5>
                                </div>
                                <div className='col text-end'>
                                    <button className='btn bg-info-icon text-light'>See all</button>
                                </div>
                            </div>
                        </div>
                        <div className='table-responsive'>
                            <table className='table bg-card text-light fw-light'>
                                <thead>
                                    <tr>
                                        <th scope="col" className='fw-light'>Referral</th>
                                        <th scope="col" className='fw-light'>Visitors</th>
                                        <th scope="col" />
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row" className='fw-light'>Facebook</th>
                                        <td>1,480</td>
                                        <td className='text-end'>
                                            <div className="d-flex align-items-center justify-content-between">
                                                <span>100%</span>
                                                <div className="progress">
                                                    <div className="progress-bar bg-success w-100" role="progressbar"
                                                     aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"> </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className='fw-light'>Facebook</th>
                                        <td>5,480</td>
                                        <td>
                                            <div className="d-flex align-items-center justify-content-between">
                                                <span>100%</span>
                                                <div className="progress">
                                                    <div className="progress-bar bg-success w-100" role="progressbar"
                                                     aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className='fw-light'>Google</th>
                                        <td>4,807</td>
                                        <td>
                                            <div className="d-flex align-items-center justify-content-between">
                                                <span>75%</span>
                                                <div className="progress">
                                                    <div className="progress-bar bg-warning w-75" role="progressbar"
                                                     aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className='fw-light'>Instagram</th>
                                        <td>3,678</td>
                                        <td>
                                            <div className="d-flex align-items-center justify-content-between">
                                                <span>25%</span>
                                                <div className="progress">
                                                    <div className="progress-bar bg-danger w-25" role="progressbar"
                                                     aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className='fw-light'>twitter</th>
                                        <td>2,645</td>
                                        <td>
                                            <div className="d-flex align-items-center justify-content-between">
                                                <span>50%</span>
                                                <div className="progress">
                                                    <div className="progress-bar bg- w-50" role="progressbar"
                                                     aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index
