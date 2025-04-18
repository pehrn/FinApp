import React, { SyntheticEvent } from 'react';

interface Props {
    portfolioValue: string;
    onDeleteFromPortfolio: (e: SyntheticEvent) => void;
}

const DeleteFromPortfolio = ({ portfolioValue, onDeleteFromPortfolio }: Props) => {
    return <div>
        <form onSubmit={onDeleteFromPortfolio}>
            <input hidden={true} value={portfolioValue} />
            <button>X</button>
        </form>
    </div>;
}

export default DeleteFromPortfolio;