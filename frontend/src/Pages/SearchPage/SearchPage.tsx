import React, {ChangeEvent, SyntheticEvent, useEffect, useState} from 'react';
import { toast } from 'react-toastify';
import { searchCompanies } from '../../api';
import { CompanySearch } from '../../company';
import CardList from '../../Components/CardList/CardList';
import Navbar from '../../Components/Navbar/Navbar';
import ListPortfolio from '../../Components/Portfolio/ListPortfolio/ListPortfolio';
import Search from '../../Components/Search/Search';
import { PortfolioGet } from '../../Models/Portfolio';
import {portfolioAddAPI, portfolioDeleteAPI, portfolioGetAPI } from '../../Services/PortfolioService';

interface Props {};

const SearchPage = (props: Props) => {

    const [search, setSearch] = useState<string>("");
    const [portfolioValues, setPortfolioValues] = useState<PortfolioGet[] | null>([]);
    const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
    const [serverError, setServerError] = useState<string | null>(null);

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    useEffect(() => {
        getPortfolio();    
    }, []);
    
    const getPortfolio = () => {
      portfolioGetAPI()
          .then((res) => {
              if (res?.data) {
                  setPortfolioValues(res?.data);
              }
          })
          .catch((err) => {
              toast.error(err.message);
          });  
    };

    const onPortfolioCreate = (e: any) => {
        e.preventDefault();

        portfolioAddAPI(e.target[0].value)
            .then((res) => {
                if (res?.status === 204) {
                    toast.success("Stock added to the portfolio!");
                    getPortfolio();
                }
            })
            .catch((err) => {
                toast.error(err.message);
            });
    }

    const onDeleteFromPortfolio = (e: any) => {
        e.preventDefault();

        portfolioDeleteAPI(e.target[0].value)
            .then((res) => {
                if (res?.status === 200) {
                    toast.success("Stock deleted from the portfolio.");
                    getPortfolio();
                }
            })
            .catch((err) => {
                toast.error(err.message);
            });
        
    }

    const onSearchSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const result = await searchCompanies(search);

        if (typeof result === "string") {
            setServerError(result);
        } else if (Array.isArray(result.data)) {
            setSearchResult(result.data);
        }
    };
    
    return (
        <div className="App">
            <Search onSearchSubmit={onSearchSubmit} search={search} handleSearchChange={handleSearchChange}/>
            <ListPortfolio portfolioValues={portfolioValues!} onDeleteFromPortfolio={onDeleteFromPortfolio}/>
            <CardList searchResults={searchResult} onPortfolioCreate={onPortfolioCreate}/>
            {serverError && <h1>{serverError}</h1>}
        </div>
    );
}

export default SearchPage;