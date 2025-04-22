import React, {useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { CommentGet } from '../../Models/Comment';
import { commentPostAPI, commentsGetAPI } from '../../Services/CommentService';
import Spinner from '../Spinners/Spinner';
import StockCommentList from '../StockCommentList/StockCommentList';
import StockCommentForm from './StockCommentForm/StockCommentForm';

interface Props {
  stockSymbol: string;  
};

type CommentFormInputs = {
    title: string;
    content: string;
};

const StockComment = ({ stockSymbol }: Props) => {
    
    const [comments, setComment] = useState<CommentGet[] | null>(null);
    const [loading, setLoading] = useState<boolean>();
    
    useEffect(() => {
        getComments();    
    }, []);
    
    const handleComment = (e: CommentFormInputs) => {
        commentPostAPI(e.title, e.content, stockSymbol)
            .then((res) => {
                if (res) {
                    toast.success("Comment created successfully.");
                    getComments();
                }
            })
            .catch((err) => {
                toast.warning(err);
            });
    }
    
    const getComments = () => {
        setLoading(true);
        
        commentsGetAPI(stockSymbol)
            .then((res) => {
                setLoading(false);
                setComment(res?.data!);
            })
            .catch((err) => {
                setLoading(false);
                toast.error(err);
            });
    };
    
    return (
        <div className="flex flex-col">
            { loading ? <Spinner /> : <StockCommentList comments={comments!} /> }
            <StockCommentForm symbol={stockSymbol} handleComment={handleComment} />
        </div>
    );
};

export default StockComment;