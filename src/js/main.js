// بسم الله
let conuntriesarray;
let dropdown = document.querySelector(".custom-select-options");
let customdropdown = document.querySelector(".custom-select-dropdown");
let customtrigger = document.querySelector(".custom-select-trigger");
let formcountry = document.querySelector("#global-country-custom");
let existingElement;
let displaydata;
let currentvalue;
let currentname;
let currentyear;
let valueforrestofpages;
function formatDateWithMonthName(dateString) {
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  const [year, month, day] = dateString.split("-");
  return [months[parseInt(month) - 1], day, year];
}

function getDayName(dateString) {
  return new Date(dateString + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "long",
  });
}

async function openweb() {
  let firstresponse = await fetch(
    "https://date.nager.at/api/v3/AvailableCountries",
  );
  conuntriesarray = await firstresponse.json();
  console.log(conuntriesarray);
}

function displaydropdown() {
  let cartona = "";
  for (let i = 0; i < conuntriesarray.length; i++) {
    cartona += `<div class="custom-select-option" data-value="${conuntriesarray[i].countryCode}" data-name="${conuntriesarray[i].name}">
      <img src="https://flagcdn.com/w40/${conuntriesarray[i].countryCode.toLowerCase()}.png" alt="${conuntriesarray[i].countryCode}" class="flag-img" onerror="this.style.display='none'">
      <span class="country-name">${conuntriesarray[i].name}</span>
      <span class="country-code">${conuntriesarray[i].countryCode}</span>
    </div>      `;
  }
  dropdown.innerHTML = cartona;
}

async function fire() {
  await openweb();
  await displaydropdown();
}
fire();

formcountry.addEventListener("click", function () {
  if (
    customdropdown.classList.contains("open") &&
    customtrigger.classList.contains("open")
  ) {
    customdropdown.classList.remove("open");
    customtrigger.classList.remove("open");
  } else {
    customdropdown.classList.add("open");
    customtrigger.classList.add("open");
  }
});

dropdown.addEventListener("click", function (e) {
  existingElement = document.getElementById("selected-destination");
  if (existingElement) {
    existingElement.remove();
  }

  ((currentvalue = e.target
    .closest(".custom-select-option")
    .getAttribute("data-value")),
    (currentname = e.target
      .closest(".custom-select-option")
      .getAttribute("data-name")));

  document.querySelector(".search-form-row").insertAdjacentHTML(
    "afterend",
    `<div id="selected-destination" class="selected-destination">
    <div class="selected-flag">
    <img id="selected-country-flag" src="https://flagcdn.com/w80/${e.target.closest(".custom-select-option").getAttribute("data-value").toLowerCase()}.png" alt="${e.target.closest(".custom-select-option").getAttribute("data-name")}">
    </div>
    <div class="selected-info">
    <span class="selected-country-name" id="selected-country-name">${e.target.closest(".custom-select-option").getAttribute("data-name")}</span>
    <span class="selected-city-name" id="selected-city-name"></span>
    </div>
    <button class="clear-selection-btn" id="clear-selection-btn">
    <i data-fa-i2svg=""><svg class="svg-inline--fa fa-xmark" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="xmark" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-fa-i2svg=""><path fill="currentColor" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"></path></svg></i>
    </button>
    </div>   `,
  );

  document
    .querySelector("#clear-selection-btn")
    .addEventListener("click", function () {
      const element = document.getElementById("selected-destination");
      if (element) {
        element.remove();
      }
    });
});

async function displaydate() {
  displaydata = await fetch(
    `https://restcountries.com/v3.1/alpha/${currentvalue}`,
  );
  displaydata = await displaydata.json();
  console.log(displaydata);
  console.log(displaydata[0].currencies);
  valueforrestofpages = displaydata[0];
}

document
  .querySelector("#global-search-btn")
  .addEventListener("click", async function () {
    if (currentvalue) {
      await displaydate();
      await countrydata();
      currentyear = document.querySelector("#global-year").value;
    } else {
      document.querySelector("#toast-container").innerHTML =
        `    <div class="toast warning">
    <i data-fa-i2svg=""><svg class="svg-inline--fa fa-circle-info" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-info" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"></path></svg></i>
    <span>Please select a country first</span>
    <button class="toast-close" onclick="this.parentElement.remove()">
    <i data-fa-i2svg=""><svg class="svg-inline--fa fa-xmark" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="xmark" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-fa-i2svg=""><path fill="currentColor" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"></path></svg></i>
    </button>
    </div>`;
      setTimeout(function () {
        document.querySelector("#toast-container").innerHTML = "";
      }, 3000);
    }
  });
function formatTimeWithOffsetforliveclock(offsetHours) {
  const now = new Date();

  const adjusted = new Date(
    now.getTime() + Number(offsetHours) * 60 * 60 * 1000,
  );

  let hours = adjusted.getUTCHours();
  const minutes = adjusted.getUTCMinutes();
  const seconds = adjusted.getUTCSeconds();

  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")} ${ampm}`;
}

