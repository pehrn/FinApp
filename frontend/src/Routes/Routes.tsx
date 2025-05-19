import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import BalanceSheet from "../Components/BalanceSheet/BalanceSheet";
import CashFlowStatement from "../Components/CashFlowStatement/CashFlowStatement";
import CompanyProfile from "../Components/CompanyProfile/CompanyProfile";
import IncomeStatement from "../Components/IncomeStatement/IncomeStatement";
import CompanyPage from "../Pages/CompanyPage/CompanyPage";
import DesignGuide from "../Pages/DesignGuide/DesignGuide";
import HomePage from "../Pages/HomePage/HomePage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import SearchPage from "../Pages/SearchPage/SearchPage";
import ProfilePage from "../Pages/ProfilePage/ProfilePage";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: "", element: <HomePage /> },
            { path: "login", element: <LoginPage /> },
            { path: "register", element: <RegisterPage /> },
            { path: "search", element: <ProtectedRoute><SearchPage /></ProtectedRoute> },
            { path: "design-guide", element: <DesignGuide /> },
            { path: "user/:userName", element: <ProfilePage />},
            {
                path: 
                    "company/:ticker", 
                element: 
                    <ProtectedRoute><CompanyPage /></ProtectedRoute>,
                children: [
                    { path: "company-profile", element: <CompanyProfile /> },
                    { path: "income-statement", element: <IncomeStatement /> },
                    { path: "balance-sheet", element: <BalanceSheet /> },
                    { path: "cashflow-statement", element: <CashFlowStatement /> },
                ]},
        ]
    }
]);