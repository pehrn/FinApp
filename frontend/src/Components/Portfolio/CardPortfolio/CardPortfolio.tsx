import React, {SyntheticEvent} from 'react';
import DeleteFromPortfolio from '../DeleteFromPortfolio/DeleteFromPortfolio';

interface Props {
    portfolioValue: string;
    onDeleteFromPortfolio: (e: SyntheticEvent) => void;
}

const CardPortfolio = ({ portfolioValue, onDeleteFromPortfolio }: Props) => {
    return <>
        <h4>{portfolioValue}</h4>
        <DeleteFromPortfolio onDeleteFromPortfolio={onDeleteFromPortfolio} portfolioValue={portfolioValue} />
    </>
}

export default CardPortfolio;