function countrydata() {
  document.querySelector("#dashboard-country-info").innerHTML = `
  <div class="dashboard-country-header">
  <img src="${displaydata[0].flags.svg}" alt="${displaydata[0].name.common}" class="dashboard-country-flag">
  <div class="dashboard-country-title">
  <h3>${displaydata[0].name.common}</h3>
  <p class="official-name">${displaydata[0].name.official}</p>
  <span class="region"><i data-fa-i2svg=""><svg class="svg-inline--fa fa-location-dot" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="location-dot" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-fa-i2svg=""><path fill="currentColor" d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"></path></svg></i> ${displaydata[0].region} • ${displaydata[0].subregion}</span>
  </div>
  </div>
  <div class="dashboard-local-time">
  <div class="local-time-display">
  <i data-fa-i2svg=""><svg class="svg-inline--fa fa-clock" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="clock" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"></path></svg></i>
  <span class="local-time-value" id="country-local-time">${formatTimeWithOffsetforliveclock(offset(displaydata[0].timezones[0]))}</span>
  <span class="local-time-zone" id="country-timezone">${displaydata[0].timezones[0]}</span>
  </div>
  </div>
  <div class="dashboard-country-grid">
  <div class="dashboard-country-detail">
  <i data-fa-i2svg=""><svg class="svg-inline--fa fa-building-columns" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="building-columns" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M243.4 2.6l-224 96c-14 6-21.8 21-18.7 35.8S16.8 160 32 160v8c0 13.3 10.7 24 24 24H456c13.3 0 24-10.7 24-24v-8c15.2 0 28.3-10.7 31.3-25.6s-4.8-29.9-18.7-35.8l-224-96c-8-3.4-17.2-3.4-25.2 0zM128 224H64V420.3c-.6 .3-1.2 .7-1.8 1.1l-48 32c-11.7 7.8-17 22.4-12.9 35.9S17.9 512 32 512H480c14.1 0 26.5-9.2 30.6-22.7s-1.1-28.1-12.9-35.9l-48-32c-.6-.4-1.2-.7-1.8-1.1V224H384V416H344V224H280V416H232V224H168V416H128V224zM256 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"></path></svg></i>
  <span class="label">Capital</span>
  <span class="value">${displaydata[0].capital[0]}</span>
  </div>
  
  <div class="dashboard-country-detail">
  <i data-fa-i2svg=""><svg class="svg-inline--fa fa-users" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="users" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" data-fa-i2svg=""><path fill="currentColor" d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z"></path></svg></i>
  <span class="label">Population</span>
  <span class="value">${displaydata[0].population}</span>
  </div>
  
  <div class="dashboard-country-detail">
  <i data-fa-i2svg=""><svg class="svg-inline--fa fa-ruler-combined" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="ruler-combined" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M.2 468.9C2.7 493.1 23.1 512 48 512l96 0 320 0c26.5 0 48-21.5 48-48l0-96c0-26.5-21.5-48-48-48l-48 0 0 80c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-80-64 0 0 80c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-80-64 0 0 80c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-80-80 0c-8.8 0-16-7.2-16-16s7.2-16 16-16l80 0 0-64-80 0c-8.8 0-16-7.2-16-16s7.2-16 16-16l80 0 0-64-80 0c-8.8 0-16-7.2-16-16s7.2-16 16-16l80 0 0-48c0-26.5-21.5-48-48-48L48 0C21.5 0 0 21.5 0 48L0 368l0 96c0 1.7 .1 3.3 .2 4.9z"></path></svg></i>
  <span class="label">Area</span>
  <span class="value">${displaydata[0].area} km²</span>
  </div>
  
  <div class="dashboard-country-detail">
  <i data-fa-i2svg=""><svg class="svg-inline--fa fa-globe" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="globe" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M352 256c0 22.2-1.2 43.6-3.3 64H163.3c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64H348.7c2.2 20.4 3.3 41.8 3.3 64zm28.8-64H503.9c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64H380.8c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32H376.7c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0H167.7c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 20.9 58.2 27 94.7zm-209 0H18.6C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192H131.2c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64H8.1C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6H344.3c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352H135.3zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6H493.4z"></path></svg></i>
  <span class="label">Continent</span>
  <span class="value">${displaydata[0].continents[0]}</span>
  </div>
  
  <div class="dashboard-country-detail">
  <i data-fa-i2svg=""><svg class="svg-inline--fa fa-phone" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="phone" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"></path></svg></i>
  <span class="label">Calling Code</span>
  <span class="value">${displaydata[0].idd.root}</span>
  </div>
  
  <div class="dashboard-country-detail">
  <i data-fa-i2svg=""><svg class="svg-inline--fa fa-car" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="car" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M135.2 117.4L109.1 192H402.9l-26.1-74.6C372.3 104.6 360.2 96 346.6 96H165.4c-13.6 0-25.7 8.6-30.2 21.4zM39.6 196.8L74.8 96.3C88.3 57.8 124.6 32 165.4 32H346.6c40.8 0 77.1 25.8 90.6 64.3l35.2 100.5c23.2 9.6 39.6 32.5 39.6 59.2V400v48c0 17.7-14.3 32-32 32H448c-17.7 0-32-14.3-32-32V400H96v48c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V400 256c0-26.7 16.4-49.6 39.6-59.2zM128 288a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"></path></svg></i>
  <span class="label">Driving Side</span>
  <span class="value">${displaydata[0].car.side}</span>
  </div>
  
  <div class="dashboard-country-detail">
  <i data-fa-i2svg=""><svg class="svg-inline--fa fa-calendar-week" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="calendar-week" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm80 64c-8.8 0-16 7.2-16 16v64c0 8.8 7.2 16 16 16H368c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80z"></path></svg></i>
  <span class="label">Week Starts</span>
  <span class="value">${displaydata[0].startOfWeek}</span>
  </div>
  </div>
  <div class="dashboard-country-extras">
  
  <div class="dashboard-country-extra">
  <h4><i data-fa-i2svg=""><svg class="svg-inline--fa fa-coins" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="coins" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M512 80c0 18-14.3 34.6-38.4 48c-29.1 16.1-72.5 27.5-122.3 30.9c-3.7-1.8-7.4-3.5-11.3-5C300.6 137.4 248.2 128 192 128c-8.3 0-16.4 .2-24.5 .6l-1.1-.6C142.3 114.6 128 98 128 80c0-44.2 86-80 192-80S512 35.8 512 80zM160.7 161.1c10.2-.7 20.7-1.1 31.3-1.1c62.2 0 117.4 12.3 152.5 31.4C369.3 204.9 384 221.7 384 240c0 4-.7 7.9-2.1 11.7c-4.6 13.2-17 25.3-35 35.5c0 0 0 0 0 0c-.1 .1-.3 .1-.4 .2l0 0 0 0c-.3 .2-.6 .3-.9 .5c-35 19.4-90.8 32-153.6 32c-59.6 0-112.9-11.3-148.2-29.1c-1.9-.9-3.7-1.9-5.5-2.9C14.3 274.6 0 258 0 240c0-34.8 53.4-64.5 128-75.4c10.5-1.5 21.4-2.7 32.7-3.5zM416 240c0-21.9-10.6-39.9-24.1-53.4c28.3-4.4 54.2-11.4 76.2-20.5c16.3-6.8 31.5-15.2 43.9-25.5V176c0 19.3-16.5 37.1-43.8 50.9c-14.6 7.4-32.4 13.7-52.4 18.5c.1-1.8 .2-3.5 .2-5.3zm-32 96c0 18-14.3 34.6-38.4 48c-1.8 1-3.6 1.9-5.5 2.9C304.9 404.7 251.6 416 192 416c-62.8 0-118.6-12.6-153.6-32C14.3 370.6 0 354 0 336V300.6c12.5 10.3 27.6 18.7 43.9 25.5C83.4 342.6 135.8 352 192 352s108.6-9.4 148.1-25.9c7.8-3.2 15.3-6.9 22.4-10.9c6.1-3.4 11.8-7.2 17.2-11.2c1.5-1.1 2.9-2.3 4.3-3.4V304v5.7V336zm32 0V304 278.1c19-4.2 36.5-9.5 52.1-16c16.3-6.8 31.5-15.2 43.9-25.5V272c0 10.5-5 21-14.9 30.9c-16.3 16.3-45 29.7-81.3 38.4c.1-1.7 .2-3.5 .2-5.3zM192 448c56.2 0 108.6-9.4 148.1-25.9c16.3-6.8 31.5-15.2 43.9-25.5V432c0 44.2-86 80-192 80S0 476.2 0 432V396.6c12.5 10.3 27.6 18.7 43.9 25.5C83.4 438.6 135.8 448 192 448z"></path></svg></i> Currency</h4>
  <div class="extra-tags">
  <span class="extra-tag"> ${Object.values(displaydata[0].currencies)[0].name} ${Object.values(displaydata[0].currencies)[0].symbol}</span>
  </div>
  </div>
  
  
  
  <div class="dashboard-country-extra">
  <h4><i data-fa-i2svg=""><svg class="svg-inline--fa fa-language" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="language" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" data-fa-i2svg=""><path fill="currentColor" d="M0 128C0 92.7 28.7 64 64 64H256h48 16H576c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H320 304 256 64c-35.3 0-64-28.7-64-64V128zm320 0V384H576V128H320zM178.3 175.9c-3.2-7.2-10.4-11.9-18.3-11.9s-15.1 4.7-18.3 11.9l-64 144c-4.5 10.1 .1 21.9 10.2 26.4s21.9-.1 26.4-10.2l8.9-20.1h73.6l8.9 20.1c4.5 10.1 16.3 14.6 26.4 10.2s14.6-16.3 10.2-26.4l-64-144zM160 233.2L179 276H141l19-42.8zM448 164c11 0 20 9 20 20v4h44 16c11 0 20 9 20 20s-9 20-20 20h-2l-1.6 4.5c-8.9 24.4-22.4 46.6-39.6 65.4c.9 .6 1.8 1.1 2.7 1.6l18.9 11.3c9.5 5.7 12.5 18 6.9 27.4s-18 12.5-27.4 6.9l-18.9-11.3c-4.5-2.7-8.8-5.5-13.1-8.5c-10.6 7.5-21.9 14-34 19.4l-3.6 1.6c-10.1 4.5-21.9-.1-26.4-10.2s.1-21.9 10.2-26.4l3.6-1.6c6.4-2.9 12.6-6.1 18.5-9.8l-12.2-12.2c-7.8-7.8-7.8-20.5 0-28.3s20.5-7.8 28.3 0l14.6 14.6 .5 .5c12.4-13.1 22.5-28.3 29.8-45H448 376c-11 0-20-9-20-20s9-20 20-20h52v-4c0-11 9-20 20-20z"></path></svg></i> Languages</h4>
  <div class="extra-tags">
  ${Object.values(displaydata[0].languages)
    .map((lang) => `<span class="extra-tag">${lang}</span>`)
    .join("")}
    </div>
    </div>
    <div class="dashboard-country-extra">
    <h4><i data-fa-i2svg=""><svg class="svg-inline--fa fa-map-location-dot" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="map-location-dot" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg=""><path fill="currentColor" d="M408 120c0 54.6-73.1 151.9-105.2 192c-7.7 9.6-22 9.6-29.6 0C241.1 271.9 168 174.6 168 120C168 53.7 221.7 0 288 0s120 53.7 120 120zm8 80.4c3.5-6.9 6.7-13.8 9.6-20.6c.5-1.2 1-2.5 1.5-3.7l116-46.4C558.9 123.4 576 135 576 152V422.8c0 9.8-6 18.6-15.1 22.3L416 503V200.4zM137.6 138.3c2.4 14.1 7.2 28.3 12.8 41.5c2.9 6.8 6.1 13.7 9.6 20.6V451.8L32.9 502.7C17.1 509 0 497.4 0 480.4V209.6c0-9.8 6-18.6 15.1-22.3l122.6-49zM327.8 332c13.9-17.4 35.7-45.7 56.2-77V504.3L192 449.4V255c20.5 31.3 42.3 59.6 56.2 77c20.5 25.6 59.1 25.6 79.6 0zM288 152a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"></path></svg></i> Neighbors</h4>
    <div class="extra-tags">
    ${
      displaydata[0].borders && displaydata[0].borders.length
        ? displaydata[0].borders
            .map(
              (nebor) =>
                `<span class="extra-tag border-tag" data-border="${nebor}">${nebor}</span>`,
            )
            .join("")
        : ` `
    }
    </div>
    
    
    
    </div>
    </div>
    <div class="dashboard-country-actions">
      <a href="${displaydata[0].maps.googleMaps}" target="_blank" rel="noopener" class="btn-map-link">
        <i data-fa-i2svg=""><svg class="svg-inline--fa fa-map" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="map" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg=""><path fill="currentColor" d="M384 476.1L192 421.2V35.9L384 90.8V476.1zm32-1.2V88.4L543.1 37.5c15.8-6.3 32.9 5.3 32.9 22.3V394.6c0 9.8-6 18.6-15.1 22.3L416 474.8zM15.1 95.1L160 37.2V423.6L32.9 474.5C17.1 480.8 0 469.2 0 452.2V117.4c0-9.8 6-18.6 15.1-22.3z"></path></svg></i> View on Google Maps
      </a>
    </div>
    
    `;

 
  const countryTimeEl = document.getElementById("country-local-time");
  if (countryTimeEl) {
    countryTimeEl.textContent = formatTimeWithOffsetforliveclock(
      offset(displaydata[0].timezones[0]),
    );
    setInterval(() => {
      countryTimeEl.textContent = formatTimeWithOffsetforliveclock(
        offset(displaydata[0].timezones[0]),
      );
    }, 1000);
  }
}

document.addEventListener("click", function (e) {
  if (e.target.hasAttribute("data-border")) {
    const borderCountry = e.target.getAttribute("data-border");
    loadDashboardBorderCountry(borderCountry);
  }
});
async function loadDashboardBorderCountry(value) {
  currentvalue = value;
  await displaydate();
  await countrydata();
}

function showTimetop() {
  return new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    weekday: "short",
    month: "short",
    day: "2-digit",
  });
}
setInterval(() => {
  document.getElementById("current-datetime").innerText = showTimetop();
}, 1000);

let allnav = document.querySelectorAll("[data-view]");

