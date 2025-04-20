import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import CompanyProfile from "../Components/CompanyProfile/CompanyProfile";
import IncomeStatement from "../Components/IncomeStatement/IncomeStatement";
import CompanyPage from "../Pages/CompanyPage/CompanyPage";
import HomePage from "../Pages/HomePage/HomePage";
import SearchPage from "../Pages/SearchPage/SearchPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: "", element: <HomePage /> },
            { path: "search", element: <SearchPage /> },
            {
                path: 
                    "company/:ticker", 
                element: 
                    <CompanyPage />,
                children: [
                    { path: "company-profile", element: <CompanyProfile /> },
                    { path: "income-statement", element: <IncomeStatement /> },
                ]},
        ]
    }
]);