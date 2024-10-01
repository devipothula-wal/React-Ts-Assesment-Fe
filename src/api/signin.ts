
import { login, signUp } from '../types/signin';
import _ from 'lodash';
import addNotification from "../utils/notification";
import axiosInstance from "../axiosConfig";

// Create a user
export const createUser = async (user: signUp) => {
    try {
        const response = await axiosInstance.post(`/user`, user);
        return response.data;
    }
    catch (err) {
        addNotification({
            type: "danger",
            title: "Error",
            message: _.get(
                err,
                "response.data.message",
                "Oops! Something went wrong"
            ),
        });
    }
    
};

//login API
export const loginApi = async (user: login) => {
    try {
        const response = await axiosInstance.post(`/user/login`, user);
        return response.data;
    }
    catch (err:any) {
        addNotification({
            type: "danger",
            title: "Error",
            message: _.get(
                err,
                "response.data.message",
                "Oops! Something went wrong"
            ),
        });
    }
    
};