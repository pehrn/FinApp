import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { CommentGet, CommentPost } from "../Models/Comment";

const api = "http://localhost:5000/api/comment";
// const api = "/api/comment";

export const commentPostAPI = async (title: string, content: string, symbol: string) => {
    try {
        const data = await axios.post<CommentPost>(api + `/${symbol}`, {
            title: title,
            content: content
        });
        
        return data;
        
    } catch (error) {
        handleError(error);
    }
};

export const commentsGetAPI = async (symbol: string) => {
    try {
        const data = await axios.get<CommentGet[]>(api + `?Symbol=${symbol}`);
        return data;
    } catch (error) {
        handleError(error);
    }
};

