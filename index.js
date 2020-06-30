function countries() {
    countrySelect = document.querySelector('#selectCountry');
    fetch("https://restcountries.eu/rest/v2/all")
    .then(
        res => res.json())
    .then(states => {
        for(const state of states) {
            console.log(state.name)
            countrySelect.innerHTML += `
            <option value="${state.alpha2Code}">${state.name}</option>
            `
        }
    });
}
countries();