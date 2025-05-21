import axios from "axios";
import React from "react";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserProfile } from "../Models/User";
import {loginAPI, registerAPI } from "../Services/AuthService";
import { handleError } from "../Helpers/ErrorHandler";

type UserContextType = {
    user: UserProfile | null;
    token: string | null;
    registerUser: (email: string, username: string, password: string) => void;
    loginUser: (email: string, password: string) => void;
    logOut: () => void;
    isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
    
    const navigate = useNavigate();
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isReady, setIsReady] = useState(false);
    
    useEffect(() => {
        // localStorage to keep it simple
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        
        if (user && token) {
            setUser(JSON.parse(user));
            setToken(token);
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        }
        
        setIsReady(true);
    }, []);
    
    const registerUser = async (email: string, username: string, password: string) => {
        await registerAPI(email, username, password).then((res) => {
            if (res) {
                localStorage.setItem("token", res?.data.token);
                const userObj = {
                    userName: res?.data.userName,
                    email: res?.data.email,
                }
                localStorage.setItem("user", JSON.stringify(userObj));
                setToken(res?.data.token!);
                setUser(userObj!);
                toast.success("Login successfull");
                setTimeout(() => navigate("/"), 50);
            }
        }).catch((e) => handleError(e));
    };

    const loginUser = async (username: string, password: string) => {
        await loginAPI(username, password).then((res) => {
            if (res) {
                localStorage.setItem("token", res?.data.token);
                const userObj = {
                    userName: res?.data.userName,
                    email: res?.data.email,
                }
                localStorage.setItem("user", JSON.stringify(userObj));
                setToken(res?.data.token!);
                setUser(userObj!);
                toast.success("Login successfull");
                setTimeout(() => navigate("/search"), 50);
            }
        }).catch((e) => handleError(e));
    };
    
    const isLoggedIn = () => {
        return !!user;
    };
    
    const logOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setToken("");
        toast.success("You have been logged out");
        setTimeout(() => navigate("/"), 50);
    };
    
    // return (
    //     <UserContext.Provider value={{ loginUser, user, token, logOut, isLoggedIn, registerUser }}>
    //         { isReady ? children : null }
    //     </UserContext.Provider>
    // );

    return isReady ? (
        <UserContext.Provider value={{ loginUser, user, token, logOut, isLoggedIn, registerUser }}>
            {children}
        </UserContext.Provider>
    ) : null;
    
};

export const useAuth = () => React.useContext(UserContext);