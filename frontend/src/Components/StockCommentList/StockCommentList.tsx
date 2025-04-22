import React from 'react';
import { CommentGet } from '../../Models/Comment';
import StockCommentListItem from '../StockCommentListItem/StockCommentListItem';

interface Props {
    comments: CommentGet[];
};

const StockCommentList = ({ comments }: Props) => {
    return (
        <>
            { comments ? comments.map((comment) => {
                return <StockCommentListItem comment={comment} />
                }) 
            : "" }
        </>
    )
}

export default StockCommentList;
