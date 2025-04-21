import React from 'react';
import { toast } from 'react-toastify';
import { commentPostAPI } from '../../Services/CommentService';
import StockCommentForm from './StockCommentForm/StockCommentForm';

interface Props {
  stockSymbol: string;  
};

type CommentFormInputs = {
    title: string;
    content: string;
};

const StockComment = ({ stockSymbol }: Props) => {
    
    const handleComment = (e: CommentFormInputs) => {
        commentPostAPI(e.title, e.content, stockSymbol)
            .then((res) => {
                if (res) {
                    toast.success("Comment created successfully.");
                }
            })
            .catch((err) => {
                toast.warning(err);
            });
    }
    
    return <StockCommentForm symbol={stockSymbol} handleComment={handleComment} />;
};

export default StockComment;