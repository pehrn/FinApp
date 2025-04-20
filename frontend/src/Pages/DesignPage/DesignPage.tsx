import React from 'react';
import RatioList from '../../Components/RatioList/RatioList';
import Table from '../../Components/Table/Table';

interface Props {}

const DesignPage = (props: Props) => {
    return (
        <>
            <h1>FinApp Design Page</h1>
            <h2>This is FinApp's design page. This is where we will house various design aspects of the app.</h2>
            <RatioList />
            <Table />
        </>
    );
}

export default DesignPage;