import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import {PortfolioDelete, PortfolioGet, PortfolioPost } from "../Models/Portfolio";

const api = "http://localhost:5000/api/portfolio";
// const api = "http://localhost:5210/api/portfolio";
// const api = "/api/portfolio";

export const portfolioAddAPI = async (symbol: string) => {
    try {
        const data = await axios.post<PortfolioPost>(api + `?symbol=${symbol}`);
        return data;
    } catch (error) {
        handleError(error);
    }
};

export const portfolioDeleteAPI = async (symbol: string) => {
    try {
        const data = await axios.delete<PortfolioDelete>(api + `?symbol=${symbol}`);
        return data;
    } catch (error) {
        handleError(error);
    }
};

export const portfolioGetAPI = async () => {
    try {
        const data = await axios.get<PortfolioGet[]>(api);
        return data;
    } catch (error) {
        handleError(error);
    }
};