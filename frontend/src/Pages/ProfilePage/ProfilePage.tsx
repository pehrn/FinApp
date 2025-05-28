import React, {useEffect, useState } from 'react';
import { getUserProfileAPI } from '../../Services/ProfileService';
import { toast } from 'react-toastify';
import { Link, Outlet, useParams } from 'react-router-dom';
import { User } from '../../Models/User';
import ProfileDashboard from '../../Components/UserProfile/ProfileDashboard/ProfileDashboard';
import UserProfile from '../../Components/UserProfile/UserProfile/UserProfile';

interface Props {};

const ProfilePage = (props: Props) => {

    let { userName } = useParams();
    
    const [user, setUser] = useState<User>();

    useEffect(() => {
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
        {user ? (
            // <div className="w-full relative flex ct-docs-disable-sidebar-content overflow-x-hidden">
            <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10">
                <ProfileDashboard user={user!}>
                    <Outlet context={user} />
                </ProfileDashboard>
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
    </>
}

        export default ProfilePage;