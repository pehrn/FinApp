import React, { JSX } from "react";
import Card from "../Card/Card";
import "./CardList.css";

interface Props {}

const CardList : React.FC<Props> = (props: Props): JSX.Element => {
    return (
        <div>
            <Card companyName="Tesla" ticker="TSLA" price={451.54} />
            <Card companyName="Microsoft" ticker="MSFT" price={845.23} />
            <Card companyName="Boeing" ticker="BA" price={221.01} />
        </div>
    )
};

export default CardList;