import React, {ChangeEvent, SyntheticEvent, useState } from 'react';
import { searchCompanies } from './api';
import './App.css';
import { CompanySearch } from './company';
import CardList from './Components/CardList/CardList';
import Search from './Components/Search/Search';

function App() {
    const [search, setSearch] = useState<string>("");
    const [searchResults, setSearchResults] = useState<CompanySearch[]>([]);
    const [serverError, setServerError] = useState<string>("");
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        // console.log(e);
    };
    
    const onClick = async (e: SyntheticEvent) => {
        const result = await searchCompanies(search);
        
        if (typeof result === "string") {
            setServerError(result);
        } else if (Array.isArray(result.data)) {
            setSearchResults(result.data);
        }
        
        // console.log(searchResults);
    };
    
  return (
    <div className="App">
        <Search onClick={onClick} search={search} handleChange={handleChange}/>
        <CardList />
    </div>
  );
}

export default App;
