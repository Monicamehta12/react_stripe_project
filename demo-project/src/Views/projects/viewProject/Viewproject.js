import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import instance from '../../../axios'
import requests from '../../../requests'
import { errorToaster, successToaster } from "../../../common/common-validation/common";

const initialState = {
    date: '',
    estimatedDuration: '',
    finalTime: '',
    status: '',
    comment: '',
    reply: '',
    qa: false,
    codeQuality: false,
    approvedByClient: false,
    developerName: '',
}

const Viewproject = () => {
    const [projectData, setProjectData] = useState({});
    const [filter, setFilter] = useState("Filter By Status");
    const [editMode, setEditMode] = useState(false)
    const [DetailPage, setDetailPage] = useState(true);
    const [project, setProject] = useState([])
    const { id } = useParams();
    const [taskID, setTaskId] = useState();
    const [taskDetail, setTaskDetail] = useState([])
    const [search, setSearch] = useState("")
    const [projectManager, setProjectManager] = useState("")
    const [employeeName, setEmployeeName] = useState("")
    const token = useSelector((state) => state.token)
    console.log("token", token)
    const users = useSelector((state) => state.users)
    console.log("users", users)

    const dName = users.filter(data => data.category === 'employee')
    console.log("developerName", dName)

    const [taskData, setTaskData] = useState(initialState);

    const { date, estimatedDuration, finalTime, status, comment, reply, qa, codeQuality, approvedByClient, developerName } = taskData

    const handleChangeAll = (e) => {
        const name = e.target.name;
        const value =
            e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setTaskData({ ...taskData, [name]: value });
    };

    const taskSubmitHandler = async () => {
        const taskdata = {
            date: taskData.date,
            estimatedDuration: taskData.estimatedDuration,
            finalTime: taskData.finalTime,
            status: taskData.status,
            comment: taskData.comment,
            reply: taskData.reply,
            qa: taskData.qa,
            codeQuality: taskData.codeQuality,
            approvedByClient: taskData.approvedByClient,
            developerName: taskData.developerName,
            project_id: id
        }
        const response = await instance
            .post(requests.fetchAddTaskDetail, taskdata, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            .catch((error) => {
                let errorMessage = error.response;
                errorToaster(errorMessage);
            });
        if (response) {
            console.log("task", response.data)
            successToaster("Task detail Added successfully!")
        }
    }


    useEffect(() => {
        getProjects();
        if (id) {
            getProjectbyId();
            getTaskDetail();
            setDetailPage(false)
        }
        else {
            setDetailPage(true)
        }
    }, [id])


    //fetching projects
    const getProjects = async () => {
        const response = await instance
            .get(requests.fetchProjects, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            .catch((error) => {
                let errorMessage = error.response;
                errorToaster(errorMessage);
            });
        if (response) {
            console.log("projcet", response.data)
            setProject(response.data)
            setFilter("Filter By Status")
        }
    }

    const getProjectbyId = async (req, res, next) => {
        const projectID = id;
        console.log("projectid", projectID)
        const response = await instance
            .get(requests.fetchProjectbyId + "/" + projectID, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .catch((error) => {
                let errorMessage = error.response;
                errorToaster(errorMessage);
            });
        if (response) {
            console.log(response.data)
            setProjectData(response.data)
            setProjectManager(response.data.projectManager)
            setEmployeeName(response.data.members)
            setDetailPage(false)
        }
    }

    //converting user ids to name 
    const projectManagerName = users.filter(data => projectManager === data.id).map(data => data.firstName)
    console.log("projectManagerName", projectManagerName)

    console.log("employeeName",employeeName)

    const teamMembers = users.filter(data => employeeName.includes(data.id)).map(data => data.firstName).toString()
    console.log("teamMembers",teamMembers)


    //fetching task details
    const getTaskDetail = async () => {
        const projectID = id;
        console.log("projectid", projectID)
        const response = await instance
            .get(requests.fetchGetTaskDetail + "/" + projectID, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .catch((error) => {
                let errorMessage = error.response;
                errorToaster(errorMessage);
            });
        if (response) {
            console.log(response.data)
            setTaskDetail(response.data)
        }
    }



    const getTaskDetailById = async (taskId) => {
        const response = await instance
            .get(requests.fetchGetTaskDetailById + "/" + taskId, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .catch((error) => {
                let errorMessage = error.response;
                errorToaster(errorMessage);
            });
        if (response) {
            console.log("task--", response.data.data)
            const singleTask = response.data.data
            setTaskData({ ...singleTask });
            setTaskId(taskId)
            setEditMode(true);
        }
    }

    console.log("taskData", taskData)

    //handling delete
    const handleDelete = async (taskId) => {
        const response = await instance
            .delete(requests.fetchDeleteTask + "/" + taskId, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .catch((error) => {
                let errorMessage = error.response;
                errorToaster(errorMessage);
            });
        if (response) {
            console.log("task--", response.data)
            successToaster("Task deleted successfully!")
        }
    }

    // handling filter
    const handleFilter = async (data) => {
        const option = data
        console.log("status", option)
        const response = await instance
            .get(requests.fetchProjectbyStatus + "/" + option, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .catch((error) => {
                let errorMessage = error.response;
                errorToaster(errorMessage);
            });
        if (response) {
            console.log("response", response.data)
            setProject(response.data)
        }
        else {
            errorToaster("Cannot find Project with this status")
        }
    }

    const handleSelectChange = (e) => {
        const statusValue = e.target.value
        setFilter(statusValue);
        handleFilter(statusValue)
    }

    const handleSearch = (e) => {
        const searchValue = e.target.value
        setSearch(searchValue)
    }

    // handling search bar
    const getSearchData = async (search) => {
        const searchValue = search
        console.log("searchvalue", searchValue)
        const response = await instance
            .get(requests.fetchProjectbySearch + "/" + searchValue, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .catch((error) => {
                let errorMessage = error.response;
                errorToaster(errorMessage);
            });
        if (response && response.data && response.data.length > 0) {
            console.log("response", response.data)
            setProject(response.data)
        }
        else {
            errorToaster("Cannot find Project with this Name")
        }
    }

    // handling update
    const handleUpdate = async () => {
        console.log(taskID)
        const response = await instance
            .put(requests.fetchUpdateTask + "/" + taskID, taskData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .catch((error) => {
                let errorMessage = error.response;
                errorToaster(errorMessage);
            });
        if (response && response.data) {
            console.log("response", response.data)
            successToaster("Task Data updated successfully!")
            setEditMode(false)
        }
    }

    const options = ["Complete", "Not Complete", "On Going", "On Hold"];


    return (
        <div className='main-content h-100 bg-light p-3 pb-5 overflow-auto'>
            <div className='d-flex align-items-center justify-content-between border-bottom py-1'>
                <h4 className='text-dark'>Project Dashboard</h4>
                <Link to='/user/Viewproject'>
                    <button className='btn bg-primary-icon text-light'>Back</button>
                </Link>
            </div>

            {DetailPage ? (
                <div className='project-view'>
                    <div className='project-view-header d-flex justify-content-between my-2'>
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
                                <button onClick={() => getProjects()} className='btn btn-primary ms-2'>
                                    Show All
                                </button>
                            ) : (
                                ""
                            )}
                        </div>
                        <div>
                            <input
                                className='p-1 me-2'
                                type="text"
                                placeholder="Search here"
                                onChange={handleSearch}
                            />
                            <button className='btn btn-primary' onClick={() => getSearchData(search)}>Search</button>
                        </div>
                    </div>

                    {project ? (
                        <div className='project-list-container d-flex flex-wrap justify-content-center justify-content-md-start pb-5'>
                            {project
                                .map((data, index) => (
                                    <div className="card card-container me-2 bg-dark text-white border-0 shadow mb-2" key={data.id}>
                                        <img src={
                                            require("../../../assets/images/projectimg3.jpg")
                                        } className="card-img" alt="..." />
                                        <div className="card-img-overlay p-3 d-flex flex-column justify-content-between">
                                            <div className="card-title d-flex justify-content-between align-items-center">
                                                <h5 className='mb-0'>
                                                    {data.projectName}
                                                </h5>
                                                <small className='d-flex align-items-center badge-dot'>
                                                    <i
                                                        className={
                                                            data.status === 'Complete'
                                                                ? 'bg-success'
                                                                : data.status === 'On Hold'
                                                                    ? 'bg-warning'
                                                                    : data.status === 'On Going'
                                                                        ? 'bg-info'
                                                                        : data.status === 'Not Complete'
                                                                            ? 'bg-danger badge-dot'
                                                                            : 'bg-secondary'
                                                        }
                                                    />
                                                    {data.status ? data.status : 'Yet to updated'}
                                                </small>
                                            </div>
                                            <div>
                                                <p className="card-text fs-6 mb-0">Mentor Name: {users.filter(item => data.projectManager === item.id).map(item => item.firstName)}</p>
                                                <p className="card-text fs-6 mb-0">Start Date: {data.startDate}</p>
                                                <p className="card-text fs-6 mb-0">End Date: {data.endDate}</p>
                                                <div className='text-center mt-3'>
                                                    <Link to={`/user/Viewproject/${data.id}`}><button className='btn btn-primary mx-auto'>Details</button></Link>
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
                    <div className='detail-page-container'>
                        <div className='detail-page-header d-flex align-items-center justify-content-between py-2'>
                            <h2 className='fw-bold'>{projectData.projectName}</h2>
                            <button className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#exampleModal">Add task list</button>
                            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">

                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">Task List</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <form className='p-3 mb-5' >
                                                <div className="mb-3 d-flex align-items-center">
                                                    <label htmlFor="date" className="form-label"></label>
                                                    <input type="date"
                                                        name='date'
                                                        className="form-control"
                                                        id="date"
                                                        value={date || ""}
                                                        onChange={handleChangeAll}
                                                        required />
                                                </div>
                                                <div className="mb-3 d-flex align-items-center">
                                                    <label htmlFor='estimatedDuration' className='form-label'></label>
                                                    <input type='number'
                                                        name='estimatedDuration'
                                                        className='form-control'
                                                        id='estimatedDuration'
                                                        value={estimatedDuration || ""}
                                                        placeholder='Estimated Duration'
                                                        onChange={handleChangeAll}
                                                        required />
                                                </div>
                                                <div className="mb-3 d-flex align-items-center">
                                                    <label htmlFor='finalTime' className='form-label'></label>
                                                    <input type='number'
                                                        name='finalTime'
                                                        className='form-control'
                                                        id='finalTime'
                                                        placeholder='Final Time'
                                                        value={finalTime || ""}
                                                        onChange={handleChangeAll}
                                                        required />
                                                </div>
                                                <div className='d-flex justify-content-between mb-3'>
                                                    <div className="form-check ">
                                                        {status === "Complete" ? (
                                                            <input
                                                                className="form-check-input"
                                                                checked
                                                                type="radio"
                                                                name="status"
                                                                value="Complete"
                                                                id="flexRadioDefault1"
                                                                onChange={handleChangeAll}
                                                            />
                                                        ) : (
                                                            <input
                                                                className="form-check-input"
                                                                type="radio"
                                                                name="status"
                                                                value="Complete"
                                                                id="flexRadioDefault1"
                                                                onChange={handleChangeAll}
                                                            />
                                                        )}
                                                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                            Complete
                                                        </label>
                                                    </div>
                                                    <div className="form-check">
                                                            {status === "InComplete" ? (
                                                            <input
                                                                className="form-check-input"
                                                                checked
                                                                type="radio"
                                                                name="status"
                                                                value="InComplete"
                                                                id="flexRadioDefault2"
                                                                onChange={handleChangeAll}
                                                            />
                                                        ) : (
                                                            <input
                                                                className="form-check-input"
                                                                type="radio"
                                                                name="status"
                                                                value="InComplete"
                                                                id="flexRadioDefault2"
                                                                onChange={handleChangeAll}
                                                            />
                                                        )}
                                                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                                                            InComplete
                                                        </label>
                                                    </div>
                                                    <div className="form-check">
                                                             {status === "On-Going" ? (
                                                            <input
                                                                className="form-check-input"
                                                                checked
                                                                type="radio"
                                                                name="status"
                                                                value="On-Going"
                                                                id="flexRadioDefault3"
                                                                onChange={handleChangeAll}
                                                            />
                                                        ) : (
                                                            <input
                                                                className="form-check-input"
                                                                type="radio"
                                                                name="status"
                                                                value="On-Going"
                                                                id="flexRadioDefault3"
                                                                onChange={handleChangeAll}
                                                            />
                                                        )}
                                                        <label className="form-check-label" htmlFor="flexRadioDefault3">
                                                            On-Going
                                                        </label>
                                                    </div>
                                                    <div className="form-check ">
                                                             {status === "On-Hold" ? (
                                                            <input
                                                                className="form-check-input"
                                                                checked
                                                                type="radio"
                                                                name="status"
                                                                value="On-Hold"
                                                                id="flexRadioDefault4"
                                                                onChange={handleChangeAll}
                                                            />
                                                        ) : (
                                                            <input
                                                                className="form-check-input"
                                                                type="radio"
                                                                name="status"
                                                                value="On-Hold"
                                                                id="flexRadioDefault4"
                                                                onChange={handleChangeAll}
                                                            />
                                                        )}
                                                        <label className="form-check-label" htmlFor="flexRadioDefault4">
                                                            On-Hold
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="mb-3 d-flex align-items-center">
                                                    <label htmlFor="comment" className="form-label"></label>
                                                    <input type="text"
                                                        name='comment'
                                                        className="form-control"
                                                        id="comment"
                                                        placeholder='Comment'
                                                        value={comment || ""}
                                                        onChange={handleChangeAll}
                                                        required />
                                                </div>
                                                <div className="mb-3 d-flex align-items-center">
                                                    <label htmlFor="reply" className="form-label"></label>
                                                    <input type="text"
                                                        name='reply'
                                                        className="form-control"
                                                        id="reply"
                                                        placeholder='Reply'
                                                        value={reply || ""}
                                                        onChange={handleChangeAll}
                                                        required />
                                                </div>
                                                <div className="mb-3 d-flex align-items-center">
                                                    {qa === true ? (
                                                        <input
                                                            className="form-check-input"
                                                            checked
                                                            type="checkbox"
                                                            name='qa'
                                                            id="qa"
                                                            onChange={handleChangeAll}
                                                        />
                                                    ) : (
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            name='qa'
                                                            id="qa"
                                                            onChange={handleChangeAll}
                                                        />
                                                    )}
                                                    <label className="form-check-label ms-2" htmlFor="qa">
                                                        QA
                                                    </label>
                                                </div>
                                                <div className="mb-3 d-flex align-items-center">
                                                    {codeQuality === true ? (
                                                        <input
                                                            className="form-check-input"
                                                            checked
                                                            type="checkbox"
                                                            name='codeQuality'
                                                            id="codeQuality"
                                                            onChange={handleChangeAll}
                                                        />
                                                    ) : (
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            name='codeQuality'
                                                            id="codeQuality"
                                                            onChange={handleChangeAll}
                                                        />
                                                    )}
                                                    <label className="form-check-label ms-2" htmlFor="codeQuality">
                                                        Code Quality
                                                    </label>
                                                </div>
                                                <div className="mb-3 d-flex align-items-center">
                                                    {approvedByClient === true ? (
                                                        <input
                                                            className="form-check-input"
                                                            checked
                                                            type="checkbox"
                                                            name='approvedByClient'
                                                            id="approvedByClient"
                                                            onChange={handleChangeAll}
                                                        />
                                                    ) : (
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            name='approvedByClient'
                                                            id="approvedByClient"
                                                            onChange={handleChangeAll}
                                                        />
                                                    )}
                                                    <label className="form-check-label ms-2" htmlFor="approvedByClient">
                                                        Approved by Client
                                                    </label>
                                                </div>
                                                <div className="mb-3 d-flex align-items-center">
                                                    <label htmlFor="developerName" className="form-label"></label>
                                                    <select className="form-select" name="developerName" id="developerName" value={developerName || ""} onChange={handleChangeAll}>
                                                        <option>Select Developer</option>
                                                        {dName.map((data, index) => (
                                                            <option
                                                                value={data.id}
                                                                key={index}>{data.firstName}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                {!editMode ? (
                                                    <button type="submit" className="btn btn-primary" onClick={taskSubmitHandler}>Submit</button>
                                                ) : (
                                                    <button className='btn btn-primary' onClick={handleUpdate}>Update</button>
                                                )}

                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='detail-page-content'>
                            <h5>Project Manager : <span className='text-primary'>{projectManagerName}</span></h5>
                            <h5>Technology : <span className='text-primary'>{projectData.technology}</span></h5>
                            <h5>Project Members : <span className='text-primary'>
                                {teamMembers}</span></h5>
                            <h5>Start Date : <span className='text-primary'>{projectData.startDate}</span></h5>
                            <h5>End Date : <span className='text-primary'>{projectData.endDate}</span></h5>

                            <span className='d-inline-flex align-items-center badge-dot border-dashed rounded-2 p-2 fs-5 my-3'>
                                <i
                                    className={
                                        projectData.status === 'Complete'
                                            ? 'bg-success'
                                            : projectData.status === 'On Hold'
                                                ? 'bg-warning'
                                                : projectData.status === 'On Going'
                                                    ? 'bg-info'
                                                    : projectData.status === 'Not Complete'
                                                        ? 'bg-danger badge-dot'
                                                        : 'bg-secondary'
                                    }
                                />
                                {projectData.status}
                            </span>
                            <div className='mt-2'><h5>Details: </h5>{projectData.details}</div>
                        </div>
                    </div>
                    <div className='task-list py-5'>
                        <h5 className='py-2 border-top border-bottom'>Task Details table</h5>
                        <div className='table-responsive'>
                            <table className="table table-bordered">
                                <thead className='table-dark'>
                                    <tr>
                                        <th scope="col">Date</th>
                                        <th scope="col">Estimated Duration</th>
                                        <th scope="col">Final Time</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Comment</th>
                                        <th scope="col">Reply</th>
                                        <th scope="col">QA</th>
                                        <th scope="col">Code Quality</th>
                                        <th scope="col">Approved by client</th>
                                        <th scope="col">Developer Name</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                {taskDetail.map((item, index) => (
                                    <tbody key={index}>
                                        <tr>
                                            <td>{item.date}</td>
                                            <td>{item.estimatedDuration}</td>
                                            <td>{item.finalTime}</td>
                                            <td>{item.status}</td>
                                            <td>{item.comment}</td>
                                            <td>{item.reply}</td>
                                            <td>{item.qa.toString()}</td>
                                            <td>{item.codeQuality.toString()}</td>
                                            <td>{item.approvedByClient.toString()}</td>
                                            <td>{users.filter(data => item.developerName === data.id).map(data => data.firstName)}</td>
                                            <td className='d-flex'>
                                                <button data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => getTaskDetailById(item.id)} className='btn btn-link'><i className="uil uil-edit-alt"></i></button>
                                                <button onClick={() => handleDelete(item.id)} className='btn btn-link'><i className="uil uil-trash-alt"></i></button>
                                            </td>
                                        </tr>
                                    </tbody>
                                ))}
                            </table>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default Viewproject
