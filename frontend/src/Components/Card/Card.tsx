import React, {JSX, SyntheticEvent} from "react";
import { CompanySearch } from "../../company";
import AddPortfolio from "../Portfolio/AddPortfolio/AddPortfolio";
import "./Card.css";

interface Props {
    id: string;
    searchResult: CompanySearch;
    onPortfolioCreate: (e: SyntheticEvent) => void;
};

const Card: React.FC<Props> = ({ id, searchResult, onPortfolioCreate }: Props): JSX.Element => {
    return (
        <div className="card">
            <img alt="company logo" />
            <div className="details">
                {searchResult.name} ({searchResult.symbol})
            </div>
            <p>{searchResult.currency}</p>
            <p className="info">{searchResult.exchangeShortName} - {searchResult.stockExchange}</p>
            <AddPortfolio onPortfolioCreate={onPortfolioCreate} symbol={searchResult.symbol}/>
        </div>
    )
};

export default Card;