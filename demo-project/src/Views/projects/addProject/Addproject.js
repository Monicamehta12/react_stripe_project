import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import MultiSelect from "multiselect-react-dropdown";
import { useHistory } from 'react-router-dom'
import instance from '../../../axios';
import requests from '../../../requests'
import { errorToaster, successToaster } from "../../../common/common-validation/common";
import { GET_EMPLOYEES, GET_USERS } from '../../../redux/actions/actions';

const state = {
    id: "",
    projectName: "",
    technology: [],
    projectManager: "",
    startDate: "",
    endDate: "",
    chooseFile: "",
    members: [],
    status: "",
    details: "",

};

const Addproject = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [users, setUsers] = useState([])
    const token = useSelector((state) => state.token)
    const userId = useSelector((state) => state.userID)
    const employees = useSelector((state) => state.employees)
    console.log("userid", userId)
    console.log(token)

    useEffect(() => {
        getUsers();
        getEmployees();
    }, [])


    const getUsers = async () => {
        const response = await instance
            .get(requests.fetchUsers)
            .catch((error) => {
                let errorMessage = error.response;
                errorToaster(errorMessage);
            });
        if (response) {
            console.log("response", response.data)
            setUsers(response.data)
            dispatch(GET_USERS(response.data))
        }
    }

    const getEmployees = async() => {
        const response = await instance
        .get(requests.fetchEmployees)
        .catch((error) => {
            let errorMessage = error.response;
            errorToaster(errorMessage);
        });
        if (response){
            console.log("response employess", response.data)
            dispatch(GET_EMPLOYEES(response.data))
        }
    }

    const [projectData, setProjectData] = useState(state);

    const onInputChange = (event) => {
        const { name, value } = event.target;
        setProjectData({ ...projectData, [name]: value });
    };

    const ptechnology = projectData.technology.toString();
    console.log(ptechnology)

    const options = ['React', 'Angular', 'Node', 'Vue', 'Next']

    const mentorName = users.filter(data => data.category === 'mentor')
    console.log("mentor name", mentorName)

    const onSubmitProject = async (e) => {
        e.preventDefault();
        const data = {
            projectName: projectData.projectName,
            technology: ptechnology,
            projectManager: userId,
            startDate: projectData.startDate,
            endDate: projectData.endDate,
            chooseFile: projectData.chooseFile,
            members: projectData.members.map(data => data.value).toString(),
            status: projectData.status,
            details: projectData.details,
        }

        const response = await instance
            .post(requests.fetchAddProject, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            .catch((error) => {
                console.log(error)
                if (error) {
                    errorToaster("Unauthorized to access this route")
                }
            });
        if (response) {
            console.log("project", response.data)
            successToaster("Project Added successfully!")
            history.push("/user/Viewproject");
        }
    }


    return (
        <div className='main-content bg-light px-3 pb-5 h-100 overflow-auto'>
            <div className='d-flex align-items-center justify-content-between border-bottom py-3'>
                <h4 className='text-dark mb-0'>Add Project</h4>
                <Link to='/user/Viewproject'>
                    <button className='btn btn-primary shadow'>Back</button>
                </Link>
            </div>
            <form className='p-3 mb-5' onSubmit={onSubmitProject}>
                <div className="mb-3">
                    <label htmlFor="projectName" className="form-label">Project Name</label>
                    <input type="text"
                        name='projectName'
                        className="form-control"
                        id="projectName"
                        onChange={onInputChange}
                        required />
                </div>
                <div className="mb-3">
                    <label htmlFor="technology" className="form-label">Technology</label>
                    <MultiSelect
                        showCheckbox
                        isObject={false}
                        closeOnSelect={false}
                        options={options}
                        placeholder='Select Technology'
                        onChange={onInputChange}
                        onRemove={(data) =>
                            setProjectData({ ...projectData, technology: data })
                        }
                        onSelect={(data) =>
                            setProjectData({ ...projectData, technology: data })
                        } />
                </div>
                <div className="mb-3">
                    <label htmlFor="projectManager" className="form-label">Project Manager</label>
                    <select className="form-select" name='projectManager' onChange={onInputChange} required>
                        <option>Select Project Manager</option>
                        {mentorName.map((data, index) => (
                            <option key={index} value={data.id}>{data.firstName}</option>
                        ))}
                    </select>
                </div>
                <div className="row mb-3">
                    <div className='col'>
                        <label htmlFor="startDate" className="form-label">Start Date</label>
                        <input type="date"
                            name='startDate'
                            className="form-control"
                            id="startDate"
                            onChange={onInputChange}
                            required />
                    </div>
                    <div className='col'>
                        <label htmlFor="endDate" className="form-label">End Date</label>
                        <input type="date"
                            name='endDate'
                            className="form-control"
                            id="endDate"
                            onChange={onInputChange}
                            required />
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="chooseFile" className="form-label">Add Document</label>
                    <input type="file"
                        name='chooseFile'
                        className="form-control"
                        onChange={onInputChange}
                        id="chooseFile" />
                </div>
                <div className="mb-3">
                    <label htmlFor="addMembers" className="form-label">Add Members</label>
                    <MultiSelect
                        showCheckbox
                        name='members'
                        closeOnSelect={false}
                        options={employees}
                        displayValue= "firstName"
                        value={employees.map(data => data.value)}
                        placeholder='Select Member'
                        onChange={onInputChange}
                        onRemove={(data) =>
                            setProjectData({ ...projectData, members: data })
                        }
                        onSelect={(data) =>
                            setProjectData({ ...projectData, members: data })
                        }
                         />
                </div>
                <div className="mb-3">
                    <label htmlFor="details" className="form-label">Details</label>
                    <textarea className="form-control"
                        id="details"
                        name='details'
                        rows="3"
                        onChange={onInputChange}
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="status" className="form-label">Project Status</label>
                    <select className="form-select" name='status' onChange={onInputChange} required>
                        <option>Select Status</option>
                        <option value="Complete">Complete</option>
                        <option value="Not Complete">Not Complete</option>
                        <option value="On Hold">On Hold</option>
                        <option value="On Going">On Going</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
        
    )
}

export default Addproject