document.querySelector(".sidebar-nav").addEventListener("click", function (e) {
  let nav = e.target.closest(".nav-item").getAttribute("data-view");

  for (let i = 0; i < allnav.length; i++) {
    if (allnav[i].attributes[1].value === nav) {
      allnav[i].classList.add("active");
      if (allnav[i].attributes[1].value === "dashboard") {
        document.querySelector("#dashboard-view").classList.add("active");
        document.querySelector("#holidays-view").classList.remove("active");
        document.querySelector("#events-view").classList.remove("active");
        document.querySelector("#weather-view").classList.remove("active");
        document
          .querySelector("#long-weekends-view")
          .classList.remove("active");
        document.querySelector("#currency-view").classList.remove("active");
        document.querySelector("#sun-times-view").classList.remove("active");
        document.querySelector("#my-plans-view").classList.remove("active");
      } else if (allnav[i].attributes[1].value === "holidays") {
        document.querySelector("#holidays-view").classList.add("active");
        document.querySelector("#dashboard-view").classList.remove("active");
        document.querySelector("#events-view").classList.remove("active");
        document.querySelector("#weather-view").classList.remove("active");
        document
          .querySelector("#long-weekends-view")
          .classList.remove("active");
        document.querySelector("#currency-view").classList.remove("active");
        document.querySelector("#sun-times-view").classList.remove("active");
        document.querySelector("#my-plans-view").classList.remove("active");
      } else if (allnav[i].attributes[1].value === "events") {
        document.querySelector("#dashboard-view").classList.remove("active");
        document.querySelector("#holidays-view").classList.remove("active");
        document.querySelector("#events-view").classList.add("active");
        document.querySelector("#weather-view").classList.remove("active");
        document
          .querySelector("#long-weekends-view")
          .classList.remove("active");
        document.querySelector("#currency-view").classList.remove("active");
        document.querySelector("#sun-times-view").classList.remove("active");
        document.querySelector("#my-plans-view").classList.remove("active");
      } else if (allnav[i].attributes[1].value === "weather") {
        document.querySelector("#dashboard-view").classList.remove("active");
        document.querySelector("#holidays-view").classList.remove("active");
        document.querySelector("#events-view").classList.remove("active");
        document.querySelector("#weather-view").classList.add("active");
        document
          .querySelector("#long-weekends-view")
          .classList.remove("active");
        document.querySelector("#currency-view").classList.remove("active");
        document.querySelector("#sun-times-view").classList.remove("active");
        document.querySelector("#my-plans-view").classList.remove("active");
      } else if (allnav[i].attributes[1].value === "long-weekends") {
        document.querySelector("#dashboard-view").classList.remove("active");
        document.querySelector("#holidays-view").classList.remove("active");
        document.querySelector("#events-view").classList.remove("active");
        document.querySelector("#weather-view").classList.remove("active");
        document.querySelector("#long-weekends-view").classList.add("active");
        document.querySelector("#currency-view").classList.remove("active");
        document.querySelector("#sun-times-view").classList.remove("active");
        document.querySelector("#my-plans-view").classList.remove("active");
      } else if (allnav[i].attributes[1].value === "currency") {
        document.querySelector("#dashboard-view").classList.remove("active");
        document.querySelector("#holidays-view").classList.remove("active");
        document.querySelector("#events-view").classList.remove("active");
        document.querySelector("#weather-view").classList.remove("active");
        document
          .querySelector("#long-weekends-view")
          .classList.remove("active");
        document.querySelector("#currency-view").classList.add("active");
        document.querySelector("#sun-times-view").classList.remove("active");
        document.querySelector("#my-plans-view").classList.remove("active");
      } else if (allnav[i].attributes[1].value === "sun-times") {
        document.querySelector("#dashboard-view").classList.remove("active");
        document.querySelector("#holidays-view").classList.remove("active");
        document.querySelector("#events-view").classList.remove("active");
        document.querySelector("#weather-view").classList.remove("active");
        document
          .querySelector("#long-weekends-view")
          .classList.remove("active");
        document.querySelector("#currency-view").classList.remove("active");
        document.querySelector("#sun-times-view").classList.add("active");
        document.querySelector("#my-plans-view").classList.remove("active");
      } else if (allnav[i].attributes[1].value === "my-plans") {
        document.querySelector("#dashboard-view").classList.remove("active");
        document.querySelector("#holidays-view").classList.remove("active");
        document.querySelector("#events-view").classList.remove("active");
        document.querySelector("#weather-view").classList.remove("active");
        document
          .querySelector("#long-weekends-view")
          .classList.remove("active");
        document.querySelector("#currency-view").classList.remove("active");
        document.querySelector("#sun-times-view").classList.remove("active");
        document.querySelector("#my-plans-view").classList.add("active");
      }
    } else {
      allnav[i].classList.remove("active");
    }
  }
});

// the second page
let loading = document.querySelector("#loading-overlay");
// function navigateTo(){
//   let allnav = document.querySelectorAll("[data-view]");
//   allnav[0].classList.add("active");
//   document.querySelector("#dashboard-view").classList.add("active");
//   document.querySelector("#holidays-view").classList.remove("active");
//   document.querySelector("#events-view").classList.remove("active");
//   document.querySelector("#weather-view").classList.remove("active");
//   document.querySelector("#long-weekends-view").classList.remove("active");
//   document.querySelector("#currency-view").classList.remove("active");
//   document.querySelector("#sun-times-view").classList.remove("active");
//   document.querySelector("#my-plans-view").classList.remove("active");
// }

let holidayapi;
let holidaycontent = document.querySelector("#holidays-content");

async function holidaysfun() {
  if (valueforrestofpages) {
    await loading.classList.remove("hidden");
    holidayapi = await fetch(
      `https://date.nager.at/api/v3/PublicHolidays/${currentyear}/${valueforrestofpages.cca2}`,
    );
    holidayapi = await holidayapi.json();
    await loading.classList.add("hidden");
  }
  if (holidayapi) {
    displayholiday(holidayapi);
    console.log(holidayapi);
  } else {
    holidaycontent.innerHTML = `<div class="empty-state">
              <div class="empty-icon"><i data-fa-i2svg=""><svg class="svg-inline--fa fa-calendar-xmark" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="calendar-xmark" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M160 0c17.7 0 32 14.3 32 32V64H320V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H32V112c0-26.5 21.5-48 48-48h48V32c0-17.7 14.3-32 32-32zM32 192H480V464c0 26.5-21.5 48-48 48H80c-26.5 0-48-21.5-48-48V192zM337 305c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47z"></path></svg></i></div>
              <h3>No Country Selected</h3>
              <p>Select a country from the dashboard to explore public holidays</p>
              <button class="btn btn-primary" onclick="navigateTo()">
                <i data-fa-i2svg=""><svg class="svg-inline--fa fa-globe" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="globe" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M352 256c0 22.2-1.2 43.6-3.3 64H163.3c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64H348.7c2.2 20.4 3.3 41.8 3.3 64zm28.8-64H503.9c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64H380.8c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32H376.7c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0H167.7c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 20.9 58.2 27 94.7zm-209 0H18.6C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192H131.2c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64H8.1C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6H344.3c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352H135.3zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6H493.4z"></path></svg></i>
                Go to Dashboard
              </button>
            </div>`;
  }
}

document.querySelector(".sidebar-nav").addEventListener("click", function (e) {
  let nav = e.target.closest(".nav-item").getAttribute("data-view");
  if (nav === "holidays") {
    holidaysfun();
  } else if (nav === "events") {
    eventfun();
  } else if (nav === "weather") {
    weatherfun();
  } else if (nav === "long-weekends") {
    longweekendsfun();
  } else if (nav === "sun-times") {
    sunsetfun();
  } else if (nav === "my-plans") {
    alldisplay();
  }
});
let savedholidaybutton = document.querySelector("#saved-holiday-btn");
let holidayvalueforlocallstorage;
function displayholiday(value) {
  var cartona = " ";
  for (let i = 0; i < value.length; i++) {
    const isSaved = checkholidayItem(value[i]);
    cartona += ` <div class="holiday-card">
              <div class="holiday-card-header">
                <div class="holiday-date-box"><span class="day">${formatDateWithMonthName(value[i].date)[1]}</span><span class="month">${formatDateWithMonthName(value[i].date)[0]}</span></div>
                <button id="holiday-action-btn" data-index="${i}" class="holiday-action-btn ${isSaved ? "saved" : ""}"><i data-fa-i2svg=""><svg class="svg-inline--fa fa-heart" aria-hidden="true" focusable="false" data-prefix="${isSaved ? "fas" : "far"}" data-icon="heart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"></path></svg></i></button>
              </div>
              <h3>${value[i].localName}</h3>
              <p class="holiday-name">${value[i].name}</p>
              <div class="holiday-card-footer">
                <span class="holiday-day-badge"><i data-fa-i2svg=""><svg class="svg-inline--fa fa-calendar" aria-hidden="true" focusable="false" data-prefix="far" data-icon="calendar" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192H400V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192z"></path></svg></i> ${getDayName(value[i].date)}</span>
                <span class="holiday-type-badge">Public</span>
              </div>
            </div>`;
  }
  holidaycontent.innerHTML = cartona;
  holidayvalueforlocallstorage = value;
}

function checkholidayItem(singleHoliday) {
  const savedholidays = JSON.parse(localStorage.getItem("holiday")) || [];

  return savedholidays.some(
    (saved) =>
      saved.localName === singleHoliday.localName &&
      saved.date === singleHoliday.date,
  );
}

let selectedholiday = JSON.parse(localStorage.getItem("holiday")) || [];

holidaycontent.addEventListener("click", function (e) {
  if (e.target.closest(".holiday-action-btn")) {
    const button = e.target.closest(".holiday-action-btn");
    const index = button.getAttribute("data-index");
    const holiday = holidayvalueforlocallstorage[index];

    if (checkholidayItem(holiday)) {
      document.querySelector("#toast-container").innerHTML = `
        <div class="toast warning">
          <i data-fa-i2svg=""><svg class="svg-inline--fa fa-circle-exclamation" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-exclamation" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM116 268a12 12 0 1 0 24 0 12 12 0 1 0 -24 0zm128-44a40 40 0 1 0 0 80 40 40 0 1 0 0-80zM328 268a12 12 0 1 0 24 0 12 12 0 1 0 -24 0z"></path></svg></i>
          <span>This holiday is already saved!</span>
        </div>`;
      setTimeout(() => {
        document.querySelector("#toast-container").innerHTML = "";
      }, 3000);
    } else {
      button.classList.add("saved");
      selectedholiday.push(holiday);
      localStorage.setItem("holiday", JSON.stringify(selectedholiday));

      document.querySelector("#toast-container").innerHTML = `
        <div class="toast success">
          <i data-fa-i2svg=""><svg class="svg-inline--fa fa-circle-check" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-check" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"></path></svg></i>
          <span>Holiday saved successfully!</span>
        </div>`;
      setTimeout(() => {
        document.querySelector("#toast-container").innerHTML = "";
      }, 3000);
      displayallplanlongweekend();
      displayallplanevents();
      displaymyplanholiday();
      alldisplay();
    }
  }
});

// third page
let eventvalueforlocallstorage;
let savedeventbutton = document.querySelector("#saved-event-btn");

function checkeventItem(singleevent) {
  const savedevent = JSON.parse(localStorage.getItem("events")) || [];

  return savedevent.some((saved) => saved.id === singleevent.id);
}

let selectedevent = JSON.parse(localStorage.getItem("events")) || [];
let eventapi;
let eventscontent = document.querySelector("#events-content");

