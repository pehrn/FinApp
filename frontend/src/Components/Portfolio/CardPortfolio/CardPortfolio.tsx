import React, {SyntheticEvent} from 'react';
import { Link } from 'react-router-dom';
import DeleteFromPortfolio from '../DeleteFromPortfolio/DeleteFromPortfolio';

interface Props {
    portfolioValue: string;
    onDeleteFromPortfolio: (e: SyntheticEvent) => void;
}

const CardPortfolio = ({ portfolioValue, onDeleteFromPortfolio }: Props) => {
    return (
        <div className="flex flex-col w-full p-8 space-y-4 text-center rounded-lg shadow-lg md:w-1/3">
            <Link to={`/company/${portfolioValue}`} className="pt-6 text-xl font-bold">{portfolioValue}</Link>
            <DeleteFromPortfolio
                portfolioValue={portfolioValue}
                onDeleteFromPortfolio={onDeleteFromPortfolio}
            />
        </div>
    );
}

export default CardPortfolio;