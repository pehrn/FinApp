import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/useAuth";
import logo from "./logo3.png";
import "./Navbar.css";

interface Props {}

const Navbar = (props: Props) => {
    
    const { isLoggedIn, user, logOut } = useAuth();
    
    return (
        <nav className="relative container mx-auto p-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-20">
                    <Link to="/">
                        <img src={logo} alt="" />
                    </Link>
                    <div className="hidden font-bold lg:flex">
                        <FaMagnifyingGlass />
                        <Link to="/search" className="text-black hover:text-darkBlue ml-3">
                            Search
                        </Link>
                    </div>
                </div>
                { isLoggedIn() ? (
                    <div className="hidden lg:flex items-center space-x-6 text-back">
                        <div className="hover:text-darkBlue">Welcome back, { user?.userName }.</div>
                        <a onClick={logOut} className="px-4 py-1 font-bold rounded text-white bg-red-500 hover:opacity-70">
                            Logout
                        </a>
                    </div>
                ) : (
                    <div className="hidden lg:flex items-center space-x-6 text-back">
                        <Link to="/login" className="hover:text-darkBlue">Login</Link>
                        <Link
                            to="/register"
                            className="px-8 py-3 font-bold rounded text-white bg-lightGreen hover:opacity-70"
                        >
                            Signup
                        </Link>
                    </div>
                ) }

            </div>
        </nav>
    );
};

export default Navbar;
