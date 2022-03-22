import { combineReducers } from 'redux';
import { projectReducer, registrationReducer, taskdetailReducer } from './reducer';

const rootReducer = combineReducers({
    data: registrationReducer,
    project: projectReducer,
    taskDetail: taskdetailReducer,
})

export default rootReducer