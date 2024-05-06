import { renderCountryDetails } from "../../utils.js";

export const renderDetailView = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const countryCode = searchParams.get("country");
  const backToMainView = () => {
    window.location.href = "/";
  };
  if (!countryCode) {
    backToMainView();
  }

  const API_URL_DETAIL = `https://restcountries.com/v3.1/alpha/${countryCode}`;
  fetch(API_URL_DETAIL)
    .then((res) => res.json())
    .then(([country]) => {
      console.log(country);
      if (!country) {
        backToMainView();
      }
      country = {
        name: country.name.common,
        nameOfficial: country.name.official,
        nativeName: Object.values(country.name.nativeName)[0].official,
        languages: Object.values(country.languages).join(", "),
        capital: country.capital && country.capital[0],
        region: country.region,
        subregion: country.subregion,
        population: country.population.toLocaleString(),
        flagUrl: country.flags.png,
        mapsUrl: country.maps.googleMaps,
        carSigns: country.car.signs,
        trafficSide: country.car.side,
        currencies: Object.values(country.currencies)
          .map((currency) => currency.name)
          .join(", "),
        independent: country.independent,
        latlng: country.latlng,
        border: country.borders,
      };

      renderCountryDetails(country);
    })
    .catch((error) => console.error(error));
};
