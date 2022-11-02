import './Styles/reset.scss';
import './App.scss';
import { useEffect, useState } from 'react';
import CountriesList from './components/countriesList';
import { countryInfo } from './models/countryInfoType';

const App = () => {
  const [countries, setCountries] = useState([] as countryInfo[]);
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://countries.trevorblades.com/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
              query{countries{
                 name
                 native
                 phone
               continent{name}
                 capital
                 currency
               languages{name}
                 emoji
               }
               }
              `,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setCountries(data.data.countries);
        setLoading(false);
      }).catch(() => {
        setErr(true);
        setLoading(false);
      });
  }, []);

  return (
    <div className="home-page">
      <h1>List of countries</h1>
      {err ? (
        <div className="error">Oops, something went wrong</div>
      )

        : (
          <div className="countries-columns-wrapper">
            <CountriesList
              countries={countries}
              slicedCountries={countries.slice(0, 84)}
              setCountries={setCountries}
            />
            <CountriesList
              countries={countries}
              slicedCountries={countries.slice(84, 168)}
              setCountries={setCountries}
            />
            <CountriesList
              countries={countries}
              slicedCountries={countries.slice(168, 250)}
              setCountries={setCountries}
            />

          </div>
        )}
      {loading && (<div className="loader" />)}

    </div>
  );
};

export default App;
