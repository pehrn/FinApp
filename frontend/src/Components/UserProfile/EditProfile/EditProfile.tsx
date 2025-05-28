import React, {useEffect, useState } from 'react';
import * as Yup from "yup";
import {Link, Outlet, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {getUserProfileAPI, updateProfileAPI } from '../../../Services/ProfileService';
import { toast } from 'react-toastify';

interface Props {};

type EditProfileFormsInputs = {
    aboutMe: string;
    position: string;
};

const validation = Yup.object().shape({
    aboutMe: Yup.string().required("About me is required"),
    position: Yup.string().required("Position is required"),
});


const EditProfile = ({}: Props) => {

    let { userName } = useParams();
    const { register, handleSubmit, formState: { errors }, reset } = useForm<EditProfileFormsInputs>({ resolver: yupResolver(validation) });

    useEffect(() => {
        const fetchProfile = async () => {
            const response = await getUserProfileAPI(userName!);
            const profile = response?.data;
            if (profile) {
                reset({
                    position: profile.position || "",
                    aboutMe: profile.aboutMe || ""
                });
            }
        };
        fetchProfile();
    }, [userName, reset]);
    
    const handleUpdate = (form: EditProfileFormsInputs) => {
        updateProfileAPI(userName!, form.aboutMe, form.position)
            .then((res) => {
                if (res) {
                    toast.success("Your profile has been updated!");
                }
            })
            .catch((err) => {
                toast.warning(err);
            });
    }

    return (
        <form className="max-w-xl mx-auto mt-3" onSubmit={handleSubmit(handleUpdate)}>
            <h2 className="text-3xl font-semibold text-gray-800 text-center">Edit Your Profile</h2>

            <div>
                <label htmlFor="position" className="block text-sm font-medium text-gray-700 m-4">
                    Position
                </label>
                <input
                    type="text"
                    id="position"
                    placeholder="e.g. Frontend Developer"
                    className="block w-full rounded-xl border border-gray-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                    {...register("position")}
                />
                {errors.position ? <p>{errors.position.message}</p> : ""}
            </div>

            <div>
                <label htmlFor="aboutMe" className="block text-sm font-medium text-gray-700 m-4">
                    About Me
                </label>
                <textarea
                    id="aboutMe"
                    rows={5}
                    placeholder="Write a short bio about yourself..."
                    className="block w-full rounded-xl border border-gray-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition resize-none"
                    {...register("aboutMe")}
                ></textarea>
                {errors.aboutMe ? <p>{errors.aboutMe.message}</p> : ""}
            </div>

            <div className="text-center">
                <button
                    type="submit"
                    className="bg-blue-600 text-white font-medium px-6 py-3 rounded-xl hover:bg-blue-700 transition shadow mt-5"
                >
                    Save Changes
                </button>
                <Link
                    to={`/user/${userName}`}
                    className="bg-red-600 text-white font-medium px-6 py-3 rounded-xl hover:bg-red-700 transition shadow ml-5"
                >
                    Close
                </Link>
            </div>
        </form>

    );
}

export default EditProfile;