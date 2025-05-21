import React, {useEffect, useState } from 'react';
import { getUserProfileAPI } from '../../Services/ProfileService';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { User } from '../../Models/User';

interface Props {};

const ProfilePage = (props: Props) => {

    let { userName } = useParams();
    
    const [user, setUser] = useState<User>();
    const [currentUser, setCurrentUser] = useState<User | null>(null);


    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
        }
        getUser();
    }, []);

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
            <div class="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10">
                <div className="flex items-center space-x-6">
                    <div>
                        <h2 class="text-2xl font-bold text-gray-800">@{user?.userName}</h2>
                        <p class="text-gray-500">user position placeholder</p>
                        <p class="mt-2 text-sm text-gray-400">user about me placeholder</p>
                    </div>
                    { currentUser.userName == user?.userName && (
                        <div className="mt-6 text-right">
                            <button
                                className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition">Edit
                                Profile
                            </button>
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
                                            <h4 className="text-lg font-bold text-gray-800">{stock.symbol}</h4>
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
                {/*<div class="mt-6 border-t pt-4">*/}
                {/*    <h3 class="text-lg font-semibold text-gray-700 mb-2">Portfolio</h3>*/}
                {/*    <div class="space-y-1 text-gray-600">*/}
                {/*        <p><span class="font-medium">Email:</span> john.doe@example.com</p>*/}
                {/*        <p><span class="font-medium">Phone:</span> +1 (555) 123-4567</p>*/}
                {/*    </div>*/}
                {/*</div>*/}

            </div>
            ) : (
            <p className="mb-3 mt-3 text-xl font-semibold text-center md:text-xl">
                User not found!
            </p>
        )
        }
    </>;
}

export default ProfilePage;