import React from 'react';
import { Outlet } from 'react-router-dom';
import { User } from '../../../Models/User';

interface Props {
    children: React.ReactNode;
    user: User | null;
}

const ProfileDashboard = ({ user, children }: Props) => {
    return (
        <div className="relative bg-blueGray-100 w-full">
            <div className="relative bg-lightBlue-500">
                <div className="px-4 md:px-6 mx-auto w-full">
                    <div>
                        <div className="flex flex-wrap">
                            { children }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileDashboard;