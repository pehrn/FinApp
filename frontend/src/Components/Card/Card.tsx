import React, { JSX } from "react";
import { CompanySearch } from "../../company";
import "./Card.css";

interface Props {
    id: string;
    searchResult: CompanySearch;
};

const Card: React.FC<Props> = ({ id, searchResult }: Props): JSX.Element => {
    return (
        <div className="card">
            <img alt="company logo" />
            <div className="details">
                {searchResult.name} ({searchResult.symbol})
            </div>
            <p>{searchResult.currency}</p>
            <p className="info">{searchResult.exchangeShortName} - {searchResult.stockExchange}</p>
        </div>
    )
};

export default Card;