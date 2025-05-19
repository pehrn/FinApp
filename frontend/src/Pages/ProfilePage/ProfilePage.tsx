import React, {useEffect, useState } from 'react';
import { getUserProfileAPI } from '../../Services/ProfileService';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

interface Props {};

const ProfilePage = (props: Props) => {

    // const [comments, setComment] = useState<CommentGet[] | null>(null);
    let { userName } = useParams();
    
    const [loading, setLoading] = useState<boolean>();

    useEffect(() => {
        getUser();
    }, []);
    
    const getUser = () => {
        setLoading(true);

        getUserProfileAPI(userName!)
            .then((res) => {
                setLoading(false);
                // setComment(res?.data!);
                console.log(res?.data!)
            })
            .catch((err) => {
                setLoading(false);
                toast.error(err);
            });
    };
    
    return <>
        <h1>Profile Page</h1>
    </>;
}

export default ProfilePage;