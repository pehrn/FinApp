import React, {JSX, SyntheticEvent} from "react";
import { CompanySearch } from "../../company";
import Card from "../Card/Card";
import "./CardList.css";
import { v4 as uuidv4 } from "uuid";

interface Props {
    searchResults: CompanySearch[];
    onPortfolioCreate: (e: SyntheticEvent) => void;
}

const CardList : React.FC<Props> = ({ searchResults, onPortfolioCreate }: Props): JSX.Element => {
    return <>
            {searchResults.length > 0 ? (
                searchResults.map((result) => {
                    return <Card id={result.symbol} key={uuidv4()} searchResult={result} onPortfolioCreate={onPortfolioCreate} />
                })
            ): (
                <p className="mb-3 mt-3 text-xl font-semibold text-center md:text-xl">
                    No results!
                </p>
            )}</>;
};

export default CardList;