import { getProjectApi, 
    getProjectIdApi, 
    getRegistrationApi, 
    getTaskTableApi, 
    loginApi, 
    postProjectApi, 
    postTaskTableApi, 
    registrationApi } from '../../Api/api'
import { call, put, all, takeLatest, fork, takeEvery } from 'redux-saga/effects'
import * as types from '../actions/actionTypes'
import {
    getProjectError, 
    getProjectIdError, 
    getProjectIdSuccess, 
    getProjectSuccess, 
    getRegistrationDataError,
    getRegistrationDataSuccess,
    getTaskDetailError,
    getTaskDetailSuccess,
    loginError,
    loginSuccess,
    postProjectError,
    postProjectSuccess,
    postTaskError,
    postTaskSuccess,
    registrationError,
    registrationSuccess
} from '../actions/actions';

//======================RegistrationWatcher=================

function* onRegistrationWatcher({ payload }) {
    try {
        const response = yield call(registrationApi, payload)
        if (response.status === 200) {
            yield put(registrationSuccess(response.data));
        }
    } catch (error) {
        yield put(registrationError(error.message))
    }
}

//=====================Get Registration users=====================

function* onGetRegistrationDataWatcher() {
    try {
        const response = yield call(getRegistrationApi);
        if (response.status === 200) {
            yield put(getRegistrationDataSuccess(response.data));
        }
    } catch (error) {
        yield put(getRegistrationDataError(error.message));
    }
}

//=====================lOGIN users=====================
function* onLoginWatcher({ payload }) {
    try {
        const response = yield call(loginApi, payload);
        if (response.status === 200) {
            yield put(loginSuccess(response.data));
        }
    } catch (error) {
        yield put(loginError(error.message));
        console.log(error)
    }
}

//===================== Post project =====================
function* onPostProjectWatcher({ payload }) {
    try {
        const response = yield call(postProjectApi, payload);
        if (response.status === 200) {
            yield put(postProjectSuccess(response.data))
        }
    } catch (error) {
        yield put(postProjectError(error.message))
    }
}

//===================== Get project =====================
function* onGetProjectWatcher() {
    try {
        const response = yield call(getProjectApi);
        if (response.status === 200) {
            yield put(getProjectSuccess(response.data));
        }
    } catch (error) {
        yield put(getProjectError(error.message));
    }
}


//===================== Get project by Id =====================
function* onGetProjectByIdWatcher({ payload }) {
    try {
        const response = yield call(getProjectIdApi, payload);
        if(response.status === 200){
            yield put(getProjectIdSuccess(response.data));
        }
    } catch (error) {
        yield put(getProjectIdError(error.message));
    }
}

//===================== Post task detail =====================
function* onPostTaskDetailWatcher({ payload }) {
    try {
        const response = yield call(postTaskTableApi, payload);
        if (response.status === 200) {
            yield put(postTaskSuccess(response.data))
        }
    } catch (error) {
        yield put(postTaskError(error.message))
    }
}

//===================== Get task detail =====================
function* onGetTaskDetailWatcher() {
    try {
        const response = yield call(getTaskTableApi);
        if(response.status === 200) {
            yield put(getTaskDetailSuccess(response.data))
        }
    } catch (error) {
        yield put(getTaskDetailError(error.message))
    }
}


//Regsitration
function* onRegistration() {
    yield takeLatest(types.REGISTRATION, onRegistrationWatcher);
}

export function* onGetRegistrationData() {
    yield takeEvery(types.GET_REGISTRATION_DATA, onGetRegistrationDataWatcher);
}

// Login
function* onLogin() {
    yield takeLatest(types.LOGIN, onLoginWatcher);
}

//Project
function* onPostProject() {
    yield takeLatest(types.POST_PROJECT, onPostProjectWatcher);
}

function* onGetProject() {
    yield takeEvery(types.GET_PROJECT, onGetProjectWatcher);
}

function* onGetProjectById() {
    yield takeLatest(types.GET_PROJECT_ID, onGetProjectByIdWatcher);
  }


//Task Detail
function* onPostTaskDetail() {
    yield takeLatest(types.POST_TASK_DETAIL, onPostTaskDetailWatcher);
}

function* onGetTaskDetail() {
    yield takeEvery(types.GET_TASK_DETAIL, onGetTaskDetailWatcher);
}

const saga = [
    fork(onGetRegistrationData),
    fork(onRegistration),
    fork(onLogin),
    fork(onPostProject),
    fork(onGetProject),
    fork(onGetProjectById),
    fork(onPostTaskDetail),
    fork(onGetTaskDetail),
];

export default function* rootSaga() {
    yield all([...saga]);
}