eventscontent.addEventListener("click", function (e) {
  if (e.target.closest("#saved-event-btn")) {
    const button = e.target.closest("#saved-event-btn");
    const index = button.getAttribute("data-index-event");
    const event = eventvalueforlocallstorage[index];

    if (checkeventItem(event)) {
      document.querySelector("#toast-container").innerHTML = `
        <div class="toast warning">
          <i data-fa-i2svg=""><svg class="svg-inline--fa fa-circle-exclamation" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-exclamation" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM116 268a12 12 0 1 0 24 0 12 12 0 1 0 -24 0zm128-44a40 40 0 1 0 0 80 40 40 0 1 0 0-80zM328 268a12 12 0 1 0 24 0 12 12 0 1 0 -24 0z"></path></svg></i>
          <span>This event is already saved!</span>
        </div>`;
      setTimeout(() => {
        document.querySelector("#toast-container").innerHTML = "";
      }, 3000);
    } else {
      button.classList.add("saved");
      selectedevent.push(event);
      localStorage.setItem("events", JSON.stringify(selectedevent));

      document.querySelector("#toast-container").innerHTML = `
        <div class="toast success">
          <i data-fa-i2svg=""><svg class="svg-inline--fa fa-circle-check" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-check" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"></path></svg></i>
          <span>event saved successfully!</span>
        </div>`;
      setTimeout(() => {
        document.querySelector("#toast-container").innerHTML = "";
      }, 3000);
      displayallplanlongweekend();
      displayallplanevents();
      displaymyplanholiday();
      alldisplay();
    }
  }
});

async function eventfun() {
  if (valueforrestofpages) {
    await loading.classList.remove("hidden");
    eventapi = await fetch(
      `https://app.ticketmaster.com/discovery/v2/events.json?apikey=VwECw2OiAzxVzIqnwmKJUG41FbeXJk1y&city=${valueforrestofpages.capital[0]}&countryCode=${valueforrestofpages.cca2}&size=20`,
    );
    eventapi = await eventapi.json();
    await loading.classList.add("hidden");
    console.log(eventapi);
    if (eventapi._embedded) {
      displayevent(eventapi);
    } else {
      eventscontent.innerHTML = `
    <div class="empty-state">
        <div class="empty-icon"><i data-fa-i2svg=""><svg class="svg-inline--fa fa-ticket" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="ticket" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg=""><path fill="currentColor" d="M64 64C28.7 64 0 92.7 0 128v64c0 8.8 7.4 15.7 15.7 18.6C34.5 217.1 48 235 48 256s-13.5 38.9-32.3 45.4C7.4 304.3 0 311.2 0 320v64c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V320c0-8.8-7.4-15.7-15.7-18.6C541.5 294.9 528 277 528 256s13.5-38.9 32.3-45.4c8.3-2.9 15.7-9.8 15.7-18.6V128c0-35.3-28.7-64-64-64H64zm64 112l0 160c0 8.8 7.2 16 16 16H432c8.8 0 16-7.2 16-16V176c0-8.8-7.2-16-16-16H144c-8.8 0-16 7.2-16 16zM96 160c0-17.7 14.3-32 32-32H448c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H128c-17.7 0-32-14.3-32-32V160z"></path></svg></i></div>
        <h3>No Events Found</h3>
        <p>No events found for this location</p>
      </div>
    
    `;
    }
  }
}

function displayevent(value) {
  var cartona = " ";
  for (let i = 0; i < value._embedded.events.length; i++) {
    const isSaved = checkeventItem(value._embedded.events[i]);
    cartona += `<div class="event-card">
              <div class="event-card-image">
                <img src="${value._embedded.events[i].images[2].url}" alt="Jazz Night">
                <span class="event-card-category">${value._embedded.events[i].classifications[0].segment.name}</span>
                <button class="event-card-save ${isSaved ? "saved" : ""}" id="saved-event-btn" data-index-event="${i}"><i data-fa-i2svg=""><svg class="svg-inline--fa fa-heart" aria-hidden="true" focusable="false" data-prefix="far" data-icon="heart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"></path></svg></i></button>
              </div>
              <div class="event-card-body">
                <h3>${value._embedded.events[i].name}</h3>
                <div class="event-card-info">
                  <div><i data-fa-i2svg=""><svg class="svg-inline--fa fa-calendar" aria-hidden="true" focusable="false" data-prefix="far" data-icon="calendar" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192H400V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192z"></path></svg></i>${formatDateWithMonthName(value._embedded.events[i].dates.start.localDate)} at ${value._embedded.events[i].dates.start.localTime}</div>
                  <div><i data-fa-i2svg=""><svg class="svg-inline--fa fa-location-dot" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="location-dot" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-fa-i2svg=""><path fill="currentColor" d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"></path></svg></i>${value._embedded.events[i]._embedded.venues[0].name}, ${value._embedded.events[i]._embedded.venues[0].city.name}</div>
                </div>
                <div class="event-card-footer">
                  <button class="btn-event"><i data-fa-i2svg=""><svg class="svg-inline--fa fa-heart" aria-hidden="true" focusable="false" data-prefix="far" data-icon="heart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"></path></svg></i> Save</button>
                  <a href="${value._embedded.events[i].url}" class="btn-buy-ticket"><i data-fa-i2svg=""><svg class="svg-inline--fa fa-ticket" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="ticket" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg=""><path fill="currentColor" d="M64 64C28.7 64 0 92.7 0 128v64c0 8.8 7.4 15.7 15.7 18.6C34.5 217.1 48 235 48 256s-13.5 38.9-32.3 45.4C7.4 304.3 0 311.2 0 320v64c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V320c0-8.8-7.4-15.7-15.7-18.6C541.5 294.9 528 277 528 256s13.5-38.9 32.3-45.4c8.3-2.9 15.7-9.8 15.7-18.6V128c0-35.3-28.7-64-64-64H64zm64 112l0 160c0 8.8 7.2 16 16 16H432c8.8 0 16-7.2 16-16V176c0-8.8-7.2-16-16-16H144c-8.8 0-16 7.2-16 16zM96 160c0-17.7 14.3-32 32-32H448c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H128c-17.7 0-32-14.3-32-32V160z"></path></svg></i> Buy Tickets</a>
                </div>
              </div>
            </div>`;
  }
  eventscontent.innerHTML = cartona;
  eventvalueforlocallstorage = value._embedded.events;
}

/// fouth page

