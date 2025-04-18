import React, { SyntheticEvent } from 'react'
import CardPortfolio from '../CardPortfolio/CardPortfolio';

interface Props {
    portfolioValues: string[];
    onDeleteFromPortfolio: (e: SyntheticEvent) => void;
}

const ListPortfolio = ({ portfolioValues, onDeleteFromPortfolio }: Props) => {
    return <>
        <h3>My Portfolio</h3>
        <ul>
            {portfolioValues && portfolioValues.map((portfolioValue) =>  {
                return <CardPortfolio portfolioValue={portfolioValue} onDeleteFromPortfolio={onDeleteFromPortfolio} />
            })}
        </ul>
    </>;
}

export default ListPortfolio