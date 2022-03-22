const requests = {
    fetchUserRegister : "/user/register-user", 
    fetchLogin: '/user/login', 
    fetchUsers: "/user/getUsers", 
    fetchEmployees: '/user/getEmployees', 

    fetchProjects: '/user/view-user-projects', 
    fetchProjectbyId : '/project/Viewproject', 
    fetchAddProject: '/project/Addproject', 
    fetchProjectbyStatus: '/project/searchbystatus',
    fetchProjectbySearch: 'project/searchbyname',
    fetchAddTaskDetail: '/project/Viewproject/addTask', 
    fetchGetTaskDetail: '/project/tasks/getAllTaskbyProject', 
    fetchDeleteTask: '/project/tasks/deleteTask',
    
    fetchGetTaskDetailById : '/project/tasks', 
    fetchUpdateTask: '/project/tasks/updateTask',

    fetchAddProduct: '/product/Addproduct',
    fetchProducts: '/product/Viewproduct',
    fetchProductbyId: '/product/Viewproduct'
}

export default requests;