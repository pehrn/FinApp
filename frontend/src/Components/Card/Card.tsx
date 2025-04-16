import React, { JSX } from "react";
import "./Card.css";

interface Props {
    companyName: string;
    ticker: string;
    price: number;
};

const Card: React.FC<Props> = ({ companyName, ticker, price }: Props): JSX.Element => {
    return (
        <div className="card">
            <div className="details">
                <h2>{companyName}</h2>
                <h5>{ticker}</h5>
                <p>${price}</p>
            </div>
            <p className="info">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, maiores!</p>
        </div>
    )
};

export default Card;