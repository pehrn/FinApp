import React, {useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCompanyProfile } from '../../api';
import { CompanyProfile } from '../../company';
import CompanyDashboard from '../../Components/CompanyDashboard/CompanyDashboard';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Spinner from '../../Components/Spinners/Spinner';
import TenKFinder from '../../Components/TenKFinder/TenKFinder';
import Tile from '../../Components/Tile/Tile';
import { formatLargeMonetaryNumber } from '../../Helpers/NumberFormating';

interface Props {};

const CompanyPage = (props: Props) => {
    
    let { ticker } = useParams();
    const [company, setCompany] = useState<CompanyProfile>();
    
    useEffect(() => {
        const getProfileInit = async () => {
            const result = await getCompanyProfile(ticker!);
            setCompany(result?.data[0]);
        }
        getProfileInit();
    }, []);
    
    return <>
        {company ? (
            <div className="w-full relative flex ct-docs-disable-sidebar-content overflow-x-hidden">
                <Sidebar />
                <CompanyDashboard ticker={ticker!}>
                    <Tile title="Company Name" subTitle={company.companyName} />
                    <Tile title="Sector" subTitle={company.sector} />
                    <Tile title="Price" subTitle={"$" + company.price.toString()} />
                    <Tile title="Market cap" subTitle={formatLargeMonetaryNumber(company.mktCap)} />
                    <TenKFinder ticker={company.symbol} />
                    <p className="bg-white shadow rounded text-medium text-gray-900 p-3 mt-1 m-4">
                        { company.description }
                    </p>
                </CompanyDashboard>
            </div>
        ) : (
            <Spinner />
            )
        }
    </>;
}

export default CompanyPage;