function getWeatherDescription(code) {
  const weatherMap = {
    0: "Clear sky",

    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",

    45: "Fog",
    48: "Rime fog",

    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",

    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",

    71: "Slight snow",
    73: "Moderate snow",
    75: "Heavy snow",

    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",

    95: "Slight thunderstorm",
    96: "Moderate thunderstorm with hail",
    99: "Heavy thunderstorm with hail",
  };

  return weatherMap[code] || "Unknown weather condition";
}
function formatTime12(dateTimeStr) {
  return new Date(dateTimeStr).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

let weatherapi;
let weatherview = document.querySelector("#weather-view");

async function weatherfun() {
  if (valueforrestofpages) {
    await loading.classList.remove("hidden");
    weatherapi = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${valueforrestofpages.latlng[0]}&longitude=${valueforrestofpages.latlng[1]}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,uv_index&hourly=temperature_2m,weather_code,precipitation_probability&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,wind_direction_10m_dominant&timezone=auto`,
    );
    weatherapi = await weatherapi.json();
    await loading.classList.add("hidden");
    console.log(weatherapi);
    displayweather(weatherapi);
  }
}

function displayweather(value) {
  var cartona = " ";
  cartona += `
<div class="view-header-card gradient-blue">
            <div class="view-header-icon">
              <i data-fa-i2svg=""><svg class="svg-inline--fa fa-cloud-sun" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="cloud-sun" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" data-fa-i2svg=""><path fill="currentColor" d="M294.2 1.2c5.1 2.1 8.7 6.7 9.6 12.1l14.1 84.7 84.7 14.1c5.4 .9 10 4.5 12.1 9.6s1.5 10.9-1.6 15.4l-38.5 55c-2.2-.1-4.4-.2-6.7-.2c-23.3 0-45.1 6.2-64 17.1l0-1.1c0-53-43-96-96-96s-96 43-96 96s43 96 96 96c8.1 0 15.9-1 23.4-2.9c-36.6 18.1-63.3 53.1-69.8 94.9l-24.4 17c-4.5 3.2-10.3 3.8-15.4 1.6s-8.7-6.7-9.6-12.1L98.1 317.9 13.4 303.8c-5.4-.9-10-4.5-12.1-9.6s-1.5-10.9 1.6-15.4L52.5 208 2.9 137.2c-3.2-4.5-3.8-10.3-1.6-15.4s6.7-8.7 12.1-9.6L98.1 98.1l14.1-84.7c.9-5.4 4.5-10 9.6-12.1s10.9-1.5 15.4 1.6L208 52.5 278.8 2.9c4.5-3.2 10.3-3.8 15.4-1.6zM144 208a64 64 0 1 1 128 0 64 64 0 1 1 -128 0zM639.9 431.9c0 44.2-35.8 80-80 80H288c-53 0-96-43-96-96c0-47.6 34.6-87 80-94.6l0-1.3c0-53 43-96 96-96c34.9 0 65.4 18.6 82.2 46.4c13-9.1 28.8-14.4 45.8-14.4c44.2 0 80 35.8 80 80c0 5.9-.6 11.7-1.9 17.2c37.4 6.7 65.8 39.4 65.8 78.7z"></path></svg></i>
            </div>
            <div class="view-header-content">
              <h2>Weather Forecast</h2>
              <p>Check 7-day weather forecasts for cities around the world</p>
            </div>
            
            <div class="view-header-selection" id="weather-selection" style="display: flex;">
              <div class="current-selection-badge">
                <img id="weather-flag" src="${valueforrestofpages.flags.png}" alt="" class="selection-flag" style="display: block;">
                <span id="weather-country-name">${valueforrestofpages.name.common}</span>
                <span class="selection-city" id="weather-city-name">${valueforrestofpages.capital[0]}</span>
              </div>
            </div>
          </div>
<div id="weather-content" class="weather-layout">
<div class="weather-hero-card weather-sunny">
              <div class="weather-location">
                <i data-fa-i2svg=""><svg class="svg-inline--fa fa-location-dot" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="location-dot" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-fa-i2svg=""><path fill="currentColor" d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"></path></svg></i>
                <span>${valueforrestofpages.capital[0]}</span>
                <span class="weather-time">${getDayName(value.current.time.split("T")[0])} , ${formatDateWithMonthName(value.current.time.split("T")[0])}</span>
              </div>
              <div class="weather-hero-main">
                <div class="weather-hero-left">
                  <div class="weather-hero-icon"><i data-fa-i2svg=""><svg class="svg-inline--fa fa-sun" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sun" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z"></path></svg></i></div>
                  <div class="weather-hero-temp">
                    <span class="temp-value">${Math.round(value.current.temperature_2m)}</span>
                    <span class="temp-unit">°C</span>
                  </div>
                </div>
                <div class="weather-hero-right">
                  <div class="weather-condition">${getWeatherDescription(value.current.weather_code)}</div>
                  <div class="weather-feels">Feels like ${Math.round(value.current.apparent_temperature)}°C</div>
                  <div class="weather-high-low">
                    <span class="high"><i data-fa-i2svg=""><svg class="svg-inline--fa fa-arrow-up" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-up" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-fa-i2svg=""><path fill="currentColor" d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"></path></svg></i> ${value.daily.temperature_2m_max[0]}°</span>
                    <span class="low"><i data-fa-i2svg=""><svg class="svg-inline--fa fa-arrow-down" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-fa-i2svg=""><path fill="currentColor" d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"></path></svg></i> ${value.daily.temperature_2m_min[0]}°</span>
                  </div>
                </div>
              </div>
            </div> 
            
            <div class="weather-details-grid">
              <div class="weather-detail-card">
                <div class="detail-icon humidity"><i data-fa-i2svg=""><svg class="svg-inline--fa fa-droplet" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="droplet" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-fa-i2svg=""><path fill="currentColor" d="M192 512C86 512 0 426 0 320C0 228.8 130.2 57.7 166.6 11.7C172.6 4.2 181.5 0 191.1 0h1.8c9.6 0 18.5 4.2 24.5 11.7C253.8 57.7 384 228.8 384 320c0 106-86 192-192 192zM96 336c0-8.8-7.2-16-16-16s-16 7.2-16 16c0 61.9 50.1 112 112 112c8.8 0 16-7.2 16-16s-7.2-16-16-16c-44.2 0-80-35.8-80-80z"></path></svg></i></div>
                <div class="detail-info">
                  <span class="detail-label">Humidity</span>
                  <span class="detail-value">${value.current.relative_humidity_2m}%</span>
                </div>
              </div>
              <div class="weather-detail-card">
                <div class="detail-icon wind"><i data-fa-i2svg=""><svg class="svg-inline--fa fa-wind" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="wind" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M288 32c0 17.7 14.3 32 32 32h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H352c53 0 96-43 96-96s-43-96-96-96H320c-17.7 0-32 14.3-32 32zm64 352c0 17.7 14.3 32 32 32h32c53 0 96-43 96-96s-43-96-96-96H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H384c-17.7 0-32 14.3-32 32zM128 512h32c53 0 96-43 96-96s-43-96-96-96H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H160c17.7 0 32 14.3 32 32s-14.3 32-32 32H128c-17.7 0-32 14.3-32 32s14.3 32 32 32z"></path></svg></i></div>
                <div class="detail-info">
                  <span class="detail-label">Wind</span>
                  <span class="detail-value">${value.current.wind_speed_10m} km/h</span>
                </div>
              </div>
              <div class="weather-detail-card">
                <div class="detail-icon uv"><i data-fa-i2svg=""><svg class="svg-inline--fa fa-sun" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sun" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z"></path></svg></i></div>
                <div class="detail-info">
                  <span class="detail-label">UV Index</span>
                  <span class="detail-value">${Math.round(value.current.uv_index)}</span>
                </div>
              </div>
              <div class="weather-detail-card">
                <div class="detail-icon precip"><i data-fa-i2svg=""><svg class="svg-inline--fa fa-cloud-rain" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="cloud-rain" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M96 320c-53 0-96-43-96-96c0-42.5 27.6-78.6 65.9-91.2C64.7 126.1 64 119.1 64 112C64 50.1 114.1 0 176 0c43.1 0 80.5 24.3 99.2 60c14.7-17.1 36.5-28 60.8-28c44.2 0 80 35.8 80 80c0 5.5-.6 10.8-1.6 16c.5 0 1.1 0 1.6 0c53 0 96 43 96 96s-43 96-96 96H96zm-6.8 52c1.3-2.5 3.9-4 6.8-4s5.4 1.5 6.8 4l35.1 64.6c4.1 7.5 6.2 15.8 6.2 24.3v3c0 26.5-21.5 48-48 48s-48-21.5-48-48v-3c0-8.5 2.1-16.9 6.2-24.3L89.2 372zm160 0c1.3-2.5 3.9-4 6.8-4s5.4 1.5 6.8 4l35.1 64.6c4.1 7.5 6.2 15.8 6.2 24.3v3c0 26.5-21.5 48-48 48s-48-21.5-48-48v-3c0-8.5 2.1-16.9 6.2-24.3L249.2 372zm124.9 64.6L409.2 372c1.3-2.5 3.9-4 6.8-4s5.4 1.5 6.8 4l35.1 64.6c4.1 7.5 6.2 15.8 6.2 24.3v3c0 26.5-21.5 48-48 48s-48-21.5-48-48v-3c0-8.5 2.1-16.9 6.2-24.3z"></path></svg></i></div>
                <div class="detail-info">
                  <span class="detail-label">Precipitation</span>
                  <span class="detail-value">${value.daily.precipitation_probability_max[0]}%</span>
                </div>
              </div>
              <div class="weather-detail-card sunrise-sunset">
        <div class="sun-times-visual">
          <div class="sun-time sunrise">
            <i data-fa-i2svg=""><svg class="svg-inline--fa fa-sunrise" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sunrise" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><g class="missing"><path fill="currentColor" d="M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"></path><circle fill="currentColor" cx="256" cy="364" r="28"><animate attributeType="XML" repeatCount="indefinite" dur="2s" attributeName="r" values="28;14;28;28;14;28;"></animate><animate attributeType="XML" repeatCount="indefinite" dur="2s" attributeName="opacity" values="1;0;1;1;0;1;"></animate></circle><path fill="currentColor" opacity="1" d="M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"><animate attributeType="XML" repeatCount="indefinite" dur="2s" attributeName="opacity" values="1;0;0;0;0;1;"></animate></path><path fill="currentColor" opacity="0" d="M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"><animate attributeType="XML" repeatCount="indefinite" dur="2s" attributeName="opacity" values="0;0;1;1;0;0;"></animate></path></g></svg></i>
            <span class="sun-label">Sunrise</span>
            <span class="sun-value">${formatTime12(value.daily.sunrise[0])}</span>
          </div>
          <div class="sun-arc">
            <div class="sun-arc-path"></div>
            <div class="sun-position" style="--sun-progress: 100%"></div>
          </div>
          <div class="sun-time sunset">
            <i data-fa-i2svg=""><svg class="svg-inline--fa fa-sunset" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sunset" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><g class="missing"><path fill="currentColor" d="M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"></path><circle fill="currentColor" cx="256" cy="364" r="28"><animate attributeType="XML" repeatCount="indefinite" dur="2s" attributeName="r" values="28;14;28;28;14;28;"></animate><animate attributeType="XML" repeatCount="indefinite" dur="2s" attributeName="opacity" values="1;0;1;1;0;1;"></animate></circle><path fill="currentColor" opacity="1" d="M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"><animate attributeType="XML" repeatCount="indefinite" dur="2s" attributeName="opacity" values="1;0;0;0;0;1;"></animate></path><path fill="currentColor" opacity="0" d="M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"><animate attributeType="XML" repeatCount="indefinite" dur="2s" attributeName="opacity" values="0;0;1;1;0;0;"></animate></path></g></svg></i>
            <span class="sun-label">Sunset</span>
            <span class="sun-value">${formatTime12(value.daily.sunset[0])}</span>
          </div>
        </div>
      </div>
            </div>
            
            <div class="weather-section">
      <h3 class="weather-section-title">
        <i data-fa-i2svg=""><svg class="svg-inline--fa fa-clock" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="clock" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"></path></svg></i>
        Hourly Forecast
      </h3>

    <div class="hourly-scroll">
        
         ${weathhour()}
          
      </div>
    </div>

    <div class="weather-section">
      <h3 class="weather-section-title">
        <i data-fa-i2svg=""><svg class="svg-inline--fa fa-calendar-week" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="calendar-week" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm80 64c-8.8 0-16 7.2-16 16v64c0 8.8 7.2 16 16 16H368c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80z"></path></svg></i>
        7-Day Forecast
      </h3>
      <div class="forecast-list">
        ${forecastdays()}
      </div>
    </div>
            </div>

            `;
  weatherview.innerHTML = cartona;
}

function getCurrentDateTimeHourFixed() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  const hours = String(now.getHours()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:00`;
}

function weathhour() {
  let cartona = " ";
  for (let index = 0; index < weatherapi.hourly.time.length; index++) {
    if (getCurrentDateTimeHourFixed() == weatherapi.hourly.time[index]) {
      for (let i = index; i < index + 24; i++) {
        cartona += `<div class="hourly-item ${i == index ? "now" : " "} ">
            <span class="hourly-time">${i == index ? "Now" : formatTime12(weatherapi.hourly.time[i])}</span>
              <div class="hourly-icon">
                <i data-fa-i2svg=""><svg class="svg-inline--fa fa-cloud-rain" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="cloud-rain" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M96 320c-53 0-96-43-96-96c0-42.5 27.6-78.6 65.9-91.2C64.7 126.1 64 119.1 64 112C64 50.1 114.1 0 176 0c43.1 0 80.5 24.3 99.2 60c14.7-17.1 36.5-28 60.8-28c44.2 0 80 35.8 80 80c0 5.5-.6 10.8-1.6 16c.5 0 1.1 0 1.6 0c53 0 96 43 96 96s-43 96-96 96H96zm-6.8 52c1.3-2.5 3.9-4 6.8-4s5.4 1.5 6.8 4l35.1 64.6c4.1 7.5 6.2 15.8 6.2 24.3v3c0 26.5-21.5 48-48 48s-48-21.5-48-48v-3c0-8.5 2.1-16.9 6.2-24.3L89.2 372zm160 0c1.3-2.5 3.9-4 6.8-4s5.4 1.5 6.8 4l35.1 64.6c4.1 7.5 6.2 15.8 6.2 24.3v3c0 26.5-21.5 48-48 48s-48-21.5-48-48v-3c0-8.5 2.1-16.9 6.2-24.3L249.2 372zm124.9 64.6L409.2 372c1.3-2.5 3.9-4 6.8-4s5.4 1.5 6.8 4l35.1 64.6c4.1 7.5 6.2 15.8 6.2 24.3v3c0 26.5-21.5 48-48 48s-48-21.5-48-48v-3c0-8.5 2.1-16.9 6.2-24.3z"></path></svg></i>
              </div>
              <span class="hourly-temp">${Math.round(weatherapi.hourly.temperature_2m[i])}°</span>
             ${weatherapi.hourly.precipitation_probability[i] !== 0 ? ` <span class="hourly-precip"><i data-fa-i2svg=""><svg class="svg-inline--fa fa-droplet" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="droplet" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-fa-i2svg=""><path fill="currentColor" d="M192 512C86 512 0 426 0 320C0 228.8 130.2 57.7 166.6 11.7C172.6 4.2 181.5 0 191.1 0h1.8c9.6 0 18.5 4.2 24.5 11.7C253.8 57.7 384 228.8 384 320c0 106-86 192-192 192zM96 336c0-8.8-7.2-16-16-16s-16 7.2-16 16c0 61.9 50.1 112 112 112c8.8 0 16-7.2 16-16s-7.2-16-16-16c-44.2 0-80-35.8-80-80z"></path></svg></i> ${weatherapi.hourly.precipitation_probability[i]}% </span>` : " "}
            </div>`;
      }
    }
  }
  return cartona;
}
function forecastdays() {
  let cartona = " ";
  for (let i = 0; i < weatherapi.daily.temperature_2m_max.length; i++) {
    cartona += ` <div class="forecast-day ${i == 0 ? " today" : " "}">
                  <div class="forecast-day-name"><span class="day-label">${i == 0 ? " Today" : " "}</span><span class="day-date">${formatDateWithMonthName(weatherapi.daily.time[i])[1]} ${formatDateWithMonthName(weatherapi.daily.time[i])[0]}</span></div>
                  <div class="forecast-icon"><i data-fa-i2svg=""><svg class="svg-inline--fa fa-sun" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sun" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z"></path></svg></i></div>
                  <div class="forecast-temps"><span class="temp-max">${Math.round(weatherapi.daily.temperature_2m_max[i])}°</span><span class="temp-min">${Math.round(weatherapi.daily.temperature_2m_min[i])}°</span></div>
                 ${
                   weatherapi.daily.precipitation_probability_max[i] !== 0
                     ? `<div class="forecast-precip">
                <i data-fa-i2svg=""><svg class="svg-inline--fa fa-droplet" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="droplet" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-fa-i2svg=""><path fill="currentColor" d="M192 512C86 512 0 426 0 320C0 228.8 130.2 57.7 166.6 11.7C172.6 4.2 181.5 0 191.1 0h1.8c9.6 0 18.5 4.2 24.5 11.7C253.8 57.7 384 228.8 384 320c0 106-86 192-192 192zM96 336c0-8.8-7.2-16-16-16s-16 7.2-16 16c0 61.9 50.1 112 112 112c8.8 0 16-7.2 16-16s-7.2-16-16-16c-44.2 0-80-35.8-80-80z"></path></svg></i><span>${weatherapi.daily.precipitation_probability_max[i]}%</span>
              </div> `
                     : ` `
                 }
                </div>`;
  }
  return cartona;
}

// fifth page
let longweekendsapi;
let savedlongweekendbutton = document.querySelector("#saved-longweekend");
let longweekendvalueforlocalstorage;
async function longweekendsfun() {
  if (valueforrestofpages) {
    await loading.classList.remove("hidden");
    longweekendsapi = await fetch(
      `https://date.nager.at/api/v3/LongWeekend/${currentyear}/${valueforrestofpages.cca2}`,
    );
    longweekendsapi = await longweekendsapi.json();
    await loading.classList.add("hidden");
    console.log(longweekendsapi);
    displaylongweekend(longweekendsapi);
  }
}

let longweekendsview = document.querySelector("#long-weekends-view");

function displaylongweekend(value) {
  var cartona = " ";
  cartona += ` <div class="view-header-card gradient-orange">
            <div class="view-header-icon">
              <i data-fa-i2svg=""><svg class="svg-inline--fa fa-umbrella-beach" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="umbrella-beach" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg=""><path fill="currentColor" d="M346.3 271.8l-60.1-21.9L214 448H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H544c17.7 0 32-14.3 32-32s-14.3-32-32-32H282.1l64.1-176.2zm121.1-.2l-3.3 9.1 67.7 24.6c18.1 6.6 38-4.2 39.6-23.4c6.5-78.5-23.9-155.5-80.8-208.5c2 8 3.2 16.3 3.4 24.8l.2 6c1.8 57-7.3 113.8-26.8 167.4zM462 99.1c-1.1-34.4-22.5-64.8-54.4-77.4c-.9-.4-1.9-.7-2.8-1.1c-33-11.7-69.8-2.4-93.1 23.8l-4 4.5C272.4 88.3 245 134.2 226.8 184l-3.3 9.1L434 269.7l3.3-9.1c18.1-49.8 26.6-102.5 24.9-155.5l-.2-6zM107.2 112.9c-11.1 15.7-2.8 36.8 15.3 43.4l71 25.8 3.3-9.1c19.5-53.6 49.1-103 87.1-145.5l4-4.5c6.2-6.9 13.1-13 20.5-18.2c-79.6 2.5-154.7 42.2-201.2 108z"></path></svg></i>
            </div>
            <div class="view-header-content">
              <h2>Long Weekend Finder</h2>
              <p>Find holidays near weekends - perfect for planning mini-trips!</p>
            </div>
            
            <div class="view-header-selection" id="lw-selection" style="display: flex;">
              <div class="current-selection-badge">
                <img id="lw-flag" src="${valueforrestofpages.flags.png}" alt="" class="selection-flag" style="display: block;">
                <span id="lw-country-name">${valueforrestofpages.name.common}</span>
                <span class="selection-year" id="lw-year-display">${currentyear}</span>
              </div>
            </div>
          </div>
          <div id="lw-content" class="lw-grid">
      
    
      
    ${longweekendcards(value)}
      
    
      
    </div>
          
          
          `;
  longweekendsview.innerHTML = cartona;
}

function longweekendcards(value) {
  var cartona = " ";
  for (let i = 0; i < value.length; i++) {
    const isSaved = checklongweekenditem(value[i]);
    cartona += ` <div class="lw-card">
        <div class="lw-card-header">
          <span class="lw-badge">
            <i data-fa-i2svg=""><svg class="svg-inline--fa fa-calendar-days" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="calendar-days" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z"></path></svg></i>
            ${value[i].dayCount} Days
          </span>
          <button class="holiday-action-btn ${isSaved ? "saved" : " "} " id="saved-longweekend" data-index-longweekend = "${i}" >
            <i data-fa-i2svg=""><svg class="svg-inline--fa fa-heart" aria-hidden="true" focusable="false" data-prefix="far" data-icon="heart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"></path></svg></i>
          </button>
        </div>
        <h3>Long Weekend #${i + 1}</h3>
        <div class="lw-dates">
          <i data-fa-i2svg=""><svg class="svg-inline--fa fa-calendar" aria-hidden="true" focusable="false" data-prefix="far" data-icon="calendar" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192H400V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192z"></path></svg></i>
          ${formatDateWithMonthName(value[i].startDate)} - ${formatDateWithMonthName(value[i].endDate)}
        </div>
     ${
       value[i].needBridgeDay == true
         ? `    <div class="lw-info-box warning">
          <i data-fa-i2svg=""><svg class="svg-inline--fa fa-circle-info" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-info" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"></path></svg></i>
          Requires taking a bridge day off
        </div>`
         : ` <div class="lw-info-box success"><i data-fa-i2svg=""><svg class="svg-inline--fa fa-circle-check" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-check" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"></path></svg></i> No extra days off needed!</div>`
     }
        <div class="lw-days-visual">
          ${getDaysBetween(value[i].startDate, value[i].endDate)}
      
    
        </div>
      </div>`;
  }
  longweekendvalueforlocalstorage = value;
  return cartona;
}
function checklongweekenditem(item) {
  const savedlongweekend =
    JSON.parse(localStorage.getItem("savedlongweekend")) || [];
  return savedlongweekend.some(
    (saved) =>
      saved.startDate === item.startDate &&
      saved.endDate === item.endDate &&
      saved.needBridgeDay === item.needBridgeDay &&
      saved.dayCount === item.dayCount,
  );
}
let selectedlongweekend =
  JSON.parse(localStorage.getItem("savedlongweekend")) || [];

longweekendsview.addEventListener("click", function (e) {
  if (e.target.closest("#saved-longweekend")) {
    const button = e.target.closest("#saved-longweekend");
    const index = button.getAttribute("data-index-longweekend");
    const longweekend = longweekendvalueforlocalstorage[index];

    if (checklongweekenditem(longweekend)) {
      document.querySelector("#toast-container").innerHTML = `
        <div class="toast warning">
          <i data-fa-i2svg=""><svg class="svg-inline--fa fa-circle-exclamation" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-exclamation" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM116 268a12 12 0 1 0 24 0 12 12 0 1 0 -24 0zm128-44a40 40 0 1 0 0 80 40 40 0 1 0 0-80zM328 268a12 12 0 1 0 24 0 12 12 0 1 0 -24 0z"></path></svg></i>
          <span>This longweekend is already saved!</span>
        </div>`;
      setTimeout(() => {
        document.querySelector("#toast-container").innerHTML = "";
      }, 3000);
    } else {
      button.classList.add("saved");
      selectedlongweekend.push(longweekend);
      localStorage.setItem(
        "savedlongweekend",
        JSON.stringify(selectedlongweekend),
      );

      document.querySelector("#toast-container").innerHTML = `
        <div class="toast success">
          <i data-fa-i2svg=""><svg class="svg-inline--fa fa-circle-check" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-check" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"></path></svg></i>
          <span>Holiday saved successfully!</span>
        </div>`;
      setTimeout(() => {
        document.querySelector("#toast-container").innerHTML = "";
      }, 3000);
      displayallplanlongweekend();
      displayallplanevents();
      displaymyplanholiday();
      alldisplay();
    }
  }
});

function getDaysBetween(startDate, endDate) {
  const days = [];

  let current = new Date(startDate);
  const end = new Date(endDate);

  while (current <= end) {
    const year = current.getFullYear();
    const month = String(current.getMonth() + 1).padStart(2, "0");
    const day = String(current.getDate()).padStart(2, "0");

    days.push(`${year}-${month}-${day}`);

    current.setDate(current.getDate() + 1);
  }

  var cartona = " ";
  for (let i = 0; i < days.length; i++) {
    cartona += ` <div class="lw-day ${getDayName(days[i]).slice(0, 3).toUpperCase() === "SAT" || getDayName(days[i]).slice(0, 3).toUpperCase() === "SUN" ? `weekend` : ` `}">
        <span class="name">${getDayName(days[i]).slice(0, 3).toUpperCase()}</span>
        <span class="num">${formatDateWithMonthName(days[i])[1]}</span>
      </div> `;
  }
  return cartona;
}

function formatTimeWithOffset(utcDate, offsetHours) {
  const date = new Date(utcDate);

  const adjusted = new Date(date.getTime() + Number(offsetHours) * 3600000);

  let hours = adjusted.getUTCHours();
  const minutes = adjusted.getUTCMinutes();

  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  return `${hours}:${String(minutes).padStart(2, "0")} ${ampm}`;
}

// sunset section
let sunsetapi;
const today = new Date().toISOString().split("T")[0];
let suntimesview = document.querySelector("#sun-times-view");

const offset = (s) => s[3] + Number(s.slice(4, 6));

function getdaylength(length) {
  const seconds = length;

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  return `${hours}h ${minutes}m`;
}

async function sunsetfun() {
  if (valueforrestofpages) {
    await loading.classList.remove("hidden");
    sunsetapi = await fetch(
      `https://api.sunrise-sunset.org/json?lat=${valueforrestofpages.latlng[0]}&lng=${valueforrestofpages.latlng[1]}&date=${today}&formatted=0`,
    );
    sunsetapi = await sunsetapi.json();
    await loading.classList.add("hidden");
    console.log(sunsetapi);
    displaysunset(sunsetapi);
  }
}

function displaysunset(value) {
  var cartona = " ";
  cartona += ` <div class="view-header-card gradient-sunset">
            <div class="view-header-icon">
              <i data-fa-i2svg=""><svg class="svg-inline--fa fa-sun" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sun" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z"></path></svg></i>
            </div>
            <div class="view-header-content">
              <h2>Sunrise &amp; Sunset Times</h2>
              <p>Plan your activities around golden hour - perfect for photographers and early risers</p>
            </div>
            
            <div class="view-header-selection" id="sun-selection" style="display: flex;">
              <div class="current-selection-badge">
                <img id="sun-flag" src="${valueforrestofpages.flags.png}" alt="" class="selection-flag" style="display: block;">
                <span id="sun-country-name">${valueforrestofpages.name.common}</span>
                <span class="selection-city" id="sun-city-name">${valueforrestofpages.capital[0]}</span>
              </div>
            </div>
          </div>
          <div id="sun-times-content" class="sun-times-layout">
    <div class="sun-main-card">
      <div class="sun-main-header">
        <div class="sun-location">
          <h2><i data-fa-i2svg=""><svg class="svg-inline--fa fa-location-dot" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="location-dot" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-fa-i2svg=""><path fill="currentColor" d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"></path></svg></i> ${valueforrestofpages.capital[0]}</h2>
          <p>Sun times for your selected location</p>
        </div>
        <div class="sun-date-display">
          <div class="date">${formatDateWithMonthName(today)}</div>
          <div class="day">${getDayName(today)}</div>
        </div>
      </div>
      
      <div class="sun-times-grid">
        <div class="sun-time-card dawn">
          <div class="icon"><i data-fa-i2svg=""><svg class="svg-inline--fa fa-moon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="moon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-fa-i2svg=""><path fill="currentColor" d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"></path></svg></i></div>
          <div class="label">Dawn</div>
          <div class="time">${formatTimeWithOffset(value.results.civil_twilight_begin, offset(valueforrestofpages.timezones[0]))}</div>
          <div class="sub-label">Civil Twilight</div>
        </div>
        
        <div class="sun-time-card sunrise">
          <div class="icon"><i data-fa-i2svg=""><svg class="svg-inline--fa fa-sun" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sun" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z"></path></svg></i></div>
          <div class="label">Sunrise</div>
          <div class="time">${formatTimeWithOffset(value.results.sunrise, offset(valueforrestofpages.timezones[0]))}</div>
          <div class="sub-label">Golden Hour Start</div>
        </div>
        
        <div class="sun-time-card noon">
          <div class="icon"><i data-fa-i2svg=""><svg class="svg-inline--fa fa-sun" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sun" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z"></path></svg></i></div>
          <div class="label">Solar Noon</div>
          <div class="time">${formatTimeWithOffset(value.results.solar_noon, offset(valueforrestofpages.timezones[0]))}</div>
          <div class="sub-label">Sun at Highest</div>
        </div>
        
        <div class="sun-time-card sunset">
          <div class="icon"><i data-fa-i2svg=""><svg class="svg-inline--fa fa-sun" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sun" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z"></path></svg></i></div>
          <div class="label">Sunset</div>
          <div class="time">${formatTimeWithOffset(value.results.sunset, offset(valueforrestofpages.timezones[0]))}</div>
          <div class="sub-label">Golden Hour End</div>
        </div>
        
        <div class="sun-time-card dusk">
          <div class="icon"><i data-fa-i2svg=""><svg class="svg-inline--fa fa-moon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="moon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-fa-i2svg=""><path fill="currentColor" d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"></path></svg></i></div>
          <div class="label">Dusk</div>
          <div class="time">${formatTimeWithOffset(value.results.civil_twilight_end, offset(valueforrestofpages.timezones[0]))}</div>
          <div class="sub-label">Civil Twilight</div>
        </div>
        
        <div class="sun-time-card daylight">
          <div class="icon"><i data-fa-i2svg=""><svg class="svg-inline--fa fa-hourglass-half" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="hourglass-half" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-fa-i2svg=""><path fill="currentColor" d="M32 0C14.3 0 0 14.3 0 32S14.3 64 32 64V75c0 42.4 16.9 83.1 46.9 113.1L146.7 256 78.9 323.9C48.9 353.9 32 394.6 32 437v11c-17.7 0-32 14.3-32 32s14.3 32 32 32H64 320h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V437c0-42.4-16.9-83.1-46.9-113.1L237.3 256l67.9-67.9c30-30 46.9-70.7 46.9-113.1V64c17.7 0 32-14.3 32-32s-14.3-32-32-32H320 64 32zM96 75V64H288V75c0 19-5.6 37.4-16 53H112c-10.3-15.6-16-34-16-53zm16 309c3.5-5.3 7.6-10.3 12.1-14.9L192 301.3l67.9 67.9c4.6 4.6 8.6 9.6 12.1 14.9H112z"></path></svg></i></div>
          <div class="label">Day Length</div>
          <div class="time">${getdaylength(value.results.day_length)}</div>
          <div class="sub-label">Total Daylight</div>
        </div>
      </div>
    </div>
    
    <div class="day-length-card">
              <h3><i data-fa-i2svg=""><svg class="svg-inline--fa fa-chart-pie" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chart-pie" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg=""><path fill="currentColor" d="M304 240V16.6c0-9 7-16.6 16-16.6C443.7 0 544 100.3 544 224c0 9-7.6 16-16.6 16H304zM32 272C32 150.7 122.1 50.3 239 34.3c9.2-1.3 17 6.1 17 15.4V288L412.5 444.5c6.7 6.7 6.2 17.7-1.5 23.1C371.8 495.6 323.8 512 272 512C139.5 512 32 404.6 32 272zm526.4 16c9.3 0 16.6 7.8 15.4 17c-7.7 55.9-34.6 105.6-73.9 142.3c-6 5.6-15.4 5.2-21.2-.7L320 288H558.4z"></path></svg></i> Daylight Distribution</h3>
              <div class="day-progress">
                <div class="day-progress-bar">
                  <div class="day-progress-fill" style="width: ${(Number(value.results.day_length) / 86400) * 100}%"></div>
                </div>
              </div>
              <div class="day-length-stats">
                <div class="day-stat">
                  <div class="value">${getdaylength(value.results.day_length)}</div>
                  <div class="label">Daylight</div>
                </div>
                <div class="day-stat">
                  <div class="value">${((Number(value.results.day_length) / 86400) * 100).toFixed(1)}%</div>
                  <div class="label">of 24 Hours</div>
                </div>
                <div class="day-stat">
                  <div class="value">${getdaylength(86400 - Number(value.results.day_length))}</div>
                  <div class="label">Darkness</div>
                </div>
              </div>
            </div>
  </div>
          
          
          
          `;

  suntimesview.innerHTML = cartona;
}

let localforholiday = JSON.parse(localStorage.getItem("holiday")) || [];
let localevents = JSON.parse(localStorage.getItem("events")) || [];
let locallongweekend =
  JSON.parse(localStorage.getItem("savedlongweekend")) || [];
let alllocal = [
  ...(localforholiday || []),
  ...(localevents || []),
  ...(locallongweekend || []),
];
console.log(localforholiday);
console.log(alllocal.length);

const plansContent = document.querySelector("#plans-content");


function refreshPlansData() {
  localforholiday = JSON.parse(localStorage.getItem("holiday")) || [];
  localevents = JSON.parse(localStorage.getItem("events")) || [];
  locallongweekend = JSON.parse(localStorage.getItem("savedlongweekend")) || [];
  alllocal = [
    ...(localforholiday || []),
    ...(localevents || []),
    ...(locallongweekend || []),
  ];
 
  document.querySelector("#filter-all-count").innerHTML = (
    alllocal || []
  ).length;
  document.querySelector("#filter-holiday-count").innerHTML = (
    localforholiday || []
  ).length;
  document.querySelector("#filter-event-count").innerHTML = (
    localevents || []
  ).length;
  document.querySelector("#filter-lw-count").innerHTML = (
    locallongweekend || []
  ).length;
}

function displaymyplanholiday() {
  var cartona = " ";
  for (let i = 0; i < localforholiday.length; i++) {
    cartona += ` <div class="plan-card">
        <span class="plan-card-type holiday">Holiday</span>
        <div class="plan-card-content">
          
        <h4>${localforholiday[i].localName}</h4>
        <div class="plan-card-details">
          <div><i data-fa-i2svg=""><svg class="svg-inline--fa fa-calendar" aria-hidden="true" focusable="false" data-prefix="far" data-icon="calendar" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192H400V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192z"></path></svg></i>${formatDateWithMonthName(localforholiday[i].date)}</div>
          <div><i data-fa-i2svg=""><svg class="svg-inline--fa fa-circle-info" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-info" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"></path></svg></i>${localforholiday[i].name}</div>
        </div>
      
          <div class="plan-card-actions">
            <button class="btn-plan-remove" ">
              <i data-fa-i2svg=""><svg class="svg-inline--fa fa-trash" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg></i> Remove
            </button>
          </div>
        </div>
      </div>`;
  }
  return cartona;
}
function displayallplanevents() {
  var cartona = " ";
  for (let i = 0; i < localevents.length; i++) {
    cartona += ` <div class="plan-card">
        <span class="plan-card-type event">Event</span>
        <div class="plan-card-content">
          
        <h4>${localevents[i].name}</h4>
        <div class="plan-card-details">
          <div><i data-fa-i2svg=""><svg class="svg-inline--fa fa-calendar" aria-hidden="true" focusable="false" data-prefix="far" data-icon="calendar" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192H400V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192z"></path></svg></i>${formatDateWithMonthName(localevents[i].dates.start.localDate)}</div>
          <div><i data-fa-i2svg=""><svg class="svg-inline--fa fa-location-dot" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="location-dot" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-fa-i2svg=""><path fill="currentColor" d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"></path></svg></i>${localevents[i]._embedded.venues[0].city.name}</div>
        </div>
      
          <div class="plan-card-actions">
            <button class="btn-plan-remove" ">
              <i data-fa-i2svg=""><svg class="svg-inline--fa fa-trash" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg></i> Remove
            </button>
          </div>
        </div>
      </div>`;
  }
  return cartona;
}
function displayallplanlongweekend() {
  var cartona = " ";
  for (let i = 0; i < locallongweekend.length; i++) {
    cartona += ` <div class="plan-card">
        <span class="plan-card-type longweekend">Long Weekend</span>
        <div class="plan-card-content">
          
        <h4>${locallongweekend[i].dayCount} Day Long Weekend</h4>
        <div class="plan-card-details">
          <div><i data-fa-i2svg=""><svg class="svg-inline--fa fa-calendar" aria-hidden="true" focusable="false" data-prefix="far" data-icon="calendar" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192H400V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192z"></path></svg></i>${formatDateWithMonthName(locallongweekend[i].startDate)} - ${formatDateWithMonthName(locallongweekend[i].endDate)}</div>
          <div><i data-fa-i2svg=""><svg class="svg-inline--fa fa-circle-info" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-info" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"></path></svg></i> ${
            locallongweekend[i].needBridgeDay == true
              ? `    <div class="lw-info-box warning">
          <i data-fa-i2svg=""><svg class="svg-inline--fa fa-circle-info" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-info" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"></path></svg></i>
          Requires taking a bridge day off
        </div>`
              : ` <div class="lw-info-box success"><i data-fa-i2svg=""><svg class="svg-inline--fa fa-circle-check" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-check" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"></path></svg></i> No extra days off needed!</div>`
          }</div>
        </div>
      
          <div class="plan-card-actions">
            <button class="btn-plan-remove" ">
              <i data-fa-i2svg=""><svg class="svg-inline--fa fa-trash" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg></i> Remove
            </button>
          </div>
        </div>
      </div>`;
  }
  return cartona;
}

document
  .querySelector(".plans-filter-bar")
  .addEventListener("click", function (e) {
    const filterBtn = e.target.closest("[data-filter]");
    if (!filterBtn) return;

    refreshPlansData();

    const filterValue = filterBtn.getAttribute("data-filter");

    document.querySelectorAll("[data-filter]").forEach((btn) => {
      btn.classList.remove("active");
    });

    filterBtn.classList.add("active");

    if (filterValue === "all") {
      let allContent = "";
      if (localforholiday && localforholiday.length > 0) {
        allContent += displaymyplanholiday();
      }
      if (localevents && localevents.length > 0) {
        allContent += displayallplanevents();
      }
      if (locallongweekend && locallongweekend.length > 0) {
        allContent += displayallplanlongweekend();
      }
      plansContent.innerHTML = allContent;
    } else if (filterValue === "holiday") {
      plansContent.innerHTML = displaymyplanholiday();
    } else if (filterValue === "event") {
      plansContent.innerHTML = displayallplanevents();
    } else if (filterValue === "longweekend") {
      plansContent.innerHTML = displayallplanlongweekend();
    }
  });

function alldisplay() {
  refreshPlansData();
  let allContent = "";
  if (localforholiday && localforholiday.length > 0) {
    allContent += displaymyplanholiday();
  }
  if (localevents && localevents.length > 0) {
    allContent += displayallplanevents();
  }
  if (locallongweekend && locallongweekend.length > 0) {
    allContent += displayallplanlongweekend();
  }
  if (plansContent && allContent) {
    plansContent.innerHTML = allContent;
  }
}

let filterallcount = (document.querySelector("#filter-all-count").innerHTML = (
  alllocal || []
).length);
let filterholidaycount = (document.querySelector(
  "#filter-holiday-count",
).innerHTML = (localforholiday || []).length);
let filtereventcount = (document.querySelector(
  "#filter-event-count",
).innerHTML = (localevents || []).length);
let filterlongweekendcount = (document.querySelector(
  "#filter-lw-count",
).innerHTML = (locallongweekend || []).length);

document
  .querySelector("#clear-all-plans-btn")
  .addEventListener("click", function () {
    localStorage.removeItem("holiday");
    localStorage.removeItem("events");
    localStorage.removeItem("savedlongweekend");
    displayallplanlongweekend();
    displayallplanevents();
    displaymyplanholiday();
    alldisplay();
  });

document.querySelector("#plans-count").innerHTML = alllocal.length;
document.querySelector("#stat-saved").innerHTML = alllocal.length;


let currency
let amountmoney

 async function currencypage(from , to , amount){
if (to && from) {
     await loading.classList.remove("hidden");
   currency = await fetch(`https://v6.exchangerate-api.com/v6/487f018db5bd52b58190795a/pair/${from}/${to}/${amount}`)
  currency = await currency.json();
   await loading.classList.add("hidden");
console.log(currency)
amountmoney = amount
await displaycurrency(currency)
}
}





document.querySelector("#convert-btn").addEventListener("click" , ()=>{
  let from = document.querySelector("#currency-from")
let to = document.querySelector("#currency-to")
let amount = document.querySelector("#currency-amount")
currencypage(from.value , to.value , amount.value)


})

function displaycurrency(currency){
document.querySelector("#currency-result").innerHTML = `
<div class="conversion-display">                
<div class="conversion-from">                    
<span class="amount">${amountmoney}</span>                   
 <span class="currency-code">${currency.base_code}</span>               
  </div>               
   <div class="conversion-equals"><i data-fa-i2svg=""><svg class="svg-inline--fa fa-equals" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="equals" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M48 128c-17.7 0-32 14.3-32 32s14.3 32 32 32H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H48zm0 192c-17.7 0-32 14.3-32 32s14.3 32 32 32H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H48z"></path></svg></i></div>               
    <div class="conversion-to">                    
    <span class="amount">${currency.conversion_result}</span>                 
       <span class="currency-code">${currency.target_code}</span>              
         </div>        
             </div>
             <div class="exchange-rate-info">               
              <p>1 ${currency.base_code} = ${currency.conversion_rate} ${currency.target_code}</p>               
               <small>Last updated: ${currency.time_last_update_utc}</small>         
                  </div>

`
}



document.querySelector("#swap-currencies-btn").addEventListener("click" , ()=>{
    let from = document.querySelector("#currency-from")
let to = document.querySelector("#currency-to")
let bridge = to.value
to.value = from.value
from.value = bridge 
})





async function displayquickcurrency(){
let quick =  await fetch("https://v6.exchangerate-api.com/v6/487f018db5bd52b58190795a/latest/USD")
quick = await quick.json()
console.log(quick)

  document.querySelector("#popular-currencies").innerHTML = `

              <div class="popular-currency-card">
                <img src="https://flagcdn.com/w40/eu.png" alt="EUR" class="flag">
                <div class="info"><div class="code">EUR</div><div class="name">Euro</div></div>
                <div class="rate">${quick.conversion_rates.EUR}</div>
              </div>
              <div class="popular-currency-card">
                <img src="https://flagcdn.com/w40/gb.png" alt="GBP" class="flag">
                <div class="info"><div class="code">GBP</div><div class="name">British Pound</div></div>
                <div class="rate">${quick.conversion_rates.GBP}</div>
              </div>
              <div class="popular-currency-card">
                <img src="https://flagcdn.com/w40/eg.png" alt="EGP" class="flag">
                <div class="info"><div class="code">EGP</div><div class="name">Egyptian Pound</div></div>
                <div class="rate">${quick.conversion_rates.EGP}</div>
              </div>
              <div class="popular-currency-card">
                <img src="https://flagcdn.com/w40/ae.png" alt="AED" class="flag">
                <div class="info"><div class="code">AED</div><div class="name">UAE Dirham</div></div>
                <div class="rate">${quick.conversion_rates.AED}</div>
              </div>
              <div class="popular-currency-card">
                <img src="https://flagcdn.com/w40/sa.png" alt="SAR" class="flag">
                <div class="info"><div class="code">SAR</div><div class="name">Saudi Riyal</div></div>
                <div class="rate">${quick.conversion_rates.SAR}</div>
              </div>
              <div class="popular-currency-card">
                <img src="https://flagcdn.com/w40/jp.png" alt="JPY" class="flag">
                <div class="info"><div class="code">JPY</div><div class="name">Japanese Yen</div></div>
                <div class="rate">${quick.conversion_rates.JPY}</div>
              </div>
              <div class="popular-currency-card">
                <img src="https://flagcdn.com/w40/ca.png" alt="CAD" class="flag">
                <div class="info"><div class="code">CAD</div><div class="name">Canadian Dollar</div></div>
                <div class="rate">${quick.conversion_rates.CAD}</div>
              </div>
         
            

  
  `

  document.querySelectorAll('.popular-currency-card').forEach(card => {
  card.addEventListener('click', function() {
    const codeDiv = card.querySelector('.code');
    if (codeDiv) {
      const code = codeDiv.textContent;
      let to = document.querySelector("#currency-to")
      to.value = code;
        let from = document.querySelector("#currency-from")
let amount = document.querySelector("#currency-amount")
currencypage(from.value , to.value , amount.value)

      
    }
  });
});





}


displayquickcurrency()



