import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { User } from "../Models/User";

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

