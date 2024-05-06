// import { renderCountriesList } from "../../utils.js";

// let filteredCountries;
// let query = "";
// let region = "";

// const inputFilter = document.getElementById("input-filter");
// const regionFilter = document.getElementById("region-select");

// export const filterAndRenderData = () => {
//   filteredCountries = countries.filter((country) => {
//     return (
//       country.name.toLowerCase().includes(query) &&
//       (!region || country.region === region)
//     );
//   });
// };

// export const filterData = () => {
//   filterAndRenderData(countries);

//   renderCountriesList(filteredCountries);

//   inputFilter.addEventListener("input", (e) => {
//     query = e.target.value.toLowerCase().trim();

//     filterAndRenderData(countries);
//   });

//   regionFilter.addEventListener("change", (e) => {
//     region = e.target.value;

//     filterAndRenderData(countries);
//   });
// };
