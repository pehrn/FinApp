import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import {EditUser, User } from "../Models/User";

const api = "http://localhost:5000/api/account/";
// const api = "/api/account/";

export const getUserProfileAPI = async (userName: string) => {
    try {
        const data = await axios.get<User>(api + userName);
        return data;
    } catch (error) {
        handleError(error);
    }
};

export const updateProfileAPI = async (username: string, aboutMe: string, position: string) => {
    try {

        const data = await axios.post<EditUser>(api + "account/edit-profile/", {
            username: username,
            aboutMe: aboutMe,
            position: position,
        });

        return data;

    } catch (error) {
        handleError(error);
    }
};

