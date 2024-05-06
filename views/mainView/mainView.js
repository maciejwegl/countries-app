import { renderCountriesList } from "../../utils.js";

let countries;
let filteredCountries;
let query = "";
let region = "";

const inputFilter = document.getElementById("input-filter");
const regionFilter = document.getElementById("region-select");

export const renderMainView = () => {
  fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((countriesData) => {
      countries = countriesData.map((country) => {
        return {
          name: country.name.common,
          capital: country.capital && country.capital[0],
          region: country.region,
          flagUrl: country.flags.png,
          population: country.population.toLocaleString(),
          code: country.cioc,
          cca3: country.cca3,
        };
      });

      renderCountriesList(countries);
    })
    .catch((error) => console.error(error));

  // filterAndRenderData();

  const filterAndRenderData = () => {
    filteredCountries = countries.filter((country) => {
      return (
        country.name.toLowerCase().includes(query) &&
        (!region || country.region === region)
      );
    });
    renderCountriesList(filteredCountries);
  };

  inputFilter.addEventListener("input", (e) => {
    query = e.target.value.toLowerCase().trim();

    filterAndRenderData();
  });

  regionFilter.addEventListener("change", (e) => {
    region = e.target.value;

    filterAndRenderData();
  });
};
