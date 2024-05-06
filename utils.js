// Variables

const countriesList = document.getElementById("countries");
const listElement = document.createElement("ul");
const countryDetailsElement = document.createElement("div");
const detailsContent = document.createElement("div");
const detailsHeader = document.createElement("div");
const detailsMapElement = document.createElement("div");
const detailsInfoWrapper = document.createElement("div");
const detailsInfoElement = document.createElement("div");
const detailsLink = document.createElement("a");
const mapContainer = document.createElement("div");
const borderCountriesContainer = document.createElement("div");
const borderCountriesList = document.createElement("ul");
const borderCountriesText = document.createElement("p");
const toggleDarkModeBtn = document.querySelector(".theme");

let countryItem;
let map;

// Dark mode activation

const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    toggleDarkModeBtn.innerHTML =
      '<i class="fa-solid fa-circle-half-stroke"></i>Light mode';
  } else {
    toggleDarkModeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>Dark theme';
  }
};

toggleDarkModeBtn.addEventListener("click", toggleDarkMode);

// Creating Border countries element

const renderBorderCountries = (country) => {
  detailsInfoElement.appendChild(borderCountriesContainer);
  borderCountriesContainer.classList.add("borders-container");
  borderCountriesContainer.appendChild(borderCountriesText);
  borderCountriesText.textContent = "Border countries:";
  borderCountriesText.classList.add("borders-text");
  borderCountriesContainer.appendChild(borderCountriesList);
  borderCountriesList.innerHTML = "";

  const borderCountries = country.border;
  console.log(borderCountries);
  if (borderCountries) {
    borderCountries.forEach((borderCountry) => {
      const borderCountryItem = document.createElement("li");
      borderCountriesList.appendChild(borderCountryItem);
      const anchorBorders = document.createElement("a");
      borderCountryItem.appendChild(anchorBorders);
      anchorBorders.textContent = borderCountry;
      anchorBorders.href = `?country=${borderCountry}`;
    });
  } else {
    borderCountriesText.textContent = "Country has no neighbors";
  }
};

// Render countries list

export const renderCountriesList = (countries) => {
  console.log(countries);
  listElement.innerHTML = "";
  countriesList.appendChild(listElement);
  listElement.classList.add("countries-list");

  renderCountryItem(countries);
};

// Rendering country item

const renderCountryItem = (countries) => {
  countries.forEach((country) => {
    countryItem = document.createElement("li");
    const anchorElement = document.createElement("a");
    anchorElement.href = `?country=${country.cca3}`;
    // anchorElement.href = `?country=${country.code}`;
    listElement.appendChild(countryItem);
    countryItem.classList.add("country");
    countryItem.appendChild(anchorElement);
    anchorElement.innerHTML = `
    <div class="country-content">
      <div class="img-holder" style="background-image: url(${country.flagUrl})"></div>
      <h3>${country.name}</h3>
      <div class="info-holder">
        <span><strong>Population:</strong> ${country.population}</span>
        <span><strong>Region:</strong> ${country.region}</span>
        <span><strong>Capital:</strong> ${country.capital}</span>
      </div>
    </div>`;
  });
};

// Detailed view render

export const renderCountryDetails = (country) => {
  // Nav hidden

  document.querySelector("#main-header").classList.add("hidden");
  // document.body.classList.add("dark-mode");

  // Creating container

  countriesList.appendChild(countryDetailsElement);
  countryDetailsElement.classList.add("country-details");

  // Creating details header with link

  countryDetailsElement.appendChild(detailsHeader);
  detailsHeader.classList.add("details-header");
  detailsHeader.appendChild(detailsLink);
  detailsLink.href = "/";
  detailsLink.classList.add("btn");
  detailsLink.innerText = "Back to other countries";
  detailsLink.innerHTML =
    '<i class="fa-solid fa-chevron-left"></i>Back to list';

  renderToggleThemeBtn();
  // Creating main content with map and info

  countryDetailsElement.appendChild(detailsContent);
  detailsContent.classList.add("details-content");
  detailsContent.appendChild(mapContainer);
  mapContainer.classList.add("map-container");
  mapContainer.appendChild(detailsMapElement);
  detailsMapElement.classList.add("map");
  detailsMapElement.id = "maps";

  detailsContent.appendChild(detailsInfoWrapper);
  detailsInfoWrapper.classList.add("details-info-wrapper");
  detailsInfoWrapper.appendChild(detailsInfoElement);
  detailsInfoElement.classList.add("details-info");

  renderDetailsInfoElement(country);

  // Render border countries list

  renderBorderCountries(country);
};

// Render details information element

const renderDetailsInfoElement = (country) => {
  const detailsInfoHTML = `
      <div class="flag-holder">
        <img src=${country.flagUrl} alt=${country.name} flag />
      </div>
      <h3>${country.name}</h3>
      <div class="text-holder">
        <p><strong>Official name:</strong>${country.nameOfficial}</p>
        <p><strong>Native name:</strong>${country.nativeName}</p>
        <p><strong>Languages:</strong>${country.languages}</p>
        <p><strong>Capital:</strong>${country.capital}</p>
        <p><strong>Region:</strong>${country.region}</p>
        <p><strong>Subregion:</strong>${country.subregion}</p>
        <p><strong>Population:</strong>${country.population}</p>
        <p><strong>Currencies:</strong>${country.currencies}</p>
        <p><strong>Traffic side:</strong>${country.trafficSide}</p>
        <p><strong>Car signs:</strong>${country.carSigns}</p>
        <p><strong>Independent:</strong>${country.independent}</p>
      </div>
    `;

  detailsInfoElement.innerHTML = detailsInfoHTML;

  // Render google map element

  let [lat, lng] = country.latlng;

  map = L.map("maps").setView([lat, lng], 13);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(`<h3 class="country-name">${country.name}</h3>`)
    .openPopup();
};

// Theme toggler rendering

const renderToggleThemeBtn = () => {
  const toggleThemeBtn = document.createElement("button");
  detailsHeader.appendChild(toggleThemeBtn);
  toggleThemeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>Dark theme';
  toggleThemeBtn.classList.add("btn");
  toggleThemeBtn.classList.add("theme");
};
