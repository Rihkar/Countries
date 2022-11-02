import { countryInfo } from '../models/countryInfoType';

type countriesListProps = {
  setCountries: (a:countryInfo[])=>void,
  slicedCountries: countryInfo[],
  countries:countryInfo[]
}

const CountriesList = ({ setCountries, slicedCountries, countries }:countriesListProps) => {
  const toggleActive = (componentToFind:string) => {
    const updatedCountries = countries.map((country:countryInfo) => {
      if (country.name === componentToFind) {
        return { ...country, active: !country.active };
      }
      return country;
    });

    setCountries(updatedCountries);
  };
  return (
    <div className="countries-list">
      {slicedCountries.map(({
        name, native, emoji, active, continent, capital, languages, currency, phone,
      }:countryInfo) => (
        <div className="country-box" key={name}>
          <div className="country-name" onClick={() => toggleActive(name)}>
            <div>
              {name}
              {name !== native && ` / ${native}`}
            </div>
            <div>
              {`(${emoji})`}
            </div>

          </div>
          {active && (
          <div className="country-info">
            <div>
              {`Continent: ${continent.name}`}
            </div>
            <div>
              {`Capital: ${capital}`}
            </div>
            <div>
              {`Languages: ${languages.map((language:{name:string}) => language.name)}`}
            </div>

            <div>
              {`Currency: ${currency}`}
            </div>
            <div>
              {`Phone: +${phone}`}
            </div>
          </div>
          )}

        </div>
      ))}
    </div>
  );
};

export default CountriesList;
