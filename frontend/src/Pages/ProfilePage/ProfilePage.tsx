import React, {useEffect, useState } from 'react';
import { getUserProfileAPI } from '../../Services/ProfileService';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { User } from '../../Models/User';

interface Props {};

const ProfilePage = (props: Props) => {

    let { userName } = useParams();
    
    const [loading, setLoading] = useState<boolean>();
    const [user, setUser] = useState<User>();

    useEffect(() => {
        const getUser = async () => {
            const result = await getUserProfileAPI(userName!);
            console.log(result?.data);
            setUser(result?.data);
        }
        getUser();
    }, []);

    // useEffect(() => {
    //     getUser();
    // }, []);
    //
    // const getUser = () => {
    //     setLoading(true);
    //
    //     getUserProfileAPI(userName!)
    //         .then((res) => {
    //             setLoading(false);
    //             setUser(res?.data!);
    //             console.log(res?.data!)
    //         })
    //         .catch((err) => {
    //             setLoading(false);
    //             toast.error(err);
    //         });
    // };
    
    return <>
        { user ? <div>FOUND</div> : <div>NOT FOUND</div> }
    </>;
}

export default ProfilePage;