import React, {useEffect, useState } from 'react';
import { getUserProfileAPI } from '../../../Services/ProfileService';
import { toast } from 'react-toastify';
import {Link, useParams } from 'react-router-dom';
import { User } from '../../../Models/User';

interface Props {};

const UserProfile = (props: Props) => {

    let { userName } = useParams();

    const [user, setUser] = useState<User>();
    const [currentUser, setCurrentUser] = useState<User | null>(null);


    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
        }
        getUser();
    }, [userName]);

    const getUser = () => {
        getUserProfileAPI(userName!)
            .then((res) => {
                setUser(res?.data!);
            })
            .catch((err) => {
                toast.error(err);
            });
    };

    return <>
        { user ? (
            <div className="mx-auto">
                <div className="flex items-center space-x-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">@{user?.userName}</h2>
                        <p className="text-gray-500">{user?.position}</p>
                        <p className="mt-2 text-sm text-gray-400">{user?.aboutMe}</p>
                    </div>
                    { currentUser && currentUser.userName == user?.userName && (
                        <div className="mt-6 text-right">
                            <Link
                                to={`/user/${user?.userName}/edit-profile`}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition inline-block"
                            >
                                Edit Profile
                            </Link>
                        </div>
                    )}
                </div>
                <div className="mt-6 border-t pt-4">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Portfolio</h3>

                    {user?.portfolio && user.portfolio.length > 0 ? (
                        <div className="grid gap-4">
                            {user.portfolio.map((stock: any) => (

                                <div
                                    key={stock.id}
                                    className="p-4 bg-gray-100 rounded-xl shadow-sm hover:shadow-md transition"
                                >
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <Link to={`/company/${stock.symbol}/company-profile`}  className="text-lg font-bold text-indigo-600 hover:underline">
                                                {stock.symbol}
                                            </Link>
                                            <p className="text-sm text-gray-500">{stock.companyName}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-gray-600">Purchase: ${stock.purchase.toFixed(2)}</p>
                                            <p className="text-sm text-gray-600">Dividend: ${stock.lastDiv}</p>
                                        </div>
                                    </div>
                                    <p className="mt-2 text-xs text-gray-400 italic">{stock.industry}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">No stocks in portfolio.</p>
                    )}
                </div>
                <div className="mt-6 border-t pt-4">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Comments</h3>

                    {user?.comments && user.comments.length > 0 ? (
                        <div className="grid gap-4">
                            {user.comments.map((comment: any) => {
                                const stock = user.portfolio.find((s: any) => s.id === comment.stockId);

                                return (
                                    <div
                                        key={comment.id}
                                        className="p-4 bg-gray-100 rounded-xl shadow-sm hover:shadow-md transition"
                                    >
                                        {stock && (
                                            <a
                                                href={`/company/${stock.symbol}/company-profile`}
                                                className="text-indigo-600 hover:underline text-sm"
                                            >
                                                {stock.companyName}
                                            </a>
                                        )}
                                        <div className="flex justify-between items-center mb-1 mt-2">
                                            <h4 className="font-semibold text-gray-800">{comment.title}</h4>
                                            <span className="text-xs text-gray-500">
                {new Date(comment.createdOn).toLocaleDateString()}
              </span>
                                        </div>
                                        <p className="text-gray-700 mb-2">{comment.content}</p>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <p className="text-gray-500">No comments added yet.</p>
                    )}
                </div>

            </div>
            ) : (
            <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10">
                <div className="flex items-center space-x-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">User not found.</h2>
                    </div>
                </div>
            </div>
                )
                }
            </>;
    
}

export default UserProfile;