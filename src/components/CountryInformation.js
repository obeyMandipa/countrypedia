import React, {useState} from 'react';
import './CountrInfomation.css';
import CountryInfor from './CountryInfor';

//this componet handles the inpt form the user and it is the parent component


// eslint-disable-next-line import/no-anonymous-default-export
export default function CountryInformation(){
        //state variables 
        const [countryName, setCountryName] = useState('');
        const [countryData, setCountryData] = useState(null);
        const [error, setError] = useState('');

        //fuction to handle the search button 
        const handleSearch = () => {
            //check if the input field is empty 
            if (!countryName){
                setError('the input cannot be empty');
                setCountryData(null);
                return;
            }

            //construct the API URL for the cuntry search
            const finalURL = `https://restcountries.com/v3.1/name/${countryName.trim()}?fullText=true`;

            //fetch the countyr data from the   REST Countries API 
            fetch(finalURL)
                .then((response) => response.json())
                .then((data) =>{
                    if (data.message === 'Not Found'){
                        setError('country information not found');
                        setCountryData(null);
                    }
                    else if (data.length === 0) {
                        setError('Enter a valid country name');
                        setCountryData(null);
                    }
                    else {
                        setError('');
                        setCountryData(data[0]);
                    }
                })
                .catch(() => {
                    setError('Error occured while fetching the data');
                    setCountryData(null)
                });
        };
    

  return (
    <div className='container'>
        <h1> CountryPedia</h1>
        <div className='search'>
            <input type='text' id='countryName' placeholder='type the country name' onChange={(e) => setCountryName(e.target.value)}/>
            <button id='search-btn' onClick={handleSearch}> Search </button>
        </div>
        <div id='result'>
            {error && <h3>{error}</h3>}
            {countryData && (<CountryInfor countryData={countryData} />)}
        </div>
    </div>
  )
}
