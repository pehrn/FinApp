import React, { SyntheticEvent } from 'react';

interface Props {
    portfolioValue: string;
    onDeleteFromPortfolio: (e: SyntheticEvent) => void;
}

const DeleteFromPortfolio = ({ portfolioValue, onDeleteFromPortfolio }: Props) => {
    return <div>
        <form onSubmit={onDeleteFromPortfolio}>
            <input hidden={true} value={portfolioValue} />
            <button className="block w-full py-3 text-white duration-200 border-2 rounded-lg bg-red-500 hover:text-red-500 hover:bg-white border-red-500">
                X
            </button>
        </form>
    </div>;
}

export default DeleteFromPortfolio;